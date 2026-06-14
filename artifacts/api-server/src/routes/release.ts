import { Router } from "express";
import { getAuth, clerkClient } from "@clerk/express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { db, releaseTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { UpdateReleaseBody } from "@workspace/api-zod";
import { logger } from "../lib/logger";

const router = Router();

const OWNER_EMAIL = "adammalik1234674@gmail.com";

const workspaceRoot = process.cwd().endsWith(path.join("artifacts", "api-server"))
  ? path.resolve(process.cwd(), "../..")
  : process.cwd();

const uploadsDir = path.resolve(workspaceRoot, "artifacts/api-server/uploads");
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage, limits: { fileSize: 500 * 1024 * 1024 } });

async function ensureRelease() {
  const rows = await db.select().from(releaseTable).limit(1);
  if (rows.length === 0) {
    await db.insert(releaseTable).values({ updated: false });
  }
  const [row] = await db.select().from(releaseTable).limit(1);
  return row;
}

function requireAuth(req: any, res: any, next: any) {
  const auth = getAuth(req);
  const userId = auth?.sessionClaims?.userId || auth?.userId;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  req.userId = userId;
  next();
}

async function requireOwner(req: any, res: any, next: any) {
  const auth = getAuth(req);
  const userId = auth?.userId;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const email = user.emailAddresses.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress;
    if (email !== OWNER_EMAIL) {
      return res.status(403).json({ error: "Forbidden" });
    }
  } catch {
    return res.status(403).json({ error: "Forbidden" });
  }
  req.userId = userId;
  next();
}

function releaseToJson(row: any) {
  return {
    id: row.id,
    updated: row.updated,
    fileName: row.fileName ?? null,
    version: row.version ?? null,
    uploadedAt: row.uploadedAt ? row.uploadedAt.toISOString() : null,
    updatedAt: row.updatedAt ? row.updatedAt.toISOString() : new Date().toISOString(),
  };
}

router.get("/release", async (_req, res) => {
  try {
    const row = await ensureRelease();
    res.json(releaseToJson(row));
  } catch (err) {
    logger.error({ err }, "Failed to get release");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/release", requireOwner, async (req, res) => {
  try {
    const parsed = UpdateReleaseBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid body" });
      return;
    }
    const row = await ensureRelease();
    const updates: Record<string, any> = {};
    if (parsed.data.updated !== undefined) updates.updated = parsed.data.updated;
    if (parsed.data.version !== undefined) updates.version = parsed.data.version;
    const [updated] = await db
      .update(releaseTable)
      .set(updates)
      .where(eq(releaseTable.id, row.id))
      .returning();
    res.json(releaseToJson(updated));
  } catch (err) {
    logger.error({ err }, "Failed to update release");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/release/upload", requireOwner, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file provided" });
      return;
    }
    const row = await ensureRelease();
    const [updated] = await db
      .update(releaseTable)
      .set({
        fileName: req.file.originalname,
        uploadedAt: new Date(),
      })
      .where(eq(releaseTable.id, row.id))
      .returning();
    res.json(releaseToJson(updated));
  } catch (err) {
    logger.error({ err }, "Failed to upload release");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/release/download", requireAuth, async (_req, res) => {
  try {
    const row = await ensureRelease();
    if (!row.updated) {
      res.status(403).json({ error: "Release is not available for download" });
      return;
    }
    if (!row.fileName) {
      res.status(404).json({ error: "No file uploaded yet" });
      return;
    }
    const filePath = path.join(uploadsDir, row.fileName);
    if (!fs.existsSync(filePath)) {
      res.status(404).json({ error: "File not found on server" });
      return;
    }
    res.download(filePath, row.fileName);
  } catch (err) {
    logger.error({ err }, "Failed to download release");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
