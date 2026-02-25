import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share2, X } from "lucide-react";
import { toast } from "sonner";

interface ShareDialogProps {
  fileId: string;
  userId: string;
  onClose: () => void;
}

const ShareDialog = ({ fileId, userId, onClose }: ShareDialogProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Look up user by email via profiles
      const { data: profiles, error: lookupErr } = await supabase
        .from("profiles")
        .select("user_id")
        .eq("display_name", email)
        .limit(1);

      // If not found by display_name, we can't share (we don't have access to auth.users emails)
      // Instead, just inform the user
      if (lookupErr || !profiles?.length) {
        toast.error("User not found. They need to have an account first.");
        setLoading(false);
        return;
      }

      const targetUserId = profiles[0].user_id;
      if (targetUserId === userId) {
        toast.error("You can't share a file with yourself");
        setLoading(false);
        return;
      }

      const { error } = await supabase.from("file_shares").insert({
        file_id: fileId,
        shared_by: userId,
        shared_with: targetUserId,
        permission: "view",
      });

      if (error) throw error;
      toast.success("File shared successfully");
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md mx-4 shadow-cyber" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Share File</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <form onSubmit={handleShare} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-foreground">User display name</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter user's display name"
              required
              className="bg-secondary border-border"
            />
            <p className="text-xs text-muted-foreground">
              The recipient must have an account to receive shared files (V1 mitigation — identity verification).
            </p>
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Sharing..." : "Share File"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ShareDialog;
