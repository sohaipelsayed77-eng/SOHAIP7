import React from 'react';
import { useApp } from '../../../context/AppContext';
import { CHANNELS_LIST } from '../../../constants/initialData';
import { 
  History, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle,
  Users,
  Target
} from 'lucide-react';

export const StepMarketingHistory: React.FC = () => {
  const { lang, formData, updateFormData } = useApp();

  const toggleChannel = (channel: string) => {
    const current = formData.activeChannels || [];
    if (current.includes(channel)) {
      updateFormData({ activeChannels: current.filter(c => c !== channel) });
    } else {
      updateFormData({ activeChannels: [...current, channel] });
    }
  };

  const toggleObjective = (obj: string) => {
    const current = formData.previousObjectives || [];
    if (current.includes(obj)) {
      updateFormData({ previousObjectives: current.filter(o => o !== obj) });
    } else {
      updateFormData({ previousObjectives: [...current, obj] });
    }
  };

  const commonObjectives = [
    'Conversions (Purchases / Orders)',
    'Lead Generation (Instant Forms)',
    'WhatsApp / Messenger Conversations',
    'Catalog Sales (Dynamic Ads)',
    'Traffic to Website',
    'Brand Awareness & Reach',
    'Video Views & Engagement'
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <History className="w-6 h-6 text-blue-500" />
          <span>{lang === 'ar' ? '3. القنوات الإعلانية والتاريخ التسويقي السابق' : '3. Channels & Advertising History'}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {lang === 'ar' 
            ? 'تحليل الحملات السابقة يجنبنا تكرار الأخطاء ويوضح الزوايا الإعلانية التي حققت نجاحاً مثبت لدى جمهورك' 
            : 'Analyzing past campaigns ensures we build on what worked and avoid costly mistakes'}
        </p>
      </div>

      {/* Active Channels Checkboxes */}
      <div>
        <label className="block text-xs font-semibold text-slate-200 mb-2">
          {lang === 'ar' ? 'ما هي القنوات التسويقية التي تنشط عليها حالياً؟ (اختر كل ما ينطبق) *' : 'Which marketing channels are you currently active on? *'}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {CHANNELS_LIST.map((ch) => {
            const isChecked = (formData.activeChannels || []).includes(ch);
            return (
              <label
                key={ch}
                onClick={() => toggleChannel(ch)}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-blue-600/10 border-blue-500 text-white font-medium'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  readOnly
                  className="rounded border-slate-700 text-blue-600 focus:ring-0"
                />
                <span className="truncate">{ch}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Has Run Ads Before Toggle */}
      <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-sm font-semibold text-white block">
              {lang === 'ar' ? 'هل قمت بإطلاق حملات إعلانية ممولة من قبل؟ *' : 'Have you previously run paid ad campaigns? *'}
            </span>
            <span className="text-xs text-slate-400">
              {lang === 'ar' ? 'سواء بنفسك أو عبر ميديا باير أو وكالة تسويق سابقة' : 'Self-managed or via a previous media buyer/agency'}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              type="button"
              onClick={() => updateFormData({ hasRunAdsBefore: true })}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                formData.hasRunAdsBefore
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'ar' ? 'نعم، أطلقنا إعلانات' : 'Yes, ran ads'}
            </button>
            <button
              type="button"
              onClick={() => updateFormData({ hasRunAdsBefore: false })}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                !formData.hasRunAdsBefore
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'ar' ? 'لا، لم نطلق إعلانات بعد' : 'No prior ads'}
            </button>
          </div>
        </div>

        {/* Conditional Branch A: Has Run Ads Before */}
        {formData.hasRunAdsBefore ? (
          <div className="space-y-4 pt-2 border-t border-slate-800/80">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {lang === 'ar' ? 'متوسط الصرف الإعلاني الشهري السابق' : 'Past Monthly Ad Spend Range'}
                </label>
                <input
                  type="text"
                  value={formData.previousMonthlyAdSpend}
                  onChange={(e) => updateFormData({ previousMonthlyAdSpend: e.target.value })}
                  placeholder={lang === 'ar' ? 'مثال: 30,000 إلى 50,000 ج.م شهرياً' : 'e.g. $1,500 - $3,000/month'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {lang === 'ar' ? 'هل هناك وكالة أو ميديا باير آخر حالياً؟' : 'Other Agency / Media Buyer Status'}
                </label>
                <select
                  value={formData.otherAgencyOrBuyerInvolved}
                  onChange={(e) => updateFormData({ otherAgencyOrBuyerInvolved: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-blue-500"
                >
                  <option value="no">{lang === 'ar' ? 'لا، نحن نبحث عن ميديا باير لإدارة الحساب' : 'No, looking for full management'}</option>
                  <option value="currently_active">{lang === 'ar' ? 'نعم، يوجد باير حالي ونرغب في تدقيق أو استبدال' : 'Yes, currently active but looking to switch/audit'}</option>
                  <option value="recently_left">{lang === 'ar' ? 'كان هناك باير/وكالة وانتهى التعاقد مؤخراً' : 'Recently terminated with previous agency'}</option>
                  <option value="in_house_team">{lang === 'ar' ? 'لدينا فريق داخلي ونريد إشرافاً واستراتيجية متقدمة' : 'In-house team seeking strategic guidance'}</option>
                </select>
              </div>
            </div>

            {/* Historical CPA & ROAS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {lang === 'ar' ? 'متوسط تكلفة الاكتساب السابقة (CPA / CPL)' : 'Historical Cost Per Acquisition (CPA / CPL)'}
                </label>
                <input
                  type="text"
                  value={formData.historicalCPA || ''}
                  onChange={(e) => updateFormData({ historicalCPA: e.target.value })}
                  placeholder={lang === 'ar' ? 'مثال: 95 ج.م للطلب، أو 120 ج.م لليد' : 'e.g. $15 per order or $8 per lead'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {lang === 'ar' ? 'متوسط العائد الإعلاني السابق (ROAS إن وجد)' : 'Historical ROAS (Return On Ad Spend)'}
                </label>
                <input
                  type="text"
                  value={formData.historicalROAS || ''}
                  onChange={(e) => updateFormData({ historicalROAS: e.target.value })}
                  placeholder={lang === 'ar' ? 'مثال: 3.2x أو غير معروف' : 'e.g. 3.2x or unknown'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Best and Worst Campaigns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-emerald-300 mb-1 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'ar' ? 'أفضل الحملات أو الإعلانات أداءً' : 'Best Performing Campaigns'}</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.bestPerformingCampaigns}
                  onChange={(e) => updateFormData({ bestPerformingCampaigns: e.target.value })}
                  placeholder={lang === 'ar' ? 'ما نوع المحتوى أو العرض الذي حقق أعلى مبيعات؟' : 'Which angle or creative drove the highest volume?'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-rose-300 mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>{lang === 'ar' ? 'أسوأ الحملات أو التجارب غير الموفقة' : 'Worst Campaigns or Bottlenecks'}</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.worstCampaignsOrFailures}
                  onChange={(e) => updateFormData({ worstCampaignsOrFailures: e.target.value })}
                  placeholder={lang === 'ar' ? 'ما الذي لم ينجح في السابق؟ ما أكبر التحديات؟' : 'What failed previously or resulted in wasted spend?'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:border-rose-500"
                />
              </div>
            </div>

          </div>
        ) : (
          /* Conditional Branch B: First Time Running Ads */
          <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40 space-y-3">
            <div className="flex items-start gap-2.5 text-blue-300 text-xs">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <p>
                {lang === 'ar'
                  ? 'رائع! البدء من الصفر يسمح لنا ببناء هيكل الحملات وإعدادات التتبع والـ Pixel بصورة نظيفة وفق أفضل الممارسات.'
                  : 'Starting fresh allows us to establish clean pixel data, pristine campaign architecture, and avoid ad account legacy issues.'}
              </p>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-200 mb-1">
                {lang === 'ar' ? 'ما الذي دفعك لاتخاذ قرار إطلاق الإعلانات الممولة الآن؟ وما توقعاتك الأولية؟ *' : 'Why are you starting paid ads now? What are your initial expectations? *'}
              </label>
              <textarea
                rows={3}
                value={formData.expectationsFromAds || ''}
                onChange={(e) => updateFormData({ expectationsFromAds: e.target.value })}
                placeholder={lang === 'ar' ? 'مثال: نريد فتح مصدر تدفق مبيعات ثابت لمتجرنا، وتجربة تيك توك وإنستغرام...' : 'e.g. We want to establish a predictable customer acquisition channel for our new collection...'}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:border-blue-500"
              />
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
