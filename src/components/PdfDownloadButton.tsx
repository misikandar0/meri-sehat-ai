'use client';

import React from 'react';
import { Printer, Download } from 'lucide-react';

interface PdfDownloadButtonProps {
  reportTitle?: string;
}

export default function PdfDownloadButton({ reportTitle = 'Meri_Sehat_Health_Report' }: PdfDownloadButtonProps) {
  const handlePrintOrDownload = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <button
      onClick={handlePrintOrDownload}
      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-all hover:shadow"
      title="Print or Save as PDF"
    >
      <Printer className="w-3.5 h-3.5" />
      <span>Print / Save as PDF</span>
    </button>
  );
}
