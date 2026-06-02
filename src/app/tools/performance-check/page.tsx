"use client";

import { useState, useEffect } from "react";
import ToolLayout from "@/app/components/ToolLayout";

export default function PerformanceCheckPage() {
  const [metrics, setMetrics] = useState<any>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const perf = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      setMetrics({
        loadTime: perf.loadEventEnd - perf.fetchStart,
        domReady: perf.domContentLoadedEventEnd - perf.fetchStart,
        ttfb: perf.responseStart - perf.requestStart,
      });
    }
  }, []);

  return (
    <ToolLayout title="Page Performance Check" description="Measure this page's loading metrics." icon="⚡">
      <div className="space-y-2">
        <div className="flex justify-between"><span>Time to Load</span><span className="font-mono">{metrics.loadTime} ms</span></div>
        <div className="flex justify-between"><span>DOM Ready</span><span className="font-mono">{metrics.domReady} ms</span></div>
        <div className="flex justify-between"><span>Time to First Byte</span><span className="font-mono">{metrics.ttfb} ms</span></div>
      </div>
    </ToolLayout>
  );
}