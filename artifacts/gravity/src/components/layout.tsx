import React from "react";
import { Link } from "wouter";
import { Show, useClerk, useUser } from "@clerk/react";

export function Layout({ children }: { children: React.ReactNode }) {
  const { signOut } = useClerk();
  const { user } = useUser();
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col relative dark">
      {/* Navbar — minimal, Velocity-style */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">
        <Link href="/" className="font-bold text-sm tracking-[0.15em] uppercase text-white hover:opacity-70 transition-opacity">
          GRAVITY
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors hidden md:block">
            Products
          </Link>
          <Show when="signed-in">
            {user?.primaryEmailAddress?.emailAddress === "adammalik1234674@gmail.com" && (
              <Link href="/admin" className="text-sm text-white/60 hover:text-white transition-colors hidden md:block">
                Admin Panel
              </Link>
            )}
          </Show>
          <Show when="signed-out">
            <Link href="/sign-in" className="text-sm text-white/60 hover:text-white transition-colors hidden md:block">
              Sign In
            </Link>
          </Show>
          <Show when="signed-in">
            <button
              onClick={() => signOut({ redirectUrl: basePath || "/" })}
              className="text-sm text-white/60 hover:text-white transition-colors hidden md:block"
            >
              Sign Out
            </button>
          </Show>
          <Link
            href="/download"
            className="text-sm font-medium text-white border border-white/30 hover:bg-white hover:text-black transition-all px-4 py-1.5 rounded-sm"
          >
            Download
          </Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col w-full">
        {children}
      </main>
    </div>
  );
}
