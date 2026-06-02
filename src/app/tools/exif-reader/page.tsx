"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";
import exifr from "exifr";

export default function ExifReaderPage() {
  const [exif, setExif] = useState<any>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const data = await exifr.parse(file);
      setExif(data);
    }
  };

  return (
    <ToolLayout title="EXIF Reader" description="Extract metadata from images." icon="📷">
      <div className="space-y-4">
        <input type="file" accept="image/jpeg" onChange={handleFile} />
        {exif && <pre className="p-3 border rounded text-xs overflow-auto">{JSON.stringify(exif, null, 2)}</pre>}
      </div>
    </ToolLayout>
  );
}