import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  Printer, 
  LayoutDashboard, 
  PlusCircle, 
  Share2, 
  Sparkles,
  Download
} from 'lucide-react';

export const StepSuccess: React.FC = () => {
  const { lang, formData, resetForm, setCurrentView, setActiveBriefId, showToast, settings } = useApp();
  const [copied, setCopied] = useState(false);

  const confirmationMessage = lang === 'ar'
    ? `تم استلام استبيان العميل بنجاح! 🚀
العميل: ${formData.clientFullName}
العلامة التجارية: ${formData.businessName}
تصنيف النشاط: ${formData.businessCategory}
الميزانية المقترحة: ${formData.monthlyAdSpendCustom || formData.monthlyAdSpendBudgetRange} ${formData.currency}
الهدف الأهم: ${formData.targetKPI.toUpperCase()}
تاريخ الإرسال: ${new Date().toLocaleDateString('ar-EG')}

شكراً لك! سيقوم الميديا باير بمراجعة التفاصيل وتجهيز خطة اختبار الزوايا الإعلانية وموعد مكالمة التنسيق الأولى.`
    : `Client Onboarding Brief Submitted! 🚀
Client: ${formData.clientFullName}
Brand: ${formData.businessName}
Category: ${formData.businessCategory}
Target Budget: ${formData.monthlyAdSpendCustom || formData.monthlyAdSpendBudgetRange} ${formData.currency}
Target KPI: ${formData.targetKPI.toUpperCase()}
Date: ${new Date().toLocaleDateString('en-US')}

Thank you! The media buyer will review the brief and prepare the creative testing strategy for the initial discovery call.`;

  const copyConfirmation = () => {
    navigator.clipboard.writeText(confirmationMessage);
    setCopied(true);
    showToast(lang === 'ar' ? 'تم نسخ رسالة التأكيد للحافظة!' : 'Confirmation message copied!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  const openBriefInDashboard = () => {
    setActiveBriefId(formData.id);
    setCurrentView('dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 text-center">
      
      {/* Success Badge & Header */}
      <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/10">
        <CheckCircle2 className="w-8 h-8" />
      </div>

      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-3">
        <Sparkles className="w-3.5 h-3.5" />
        <span>{lang === 'ar' ? 'تم استلام الاستبيان وحفظه بنجاح' : 'Intake Successfully Saved'}</span>
      </span>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
        {lang === 'ar' ? `شكراً لك، ${formData.clientFullName}!` : `Thank you, ${formData.clientFullName}!`}
      </h1>

      <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed mb-8">
        {lang === 'ar'
          ? `تم حفظ ملف ${formData.businessName} بنجاح، وتوليد تقرير تدقيق الجاهزية الإعلانية وملخص خطة العمل المقترحة.`
          : `The brief for ${formData.businessName} has been saved and the readiness audit is ready for review.`}
      </p>

      {/* Copyable Confirmation Card */}
      <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-right rtl:text-right ltr:text-left space-y-3 mb-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Share2 className="w-3.5 h-3.5 text-blue-400" />
            <span>{lang === 'ar' ? 'رسالة التأكيد للمشاركة (WhatsApp / Email)' : 'Confirmation Message'}</span>
          </span>
          <button
            type="button"
            onClick={copyConfirmation}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-semibold transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (lang === 'ar' ? 'تم النسخ!' : 'Copied!') : (lang === 'ar' ? 'نسخ الرسالة' : 'Copy Message')}</span>
          </button>
        </div>

        <pre className="text-xs text-slate-300 font-sans whitespace-pre-line leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
          {confirmationMessage}
        </pre>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={openBriefInDashboard}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>{lang === 'ar' ? 'عرض التقرير الاستراتيجي في لوحة التحكم' : 'View Strategic Brief in Dashboard'}</span>
        </button>

        <button
          type="button"
          onClick={resetForm}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-emerald-400" />
          <span>{lang === 'ar' ? 'بدء استبيان عميل جديد' : 'New Client Intake'}</span>
        </button>
      </div>

    </div>
  );
};
