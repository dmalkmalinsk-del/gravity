import { Layout } from "@/components/layout";
import { GalaxyBackground } from "@/components/galaxy-background";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

  const downloadLogo = () => {
    fetch(`${basePath}/logo.svg`)
      .then(res => res.blob())
      .then(blob => {
        const url = window.URL.createUrl(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'gravity-icon.svg';
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
  };

  return (
    <Layout>
      <GalaxyBackground />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-48 h-48 mb-8"
        >
          <div className="absolute inset-0 bg-purple-600 rounded-full blur-[100px] opacity-30 animate-pulse"></div>
          <img 
            src={`${basePath}/logo.svg`} 
            alt="Gravity Logo" 
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_30px_rgba(147,51,234,0.5)] animate-[float_6s_ease-in-out_infinite]"
          />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-6"
        >
          GRAVITY
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-purple-200/80 font-light max-w-2xl mb-12"
        >
          Step into a new dimension. Download the ultimate desktop experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Link href="/sign-in" className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-white text-black font-semibold text-lg transition-transform hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
            Sign In to Download
          </Link>
          <Button 
            variant="outline" 
            onClick={downloadLogo}
            className="h-14 px-8 rounded-full border-purple-500/30 bg-black/40 text-purple-200 hover:bg-purple-900/30 hover:text-white backdrop-blur-sm"
          >
            Download Gravity Icon
          </Button>
        </motion.div>
      </section>

      {/* Feature Section 1 */}
      <section className="relative py-32 px-6 border-t border-white/5 bg-black/40 backdrop-blur-sm z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Cosmic Performance.</h2>
            <p className="text-lg text-purple-200/60 leading-relaxed">
              Engineered from the ground up to feel weightless. Gravity consumes minimal system resources while providing an expansive set of tools right at your fingertips.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-video rounded-2xl bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/20 shadow-[0_0_50px_rgba(147,51,234,0.1)] flex items-center justify-center overflow-hidden relative"
          >
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2000&auto=format&fit=crop')] opacity-20 bg-cover bg-center mix-blend-screen"></div>
          </motion.div>
        </div>
      </section>

      {/* Feature Section 2 */}
      <section className="relative py-32 px-6 bg-transparent z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1 aspect-video rounded-2xl bg-gradient-to-tr from-indigo-900/20 to-black border border-indigo-500/20 shadow-[0_0_50px_rgba(79,70,229,0.1)] flex items-center justify-center overflow-hidden relative"
          >
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2000&auto=format&fit=crop')] opacity-20 bg-cover bg-center mix-blend-screen"></div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Dark Matter Design.</h2>
            <p className="text-lg text-purple-200/60 leading-relaxed">
              A visually stunning interface that feels right at home on modern setups. No blinding white screens, just pure, unadulterated focus.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 border-t border-white/5 bg-black/60 backdrop-blur-md z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to launch?</h2>
          <Link href="/sign-in" className="inline-flex items-center justify-center h-16 px-10 rounded-full bg-purple-600 text-white font-semibold text-xl transition-all hover:bg-purple-500 shadow-[0_0_40px_rgba(147,51,234,0.4)] hover:shadow-[0_0_60px_rgba(147,51,234,0.6)] hover:scale-105">
            Enter the Cosmos
          </Link>
        </motion.div>
      </section>
      
      {/* Footer */}
      <footer className="relative py-8 px-6 border-t border-white/10 bg-black z-10 text-center">
        <p className="text-purple-200/40 text-sm">© {new Date().getFullYear()} Gravity. All rights reserved.</p>
      </footer>
    </Layout>
  );
}
