import { useCallback, useRef, useState } from 'react';

import { profileApi } from '@/common/api/profile';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';

interface AvatarUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentInitials: string;
}

export const AvatarUploadDialog = ({
  open,
  onOpenChange,
  currentInitials,
}: AvatarUploadDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreview(url);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleFile(selectedFile);
  };

  const handleSave = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      const response = await profileApi.uploadAvatar(file);
      if (response.success) {
        toast.success('Avatar updated successfully');
        onOpenChange(false);
      } else {
        toast.error('Failed to upload avatar', { description: response.error });
      }
    } catch (error) {
      const apiError = error as { error?: string };
      toast.error('Failed to upload avatar', {
        description: apiError.error || 'Something went wrong',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      setFile(null);
      if (preview) URL.revokeObjectURL(preview);
      setPreview(null);
    }
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={false} className="max-w-[480px] gap-6 rounded-3xl p-8">
        <DialogHeader className="gap-2">
          <DialogTitle className="text-[22px] leading-7 tracking-[-0.02em]">
            Upload Avatar
          </DialogTitle>
          <DialogDescription>Choose a photo to use as your profile picture.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-5">
          <Avatar className="size-40 border-[3px] border-border">
            <AvatarImage src={preview ?? undefined} alt="Preview" />
            <AvatarFallback className="bg-[#D4D4D8] text-[48px] font-semibold text-muted-foreground">
              {currentInitials}
            </AvatarFallback>
          </Avatar>

          <div
            role="button"
            tabIndex={0}
            className={`flex w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed px-6 py-3 text-sm text-muted-foreground transition-colors ${
              isDragging
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click();
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            Drop an image here or click to browse
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="outline"
            className="rounded-xl px-5 py-2.5 text-sm"
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            className="rounded-xl px-5 py-2.5 text-sm"
            disabled={!file || isUploading}
            onClick={handleSave}
          >
            {isUploading ? (
              <>
                <Spinner className="mr-2 size-4" />
                Uploading...
              </>
            ) : (
              'Save Avatar'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
