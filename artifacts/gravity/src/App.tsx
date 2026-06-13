import { useEffect, useRef } from "react";
import { ClerkProvider, Show, useClerk, useUser } from '@clerk/react';
import { publishableKeyFromHost } from '@clerk/react/internal';
import { shadcn } from '@clerk/themes';
import { Switch, Route, useLocation, Router as WouterRouter, Redirect } from 'wouter';
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/home";
import DownloadPage from "@/pages/download";
import AdminPage from "@/pages/admin";
import { SignInPage, SignUpPage } from "@/pages/auth";
import NotFound from "@/pages/not-found";

const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);

const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

if (!clerkPubKey) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY in .env file');
}

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: "clerk",
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: "#8b5cf6",
    colorForeground: "#f0f0ff",
    colorMutedForeground: "#9090b0",
    colorDanger: "#ef4444",
    colorBackground: "#0a0a1a",
    colorInput: "#16162a",
    colorInputForeground: "#f0f0ff",
    colorNeutral: "#3a3a5c",
    fontFamily: "'Inter', sans-serif",
    borderRadius: "12px",
  },
  elements: {
    rootBox: "w-full flex justify-center",
    cardBox: "!bg-[#0d0d1f] border border-purple-900/40 rounded-2xl w-[440px] max-w-full overflow-hidden shadow-2xl shadow-purple-900/20",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: "text-white font-bold",
    headerSubtitle: "text-purple-300/80",
    socialButtonsBlockButtonText: "text-white",
    formFieldLabel: "text-purple-200",
    footerActionLink: "text-purple-400 hover:text-purple-300",
    footerActionText: "text-purple-300/60",
    dividerText: "text-purple-400/60",
    identityPreviewEditButton: "text-purple-400",
    formFieldSuccessText: "text-green-400",
    alertText: "text-red-400",
    logoBox: "flex justify-center",
    logoImage: "h-10 w-auto animate-pulse",
    socialButtonsBlockButton: "!bg-[#16162a] !border-purple-900/50 hover:!bg-[#1e1e3a]",
    formButtonPrimary: "!bg-purple-600 hover:!bg-purple-500",
    formFieldInput: "!bg-[#16162a] !border-purple-900/50 !text-white",
    otpCodeFieldInput: "!bg-[#16162a] !border-purple-900/50 !text-white",
    footerAction: "bg-transparent",
    dividerLine: "bg-purple-900/40",
    alert: "!bg-red-900/20 !border-red-900/40",
    main: "gap-4",
    formFieldRow: "gap-2",
  },
};

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const queryClient = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (
        prevUserIdRef.current !== undefined &&
        prevUserIdRef.current !== userId
      ) {
        queryClient.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsubscribe;
  }, [addListener, queryClient]);

  return null;
}

function HomeRedirect() {
  return (
    <>
      <Show when="signed-in">
        <Redirect to="/download" />
      </Show>
      <Show when="signed-out">
        <Home />
      </Show>
    </>
  );
}

function DownloadRoute() {
  return (
    <>
      <Show when="signed-in">
        <DownloadPage />
      </Show>
      <Show when="signed-out">
        <Redirect to="/sign-in" />
      </Show>
    </>
  );
}

function AdminRoute() {
  const { user } = useUser();
  const isAdmin = user?.primaryEmailAddress?.emailAddress === "adammalik1234674@gmail.com";
  
  return (
    <>
      <Show when="signed-in">
        {isAdmin ? <AdminPage /> : <Redirect to="/download" />}
      </Show>
      <Show when="signed-out">
        <Redirect to="/sign-in" />
      </Show>
    </>
  );
}


function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      localization={{
        signIn: { start: { title: "Sign in to Gravity", subtitle: "Welcome back to the cosmos" } },
        signUp: { start: { title: "Join Gravity", subtitle: "Enter the cosmos" } },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <TooltipProvider>
          <Switch>
            <Route path="/" component={HomeRedirect} />
            <Route path="/download" component={DownloadRoute} />
            <Route path="/admin" component={AdminRoute} />
            <Route path="/sign-in/*?" component={SignInPage} />
            <Route path="/sign-up/*?" component={SignUpPage} />
            <Route component={NotFound} />
          </Switch>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function App() {
  return (
    <WouterRouter base={basePath}>
      <ClerkProviderWithRoutes />
    </WouterRouter>
  );
}

export default App;
