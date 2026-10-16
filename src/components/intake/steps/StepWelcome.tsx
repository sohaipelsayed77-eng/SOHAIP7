import React from 'react';
import { useApp } from '../../../context/AppContext';
import { 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  BarChart3, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Layers,
  FileCheck2,
  Lock
} from 'lucide-react';

export const StepWelcome: React.FC = () => {
  const { lang, dir, settings, setCurrentStep, formData } = useApp();

  const isRtl = dir === 'rtl';

  const hasDraft = formData.clientFullName || formData.businessName;

  const features = [
    {
      icon: Clock,
      titleAr: 'سريع ودقيق (7 - 10 دقائق)',
      titleEn: '7–10 Minutes to Complete',
      descAr: 'أسئلة موجهة ومركزة تغطي كافة جوانب الحملة دون إضاعة للوقت',
      descEn: 'Focused questions covering business, economics, and tracking'
    },
    {
      icon: BarChart3,
      titleAr: 'تدقيق الجاهزية الإعلانية (Ads Audit)',
      titleEn: 'Advertising Readiness Audit',
      descAr: 'تقييم فوري من 100 للبنية التقنية، هوامش الربح، والمحتوى الإبداعي',
      descEn: 'Instant 0-100 score on tracking, unit economics, and creative assets'
    },
    {
      icon: Layers,
      titleAr: 'توليد ملف العميل (Client Brief)',
      titleEn: 'Automated Strategic Brief',
      descAr: 'تلخيص احترافي يتضمن القنوات المقترحة، الثغرات، وأسئلة المقابلة الأولى',
      descEn: 'Executive summary with channel strategy, tracking gaps & discovery questions'
    },
    {
      icon: Lock,
      titleAr: 'خصوصية وأمان 100%',
      titleEn: '100% Confidential & Secure',
      descAr: 'لا نطلب كلمات مرور أو بيانات بطاقات؛ الصلاحيات عبر بوابات الأعمال الرسمية فقط',
      descEn: 'Zero passwords requested; partner permissions granted strictly via official business managers'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Top Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/60 border border-slate-800 p-8 sm:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{settings.agencyName} • {lang === 'ar' ? 'استبيان انضمام العملاء الجدد' : 'New Client Onboarding'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
            {lang === 'ar' 
              ? 'دراسة وتدقيق الجاهزية لإطلاق وتوسيع حملاتك الإعلانية' 
              : 'Strategic Client Onboarding & Performance Advertising Audit'}
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl whitespace-pre-line mb-8">
            {lang === 'ar' ? settings.welcomeMessageAr : settings.welcomeMessageEn}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setCurrentStep(1)}
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 transition-all cursor-pointer group"
            >
              <span>{hasDraft ? (lang === 'ar' ? 'متابعة ملء الاستبيان' : 'Resume Intake Form') : (lang === 'ar' ? 'بدء ملء الاستبيان الآن' : 'Start Intake Form')}</span>
              {isRtl ? (
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              )}
            </button>

            {hasDraft && (
              <span className="text-xs text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/20">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{lang === 'ar' ? 'تم استرجاع مسودتك المحفوظة تلقائياً' : 'Saved draft restored'}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Feature Value Props */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center text-blue-400 shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base text-slate-100 mb-1">
                  {lang === 'ar' ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {lang === 'ar' ? item.descAr : item.descEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Process Outline */}
      <div className="mt-8 p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <FileCheck2 className="w-4 h-4 text-blue-400" />
          <span>{lang === 'ar' ? 'مراحل الاستبيان (10 محاور رئيسية)' : 'Intake Sections Overview'}</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs text-slate-300">
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60 font-medium">1. ملف النشاط</div>
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60 font-medium">2. المنتجات والأسعار</div>
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60 font-medium">3. تاريخ الإعلانات</div>
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60 font-medium">4. الأهداف والـ KPIs</div>
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60 font-medium">5. الميزانية والوحدات</div>
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60 font-medium">6. الجمهور والمنافسون</div>
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60 font-medium">7. المواد الإبداعية</div>
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60 font-medium">8. المبيعات والتشغيل</div>
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60 font-medium">9. التتبع التقني (CAPI)</div>
          <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60 font-medium">10. الخصوصية والمراجعة</div>
        </div>
      </div>

    </div>
  );
};
