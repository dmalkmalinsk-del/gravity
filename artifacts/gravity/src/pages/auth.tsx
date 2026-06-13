import { SignIn, SignUp } from "@clerk/react";
import { Layout } from "@/components/layout";
import { GalaxyBackground } from "@/components/galaxy-background";
import { motion } from "framer-motion";

export function SignInPage() {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  return (
    <Layout>
      <GalaxyBackground />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-[calc(100vh-72px)] items-center justify-center p-4 relative z-10"
      >
        <SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} />
      </motion.div>
    </Layout>
  );
}

export function SignUpPage() {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  return (
    <Layout>
      <GalaxyBackground />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-[calc(100vh-72px)] items-center justify-center p-4 relative z-10"
      >
        <SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} />
      </motion.div>
    </Layout>
  );
}
