import { useGetRelease, getGetReleaseQueryKey } from "@workspace/api-client-react";
import { Download } from "lucide-react";
import { Layout } from "@/components/layout";
import { GalaxyBackground } from "@/components/galaxy-background";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function DownloadPage() {
  const { data: release, isLoading } = useGetRelease({
    query: {
      enabled: true,
      queryKey: getGetReleaseQueryKey()
    }
  });

  const handleDownload = () => {
    if (release?.updated) {
      window.location.href = "/api/release/download";
    }
  };

  return (
    <Layout>
      <GalaxyBackground />
      <div className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 relative z-10 flex flex-col items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-10 flex flex-col items-center text-center shadow-2xl"
        >
          <div className="w-24 h-24 mb-8 relative rounded-full flex items-center justify-center bg-purple-900/20 border border-purple-500/30">
            <img src={`${import.meta.env.BASE_URL.replace(/\/$/, "")}/logo.svg`} alt="Gravity Logo" className="w-16 h-16 animate-[float_6s_ease-in-out_infinite]" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white mb-4">
            Download Gravity
          </h1>
          
          {isLoading ? (
            <div className="h-24 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-purple-500 animate-spin"></div>
            </div>
          ) : (
            <div className="space-y-8 w-full max-w-md">
              <div className="flex flex-col gap-2 p-6 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-purple-200/60">Version</span>
                  <span className="text-white font-medium">{release?.version || "Unknown"}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-purple-200/60">Status</span>
                  {release?.updated ? (
                    <span className="text-green-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                      Available
                    </span>
                  ) : (
                    <span className="text-red-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-400"></span>
                      Not available yet
                    </span>
                  )}
                </div>
                {release?.updatedAt && (
                  <div className="flex justify-between items-center text-sm mt-2 pt-2 border-t border-white/5">
                    <span className="text-purple-200/60">Last Updated</span>
                    <span className="text-white/80">{new Date(release.updatedAt).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              <Button 
                onClick={handleDownload}
                disabled={!release?.updated}
                className={`w-full h-14 text-lg font-medium transition-all duration-300 ${
                  release?.updated 
                    ? "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_40px_rgba(147,51,234,0.5)]" 
                    : "bg-white/5 text-white/40 cursor-not-allowed"
                }`}
              >
                <Download className="mr-2 h-5 w-5" />
                {release?.updated ? "Download for Windows" : "Not Available"}
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
