export interface SubscriptionPlan {
  id: 'free' | 'plus' | 'professional';
  name: string;
  monthlyPkr: number;
  annualPkr: number;
  monthlyUsd: number;
  features: string[];
  recommended?: boolean;
}

export const PRICING_PLANS: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free Patient Access',
    monthlyPkr: 0,
    annualPkr: 0,
    monthlyUsd: 0,
    features: [
      'Basic Complete Blood Count (CBC) interpretation',
      'Plain-language biomarker explanations',
      'English, Urdu, and Roman Urdu language toggles',
      'Immediate Emergency & Safety escalation banners',
      'Interactive Body-System visualizer',
      'Sample report exploration',
    ],
  },
  {
    id: 'plus',
    name: 'Plus (Individual & Family)',
    monthlyPkr: 1499,
    annualPkr: 14990,
    monthlyUsd: 5.99,
    recommended: true,
    features: [
      'All Free Plan features included',
      'Unlimited laboratory report interpretations',
      'Prescription Explainer with drug interactions',
      'Historical Trend & Two-Report Comparison tool',
      'Downloadable high-resolution PDF educational summaries',
      'Verified Pakistani Doctor Directory with direct contact links',
      'Secure report history with one-click zero-trace deletion',
    ],
  },
  {
    id: 'professional',
    name: 'Professional & Clinic',
    monthlyPkr: 6999,
    annualPkr: 69990,
    monthlyUsd: 24.99,
    features: [
      'All Plus Plan features included',
      'Multi-patient report batch interpretation workflow',
      'Clinical reference citations with evidence grades',
      'Custom clinic branding on patient PDF summaries',
      'Role-based staff access and audit trail export',
      'Priority OCR document processing pipeline',
    ],
  },
];

export interface PaymentCheckoutRequest {
  planId: 'free' | 'plus' | 'professional';
  billingInterval: 'monthly' | 'annual';
  customerEmail: string;
  customerName: string;
  provider: 'mock_test_mode' | 'stripe' | 'jazzcash_easypaisa';
}

export interface PaymentCheckoutResponse {
  success: boolean;
  transactionId: string;
  checkoutUrl?: string;
  status: 'completed' | 'pending' | 'failed';
  message: string;
}

/**
 * Abstract Payment Service Interface
 */
export interface PaymentGateway {
  name: string;
  isTestMode(): boolean;
  createCheckoutSession(req: PaymentCheckoutRequest): Promise<PaymentCheckoutResponse>;
  verifyWebhookSignature(payload: string, signature: string): boolean;
}

/**
 * Mock & Test Mode Payment Gateway for safe, zero-cost demonstration and automated testing.
 */
export class MockPaymentGateway implements PaymentGateway {
  name = 'Meri Sehat Safe Test Simulator (JazzCash/Stripe Sandbox)';

  isTestMode(): boolean {
    return true;
  }

  async createCheckoutSession(req: PaymentCheckoutRequest): Promise<PaymentCheckoutResponse> {
    // In test mode, simulate instant transaction authorization
    return {
      success: true,
      transactionId: `tx_mock_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      checkoutUrl: `/dashboard?payment_success=true&plan=${req.planId}`,
      status: 'completed',
      message: 'Test mode transaction authorized successfully. No real money was charged.',
    };
  }

  verifyWebhookSignature(payload: string, signature: string): boolean {
    return signature === 'test_mode_valid_signature';
  }
}

export function getPaymentGateway(): PaymentGateway {
  return new MockPaymentGateway();
}
