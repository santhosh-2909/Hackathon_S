'use client';

import * as React from 'react';
import { FileText, Copy, Download, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FrameworkFormState {
  title: string;
  targetUsers: string;
  currentProcess: string;
  painPoints: string;
  rootCause: string;
  impact: string;
  evidence: string;
  expectedOutcome: string;
  possibleDataset: string;
  technologyStack: string;
  successMetrics: string;
}

const INITIAL_FORM_STATE: FrameworkFormState = {
  title: 'Hostel Mess Food Waste from Unpredictable Headcount',
  targetUsers: 'Hostel mess managers & residential students',
  currentProcess: 'Mess kitchen cooks for full sanctioned hostel capacity daily',
  painPoints: 'Daily attendance swings by 30-40% on weekends and exam days, causing massive over-preparation',
  rootCause: 'Students never signal meal opt-outs before cooking prep begins',
  impact: '100kg+ of cooked food discarded nightly, inflating mess bills and wasting resources',
  evidence: 'Hostel mess log audit & kitchen manager interview notes',
  expectedOutcome: 'One-tap meal opt-out loop with short-horizon demand forecasting',
  possibleDataset: '2-week mess attendance logs & waste weight records',
  technologyStack: 'Next.js, Supabase, Python, scikit-learn, Vercel',
  successMetrics: '30% reduction in discarded food weight within 14 days',
};

export function FrameworkEditor() {
  const [formData, setFormData] = React.useState<FrameworkFormState>(INITIAL_FORM_STATE);
  const [copied, setCopied] = React.useState(false);

  const handleChange = (field: keyof FrameworkFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const formattedStatement = React.useMemo(() => {
    return `${formData.targetUsers || '[Target Users]'} struggle to ${
      formData.currentProcess || '[Current Process]'
    }, because ${formData.rootCause || '[Root Cause]'}, which leads to ${
      formData.painPoints || '[Pain Points]'
    } and results in ${formData.impact || '[Impact]'}.`;
  }, [formData]);

  const handleCopy = async () => {
    const textToCopy = `# Problem Statement: ${formData.title}

## Problem Summary
${formattedStatement}

## Details
- **Target Users**: ${formData.targetUsers}
- **Current Process**: ${formData.currentProcess}
- **Pain Points**: ${formData.painPoints}
- **Root Cause**: ${formData.rootCause}
- **Impact**: ${formData.impact}
- **Evidence**: ${formData.evidence}
- **Expected Outcome**: ${formData.expectedOutcome}
- **Possible Dataset**: ${formData.possibleDataset}
- **Technology Stack**: ${formData.technologyStack}
- **Success Metrics**: ${formData.successMetrics}
`;

    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = `# Problem Statement: ${formData.title}\n\n## Formatted Statement\n${formattedStatement}\n\n## Specification\n- Target Users: ${formData.targetUsers}\n- Current Process: ${formData.currentProcess}\n- Pain Points: ${formData.painPoints}\n- Root Cause: ${formData.rootCause}\n- Impact: ${formData.impact}\n- Evidence: ${formData.evidence}\n- Expected Outcome: ${formData.expectedOutcome}\n- Possible Dataset: ${formData.possibleDataset}\n- Tech Stack: ${formData.technologyStack}\n- Success Metrics: ${formData.successMetrics}\n`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-statement.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="framework-editor" className="py-12 border-t border-slate-100 dark:border-slate-800">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-2">
          <Sparkles className="size-3.5" />
          <span>Interactive Framework</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          Problem Statement Framework
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Draft and structure your custom problem statement using our 11-slot hackathon template.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Inputs Grid */}
        <div className="lg:col-span-7 space-y-4 p-6 sm:p-8 rounded-[24px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <Label className="text-xs font-bold text-slate-900 dark:text-white">Problem Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="e.g. Hostel Mess Food Waste Reduction"
                className="h-10 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-900 dark:text-white">Target Users</Label>
              <Input
                value={formData.targetUsers}
                onChange={(e) => handleChange('targetUsers', e.target.value)}
                placeholder="Specific persona experiencing pain"
                className="h-10 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-900 dark:text-white">Current Process</Label>
              <Input
                value={formData.currentProcess}
                onChange={(e) => handleChange('currentProcess', e.target.value)}
                placeholder="How the task is done today"
                className="h-10 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-900 dark:text-white">Pain Points</Label>
              <Input
                value={formData.painPoints}
                onChange={(e) => handleChange('painPoints', e.target.value)}
                placeholder="Friction or daily difficulty"
                className="h-10 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-900 dark:text-white">Root Cause</Label>
              <Input
                value={formData.rootCause}
                onChange={(e) => handleChange('rootCause', e.target.value)}
                placeholder="Underlying breakdown"
                className="h-10 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-900 dark:text-white">Impact</Label>
              <Input
                value={formData.impact}
                onChange={(e) => handleChange('impact', e.target.value)}
                placeholder="Cost, time lost, or waste"
                className="h-10 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-900 dark:text-white">Evidence</Label>
              <Input
                value={formData.evidence}
                onChange={(e) => handleChange('evidence', e.target.value)}
                placeholder="User interviews or observation notes"
                className="h-10 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-900 dark:text-white">Expected Outcome</Label>
              <Input
                value={formData.expectedOutcome}
                onChange={(e) => handleChange('expectedOutcome', e.target.value)}
                placeholder="Desired workflow improvement"
                className="h-10 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-900 dark:text-white">Possible Dataset</Label>
              <Input
                value={formData.possibleDataset}
                onChange={(e) => handleChange('possibleDataset', e.target.value)}
                placeholder="Collectable logs or public data"
                className="h-10 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-900 dark:text-white">Technology Stack</Label>
              <Input
                value={formData.technologyStack}
                onChange={(e) => handleChange('technologyStack', e.target.value)}
                placeholder="Proposed tech components"
                className="h-10 rounded-xl text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-900 dark:text-white">Success Metrics</Label>
              <Input
                value={formData.successMetrics}
                onChange={(e) => handleChange('successMetrics', e.target.value)}
                placeholder="Measurable evaluation benchmark"
                className="h-10 rounded-xl text-xs"
              />
            </div>
          </div>
        </div>

        {/* Live Preview Box */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 sm:p-7 rounded-[24px] bg-slate-900 text-white shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[420px]">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <FileText className="size-4" />
                  Live Statement Brief
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                  Ready to Export
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-4 leading-snug">
                {formData.title || 'Untitled Problem Statement'}
              </h3>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 mb-6">
                <p className="text-xs leading-relaxed text-slate-200 italic font-medium">
                  &ldquo;{formattedStatement}&rdquo;
                </p>
              </div>

              <dl className="grid grid-cols-2 gap-3 text-[11px] text-slate-300">
                <div>
                  <dt className="text-slate-400 font-semibold uppercase text-[9px] tracking-wider">
                    Tech Stack
                  </dt>
                  <dd className="font-mono mt-0.5 truncate">{formData.technologyStack || '—'}</dd>
                </div>
                <div>
                  <dt className="text-slate-400 font-semibold uppercase text-[9px] tracking-wider">
                    Metric
                  </dt>
                  <dd className="font-mono mt-0.5 truncate">{formData.successMetrics || '—'}</dd>
                </div>
              </dl>
            </div>

            <div className="pt-5 border-t border-slate-800 flex items-center gap-3">
              <Button
                onClick={handleCopy}
                className="flex-1 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="size-3.5 text-emerald-400" /> : <Copy className="size-3.5" />}
                <span>{copied ? 'Copied Brief' : 'Copy Brief'}</span>
              </Button>
              <Button
                onClick={handleDownload}
                variant="outline"
                className="h-10 px-4 rounded-xl border-slate-700 text-slate-200 hover:bg-slate-800 text-xs font-semibold flex items-center gap-2 cursor-pointer"
              >
                <Download className="size-3.5" />
                <span>Export .md</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
