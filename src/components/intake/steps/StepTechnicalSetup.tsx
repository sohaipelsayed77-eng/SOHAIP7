import React from 'react';
import { useApp } from '../../../context/AppContext';
import { TECH_ITEMS } from '../../../constants/initialData';
import { AuditStatus } from '../../../types';
import { 
  Cpu, 
  ShieldCheck, 
  Lock, 
  AlertOctagon, 
  Check, 
  X, 
  HelpCircle, 
  Minus,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export const StepTechnicalSetup: React.FC = () => {
  const { lang, formData, updateFormData } = useApp();

  const handleStatusChange = (key: any, val: AuditStatus) => {
    updateFormData({ [key]: val } as any);
  };

  const statusOptions: { value: AuditStatus; labelAr: string; labelEn: string; color: string }[] = [
    { value: 'yes', labelAr: 'نعم، مفعل', labelEn: 'Yes, Active', color: 'emerald' },
    { value: 'no', labelAr: 'لا، غير متوفر', labelEn: 'No', color: 'rose' },
    { value: 'not_sure', labelAr: 'غير متأكد', labelEn: 'Not Sure', color: 'amber' },
    { value: 'not_applicable', labelAr: 'غير منطبق', labelEn: 'N/A', color: 'slate' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Cpu className="w-6 h-6 text-blue-500" />
          <span>{lang === 'ar' ? '9. تدقيق البنية التقنية والتتبع (Technical Tracking Audit)' : '9. Tracking Infrastructure & Platform Permissions'}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {lang === 'ar' 
            ? 'فحص جاهزية حسابات الأعمال والبيكسل وإشارات السيرفر (CAPI) لضمان عدم إهدار أي دولار إعلاني' 
            : 'Auditing your tracking health, server-side signals (CAPI), and partner access pathways'}
        </p>
      </div>

      {/* Strict Security Policy Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 to-slate-900 border border-blue-500/30 shadow-lg">
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-1">
              <span>{lang === 'ar' ? 'بروتوكول الأمان الصارم للبيانات والصلاحيات:' : 'Strict Security & Access Protocol:'}</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                100% Zero-Password
              </span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'ar' ? (
                <>
                  نحن <strong>لا نطلب مطلقاً</strong> كلمات مرور حساباتك الشخصية، أو رموز التحقق (OTP)، أو أرقام بطاقات الدفع البنكية، أو مفاتيح API السرية.
                  يتم منح صلاحيات الميديا باير حصراً وبأمان كامل من خلال <strong>بوابات الأعمال الرسمية المعتمدة</strong>:
                  طلب شراكة (Partner Access) عبر Meta Business Portfolio برقم التعريف (Business ID)، وربط حساب إعلانات Google عبر حساب المدير (MCC).
                </>
              ) : (
                <>
                  We <strong>never request</strong> your personal account passwords, verification OTPs, payment card details, or secret API keys.
                  Media buyer access is granted securely via <strong>official platform partner channels</strong>:
                  Meta Partner Access via Business Portfolio ID, and Google Ads MCC manager linking.
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Tech Items Checklist Table */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
        <div className="hidden sm:grid grid-cols-12 gap-3 pb-2 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
          <div className="col-span-6">{lang === 'ar' ? 'الأصل التقني والتتبع' : 'Technical Asset'}</div>
          <div className="col-span-6 text-center">{lang === 'ar' ? 'حالة التفعيل والجاهزية' : 'Status'}</div>
        </div>

        <div className="space-y-3">
          {TECH_ITEMS.map((item) => {
            const currentStatus = (formData as any)[item.key] as AuditStatus;

            return (
              <div 
                key={item.key}
                className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-slate-700/80 transition-all flex flex-col sm:grid sm:grid-cols-12 sm:items-center gap-3"
              >
                {/* Title & Desc */}
                <div className="sm:col-span-6">
                  <span className="font-semibold text-xs sm:text-sm text-slate-100 block">
                    {lang === 'ar' ? item.labelAr : item.labelEn}
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {lang === 'ar' ? item.descAr : item.descEn}
                  </span>
                </div>

                {/* Status Pills */}
                <div className="sm:col-span-6 flex flex-wrap sm:justify-end items-center gap-1.5">
                  {statusOptions.map((opt) => {
                    const isSelected = currentStatus === opt.value;
                    let activeClass = '';
                    if (isSelected) {
                      if (opt.value === 'yes') activeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm';
                      else if (opt.value === 'no') activeClass = 'bg-rose-500/20 text-rose-300 border-rose-500/50 shadow-sm';
                      else if (opt.value === 'not_sure') activeClass = 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-sm';
                      else activeClass = 'bg-slate-800 text-slate-300 border-slate-700';
                    } else {
                      activeClass = 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200';
                    }

                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleStatusChange(item.key, opt.value)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${activeClass}`}
                      >
                        {isSelected && opt.value === 'yes' && <Check className="w-3 h-3 inline mr-1 rtl:ml-1" />}
                        {isSelected && opt.value === 'no' && <X className="w-3 h-3 inline mr-1 rtl:ml-1" />}
                        {isSelected && opt.value === 'not_sure' && <HelpCircle className="w-3 h-3 inline mr-1 rtl:ml-1" />}
                        <span>{lang === 'ar' ? opt.labelAr : opt.labelEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Technical Notes */}
      <div>
        <label className="block text-xs font-semibold text-slate-200 mb-1.5">
          {lang === 'ar' ? 'ملاحظات فنية أو تفاصيل إضافية حول التتبع والحسابات' : 'Additional Technical Notes & Questions'}
        </label>
        <textarea
          rows={2}
          value={formData.techSetupNotes}
          onChange={(e) => updateFormData({ techSetupNotes: e.target.value })}
          placeholder={lang === 'ar' ? 'مثال: المتجر على شوبيفاي ونحتاج مساعدة في ربط دومين فيسبوك وCAPI...' : 'e.g., We use Shopify and require assistance configuring Conversions API gateway...'}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-blue-500"
        />
      </div>

    </div>
  );
};
