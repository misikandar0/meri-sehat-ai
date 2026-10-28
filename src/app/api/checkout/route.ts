import { NextRequest, NextResponse } from 'next/server';
import { getPaymentGateway } from '@/lib/payment/paymentService';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const gateway = getPaymentGateway();

    const response = await gateway.createCheckoutSession({
      planId: body.planId || 'plus',
      billingInterval: body.billingInterval || 'monthly',
      customerEmail: body.customerEmail || 'patient@example.com',
      customerName: body.customerName || 'Valued Patient',
      provider: 'mock_test_mode',
    });

    return NextResponse.json(response);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Checkout initiation failed', message: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
