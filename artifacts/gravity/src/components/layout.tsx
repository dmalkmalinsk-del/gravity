import React from "react";
import { Link } from "wouter";
import { Show, useClerk, useUser } from "@clerk/react";

export function Layout({ children }: { children: React.ReactNode }) {
  const { signOut } = useClerk();
  const { user } = useUser();
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <div className="min-h-screen w-full bg-background text-foreground flex flex-col relative overflow-hidden dark">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/40 backdrop-blur-md border-b border-white/5">
        <Link href="/" className="flex items-center gap-3">
          <img src={`${basePath}/logo.svg`} alt="Gravity Logo" className="w-8 h-8 object-contain" />
          <span className="font-bold text-xl tracking-tight text-white">Gravity</span>
        </Link>
        <div className="flex items-center gap-4">
          <Show when="signed-out">
            <Link href="/sign-in" className="text-sm font-medium text-purple-200 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/sign-up" className="text-sm font-medium bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-full transition-colors shadow-[0_0_15px_rgba(147,51,234,0.4)]">
              Get Started
            </Link>
          </Show>
          <Show when="signed-in">
            {user?.primaryEmailAddress?.emailAddress === "adammalik1234674@gmail.com" && (
              <Link href="/admin" className="text-sm font-medium text-purple-200 hover:text-white transition-colors">
                Admin
              </Link>
            )}
            <button
              onClick={() => signOut({ redirectUrl: basePath || "/" })}
              className="text-sm font-medium text-purple-200 hover:text-white transition-colors"
            >
              Log out
            </button>
          </Show>
        </div>
      </nav>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col w-full z-10 pt-[72px]">
        {children}
      </main>
    </div>
  );
}
