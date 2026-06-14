import { useState, useRef, useEffect } from "react";
import { useGetRelease, getGetReleaseQueryKey, useUpdateRelease } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Layout } from "@/components/layout";
import { GalaxyBackground } from "@/components/galaxy-background";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Upload, Save, CheckCircle } from "lucide-react";

export default function AdminPage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const { data: release, isLoading } = useGetRelease({
    query: {
      enabled: true,
      queryKey: getGetReleaseQueryKey()
    }
  });

  const updateRelease = useUpdateRelease();

  const [version, setVersion] = useState("");
  const [updated, setUpdated] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (release) {
      setVersion(release.version || "");
      setUpdated(release.updated || false);
    }
  }, [release]);

  const handleSaveSettings = () => {
    updateRelease.mutate(
      { data: { version, updated } },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(getGetReleaseQueryKey(), data);
          toast({
            title: "Settings saved",
            description: "Release metadata has been updated successfully.",
          });
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to update release settings.",
            variant: "destructive"
          });
        }
      }
    );
  };

  const handleFileUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/release/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      
      const data = await response.json();
      queryClient.setQueryData(getGetReleaseQueryKey(), data);
      
      toast({
        title: "File uploaded",
        description: "The new .exe file has been uploaded successfully.",
      });
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading the file.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Layout>
      <GalaxyBackground />
      <div className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Admin Control Panel
            </h1>
          </div>

          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-purple-500 animate-spin"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Settings Card */}
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  Release Metadata
                </h2>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="version" className="text-purple-200">Version Label</Label>
                    <Input 
                      id="version"
                      value={version}
                      onChange={(e) => setVersion(e.target.value)}
                      placeholder="e.g. 1.0.0-beta"
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus-visible:ring-purple-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <div className="space-y-0.5">
                      <Label className="text-white text-base">Make Available</Label>
                      <p className="text-xs text-purple-200/60">Allow users to download</p>
                    </div>
                    <Switch 
                      checked={updated}
                      onCheckedChange={setUpdated}
                    />
                  </div>

                  <Button 
                    onClick={handleSaveSettings}
                    disabled={updateRelease.isPending}
                    className="w-full bg-purple-600 hover:bg-purple-500 text-white"
                  >
                    {updateRelease.isPending ? "Saving..." : "Save Settings"}
                    {!updateRelease.isPending && <Save className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Upload Card */}
              <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                  App Binary
                </h2>

                <div className="space-y-6">
                  {release?.fileName && (
                    <div className="flex items-center gap-3 p-4 bg-purple-900/20 border border-purple-500/20 rounded-xl">
                      <CheckCircle className="h-5 w-5 text-purple-400" />
                      <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium text-white truncate">{release.fileName}</p>
                        <p className="text-xs text-purple-200/60">Currently active binary</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div 
                      className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-purple-500/50 hover:bg-white/[0.02] transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                      <p className="text-sm text-purple-200/80 font-medium">
                        {file ? file.name : "Click to select file (.exe, .zip, or any format)"}
                      </p>
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        className="hidden"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                      />
                    </div>

                    <Button 
                      onClick={handleFileUpload}
                      disabled={!file || isUploading}
                      className="w-full bg-white text-black hover:bg-purple-100"
                    >
                      {isUploading ? "Uploading..." : "Upload Binary"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}
