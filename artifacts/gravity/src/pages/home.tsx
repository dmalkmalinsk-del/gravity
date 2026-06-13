import { Layout } from "@/components/layout";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { easeOut } from "framer-motion";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function downloadIcon() {
  fetch(`${basePath}/logo.svg`)
    .then((res) => res.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "gravity-icon.svg";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    });
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.12,
      ease: "easeOut",
    },
  }),
};

export default function Home() {
  return (
    <Layout>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-16 pt-24 pb-16 bg-black overflow-hidden">
        <div className="max-w-5xl">
          {/* Big display headline */}
          <motion.div
            initial="hidden"
            animate="show"
            className="space-y-0 leading-none select-none"
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="text-[clamp(4rem,12vw,9rem)] font-bold tracking-tight text-white leading-[0.9]"
            >
              Made
            </motion.p>
            <motion.p
              custom={1}
              variants={fadeUp}
              className="text-[clamp(4rem,12vw,9rem)] font-bold tracking-tight text-white leading-[0.9]"
            >
              with
            </motion.p>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-[clamp(4rem,12vw,9rem)] font-bold italic tracking-tight text-white leading-[0.9] underline decoration-[0.04em] underline-offset-[0.1em]"
            >
              gravity.
            </motion.p>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-10 text-sm text-white/40 max-w-xs leading-relaxed"
          >
            Unmatched power and stability through cutting-edge tools. Built for
            performance. Built to last.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-10 flex items-center gap-4"
          >
            <Link
              href="/download"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
              data-testid="button-download-hero"
            >
              Download
            </Link>
            <button
              onClick={downloadIcon}
              className="inline-flex items-center justify-center px-6 py-3 border border-white/20 text-white text-sm font-medium hover:border-white/50 hover:bg-white/5 transition-all"
              data-testid="button-download-icon"
            >
              Get Icon
            </button>
          </motion.div>
        </div>

        {/* SCROLL hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.25em] uppercase text-white/20"
        >
          SCROLL
        </motion.p>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" className="px-8 md:px-16 py-20 bg-black border-t border-white/[0.06]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] tracking-[0.25em] uppercase text-white/30 mb-3">EXPLORE</p>
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">Products</h2>
            <span className="hidden md:flex items-center justify-center border border-white/20 text-white text-xs px-4 py-2 hover:bg-white/5 cursor-pointer transition-colors">
              Software
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Product card — main */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#0d0d0d] border border-white/[0.06] overflow-hidden group"
            data-testid="card-product-gravity-windows"
          >
            <div className="aspect-video relative overflow-hidden bg-[#111] flex items-center justify-center">
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 absolute top-3 left-3 bg-black/60 px-2 py-1">
                WINDOWS
              </span>
              <img
                src={`${basePath}/logo.svg`}
                alt="Gravity Windows"
                className="w-24 h-24 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-500"
              />
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-white mb-1.5">Gravity Windows</h3>
              <p className="text-xs text-white/40 leading-relaxed mb-5">
                Experience unmatched performance with our cutting-edge Windows client. Built
                for speed and reliability.
              </p>
              <Link
                href="/download"
                className="text-xs text-white hover:text-white/70 transition-colors"
                data-testid="link-download-gravity-windows"
              >
                Download
              </Link>
            </div>
          </motion.div>

          {/* Product card — coming soon 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#0d0d0d] border border-white/[0.06] overflow-hidden"
            data-testid="card-product-gravity-lite"
          >
            <div className="aspect-video bg-[#0a0a14] flex items-center justify-center relative">
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 absolute top-3 left-3 bg-black/60 px-2 py-1">
                WINDOWS
              </span>
              <p className="text-3xl font-bold italic text-white/10 text-center leading-tight px-4">
                COMING<br />SOON
              </p>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-white mb-1.5">Gravity Lite (coming soon)</h3>
              <p className="text-xs text-white/30 leading-relaxed mb-5">Coming soon.</p>
              <span className="text-xs text-white/20">Download</span>
            </div>
          </motion.div>

          {/* Product card — coming soon 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#0d0d0d] border border-white/[0.06] overflow-hidden"
            data-testid="card-product-gravity-pro"
          >
            <div className="aspect-video bg-[#0a0a14] flex items-center justify-center relative">
              <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 absolute top-3 left-3 bg-black/60 px-2 py-1">
                WINDOWS
              </span>
              <p className="text-3xl font-bold italic text-white/10 text-center leading-tight px-4">
                COMING<br />SOON
              </p>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-white mb-1.5">Gravity Pro (coming soon)</h3>
              <p className="text-xs text-white/30 leading-relaxed mb-5">Coming soon.</p>
              <span className="text-xs text-white/20">Download</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="px-8 md:px-16 py-24 bg-black border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[10px] tracking-[0.25em] uppercase text-white/30 mb-4">PERFORMANCE</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Built from the ground up.
            </h2>
            <p className="text-sm text-white/40 leading-relaxed">
              Gravity consumes minimal system resources while delivering an expansive suite of tools. 
              Every line of code written with one goal: speed.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="aspect-video bg-[#0d0d0d] border border-white/[0.06] flex items-center justify-center"
          >
            <img src={`${basePath}/logo.svg`} alt="Gravity" className="w-28 h-28 object-contain opacity-30" />
          </motion.div>
        </div>
      </section>

      {/* ── PRECISION STATEMENT ── */}
      <section className="px-8 md:px-16 py-24 bg-black border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 md:order-1 aspect-video bg-[#0d0d0d] border border-white/[0.06] flex items-center justify-center"
          >
            <p className="text-5xl font-bold italic text-white/5 text-center">
              GRAVITY
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-1 md:order-2"
          >
            <p className="text-[10px] tracking-[0.25em] uppercase text-white/30 mb-4">DESIGN</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              Precision at every pixel.
            </h2>
            <p className="text-sm text-white/40 leading-relaxed">
              A visually refined interface built for focus. No distractions — just clean, 
              deliberate design that gets out of your way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-8 md:px-16 py-32 bg-black border-t border-white/[0.06]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <h2 className="text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.9] text-white mb-10">
            Ready to<br />
            <span className="italic">launch.</span>
          </h2>
          <Link
            href="/download"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
            data-testid="button-cta-download"
          >
            Download Gravity
          </Link>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="px-8 md:px-16 py-8 border-t border-white/[0.06]">
        <div className="flex items-center justify-between">
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/20">GRAVITY</span>
          <p className="text-xs text-white/20">© {new Date().getFullYear()} Gravity. All rights reserved.</p>
        </div>
      </footer>
    </Layout>
  );
}
