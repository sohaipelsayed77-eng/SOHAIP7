import React from 'react';
import { useApp } from '../../../context/AppContext';
import { PRIMARY_GOALS_LIST } from '../../../constants/initialData';
import { 
  Target, 
  TrendingUp, 
  Calendar, 
  CheckSquare, 
  Award,
  Zap
} from 'lucide-react';

export const StepGoalsKPIs: React.FC = () => {
  const { lang, formData, updateFormData } = useApp();

  const toggleGoal = (id: string) => {
    const current = formData.primaryGoals || [];
    if (current.includes(id)) {
      updateFormData({ primaryGoals: current.filter(g => g !== id) });
    } else {
      updateFormData({ primaryGoals: [...current, id] });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Target className="w-6 h-6 text-blue-500" />
          <span>{lang === 'ar' ? '4. الأهداف البيعية ومؤشرات الأداء (Goals & KPIs)' : '4. Campaign Goals & Key Performance Indicators'}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {lang === 'ar' 
            ? 'تحديد أهداف رقمية واضحة ومحددة زمنياً هو البوصلة التي توجه الميديا باير نحو النجاح' 
            : 'Establishing clear, measurable goals defines our targeting, pacing, and optimization strategy'}
        </p>
      </div>

      {/* Primary Campaign Goals */}
      <div>
        <label className="block text-xs font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
          <CheckSquare className="w-4 h-4 text-blue-400" />
          <span>{lang === 'ar' ? 'ما هي الأهداف الرئيسية التي ترغب في تحقيقها من الحملات؟ *' : 'Primary Campaign Objectives *'}</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {PRIMARY_GOALS_LIST.map((goal) => {
            const isChecked = (formData.primaryGoals || []).includes(goal.id);
            return (
              <label
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                className={`flex items-center gap-3 p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                  isChecked
                    ? 'bg-blue-600/10 border-blue-500 text-white font-medium shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  readOnly
                  className="rounded border-slate-700 text-blue-600 focus:ring-0"
                />
                <span className="font-medium">{lang === 'ar' ? goal.labelAr : goal.labelEn}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Primary KPI & Cost Per Result */}
      <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-400" />
          <span>{lang === 'ar' ? 'المؤشر الأهم للنجاح والتكلفة المستهدفة (Primary KPI & Target CPA)' : 'Primary Success Metric & Target CPA'}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {lang === 'ar' ? 'المؤشر الأساسي الذي سنقيس بناءً عليه نجاح الحملة *' : 'Primary Optimization KPI *'}
            </label>
            <select
              value={formData.targetKPI}
              onChange={(e) => updateFormData({ targetKPI: e.target.value as any })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-blue-500"
            >
              <option value="roas">{lang === 'ar' ? 'العائد الإعلاني على الإنفاق (ROAS - مثلاً 3x إلى 4x)' : 'Return on Ad Spend (ROAS)'}</option>
              <option value="cpa">{lang === 'ar' ? 'تكلفة الطلب المكتمل (CPA - Cost Per Purchase)' : 'Cost Per Purchase (CPA)'}</option>
              <option value="lead_count">{lang === 'ar' ? 'تكلفة وعدد العملاء المحتملين المؤهلين (CPL)' : 'Cost Per Qualified Lead (CPL)'}</option>
              <option value="messages">{lang === 'ar' ? 'تكلفة المحادثة البيعية على الواتساب (Cost Per Message)' : 'Cost Per WhatsApp Message'}</option>
              <option value="revenue">{lang === 'ar' ? 'إجمالي الإيرادات البيعية المحققة (Total Revenue)' : 'Gross Sales Revenue'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {lang === 'ar' ? `التكلفة المستهدفة لكل نتيجة (Target Cost Per Result - ${formData.currency})` : `Target Cost Per Result (${formData.currency})`}
            </label>
            <input
              type="text"
              value={formData.targetCostPerResult}
              onChange={(e) => updateFormData({ targetCostPerResult: e.target.value })}
              placeholder={lang === 'ar' ? 'مثال: أقل من 90 ج.م للطلب' : 'e.g., Under $15 per order'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:border-blue-500"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">
              {lang === 'ar' ? 'الحد الأقصى الذي تكون فيه العملية رابحة لنشاطك' : 'Maximum allowable cost per acquisition'}
            </span>
          </div>
        </div>

        {/* Volume & Revenue Targets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {lang === 'ar' ? `هدف الإيرادات الشهرية المطلوب تحقيقه (${formData.currency})` : `Monthly Revenue Target (${formData.currency})`}
            </label>
            <input
              type="text"
              value={formData.monthlyRevenueTarget}
              onChange={(e) => updateFormData({ monthlyRevenueTarget: e.target.value })}
              placeholder={lang === 'ar' ? 'مثال: 500,000 ج.م شهرياً' : 'e.g. $50,000 / month'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {lang === 'ar' ? 'العدد المستهدف من الطلبات أو العملاء شهرياً' : 'Target Monthly Orders / Leads Volume'}
            </label>
            <input
              type="text"
              value={formData.monthlyLeadsOrOrdersTarget}
              onChange={(e) => updateFormData({ monthlyLeadsOrOrdersTarget: e.target.value })}
              placeholder={lang === 'ar' ? 'مثال: 400 إلى 600 طلب شهرياً' : 'e.g. 500 orders/month'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Timeframe & Growth Priorities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>{lang === 'ar' ? 'الإطار الزمني المستهدف لتحقيق هذه الأرقام' : 'Target Timeframe to Achieve KPIs'}</span>
          </label>
          <select
            value={formData.timeframeToAchieve}
            onChange={(e) => updateFormData({ timeframeToAchieve: e.target.value as any })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:border-blue-500"
          >
            <option value="1_month">{lang === 'ar' ? 'خلال شهر واحد (تحقيق نتائج أولية سريعة)' : '1 Month (Quick launch & validation)'}</option>
            <option value="3_months">{lang === 'ar' ? 'خلال 3 أشهر (فترة اختبار واستقرار مثالية)' : '3 Months (Recommended stabilization & scaling)'}</option>
            <option value="6_months">{lang === 'ar' ? 'خلال 6 أشهر (توسع تدريجي ومستدام)' : '6 Months (Sustainable scale)'}</option>
            <option value="12_months">{lang === 'ar' ? 'خلال سنة كاملة (بناء علامة تجارية راسخة)' : '12 Months (Long term brand authority)'}</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>{lang === 'ar' ? 'الأولويات الاستراتيجية (الربحية أم التوسع السريع؟)' : 'Strategic Priorities'}</span>
          </label>
          <input
            type="text"
            value={formData.growthPriorities}
            onChange={(e) => updateFormData({ growthPriorities: e.target.value })}
            placeholder={lang === 'ar' ? 'مثال: نفضل الربحية المستقرة والـ ROAS العالي أولاً قبل زيادة الصرف' : 'e.g., Focus on stable profitability & high ROAS before aggressive scaling'}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-blue-500"
          />
        </div>
      </div>

    </div>
  );
};
