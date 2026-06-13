import { Router, type IRouter } from "express";
import healthRouter from "./health";
import releaseRouter from "./release";

const router: IRouter = Router();

router.use(healthRouter);
router.use(releaseRouter);

export default router;
