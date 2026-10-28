'use client';

import React, { useState } from 'react';
import { VERIFIED_DOCTORS_PAKISTAN } from '@/lib/mockData/doctorsData';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
  Stethoscope,
  MapPin,
  CheckCircle2,
  Calendar,
  Phone,
  Search,
  Filter,
  Shield,
  Clock,
  Coins,
} from 'lucide-react';

export default function DoctorDirectoryPage() {
  const { language } = useLanguage();

  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cities = ['All', 'Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Peshawar'];
  const specialties = [
    'All',
    'Consultant Haematologist',
    'Consultant Physician & Diabetologist',
    'Consultant Pathologist & Haematologist',
    'General Physician & Infectious Diseases',
    'Family Medicine & Women’s Health',
  ];

  const filteredDoctors = VERIFIED_DOCTORS_PAKISTAN.filter((doc) => {
    const matchesCity = selectedCity === 'All' || doc.city === selectedCity;
    const matchesSpecialty =
      selectedSpecialty === 'All' || doc.specialty.includes(selectedSpecialty);
    const matchesSearch =
      searchQuery === '' ||
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.hospitalOrClinic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCity && matchesSpecialty && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
          <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
          <span>PMDC Verified Practitioner Directory</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950">
          Find a Verified Healthcare Professional in Pakistan
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Browse verified consultant haematologists, pathologists, and physicians across Karachi, Lahore, Islamabad, and other major medical hubs to review your lab findings.
        </p>
      </div>

      {/* Directory Integrity Notice */}
      <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs text-teal-950 flex items-start gap-3">
        <Shield className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Directory Integrity Standard:</strong> Meri Sehat does not publish subjective star ratings or rank any doctor as &ldquo;the best.&rdquo; We present factual, verified credentials, Pakistan Medical & Dental Council (PMDC) registration numbers, hospital affiliations, and transparent consultation fees so you can make informed choices.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by doctor name, hospital, or medical topic..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-none"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
            >
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All Cities' : c}
                </option>
              ))}
            </select>

            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white focus:ring-2 focus:ring-teal-600 focus:outline-none"
            >
              {specialties.map((s) => (
                <option key={s} value={s}>
                  {s === 'All' ? 'All Specialties' : s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs hover:border-teal-500/50 transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-extrabold text-base text-slate-950">
                    {doc.name}
                  </h3>
                  <p className="text-xs font-semibold text-teal-800 mt-0.5">
                    {doc.specialty}
                  </p>
                  <p className="text-[11px] text-slate-500">{doc.qualification}</p>
                </div>

                <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  {doc.pmdcNumber}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {doc.bio}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">
                    {doc.hospitalOrClinic}, {doc.city}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Fee: PKR {doc.consultationFee}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{doc.experienceYears}+ Years Clinical Exp.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{doc.availableDays.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="text-[11px] text-slate-500">
                Languages: {doc.languages.join(', ')}
              </div>
              <a
                href={`tel:${doc.contactPhone}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-2xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Clinic</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
