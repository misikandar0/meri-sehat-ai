import { HealthReport, PrescriptionAnalysis } from '../types';
import { FICTIONAL_SAMPLE_REPORT, FICTIONAL_HISTORICAL_REPORT } from '../mockData/sampleReport';

const STORAGE_KEY_REPORTS = 'meri_sehat_reports_v1';
const STORAGE_KEY_PRESCRIPTIONS = 'meri_sehat_rx_v1';

export const reportStore = {
  // Get all saved health reports
  getAllReports(): HealthReport[] {
    if (typeof window === 'undefined') {
      return [FICTIONAL_SAMPLE_REPORT, FICTIONAL_HISTORICAL_REPORT];
    }
    try {
      const data = localStorage.getItem(STORAGE_KEY_REPORTS);
      if (!data) {
        // Initialize with sample reports
        const initial = [FICTIONAL_SAMPLE_REPORT, FICTIONAL_HISTORICAL_REPORT];
        localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(initial));
        return initial;
      }
      return JSON.parse(data);
    } catch {
      return [FICTIONAL_SAMPLE_REPORT, FICTIONAL_HISTORICAL_REPORT];
    }
  },

  // Get report by ID
  getReportById(id: string): HealthReport | null {
    if (id === 'sample' || id === 'sample-demo-report') {
      return FICTIONAL_SAMPLE_REPORT;
    }
    if (id === 'historical' || id === 'sample-historical-report') {
      return FICTIONAL_HISTORICAL_REPORT;
    }

    const all = this.getAllReports();
    return all.find((r) => r.id === id) || null;
  },

  // Save or update a report
  saveReport(report: HealthReport): void {
    if (typeof window === 'undefined') return;
    try {
      const all = this.getAllReports().filter((r) => r.id !== report.id);
      all.unshift(report);
      localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(all));
    } catch {
      // ignore
    }
  },

  // Delete a report
  deleteReport(id: string): void {
    if (typeof window === 'undefined') return;
    try {
      const all = this.getAllReports().filter((r) => r.id !== id);
      localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(all));
    } catch {
      // ignore
    }
  },

  // Delete all reports (Privacy Reset)
  clearAllReports(): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(STORAGE_KEY_REPORTS);
    } catch {
      // ignore
    }
  },

  // Prescription storage
  getAllPrescriptions(): PrescriptionAnalysis[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY_PRESCRIPTIONS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  savePrescription(rx: PrescriptionAnalysis): void {
    if (typeof window === 'undefined') return;
    try {
      const all = this.getAllPrescriptions().filter((item) => item.id !== rx.id);
      all.unshift(rx);
      localStorage.setItem(STORAGE_KEY_PRESCRIPTIONS, JSON.stringify(all));
    } catch {
      // ignore
    }
  },

  getPrescriptionById(id: string): PrescriptionAnalysis | null {
    const all = this.getAllPrescriptions();
    return all.find((rx) => rx.id === id) || null;
  },
};
