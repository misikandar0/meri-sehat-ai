import { NextRequest, NextResponse } from 'next/server';
import { getAiProvider } from '@/lib/ai/aiProvider';
import { generateStructuredReport } from '@/lib/clinical/rulesEngine';
import { ReportSubmissionSchema } from '@/lib/schema';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // If direct manual/confirmed biomarkers are submitted
    if (body.biomarkers && Array.isArray(body.biomarkers)) {
      const parsed = ReportSubmissionSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: 'Invalid submission data', details: parsed.error.format() },
          { status: 400 }
        );
      }

      const report = generateStructuredReport(
        parsed.data.biomarkers,
        parsed.data.patientContext,
        parsed.data.sourceFileName,
        parsed.data.laboratoryName
      );

      return NextResponse.json({ success: true, report });
    }

    // If an uploaded document is submitted for AI / OCR extraction
    const provider = getAiProvider();
    const extractionResult = await provider.extractBloodReport({
      fileName: body.fileName || 'Report.pdf',
      mimeType: body.mimeType || 'application/pdf',
      fileBase64: body.fileBase64,
      patientContext: body.patientContext,
    });

    return NextResponse.json({
      success: true,
      extractedData: extractionResult.rawExtractedData,
      laboratoryName: extractionResult.laboratoryName,
      extractionConfidence: extractionResult.extractionConfidence,
      warnings: extractionResult.warnings || [],
    });
  } catch (error: any) {
    console.error('Error processing blood report analysis:', error);
    return NextResponse.json(
      { error: 'Failed to process document', message: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
