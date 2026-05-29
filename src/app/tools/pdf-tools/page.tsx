"use client";

import { useState } from "react";
import ToolLayout from "@/app/components/ToolLayout";
import { PDFDocument } from "pdf-lib";

export default function PdfToolsPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [splitPageNum, setSplitPageNum] = useState<number>(1);
  const [operation, setOperation] = useState<"merge" | "split" | "compress">("merge");
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const mergePDFs = async () => {
  if (files.length < 2) {
    alert("Please select at least 2 PDF files to merge.");
    return;
  }
  setLoading(true);
  try {
    const mergedPdf = await PDFDocument.create();
    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    }
    const pdfBytes = await mergedPdf.save();
    const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" }); // ✅ Fixed
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "merged.pdf";
    link.click();
    URL.revokeObjectURL(link.href);
  } catch (err) {
    alert("Error merging PDFs: " + (err as Error).message);
  }
  setLoading(false);
};
  const splitPDF = async () => {
    if (files.length !== 1) {
      alert("Please select exactly 1 PDF file to split.");
      return;
    }
    setLoading(true);
    try {
      const arrayBuffer = await files[0].arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const totalPages = pdf.getPageCount();
      if (splitPageNum < 1 || splitPageNum >= totalPages) {
        alert(`Page number must be between 1 and ${totalPages - 1}`);
        setLoading(false);
        return;
      }

      // First part: pages 1 to splitPageNum
      const firstDoc = await PDFDocument.create();
      const firstPages = await firstDoc.copyPages(pdf, pdf.getPageIndices().slice(0, splitPageNum));
      firstPages.forEach((p) => firstDoc.addPage(p));
      const firstBytes = await firstDoc.save();
      const firstBlob = new Blob([new Uint8Array(firstBytes)], { type: "application/pdf" }); // ✅ Fixed
      const firstLink = document.createElement("a");
      firstLink.href = URL.createObjectURL(firstBlob);
      firstLink.download = `split_part1_pages1-${splitPageNum}.pdf`;
      firstLink.click();

      // Second part: pages splitPageNum+1 to end
      const secondDoc = await PDFDocument.create();
      const secondPages = await secondDoc.copyPages(pdf, pdf.getPageIndices().slice(splitPageNum));
      secondPages.forEach((p) => secondDoc.addPage(p));
      const secondBytes = await secondDoc.save();
      const secondBlob = new Blob([new Uint8Array(secondBytes)], { type: "application/pdf" }); // ✅ Fixed
      const secondLink = document.createElement("a");
      secondLink.href = URL.createObjectURL(secondBlob);
      secondLink.download = `split_part2_pages${splitPageNum+1}-${totalPages}.pdf`;
      secondLink.click();

      URL.revokeObjectURL(firstLink.href);
      URL.revokeObjectURL(secondLink.href);
    } catch (err) {
      alert("Error splitting PDF: " + (err as Error).message);
    }
    setLoading(false);
  };

  const compressPDF = async () => {
    if (files.length !== 1) {
      alert("Please select exactly 1 PDF file to compress.");
      return;
    }
    setLoading(true);
    try {
      const arrayBuffer = await files[0].arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      // Re-saving with default options often reduces size
      const compressedBytes = await pdf.save();
       const blob = new Blob([new Uint8Array(compressedBytes)], { type: "application/pdf" }); // ✅ Fixed
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "compressed.pdf";
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (err) {
      alert("Error compressing PDF: " + (err as Error).message);
    }
    setLoading(false);
  };

  const handleOperation = () => {
    if (operation === "merge") mergePDFs();
    else if (operation === "split") splitPDF();
    else compressPDF();
  };

  return (
    <ToolLayout title="PDF Tools" description="Merge, split, or compress PDF files in your browser." icon="🔧">
      <div className="space-y-5">
        <div className="flex gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-3">
          {(["merge", "split", "compress"] as const).map((op) => (
            <button
              key={op}
              onClick={() => setOperation(op)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition ${
                operation === op
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              {op}
            </button>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
            {operation === "merge" ? "Select PDF files (2+)" : "Select a PDF file"}
          </label>
          <input
            type="file"
            accept=".pdf"
            multiple={operation === "merge"}
            onChange={handleFileUpload}
            className="w-full text-sm text-neutral-700 dark:text-neutral-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-neutral-900 file:text-white dark:file:bg-white dark:file:text-neutral-900 hover:file:bg-neutral-800 dark:hover:file:bg-neutral-100"
          />
          {files.length > 0 && (
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              {files.length} file(s) selected
            </p>
          )}
        </div>

        {operation === "split" && (
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Split after page number
            </label>
            <input
              type="number"
              min={1}
              value={splitPageNum}
              onChange={(e) => setSplitPageNum(parseInt(e.target.value))}
              className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 text-sm"
            />
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Creates two PDFs: pages 1–{splitPageNum} and {splitPageNum+1}–end.
            </p>
          </div>
        )}

        <button
          onClick={handleOperation}
          disabled={loading || files.length === 0}
          className="w-full rounded-lg bg-neutral-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : `Perform ${operation}`}
        </button>
      </div>
    </ToolLayout>
  );
}