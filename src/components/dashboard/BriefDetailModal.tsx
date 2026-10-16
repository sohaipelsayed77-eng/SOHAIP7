import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ClientIntakeData } from '../../types';
import { calculateReadinessScore } from '../../lib/auditCalculator';
import { generateAIEnhancedBrief, AIEnhancedBrief } from '../../lib/gemini';
import { 
  X, 
  Printer, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  BarChart3, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ArrowUpRight, 
  Calendar, 
  Phone, 
  Mail, 
  Globe, 
  Package, 
  Layers, 
  Target, 
  DollarSign, 
  Video, 
  Cpu, 
  Headphones, 
  ShieldCheck, 
  Share2 
} from 'lucide-react';

interface BriefDetailModalProps {
  brief: ClientIntakeData;
  onClose: () => void;
}

export const BriefDetailModal: React.FC<BriefDetailModalProps> = ({ brief, onClose }) => {
  const { lang, updateSubmission, showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiBrief, setAiBrief] = useState<AIEnhancedBrief | null>(null);

  const audit = useMemo(() => calculateReadinessScore(brief, lang), [brief, lang]);

  const handleStatusChange = (newStatus: any) => {
    updateSubmission(brief.id, { status: newStatus });
  };

  const handleGenerateAI = async () => {
    setIsGeneratingAI(true);
    try {
      const res = await generateAIEnhancedBrief(brief, lang);
      setAiBrief(res);
      showToast(lang === 'ar' ? 'تم توليد مسودة التحليل الذكي بنجاح' : 'AI analysis draft generated', 'success');
    } catch (e: any) {
      showToast(e.message || 'AI Generation failed', 'error');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(brief, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `client-brief-${brief.businessName.replace(/\s+/g, '-').toLowerCase()}-${brief.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(lang === 'ar' ? 'تم تنزيل ملف JSON' : 'JSON exported', 'success');
  };

  const copyStructuredBrief = () => {
    const text = `================================================
MEDIA BUYER STRATEGIC CLIENT BRIEF
================================================
Client: ${brief.clientFullName}
Brand: ${brief.businessName}
Status: ${brief.status.toUpperCase()}
Category: ${brief.businessCategory} | Model: ${brief.businessModel}
Website: ${brief.websiteUrl || 'None'}
WhatsApp: ${brief.whatsappNumber} | Email: ${brief.contactEmail}

--- ADS READINESS SCORE: ${audit.overallScore}/100 (${audit.rating.toUpperCase()}) ---
• Tracking: ${audit.breakdown.tracking}/25
• Creatives: ${audit.breakdown.creatives}/25
• Economics: ${audit.breakdown.economics}/25
• Operations: ${audit.breakdown.operations}/25

--- RECOMMENDED CHANNELS ---
${audit.recommendedChannels.map(c => `• ${c}`).join('\n')}

--- CRITICAL BLOCKERS & GAPS ---
${audit.blockers.map(b => `[!] ${b}`).join('\n')}

--- SUGGESTED DISCOVERY CALL QUESTIONS ---
${audit.suggestedDiscoveryQuestions.map((q, i) => `${i + 1}. ${q}`).join('\n')}

--- CORE METRICS ---
• Target Budget: ${brief.monthlyAdSpendCustom || brief.monthlyAdSpendBudgetRange} ${brief.currency}
• Target KPI: ${brief.targetKPI.toUpperCase()} (${brief.targetCostPerResult || 'N/A'})
• Monthly Revenue Goal: ${brief.monthlyRevenueTarget || 'N/A'}
• Response Time: ${brief.averageResponseTime}
================================================`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast(lang === 'ar' ? 'تم نسخ التقرير الاستراتيجي للحافظة!' : 'Strategic brief copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between gap-4 bg-slate-900/90 sticky top-0 z-10 backdrop-blur-md no-print">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white truncate">
                  {brief.businessName}
                </h2>
                {brief.isDemo && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    {lang === 'ar' ? 'بيانات تجريبية' : 'Demo Data'}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 truncate">
                {brief.clientFullName} • {new Date(brief.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Status Selector */}
            <select
              value={brief.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-xs font-semibold rounded-lg px-2.5 py-1.5 text-white focus:border-blue-500"
            >
              <option value="new">{lang === 'ar' ? 'جديد (New)' : 'New'}</option>
              <option value="reviewing">{lang === 'ar' ? 'قيد المراجعة (Reviewing)' : 'Reviewing'}</option>
              <option value="awaiting_info">{lang === 'ar' ? 'بانتظار معلومات (Awaiting Info)' : 'Awaiting Info'}</option>
              <option value="qualified">{lang === 'ar' ? 'عميل مؤهل (Qualified)' : 'Qualified'}</option>
              <option value="not_a_fit">{lang === 'ar' ? 'غير مناسب (Not a Fit)' : 'Not a Fit'}</option>
            </select>

            {/* Print */}
            <button
              onClick={handlePrint}
              title={lang === 'ar' ? 'طباعة / حفظ كـ PDF' : 'Print / Export to PDF'}
              className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Copy */}
            <button
              onClick={copyStructuredBrief}
              title={lang === 'ar' ? 'نسخ ملخص الـ Brief' : 'Copy Brief Summary'}
              className="p-2 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Content */}
        <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-slate-200 text-xs sm:text-sm">
          
          {/* Top Score Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 to-blue-950/40 border border-blue-500/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 block mb-1">
                  {lang === 'ar' ? 'تدقيق الجاهزية الإعلانية للميديا باير' : 'Advertising Readiness Audit'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  {brief.businessName}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {brief.whatDoYouSell || '—'}
                </p>
              </div>

              <div className="flex items-center gap-4 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 shrink-0">
                <div className="text-center">
                  <span className="text-3xl font-black text-white">{audit.overallScore}</span>
                  <span className="text-xs text-slate-500 font-bold block">/ 100</span>
                </div>
                <div className="border-r rtl:border-r ltr:border-l border-slate-800 px-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border uppercase block text-center ${
                    audit.rating === 'exceptional' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                    audit.rating === 'ready' ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' :
                    audit.rating === 'needs_preparation' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                    'bg-rose-500/20 text-rose-300 border-rose-500/40'
                  }`}>
                    {audit.rating === 'exceptional' ? (lang === 'ar' ? 'جاهزية استثنائية' : 'Exceptional') :
                     audit.rating === 'ready' ? (lang === 'ar' ? 'جاهز للإطلاق' : 'Launch Ready') :
                     audit.rating === 'needs_preparation' ? (lang === 'ar' ? 'يحتاج إعداد' : 'Needs Prep') :
                     (lang === 'ar' ? 'مخاطرة عالية' : 'High Risk')}
                  </span>
                </div>
              </div>
            </div>

            {/* Score Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-800/80">
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">{lang === 'ar' ? 'التتبع الرقمي (Pixel/CAPI)' : 'Tracking Health'}</span>
                <span className="font-bold text-sm text-blue-400">{audit.breakdown.tracking} / 25</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">{lang === 'ar' ? 'المواد الإبداعية والـ UGC' : 'Creatives & UGC'}</span>
                <span className="font-bold text-sm text-emerald-400">{audit.breakdown.creatives} / 25</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">{lang === 'ar' ? 'هوامش الربح والـ AOV' : 'Unit Economics'}</span>
                <span className="font-bold text-sm text-amber-400">{audit.breakdown.economics} / 25</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 block">{lang === 'ar' ? 'سرعة الرد والتشغيل' : 'Sales Operations'}</span>
                <span className="font-bold text-sm text-indigo-400">{audit.breakdown.operations} / 25</span>
              </div>
            </div>
          </div>

          {/* AI-Assisted Strategic Synthesis Action */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 no-print">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{lang === 'ar' ? 'مسودة التحليل الاستراتيجي الذكي (AI Strategic Draft)' : 'AI Strategic Synthesis Draft'}</span>
                </span>
                <span className="text-[11px] text-slate-400">
                  {lang === 'ar' 
                    ? 'يتم توليد توصيات استرشادية تتطلب مراجعة بشرية من الميديا باير دون اختلاق أرقام أو ضمان نتائج' 
                    : 'Generates preliminary draft angles subject to human verification; no performance guarantees.'}
                </span>
              </div>

              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={isGeneratingAI}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs shadow-md transition-all shrink-0 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isGeneratingAI ? (lang === 'ar' ? 'جاري التحليل...' : 'Synthesizing...') : (lang === 'ar' ? 'توليد مسودة التحليل' : 'Generate Strategic Draft')}</span>
              </button>
            </div>

            {aiBrief && (
              <div className="mt-3 p-4 rounded-xl bg-slate-900 border border-blue-500/30 space-y-3 text-xs leading-relaxed animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-[11px] font-bold text-blue-300">
                    {lang === 'ar' ? 'مسودة أولية تحتاج لمراجعة الميديا باير (Draft For Review)' : 'Draft For Media Buyer Review'}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {aiBrief.isAIGenerated ? 'Generated via Gemini 2.5 Flash' : 'Deterministic Expert Strategy'}
                  </span>
                </div>
                <p className="text-slate-200 font-medium">
                  {aiBrief.executiveSummary}
                </p>

                {aiBrief.creativeStrategyAngles.length > 0 && (
                  <div>
                    <strong className="text-slate-300 block mb-1">{lang === 'ar' ? 'زوايا إعلانية مقترحة للاختبار:' : 'Recommended Hook Angles:'}</strong>
                    <ul className="list-disc list-inside space-y-1 text-slate-400 pr-2">
                      {aiBrief.creativeStrategyAngles.map((a, i) => (
                        <li key={i}>{a}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {aiBrief.suggestedTestingRoadmap.length > 0 && (
                  <div>
                    <strong className="text-slate-300 block mb-1">{lang === 'ar' ? 'خارطة طريق إطلاق الحملات:' : 'Testing Roadmap:'}</strong>
                    <ul className="list-disc list-inside space-y-1 text-slate-400 pr-2">
                      {aiBrief.suggestedTestingRoadmap.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Blockers & Red Flags */}
          {audit.blockers.length > 0 && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-2">
              <h4 className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>{lang === 'ar' ? 'تنبيهات وثغرات يجب معالجتها قبل الإنفاق (Critical Blockers)' : 'Critical Action Items & Blockers'}</span>
              </h4>
              <ul className="list-disc list-inside space-y-1 text-xs text-rose-200/90 pr-2">
                {audit.blockers.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommended Channels */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>{lang === 'ar' ? 'القنوات والاستراتيجية الإعلانية المقترحة' : 'Recommended Advertising Channels'}</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {audit.recommendedChannels.map((c, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Discovery Call Questions for Media Buyer */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'ar' ? 'أسئلة حاسمة يطرحها الميديا باير في المكالمة الاستكشافية الأولى (Discovery Call Questions)' : 'Suggested Discovery Call Questions'}</span>
            </h4>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-300 pr-2">
              {audit.suggestedDiscoveryQuestions.map((q, i) => (
                <li key={i} className="leading-relaxed">{q}</li>
              ))}
            </ol>
          </div>

          {/* Detailed Breakdown Grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Business & Economics */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
              <h5 className="font-bold text-xs uppercase text-slate-400 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span>{lang === 'ar' ? 'الاقتصاديات والأسعار' : 'Economics & Pricing'}</span>
              </h5>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-400">{lang === 'ar' ? 'الميزانية الشهرية المقترحة:' : 'Target Monthly Ad Spend:'}</span>
                  <span className="font-bold text-white">{brief.monthlyAdSpendCustom || brief.monthlyAdSpendBudgetRange} {brief.currency}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-400">{lang === 'ar' ? 'متوسط قيمة الطلب (AOV):' : 'Average Order Value:'}</span>
                  <span className="font-bold text-white">{brief.averageOrderValue || '—'} {brief.currency}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-400">{lang === 'ar' ? 'هامش الربح للمنتج البطل:' : 'Hero Product Margin:'}</span>
                  <span className="font-bold text-white">{brief.products?.[0]?.grossMarginPercent ? `${brief.products[0].grossMarginPercent}%` : '—'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-400">{lang === 'ar' ? 'المؤشر الأهم (Target KPI):' : 'Primary KPI:'}</span>
                  <span className="font-bold text-white">{brief.targetKPI.toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Sales & Technical */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5">
              <h5 className="font-bold text-xs uppercase text-slate-400 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                <Cpu className="w-4 h-4 text-blue-400" />
                <span>{lang === 'ar' ? 'التشغيل والتتبع التقني' : 'Operations & Tracking'}</span>
              </h5>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-400">{lang === 'ar' ? 'سرعة استجابة المبيعات:' : 'Response Velocity:'}</span>
                  <span className="font-bold text-white">{brief.averageResponseTime}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-400">{lang === 'ar' ? 'بيكسل ميتا (Pixel):' : 'Meta Pixel:'}</span>
                  <span className="font-bold text-white">{brief.techPixelOrDataset}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-400">{lang === 'ar' ? 'واجهة CAPI للسيرفر:' : 'Conversions API:'}</span>
                  <span className="font-bold text-white">{brief.techConversionsAPI}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-400">{lang === 'ar' ? 'إحصاءات جوجل GA4:' : 'Google Analytics 4:'}</span>
                  <span className="font-bold text-white">{brief.techGoogleAnalytics4}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Internal Notes by Media Buyer */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 no-print">
            <label className="block text-xs font-bold text-slate-300">
              {lang === 'ar' ? 'ملاحظات الميديا باير الداخلية الخاصة (Internal Notes):' : 'Media Buyer Internal Notes:'}
            </label>
            <textarea
              rows={2}
              value={brief.internalNotes || ''}
              onChange={(e) => updateSubmission(brief.id, { internalNotes: e.target.value })}
              placeholder={lang === 'ar' ? 'اكتب ملاحظاتك الخاصة بعد المكالمة الاستكشافية...' : 'Add private notes or call follow-up items...'}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white placeholder-slate-600 focus:border-blue-500"
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/90 flex flex-wrap items-center justify-between gap-3 no-print">
          <button
            onClick={handleExportJSON}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'تصدير JSON' : 'Export JSON'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-colors"
          >
            {lang === 'ar' ? 'إغلاق التقرير' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
