import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Upload, FileWarning, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

const ALLOWED_TYPES = [
  "image/jpeg", "image/png", "image/gif", "image/webp",
  "application/pdf", "text/plain", "text/csv",
  "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

interface FileUploadProps {
  userId: string;
  onUploadComplete: () => void;
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
}

const validateFile = (file: File): ValidationResult => {
  const errors: string[] = [];
  if (!ALLOWED_TYPES.includes(file.type)) {
    errors.push(`File type "${file.type || "unknown"}" is not allowed (V3 mitigation)`);
  }
  if (file.size > MAX_SIZE) {
    errors.push(`File exceeds 10MB limit (V3 mitigation)`);
  }
  if (file.name.includes("..") || file.name.includes("/")) {
    errors.push(`Invalid file name detected (V4 mitigation)`);
  }
  return { valid: errors.length === 0, errors };
};

const FileUpload = ({ userId, onUploadComplete }: FileUploadProps) => {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const result = validateFile(file);
    setValidation(result);
    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile || !validation?.valid) return;
    setUploading(true);
    setProgress(10);

    try {
      const ext = selectedFile.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${ext}`;
      const filePath = `${userId}/${fileName}`;

      setProgress(30);

      const { error: storageError } = await supabase.storage
        .from("uploads")
        .upload(filePath, selectedFile);

      if (storageError) throw storageError;
      setProgress(70);

      const { error: dbError } = await supabase.from("files").insert({
        user_id: userId,
        file_name: selectedFile.name,
        file_path: filePath,
        file_size: selectedFile.size,
        file_type: selectedFile.type,
        upload_status: "completed",
      });

      if (dbError) throw dbError;
      setProgress(100);

      toast.success("File uploaded securely");
      setTimeout(() => {
        setSelectedFile(null);
        setValidation(null);
        setProgress(0);
        onUploadComplete();
      }, 1000);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Secure File Upload</h2>
        <p className="text-muted-foreground text-sm mt-1">
          Files are validated for type & size before upload (V3 mitigation). Paths are sandboxed per-user (V4/V5 mitigation).
        </p>
      </div>

      {/* Security checks display */}
      <div className="grid grid-cols-3 gap-3">
        {["File Type Check (V3)", "Size Limit (V3)", "Path Isolation (V4/V5)"].map((check) => (
          <div key={check} className="bg-card border border-border rounded-lg p-3 text-center">
            <CheckCircle2 className="w-4 h-4 text-accent mx-auto mb-1" />
            <span className="text-xs font-mono text-muted-foreground">{check}</span>
          </div>
        ))}
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
          dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
        }`}
      >
        <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-foreground font-medium">Drop a file or click to browse</p>
        <p className="text-xs text-muted-foreground mt-1">
          Allowed: Images, PDF, TXT, CSV, DOC/DOCX • Max 10MB
        </p>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={ALLOWED_TYPES.join(",")}
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </div>

      {/* Validation results */}
      {validation && selectedFile && (
        <div className={`rounded-xl border p-4 ${validation.valid ? "border-accent bg-accent/5" : "border-destructive bg-destructive/5"}`}>
          <div className="flex items-start gap-3">
            {validation.valid ? (
              <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            ) : (
              <FileWarning className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className="font-medium text-foreground text-sm">{selectedFile.name}</p>
              <p className="text-xs text-muted-foreground">
                {(selectedFile.size / 1024).toFixed(1)} KB • {selectedFile.type || "unknown type"}
              </p>
              {!validation.valid && (
                <ul className="mt-2 space-y-1">
                  {validation.errors.map((err) => (
                    <li key={err} className="flex items-center gap-1 text-xs text-destructive">
                      <XCircle className="w-3 h-3" /> {err}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Upload progress */}
      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground font-mono text-center">{progress}% — Uploading securely...</p>
        </div>
      )}

      {/* Upload button */}
      {selectedFile && validation?.valid && (
        <Button onClick={handleUpload} disabled={uploading} className="w-full">
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? "Uploading..." : "Upload Securely"}
        </Button>
      )}
    </div>
  );
};

export default FileUpload;
