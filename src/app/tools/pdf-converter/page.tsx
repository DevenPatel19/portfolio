"use client";

import { useState } from "react";
import NextImage from "next/image";           // ← renamed to NextImage
import ToolLayout from "@/app/components/ToolLayout";
import jsPDF from "jspdf";
import * as mammoth from "mammoth";

export default function PdfConverterPage() {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [documentText, setDocumentText] = useState<string>("");
  const [conversionType, setConversionType] = useState<"text" | "image" | "document">("text");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDocumentFile(file);
    setDocumentText("");

    const ext = file.name.split(".").pop()?.toLowerCase();
    try {
      if (ext === "txt") {
        const textContent = await file.text();
        setDocumentText(textContent);
      } else if (ext === "docx") {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        setDocumentText(result.value);
      } else {
        setDocumentText("");
        alert(
          `File type .${ext} is not fully supported.\nPlease use .txt or .docx, or copy the content manually into the &quot;Text&quot; tab.`
        );
      }
    } catch (err) {
      console.error(err);
      setDocumentText("");
      alert("Failed to extract text from the document.");
    }
  };

  const convertTextToPDF = () => {
    if (!text.trim()) {
      alert("Please enter some text.");
      return;
    }
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(text, 170);
    doc.text(lines, 20, 20);
    doc.save("document.pdf");
  };

  const convertImageToPDF = async () => {
    if (!imagePreview) {
      alert("Please upload an image.");
      return;
    }
    // Use the browser's Image constructor (not shadowed now)
    const img = new Image();
    img.src = imagePreview;
    await new Promise((resolve) => (img.onload = resolve));
    const doc = new jsPDF({
      orientation: img.width > img.height ? "landscape" : "portrait",
      unit: "px",
      format: [img.width, img.height],
    });
    doc.addImage(imagePreview, "JPEG", 0, 0, img.width, img.height);
    doc.save("image.pdf");
  };

  const convertDocumentToPDF = () => {
    if (!documentText.trim()) {
      alert("No text extracted from the document. Please upload a valid .txt or .docx file.");
      return;
    }
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(documentText, 170);
    doc.text(lines, 20, 20);
    doc.save("converted.pdf");
  };

  const handleConvert = () => {
    if (conversionType === "text") convertTextToPDF();
    else if (conversionType === "image") convertImageToPDF();
    else convertDocumentToPDF();
  };

  return (
    <ToolLayout title="PDF Converter" description="Convert text, images, or documents (.txt, .docx) to PDF." icon="📄">
      <div className="space-y-5">
        <div className="flex gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-3">
          {(["text", "image", "document"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setConversionType(type)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition ${
                conversionType === type
                  ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                  : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              }`}
            >
              {type === "text" ? "Text" : type === "image" ? "Image" : "Document"}
            </button>
          ))}
        </div>

        {conversionType === "text" && (
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Text Content</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              className="w-full rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-3 py-2 font-mono text-sm"
              placeholder="Enter text to convert to PDF..."
            />
          </div>
        )}

        {conversionType === "image" && (
          <>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-sm text-neutral-700 dark:text-neutral-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-neutral-900 file:text-white dark:file:bg-white dark:file:text-neutral-900 hover:file:bg-neutral-800 dark:hover:file:bg-neutral-100"
              />
            </div>
            {imagePreview && (
              <div className="mt-2">
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Preview:</p>
                <div className="relative max-h-48 w-auto rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                  <NextImage
                    src={imagePreview}
                    alt="Preview"
                    width={400}
                    height={300}
                    className="object-contain"
                    unoptimized
                  />
                </div>
              </div>
            )}
          </>
        )}

        {conversionType === "document" && (
          <>
            <div>
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Upload Document (.txt, .docx)
              </label>
              <input
                type="file"
                accept=".txt,.docx,.rtf,.doc,.odt"
                onChange={handleDocumentUpload}
                className="w-full text-sm text-neutral-700 dark:text-neutral-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-neutral-900 file:text-white dark:file:bg-white dark:file:text-neutral-900 hover:file:bg-neutral-800 dark:hover:file:bg-neutral-100"
              />
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                ⚠️ For best results, use .txt or .docx. .rtf, .doc, .odt are not fully supported.
              </p>
            </div>
            {documentFile && (
              <div className="rounded-lg bg-neutral-100 dark:bg-neutral-800 p-3">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Loaded: {documentFile.name}</p>
                {documentText ? (
                  <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                    ✓ Extracted {documentText.length} characters. Click &quot;Convert to PDF&quot; below.
                  </p>
                ) : (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-1">✗ Failed to extract text. Try a .txt or .docx file.</p>
                )}
              </div>
            )}
          </>
        )}

        <button
          onClick={handleConvert}
          className="w-full rounded-lg bg-neutral-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition"
        >
          Convert to PDF
        </button>
      </div>
    </ToolLayout>
  );
}