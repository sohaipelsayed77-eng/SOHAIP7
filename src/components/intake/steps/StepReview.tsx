import React, { useMemo } from 'react';
import { useApp } from '../../../context/AppContext';
import { calculateReadinessScore } from '../../../lib/auditCalculator';
import { 
  CheckCircle2, 
  Edit3, 
  Send, 
  AlertTriangle, 
  BarChart3, 
  Building2, 
  Package, 
  History, 
  Target, 
  Wallet, 
  Users, 
  Palette, 
  Headphones, 
  Cpu, 
  CalendarClock 
} from 'lucide-react';

export const StepReview: React.FC = () => {
  const { lang, formData, setCurrentStep, addSubmission, showToast } = useApp();

  const audit = useMemo(() => calculateReadinessScore(formData, lang), [formData, lang]);

  // Validation
  const errors: string[] = [];
  if (!formData.clientFullName?.trim()) errors.push(lang === 'ar' ? 'الاسم الكامل للعميل مطلوب' : 'Client Full Name is required');
  if (!formData.businessName?.trim()) errors.push(lang === 'ar' ? 'اسم النشاط التجاري مطلوب' : 'Business / Brand Name is required');
  if (!formData.contactEmail?.trim()) errors.push(lang === 'ar' ? 'البريد الإلكتروني مطلوب' : 'Contact Email is required');
  if (!formData.whatsappNumber?.trim()) errors.push(lang === 'ar' ? 'رقم الواتساب مطلوب' : 'WhatsApp Number is required');
  if (!formData.privacyConsentAgreed) errors.push(lang === 'ar' ? 'يجب الموافقة على سياسة الخصوصية وسرية البيانات' : 'Privacy consent agreement is mandatory');

  const handleSubmit = () => {
    if (errors.length > 0) {
      showToast(errors[0], 'error');
      return;
    }

    const finalBrief = {
      ...formData,
      id: formData.id || `client-${Date.now()}`,
      status: 'new' as const,
      updatedAt: new Date().toISOString(),
      isDemo: false
    };

    addSubmission(finalBrief);
    setCurrentStep(12); // Move to Success Screen
  };

  const sections = [
    {
      step: 1,
      titleAr: '1. معلومات النشاط والعميل',
      titleEn: '1. Business Profile',
      icon: Building2,
      summary: `${formData.businessName || '—'} (${formData.clientFullName || '—'}) | ${formData.contactEmail} | ${formData.whatsappNumber} | ${formData.country}`
    },
    {
      step: 2,
      titleAr: '2. المنتجات والأسعار',
      titleEn: '2. Products & Pricing',
      icon: Package,
      summary: `${formData.whatDoYouSell ? formData.whatDoYouSell.substring(0, 75) + '...' : '—'} | عدد المنتجات: ${formData.products.length} | AOV: ${formData.averageOrderValue || '—'} ${formData.currency}`
    },
    {
      step: 3,
      titleAr: '3. تاريخ التسويق والإعلانات',
      titleEn: '3. Marketing History',
      icon: History,
      summary: `${formData.hasRunAdsBefore ? (lang === 'ar' ? 'أطلق إعلانات سابقة' : 'Ran paid ads before') : (lang === 'ar' ? 'إطلاق جديد لأول مرة' : 'First time')} | القنوات: ${formData.activeChannels.join(', ')}`
    },
    {
      step: 4,
      titleAr: '4. الأهداف ومؤشرات الأداء',
      titleEn: '4. Goals & KPIs',
      icon: Target,
      summary: `الهدف الأهم: ${formData.targetKPI.toUpperCase()} | الأهداف: ${formData.primaryGoals.join(', ')} | الإطار الزمني: ${formData.timeframeToAchieve}`
    },
    {
      step: 5,
      titleAr: '5. الميزانية الإعلانية',
      titleEn: '5. Budget & Unit Economics',
      icon: Wallet,
      summary: `ميزانية المنصات: ${formData.monthlyAdSpendCustom || formData.monthlyAdSpendBudgetRange || '—'} ${formData.currency} | أتعاب الباير: ${formData.allocatedMediaBuyerFee || '—'}`
    },
    {
      step: 6,
      titleAr: '6. الجمهور والمنافسون',
      titleEn: '6. Target Audience',
      icon: Users,
      summary: `الأعمار: ${formData.audienceAgeRanges.join(', ')} | المناطق: ${formData.geographicLocations || '—'} | المنافسين: ${formData.competitors.filter(c => c.name).length}`
    },
    {
      step: 7,
      titleAr: '7. المواد الإعلانية والعروض',
      titleEn: '7. Creative Assets',
      icon: Palette,
      summary: `المواد المتوفرة: ${formData.availableAssets.length} أنواع | الإنتاج: ${formData.creativeProductionCapacity}`
    },
    {
      step: 8,
      titleAr: '8. المبيعات والشحن',
      titleEn: '8. Sales & Operations',
      icon: Headphones,
      summary: `سرعة الرد: ${formData.averageResponseTime} | أداة المتابعة: ${formData.salesFollowUpTool} | التأكيد: ${formData.orderConfirmationProcess}`
    },
    {
      step: 9,
      titleAr: '9. التتبع التقني (CAPI/Pixel)',
      titleEn: '9. Tracking Setup',
      icon: Cpu,
      summary: `Pixel: ${formData.techPixelOrDataset} | CAPI: ${formData.techConversionsAPI} | GA4: ${formData.techGoogleAnalytics4} | GTM: ${formData.techGoogleTagManager}`
    },
    {
      step: 10,
      titleAr: '10. الجدول والموافقة',
      titleEn: '10. Timeline & Consent',
      icon: CalendarClock,
      summary: `تاريخ الإطلاق: ${formData.targetLaunchDate || '—'} | الموافقة على الخصوصية: ${formData.privacyConsentAgreed ? '✓ نعم' : '✗ غير موافق'}`
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          <span>{lang === 'ar' ? '11. المراجعة النهائية وتدقيق الجاهزية' : '11. Final Review & Readiness Audit'}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {lang === 'ar' 
            ? 'تأكد من صحة البيانات المدخلة؛ يمكنك تعديل أي قسم بالضغط على زر التعديل قبل الإرسال النهائي' 
            : 'Review all inputs and audit preview before submitting the final onboarding brief'}
        </p>
      </div>

      {/* Validation Alert */}
      {errors.length > 0 && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-rose-200">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <span>{lang === 'ar' ? 'يرجى استكمال الحقول المطلوبة قبل الإرسال:' : 'Please complete the following required fields:'}</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-rose-300/90 pr-2">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Readiness Score Card Preview */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/30 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-base text-white">
                {lang === 'ar' ? 'مؤشر الجاهزية الإعلانية الأولي (Ads Readiness Score)' : 'Initial Advertising Readiness Score'}
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              {lang === 'ar' 
                ? 'تقييم منهجي من 100 يعتمد على جاهزية التتبع، المحتوى، الاقتصاديات، وسرعة المبيعات' 
                : 'Systematic 100-point audit across tracking, creatives, economics, and operations'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right rtl:text-right ltr:text-left">
              <span className="text-2xl sm:text-3xl font-black text-white">{audit.overallScore}</span>
              <span className="text-sm font-bold text-slate-500">/100</span>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${
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

        {/* 4 Score Breakdown Bars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-1">{lang === 'ar' ? 'التتبع والبيكسل' : 'Tracking'}</span>
            <div className="flex items-baseline justify-between">
              <span className="font-bold text-sm text-white">{audit.breakdown.tracking}/25</span>
              <div className="w-12 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: `${(audit.breakdown.tracking / 25) * 100}%` }} />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-1">{lang === 'ar' ? 'الفيديوهات والمحتوى' : 'Creatives'}</span>
            <div className="flex items-baseline justify-between">
              <span className="font-bold text-sm text-white">{audit.breakdown.creatives}/25</span>
              <div className="w-12 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500" style={{ width: `${(audit.breakdown.creatives / 25) * 100}%` }} />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-1">{lang === 'ar' ? 'هوامش الربح والـ AOV' : 'Economics'}</span>
            <div className="flex items-baseline justify-between">
              <span className="font-bold text-sm text-white">{audit.breakdown.economics}/25</span>
              <div className="w-12 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-amber-500" style={{ width: `${(audit.breakdown.economics / 25) * 100}%` }} />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-[10px] text-slate-400 block mb-1">{lang === 'ar' ? 'سرعة المبيعات والشحن' : 'Operations'}</span>
            <div className="flex items-baseline justify-between">
              <span className="font-bold text-sm text-white">{audit.breakdown.operations}/25</span>
              <div className="w-12 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-indigo-500" style={{ width: `${(audit.breakdown.operations / 25) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Sections Review Cards */}
      <div className="space-y-3">
        {sections.map((sec) => {
          const Icon = sec.icon;
          return (
            <div
              key={sec.step}
              className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-semibold text-xs sm:text-sm text-white block">
                    {lang === 'ar' ? sec.titleAr : sec.titleEn}
                  </span>
                  <span className="text-[11px] text-slate-400 truncate block mt-0.5">
                    {sec.summary}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCurrentStep(sec.step)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 shrink-0 transition-colors cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'تعديل' : 'Edit'}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* Final Action Submission Bar */}
      <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
        <span className="text-xs text-slate-400 text-center sm:text-right rtl:sm:text-right ltr:sm:text-left">
          {lang === 'ar' 
            ? 'بالضغط على "تأكيد وإرسال الاستبيان"، سيتم حفظ الملف وتوليد خطة العمل والتقرير الاستراتيجي فوراً' 
            : 'Clicking submit will finalize the brief and generate the complete advertising strategy report'}
        </span>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 transition-all cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>{lang === 'ar' ? 'تأكيد وإرسال استبيان العميل' : 'Submit Onboarding Brief'}</span>
        </button>
      </div>

    </div>
  );
};
