'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, X, Shield, RefreshCw, FileUp, Sparkles } from 'lucide-react';
import { MAX_FILE_SIZE_BYTES, SupportedMimeTypes } from '@/lib/schema';
import { useLanguage } from '@/lib/i18n/LanguageContext';

interface UploadDropzoneProps {
  onFileProcessed: (fileData: { name: string; size: number; mimeType: string; base64?: string }) => void;
  onUseSampleDemo: () => void;
  isProcessing: boolean;
  processingStage?: string;
  documentTypeLabel?: string;
}

export default function UploadDropzone({
  onFileProcessed,
  onUseSampleDemo,
  isProcessing,
  processingStage = 'Analyzing document structure...',
  documentTypeLabel = 'Laboratory Test or Prescription',
}: UploadDropzoneProps) {
  const { language } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const validateAndHandleFile = (file: File) => {
    setErrorMessage(null);

    // Validate size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum allowed limit is 10MB.`);
      return;
    }

    // Validate MIME type
    if (!SupportedMimeTypes.includes(file.type as any)) {
      setErrorMessage(`Unsupported format (${file.type || 'unknown'}). Please upload a PDF, JPG, or PNG document.`);
      return;
    }

    setSelectedFile(file);

    // Convert to base64 for processing
    const reader = new FileReader();
    reader.onload = () => {
      onFileProcessed({
        name: file.name,
        size: file.size,
        mimeType: file.type,
        base64: reader.result as string,
      });
    };
    reader.onerror = () => {
      setErrorMessage('Failed to read file from disk. Please select the file again.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndHandleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Interactive Drop Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !isProcessing && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-10 text-center transition-all cursor-pointer backdrop-blur-xl ${
          isDragOver
            ? 'border-[#56E6F2] bg-[#56E6F2]/10 scale-[1.01] shadow-[0_0_30px_rgba(86,230,242,0.25)]'
            : selectedFile
            ? 'border-[#56E6F2]/80 bg-[#0B1930]/90'
            : 'border-white/15 hover:border-[#56E6F2]/60 bg-[#0B1930]/60 hover:bg-[#0B1930]/85'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,image/png,image/jpeg,image/jpg"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              validateAndHandleFile(e.target.files[0]);
            }
          }}
        />

        {isProcessing ? (
          <div className="py-6 flex flex-col items-center justify-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full border-4 border-[#112240] border-t-[#56E6F2] animate-spin" />
              <Shield className="w-7 h-7 text-[#56E6F2] absolute inset-0 m-auto" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#F7FAFF]">{processingStage}</p>
              <p className="text-xs text-[#8FA2BD] mt-1 max-w-sm">
                Optical recognition, reference range mapping, and clinical safety checks in progress...
              </p>
            </div>
          </div>
        ) : selectedFile ? (
          <div className="py-3 flex flex-col items-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#56E6F2]/20 border border-[#56E6F2]/40 text-[#56E6F2] flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#F7FAFF]">{selectedFile.name}</p>
              <p className="text-xs text-[#8FA2BD]">
                {(selectedFile.size / 1024).toFixed(1)} KB • {selectedFile.type || 'Document'}
              </p>
            </div>
            <div className="flex items-center gap-3 mt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/20 text-[#8FA2BD] hover:text-white hover:bg-white/10 flex items-center gap-1 transition-colors"
              >
                <X className="w-3.5 h-3.5" /> Remove
              </button>
              <span className="text-xs text-[#56E6F2] font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ready for verification
              </span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#112240] to-[#0B1930] border border-[#56E6F2]/30 text-[#56E6F2] flex items-center justify-center shadow-lg shadow-[#56E6F2]/10 group-hover:scale-105 transition-transform">
              <UploadCloud className="w-8 h-8" />
            </div>
            <div>
              <p className="text-base sm:text-lg font-bold text-[#F7FAFF]">
                {language === 'ur'
                  ? 'رپورٹ فائل یہاں ڈریگ کریں یا براؤز کریں'
                  : `Drag & drop your ${documentTypeLabel}`}
              </p>
              <p className="text-xs text-[#8FA2BD] mt-1">
                Supports PDF, JPG, PNG up to 10MB • Clear and readable photos work best
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#56E6F2] to-[#38bdf8] text-[#07111F] text-xs font-bold shadow-lg shadow-[#56E6F2]/20 hover:scale-105 transition-all">
              <FileUp className="w-4 h-4 stroke-[2.5]" />
              <span>Select File from Device</span>
            </div>
          </div>
        )}
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Zero Setup Instant Sample Pre-fill Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#0B1930]/60 border border-white/10 text-xs text-[#8FA2BD]">
        <span className="text-[#8FA2BD] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#56E6F2]" />
          <span><strong>Testing without a document?</strong> Use our verified clinical sample report.</span>
        </span>
        <button
          type="button"
          onClick={onUseSampleDemo}
          className="shrink-0 px-4 py-2 rounded-xl bg-[#112240] border border-[#56E6F2]/30 hover:border-[#56E6F2] font-semibold text-[#F7FAFF] hover:text-[#56E6F2] shadow-sm transition-all flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#56E6F2]" />
          <span>Load Fictional CBC Demo</span>
        </button>
      </div>
    </div>
  );
}
