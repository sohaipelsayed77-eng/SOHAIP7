import React from 'react';
import { useApp } from '../../../context/AppContext';
import { 
  CalendarClock, 
  ShieldCheck, 
  FileText, 
  AlertCircle, 
  HelpCircle,
  Clock
} from 'lucide-react';

export const StepTimelineConsent: React.FC = () => {
  const { lang, formData, updateFormData, settings } = useApp();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <CalendarClock className="w-6 h-6 text-blue-500" />
          <span>{lang === 'ar' ? '10. الجدول الزمني، الملاحظات، وإقرار الخصوصية' : '10. Timeline, Launch Readiness & Privacy Consent'}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {lang === 'ar' 
            ? 'الموعد المستهدف للإطلاق والموافقة على سياسة الخصوصية وسرية البيانات' 
            : 'Target launch dates, operational constraints, and data confidentiality agreement'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-blue-400" />
            <span>{lang === 'ar' ? 'الموعد المستهدف لبدء إطلاق الحملات *' : 'Target Launch Date *'}</span>
          </label>
          <input
            type="text"
            required
            value={formData.targetLaunchDate}
            onChange={(e) => updateFormData({ targetLaunchDate: e.target.value })}
            placeholder={lang === 'ar' ? 'مثال: خلال 7 إلى 10 أيام عمل' : 'e.g. Within 7-10 business days'}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'ar' ? 'كيف تعرفت علينا؟ (How did you hear about us)' : 'How did you hear about us?'}</span>
          </label>
          <input
            type="text"
            value={formData.howDidYouHearAboutUs}
            onChange={(e) => updateFormData({ howDidYouHearAboutUs: e.target.value })}
            placeholder={lang === 'ar' ? 'مثال: ترشيح من صديق / لينكد إن / إنستغرام...' : 'e.g. Referral from a founder / LinkedIn / Instagram'}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Operational Constraints */}
      <div>
        <label className="block text-xs font-semibold text-slate-200 mb-1.5">
          {lang === 'ar' ? 'أي قيود أو مواسم خاصة أو ملاحظات حاسمة يجب مراعاتها؟' : 'Any special seasonality, deadlines, or operational constraints?'}
        </label>
        <textarea
          rows={3}
          value={formData.additionalConstraints}
          onChange={(e) => updateFormData({ additionalConstraints: e.target.value })}
          placeholder={lang === 'ar' ? 'مثال: لدينا إطلاق موسم شتوي جديد، أو مناسبة خاصة تنتهي في نهاية الشهر...' : 'e.g. Black Friday season upcoming, or special brand anniversary promotions...'}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-blue-500"
        />
      </div>

      {/* Privacy Notice Box */}
      <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-slate-200 font-bold text-sm">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>{lang === 'ar' ? 'إشعار الخصوصية وسرية البيانات (Privacy & Confidentiality)' : 'Privacy & Data Protection Notice'}</span>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 leading-relaxed max-h-48 overflow-y-auto whitespace-pre-line">
          {lang === 'ar' ? settings.privacyPolicyAr : settings.privacyPolicyEn}
        </div>

        <p className="text-[11px] text-slate-400">
          {lang === 'ar' 
            ? 'يمكنك طلب تعديل أو حذف نسختك في أي وقت عبر التواصل المباشر مع إدارة الحساب.' 
            : 'You may request modification or complete deletion of your records at any time by contacting us.'}
        </p>

        {/* Mandatory Explicit Consent Checkbox */}
        <label className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
          formData.privacyConsentAgreed
            ? 'bg-blue-600/10 border-blue-500 text-white font-medium shadow-sm'
            : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
        }`}>
          <input
            type="checkbox"
            required
            checked={formData.privacyConsentAgreed}
            onChange={(e) => updateFormData({ 
              privacyConsentAgreed: e.target.checked,
              termsAgreedTimestamp: e.target.checked ? new Date().toISOString() : undefined
            })}
            className="mt-0.5 rounded border-slate-700 text-blue-600 focus:ring-0 shrink-0"
          />
          <span className="text-xs sm:text-sm leading-snug">
            {lang === 'ar' 
              ? 'أقر بأنني راجعت سياسة الخصوصية وأوافق على مشاركة البيانات المذكورة أعلاه لغرض دراسة وتدقيق وإدارة الحملات الإعلانية، وأفهم أن منح الصلاحيات يتم عبر قنوات منصات الإعلانات الرسمية فقط. *' 
              : 'I confirm that I have reviewed the privacy notice and consent to sharing the business information above for ads auditing and campaign management via official platform partner channels. *'}
          </span>
        </label>
      </div>

    </div>
  );
};
