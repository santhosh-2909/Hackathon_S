'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import {
  HeartPulse,
  Sprout,
  Building2,
  Bus,
  GraduationCap,
  Leaf,
  Zap,
  Droplets,
  Factory,
  Landmark,
  ShoppingBag,
  Truck,
  Bot,
  ShieldCheck,
  Building,
  Smartphone,
  Tractor,
  Brain,
  Utensils,
  Rocket,
} from 'lucide-react';

interface DomainInspiration {
  title: string;
  icon: React.ElementType;
  description: string;
}

const DOMAINS: DomainInspiration[] = [
  {
    title: 'Healthcare',
    icon: HeartPulse,
    description: 'Explore operational bottlenecks in clinics, patient queue delays, and triage automation.',
  },
  {
    title: 'Agriculture',
    icon: Sprout,
    description: 'Explore crop disease detection, farm supply chain transparency, and micro-climate analytics.',
  },
  {
    title: 'Smart Cities',
    icon: Building2,
    description: 'Explore parking space optimization, urban waste collection tracking, and civic grievance routing.',
  },
  {
    title: 'Transportation',
    icon: Bus,
    description: 'Explore first-and-last-mile connectivity, fleet maintenance forecasting, and transit delay alerts.',
  },
  {
    title: 'Education',
    icon: GraduationCap,
    description: 'Explore dropout risk detection, personalized learning assistance, and lab equipment scheduling.',
  },
  {
    title: 'Sustainability',
    icon: Leaf,
    description: 'Explore carbon footprint auditing, renewable energy microgrids, and circular waste logistics.',
  },
  {
    title: 'Energy',
    icon: Zap,
    description: 'Explore peak power demand forecasting, grid anomaly detection, and building energy efficiency.',
  },
  {
    title: 'Water Management',
    icon: Droplets,
    description: 'Explore pipe leakage detection, groundwater quality tracking, and urban flood warning systems.',
  },
  {
    title: 'Manufacturing',
    icon: Factory,
    description: 'Explore predictive machine maintenance, assembly line defect checks, and worker safety monitoring.',
  },
  {
    title: 'Finance',
    icon: Landmark,
    description: 'Explore small merchant reconciliation, fraud pattern detection, and micro-lending risk scoring.',
  },
  {
    title: 'Retail',
    icon: ShoppingBag,
    description: 'Explore inventory shrinkage prevention, shelf replenishment alerts, and local merchant logistics.',
  },
  {
    title: 'Supply Chain',
    icon: Truck,
    description: 'Explore cold storage temperature compliance, shipment delay prediction, and port congestion.',
  },
  {
    title: 'AI & Automation',
    icon: Bot,
    description: 'Explore unstructured document extraction, customer query routing, and automated workflow triggers.',
  },
  {
    title: 'Cyber Security',
    icon: ShieldCheck,
    description: 'Explore phishing attempt detection, internal access anomaly tracking, and API vulnerability scans.',
  },
  {
    title: 'Government Services',
    icon: Building,
    description: 'Explore public scheme eligibility verification, document authentication, and benefit delivery.',
  },
  {
    title: 'Digital Inclusion',
    icon: Smartphone,
    description: 'Explore local language accessibility, voice-first interfaces for non-tech users, and offline sync.',
  },
  {
    title: 'Rural Development',
    icon: Tractor,
    description: 'Explore artisan marketplace access, agrarian weather alerts, and rural health worker tools.',
  },
  {
    title: 'Mental Health',
    icon: Brain,
    description: 'Explore student distress screening, workplace burnout tracking, and peer support coordination.',
  },
  {
    title: 'Food & Hospitality',
    icon: Utensils,
    description: 'Explore commercial kitchen waste tracking, hygiene audit automation, and food donor matching.',
  },
  {
    title: 'Space Technology',
    icon: Rocket,
    description: 'Explore satellite imagery land-use classification, space debris tracking, and spectral analytics.',
  },
];

export function InspirationDomains() {
  return (
    <section className="py-12 border-t border-slate-100 dark:border-slate-800">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Inspiration Categories
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
          Explore high-impact domain areas to observe and discover your own problem statement.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {DOMAINS.map((domain, idx) => {
          const Icon = domain.icon;
          return (
            <motion.div
              key={domain.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              whileHover={{ y: -3 }}
              className="p-4 rounded-[20px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs hover:border-blue-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="size-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center border border-slate-200/60 dark:border-slate-700/60 mb-3">
                  <Icon className="size-4" />
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                  {domain.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                  {domain.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
