import { NextRequest, NextResponse } from 'next/server';
import { getAiProvider } from '@/lib/ai/aiProvider';
import { generatePrescriptionAnalysis } from '@/lib/clinical/prescriptionEngine';
import { PrescriptionSubmissionSchema } from '@/lib/schema';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.medicines && Array.isArray(body.medicines)) {
      const parsed = PrescriptionSubmissionSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: 'Invalid prescription submission', details: parsed.error.format() },
          { status: 400 }
        );
      }

      const analysis = generatePrescriptionAnalysis(parsed.data.medicines);
      return NextResponse.json({ success: true, analysis });
    }

    const provider = getAiProvider();
    const result = await provider.explainPrescription({
      fileName: body.fileName || 'Prescription.jpg',
      mimeType: body.mimeType || 'image/jpeg',
      fileBase64: body.fileBase64,
    });

    return NextResponse.json({
      success: true,
      rawMedicines: result.rawMedicines,
      doctorNotes: result.doctorNotes,
      extractionConfidence: result.extractionConfidence,
    });
  } catch (error: any) {
    console.error('Error processing prescription:', error);
    return NextResponse.json(
      { error: 'Failed to process prescription', message: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
