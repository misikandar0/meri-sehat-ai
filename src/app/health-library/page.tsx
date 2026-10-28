'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Activity, Droplets, Shield, Zap, ArrowRight, Heart } from 'lucide-react';

export default function HealthLibraryPage() {
  const articles = [
    {
      title: 'Complete Blood Count (CBC): Understanding Your Numbers',
      summary:
        'A comprehensive guide to Hemoglobin, MCV, White Blood Cells, and Platelets. Learn what reference ranges mean and why isolated results are rarely interpreted in isolation.',
      category: 'Haematology',
      readTime: '6 min read',
      sources: 'WHO & British Society of Haematology',
      link: '/analyzer',
    },
    {
      title: 'Platelet Counts in Pakistan: Dengue Season Precautions',
      summary:
        'Why platelets drop rapidly during acute viral infections like Dengue fever, what the critical 50,000 / µL threshold means, and when to seek urgent emergency hospital care.',
      category: 'Infectious Disease & Clotting',
      readTime: '5 min read',
      sources: 'Ministry of National Health Services, Pakistan',
      link: '/analyzer',
    },
    {
      title: 'Microcytic Anemia Patterns: Iron Deficiency vs Thalassemia Trait',
      summary:
        'In Pakistan, low MCV and low hemoglobin are frequently observed. Discover the physiological difference between nutritional iron deficiency and the inherited beta-thalassemia carrier trait.',
      category: 'Blood Disorders',
      readTime: '7 min read',
      sources: 'Pakistan Society of Haematology',
      link: '/analyzer',
    },
    {
      title: 'Fasting Blood Sugar vs HbA1c: How Glucose Is Evaluated',
      summary:
        'Understand why a single fasting blood glucose reading only captures a snapshot in time, and why physicians use HbA1c tests to evaluate your 3-month average glycemia.',
      category: 'Metabolic Health',
      readTime: '5 min read',
      sources: 'American Diabetes Association',
      link: '/analyzer',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200">
          <BookOpen className="w-3.5 h-3.5 text-teal-600" />
          <span>Evidence-Based Patient Health Library</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950">
          Medical Biomarker Guides & Clinical Concepts
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Clinician-reviewed educational guides grounded in official medical literature. Learn what laboratory terminology means in plain language.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((art, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xs hover:border-teal-500/50 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
                  {art.category}
                </span>
                <span className="text-slate-400 font-medium">{art.readTime}</span>
              </div>
              <h2 className="font-bold text-lg text-slate-900 leading-snug">
                {art.title}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {art.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium truncate max-w-[200px]">
                Ref: {art.sources}
              </span>
              <Link
                href={art.link}
                className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:text-teal-800"
              >
                <span>Analyze Your Test</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
