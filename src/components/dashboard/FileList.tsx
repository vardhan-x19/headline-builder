import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { FileText, Download, Trash2, Share2, Globe, Lock } from "lucide-react";
import { toast } from "sonner";
import ShareDialog from "./ShareDialog";

interface FileRecord {
  id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  file_type: string;
  is_public: boolean;
  created_at: string;
}

interface FileListProps {
  userId: string;
}

const FileList = ({ userId }: FileListProps) => {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [shareFileId, setShareFileId] = useState<string | null>(null);

  const fetchFiles = async () => {
    const { data, error } = await supabase
      .from("files")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) toast.error(error.message);
    else setFiles(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchFiles(); }, [userId]);

  const handleDownload = async (file: FileRecord) => {
    const { data, error } = await supabase.storage.from("uploads").createSignedUrl(file.file_path, 60);
    if (error) { toast.error(error.message); return; }
    window.open(data.signedUrl, "_blank");
  };

  const handleDelete = async (file: FileRecord) => {
    const { error: storageErr } = await supabase.storage.from("uploads").remove([file.file_path]);
    if (storageErr) { toast.error(storageErr.message); return; }

    const { error: dbErr } = await supabase.from("files").delete().eq("id", file.id);
    if (dbErr) { toast.error(dbErr.message); return; }

    toast.success("File deleted");
    fetchFiles();
  };

  const togglePublic = async (file: FileRecord) => {
    const { error } = await supabase.from("files").update({ is_public: !file.is_public }).eq("id", file.id);
    if (error) toast.error(error.message);
    else {
      toast.success(file.is_public ? "File set to private" : "File set to public");
      fetchFiles();
    }
  };

  if (loading) return <div className="text-center text-muted-foreground font-mono py-12">Loading files...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">My Files</h2>
        <p className="text-muted-foreground text-sm mt-1">Manage your securely uploaded files</p>
      </div>

      {files.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-foreground font-medium">No files uploaded yet</p>
          <p className="text-muted-foreground text-sm mt-1">Upload your first file to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {files.map((file) => (
            <div key={file.id} className="bg-card border border-border rounded-lg p-4 flex items-center gap-4 hover:border-glow transition-all">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-foreground font-medium text-sm truncate">{file.file_name}</p>
                <p className="text-xs text-muted-foreground font-mono">
                  {(file.file_size / 1024).toFixed(1)} KB • {new Date(file.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={() => togglePublic(file)} title={file.is_public ? "Make private" : "Make public"}>
                  {file.is_public ? <Globe className="w-4 h-4 text-accent" /> : <Lock className="w-4 h-4 text-muted-foreground" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setShareFileId(file.id)}>
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDownload(file)}>
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(file)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {shareFileId && (
        <ShareDialog
          fileId={shareFileId}
          userId={userId}
          onClose={() => setShareFileId(null)}
        />
      )}
    </div>
  );
};

export default FileList;
