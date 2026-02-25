import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface SharedFile {
  id: string;
  permission: string;
  created_at: string;
  files: {
    id: string;
    file_name: string;
    file_path: string;
    file_size: number;
    file_type: string;
  } | null;
  profiles: {
    display_name: string | null;
  } | null;
}

interface SharedFilesProps {
  userId: string;
}

const SharedFiles = ({ userId }: SharedFilesProps) => {
  const [sharedWithMe, setSharedWithMe] = useState<SharedFile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from("file_shares")
        .select("id, permission, created_at, files(id, file_name, file_path, file_size, file_type), profiles:shared_by(display_name)")
        .eq("shared_with", userId)
        .order("created_at", { ascending: false });

      if (error) toast.error(error.message);
      else setSharedWithMe((data as any) || []);
      setLoading(false);
    };
    fetch();
  }, [userId]);

  const handleDownload = async (filePath: string) => {
    // For shared files, the owner's path is used. We need a signed URL from an edge function in production.
    // For demo, we show a message.
    toast.info("Shared file download requires the file owner's permission scope.");
  };

  if (loading) return <div className="text-center text-muted-foreground font-mono py-12">Loading...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Shared With Me</h2>
        <p className="text-muted-foreground text-sm mt-1">Files other users have shared with you</p>
      </div>

      {sharedWithMe.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-foreground font-medium">No shared files</p>
          <p className="text-muted-foreground text-sm mt-1">Files shared with you will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sharedWithMe.map((share) => (
            <div key={share.id} className="bg-card border border-border rounded-lg p-4 flex items-center gap-4 hover:border-glow transition-all">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-foreground font-medium text-sm truncate">{share.files?.file_name || "Unknown"}</p>
                <p className="text-xs text-muted-foreground font-mono">
                  From: {share.profiles?.display_name || "Unknown"} • {share.permission} access
                </p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => share.files && handleDownload(share.files.file_path)}>
                <Download className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SharedFiles;
