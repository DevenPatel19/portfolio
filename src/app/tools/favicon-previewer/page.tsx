"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";
import NextImage from "next/image";

export default function FaviconPreviewerPage() {
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImgSrc(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <ToolLayout title="Favicon Previewer" description="See how an image looks as a favicon." icon="⭐">
      <div className="space-y-4">
        <input type="file" accept="image/*" onChange={handleUpload} />
        {imgSrc && (
          <div className="flex gap-4 items-center">
            <NextImage src={imgSrc} alt="Preview" width={32} height={32} unoptimized />
            <span>32x32 preview</span>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}