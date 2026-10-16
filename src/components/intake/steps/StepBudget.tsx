import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Currency } from '../../../types';
import { 
  DollarSign, 
  Wallet, 
  Layers, 
  Video, 
  Globe2, 
  ShieldAlert,
  Info
} from 'lucide-react';

export const StepBudget: React.FC = () => {
  const { lang, formData, updateFormData } = useApp();

  const currencies: { code: Currency; nameAr: string; nameEn: string; symbol: string }[] = [
    { code: 'EGP', nameAr: 'جنيه مصري (EGP)', nameEn: 'Egyptian Pound (EGP)', symbol: 'ج.م' },
    { code: 'USD', nameAr: 'دولار أمريكي (USD)', nameEn: 'US Dollar (USD)', symbol: '$' },
    { code: 'SAR', nameAr: 'ريال سعودي (SAR)', nameEn: 'Saudi Riyal (SAR)', symbol: 'ر.س' },
    { code: 'AED', nameAr: 'درهم إماراتي (AED)', nameEn: 'UAE Dirham (AED)', symbol: 'د.إ' },
    { code: 'EUR', nameAr: 'يورو (EUR)', nameEn: 'Euro (EUR)', symbol: '€' }
  ];

  const egpBudgetRanges = [
    '15,000 - 30,000',
    '30,000 - 60,000',
    '60,000 - 100,000',
    '100,000 - 200,000',
    '200,000+'
  ];

  const usdBudgetRanges = [
    '$1,000 - $2,500',
    '$2,500 - $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000+'
  ];

  const rangesToDisplay = formData.currency === 'USD' || formData.currency === 'EUR' ? usdBudgetRanges : egpBudgetRanges;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Wallet className="w-6 h-6 text-blue-500" />
          <span>{lang === 'ar' ? '5. الميزانية الإعلانية والاقتصاديات التشغيلية' : '5. Ad Spend Budget & Cost Allocation'}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {lang === 'ar' 
            ? 'تحديد وتوزيع الميزانية بدقة بين منصات الإعلانات، أتعاب الإدارة، وإنتاج المحتوى' 
            : 'Distinguishing platform ad spend from management fees and creative production'}
        </p>
      </div>

      {/* Currency Selector */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-semibold text-slate-200 block">
            {lang === 'ar' ? 'العملة المعتمدة لحسابات الحملة' : 'Preferred Campaign Currency'}
          </span>
          <span className="text-[11px] text-slate-400">
            {lang === 'ar' ? 'العملة الافتراضية هي الجنيه المصري (EGP) ويمكنك اختيار عملة أخرى' : 'Default is EGP, switch if billing in USD/SAR/AED'}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {currencies.map((curr) => (
            <button
              key={curr.code}
              type="button"
              onClick={() => updateFormData({ currency: curr.code })}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                formData.currency === curr.code
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {curr.code}
            </button>
          ))}
        </div>
      </div>

      {/* Important Distinction Banner */}
      <div className="p-4 rounded-2xl bg-blue-950/30 border border-blue-900/50 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs text-blue-200 leading-relaxed">
          <strong className="font-semibold block mb-1 text-white">
            {lang === 'ar' ? 'توضيح مالي جوهري (ميزانية الإعلانات vs التكاليف الأخرى):' : 'Essential Financial Distinction:'}
          </strong>
          {lang === 'ar' ? (
            <span>
              ميزانية الإعلانات الشهرية (Ad Spend) تُدفع <strong>مباشرة لمنصات الإعلانات (Meta / Google / TikTok)</strong> من بطاقتك البنكية الخاصة، وهي منفصلة تماماً عن:
              أتعاب الميديا باير، تكاليف تصوير الفيديوهات وجلسات الـ UGC، أو اشتراكات المتاجر والسيرفرات.
            </span>
          ) : (
            <span>
              Monthly ad spend goes <strong>directly to ad platforms (Meta/Google/TikTok)</strong> and is completely separate from:
              media buyer management fees, video/UGC production costs, and web development expenses.
            </span>
          )}
        </div>
      </div>

      {/* Monthly Ad Spend Budget (Ranges + Custom) */}
      <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
        <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider">
          {lang === 'ar' ? `الميزانية الشهرية المقترحة لإعلانات المنصات فقط (${formData.currency}) *` : `Target Monthly Platform Ad Spend (${formData.currency}) *`}
        </label>

        {/* Quick Range Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {rangesToDisplay.map((range) => {
            const isSelected = formData.monthlyAdSpendBudgetRange === range;
            return (
              <button
                key={range}
                type="button"
                onClick={() => updateFormData({ monthlyAdSpendBudgetRange: range })}
                className={`py-2.5 px-2 rounded-xl text-xs font-semibold border transition-all text-center ${
                  isSelected
                    ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {range} {formData.currency}
              </button>
            );
          })}
        </div>

        {/* Custom Input */}
        <div className="pt-2">
          <label className="block text-[11px] text-slate-400 mb-1">
            {lang === 'ar' ? `أو أدخل رقماً محدداً بدقة (${formData.currency})` : `Or specify an exact amount (${formData.currency})`}
          </label>
          <div className="relative">
            <DollarSign className="w-4 h-4 text-slate-400 absolute top-3.5 right-3.5 rtl:right-3.5 rtl:left-auto ltr:left-3.5 ltr:right-auto pointer-events-none" />
            <input
              type="number"
              value={formData.monthlyAdSpendCustom}
              onChange={(e) => updateFormData({ monthlyAdSpendCustom: e.target.value === '' ? '' : Number(e.target.value) })}
              placeholder={formData.currency === 'EGP' ? '50000' : '2500'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-blue-500 rtl:pr-10 ltr:pl-10"
            />
          </div>
        </div>
      </div>

      {/* Auxiliary Budgets: Management Fee, Creatives, Web Dev */}
      <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>{lang === 'ar' ? 'الميزانيات الإضافية المخصصة (أتعاب، صناعة محتوى، تطوير ويب)' : 'Allocated Auxiliary Budgets'}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
              <Wallet className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === 'ar' ? 'أتعاب الميديا باير المقدرة' : 'Estimated Media Buyer Fee'}</span>
            </label>
            <input
              type="text"
              value={formData.allocatedMediaBuyerFee}
              onChange={(e) => updateFormData({ allocatedMediaBuyerFee: e.target.value })}
              placeholder={lang === 'ar' ? 'راتب شهري ثابت أو نسبة عمولة' : 'Monthly retainer or % rev-share'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
              <Video className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'ar' ? 'ميزانية تصوير وإنتاج المحتوى' : 'Creative Production Budget'}</span>
            </label>
            <input
              type="text"
              value={formData.allocatedCreativeBudget}
              onChange={(e) => updateFormData({ allocatedCreativeBudget: e.target.value })}
              placeholder={lang === 'ar' ? 'شهرياً لصناع المحتوى والجلسات' : 'Monthly for UGC & editors'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
              <Globe2 className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'ar' ? 'تطوير المتجر وصفحات الهبوط' : 'Website & Landing Pages'}</span>
            </label>
            <input
              type="text"
              value={formData.allocatedWebDevBudget}
              onChange={(e) => updateFormData({ allocatedWebDevBudget: e.target.value })}
              placeholder={lang === 'ar' ? 'لتحسين سرعة وتجربة المتجر' : 'CRO & funnel improvements'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* No Guarantee Legal Transparency Disclaimer */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-400 leading-relaxed">
          <strong className="text-slate-200 font-semibold block mb-0.5">
            {lang === 'ar' ? 'إقرار واحترافية مهنية:' : 'Professional Non-Guarantee Disclaimer:'}
          </strong>
          {lang === 'ar' ? (
            <span>
              نتبع منهجية علمية مبنية على فحص البيانات واختبار الزوايا الإعلانية بدقة.
              لا يوجد أي ميديا باير أو مسوق محترف يضمن أرقام مبيعات قطعية مسبقاً، لأن النتائج تتأثر أيضاً بجاذبية العرض وقوة المنتج وسرعة التوصيل وخدمة العملاء.
            </span>
          ) : (
            <span>
              We utilize data-driven testing protocols. No professional media buyer can guarantee fixed sales numbers in advance, as performance relies equally on product-market fit, offer strength, customer service, and inventory reliability.
            </span>
          )}
        </div>
      </div>

    </div>
  );
};
