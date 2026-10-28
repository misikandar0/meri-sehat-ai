# Meri Sehat AI — Data Privacy & Healthcare Security Policy

## 1. Zero Model Training Guarantee
Uploaded laboratory documents, photos, handwritten prescriptions, and extracted numerical biomarker values are strictly **never** used for training or improving artificial intelligence or machine learning models.

## 2. Guest Privacy Architecture
- For guest users, report generation executes in ephemeral server memory and is cached strictly in the user's local browser storage (`localStorage` / `IndexedDB`).
- No identifiable patient documents are retained on database disks unless the user explicitly authenticates and opts to save records to their account.
- The dashboard includes a one-click &ldquo;Privacy Wipe&rdquo; that purges all locally stored health records and preferences instantly.

## 3. Database Security & Row-Level Security (RLS)
For authenticated persistence with Supabase PostgreSQL:
- Strict Row-Level Security (RLS) policies ensure users can only SELECT, INSERT, or DELETE rows where `auth.uid() = user_id`.
- Administrators have zero access to patient reports by default.
- Administrative audit logs capture anonymous telemetry (model versioning, verified citations, anonymous error counts) without storing Protected Health Information (PHI).

## 4. Pakistan Healthcare Regulations
Architectured to adhere to the ethical standards of the Pakistan Medical & Dental Council (PMDC), the Prevention of Electronic Crimes Act (PECA 2016), and consumer protection safeguards.
