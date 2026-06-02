"use client";

import { useState, useEffect } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function BrowserInfoPage() {
  const [info, setInfo] = useState<any>({});

  useEffect(() => {
    setInfo({
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screen: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      pixelRatio: window.devicePixelRatio,
      online: navigator.onLine,
    });
  }, []);

  return (
    <ToolLayout title="Browser Info" description="View detailed browser and device information." icon="🖥️">
      <div className="space-y-2 text-sm">
        <div><strong>User Agent</strong><br />{info.userAgent}</div>
        <div><strong>Language</strong> {info.language}</div>
        <div><strong>Platform</strong> {info.platform}</div>
        <div><strong>Screen Resolution</strong> {info.screen}</div>
        <div><strong>Viewport Size</strong> {info.viewport}</div>
        <div><strong>Device Pixel Ratio</strong> {info.pixelRatio}</div>
        <div><strong>Online</strong> {info.online ? "Yes" : "No"}</div>
      </div>
    </ToolLayout>
  );
}