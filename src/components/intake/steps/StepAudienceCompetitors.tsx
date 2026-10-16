import React from 'react';
import { useApp } from '../../../context/AppContext';
import { 
  Users, 
  MapPin, 
  Globe2, 
  Swords, 
  Database, 
  MessageSquare, 
  HelpCircle,
  Link2
} from 'lucide-react';

export const StepAudienceCompetitors: React.FC = () => {
  const { lang, formData, updateFormData } = useApp();

  const toggleAgeRange = (range: string) => {
    const current = formData.audienceAgeRanges || [];
    if (current.includes(range)) {
      updateFormData({ audienceAgeRanges: current.filter(r => r !== range) });
    } else {
      updateFormData({ audienceAgeRanges: [...current, range] });
    }
  };

  const updateCompetitor = (index: number, field: 'name' | 'url' | 'notes', val: string) => {
    const comps = [...formData.competitors];
    if (!comps[index]) comps[index] = { name: '', url: '', notes: '' };
    comps[index][field] = val;
    updateFormData({ competitors: comps });
  };

  const ageBrackets = ['18-24', '25-34', '35-44', '45-54', '55+'];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Users className="w-6 h-6 text-blue-500" />
          <span>{lang === 'ar' ? '6. الجمهور المستهدف وتحليل المنافسين' : '6. Target Audience & Competitor Intelligence'}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {lang === 'ar' 
            ? 'تحديد دوافع الشراء ومخاوف العميل بدقة يساعدنا في كتابة إعلانات تلمس قلوبهم وتحفزهم على الشراء' 
            : 'Deep psychological understanding of your customer pain points drives our creative hooks'}
        </p>
      </div>

      {/* Demographics: Age & Gender */}
      <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          {lang === 'ar' ? 'البيانات الديموغرافية (العمر والنوع)' : 'Demographics & Target Profile'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              {lang === 'ar' ? 'الفئات العمرية الأكثر شراءً واهتماماً' : 'Primary Target Age Brackets'}
            </label>
            <div className="flex flex-wrap gap-2">
              {ageBrackets.map((range) => {
                const isChecked = (formData.audienceAgeRanges || []).includes(range);
                return (
                  <button
                    key={range}
                    type="button"
                    onClick={() => toggleAgeRange(range)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      isChecked
                        ? 'bg-blue-600 border-blue-500 text-white shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {range} {lang === 'ar' ? 'سنة' : 'yrs'}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              {lang === 'ar' ? 'النوع المستهدف' : 'Target Gender'}
            </label>
            <select
              value={formData.audienceGender}
              onChange={(e) => updateFormData({ audienceGender: e.target.value as any })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-blue-500"
            >
              <option value="all">{lang === 'ar' ? 'الجنسين معاً (رجال وسيدات)' : 'All Genders (Men & Women)'}</option>
              <option value="predominantly_female">{lang === 'ar' ? 'أغلبية من الإناث / سيدات' : 'Predominantly Female'}</option>
              <option value="predominantly_male">{lang === 'ar' ? 'أغلبية من الذكور / رجال' : 'Predominantly Male'}</option>
            </select>
          </div>
        </div>

        {/* Geographic Locations & Language */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === 'ar' ? 'المناطق الجغرافية والمدن المستهدفة *' : 'Geographic Locations & Cities *'}</span>
            </label>
            <input
              type="text"
              value={formData.geographicLocations}
              onChange={(e) => updateFormData({ geographicLocations: e.target.value })}
              placeholder={lang === 'ar' ? 'مثال: القاهرة الكبرى، الإسكندرية، الدلتا والمدن الساحلية' : 'e.g. Cairo, Giza, Alexandria, or GCC region'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>{lang === 'ar' ? 'لغة الإعلانات والتواصل الأساسية' : 'Primary Language for Ads'}</span>
            </label>
            <select
              value={formData.primaryLanguage}
              onChange={(e) => updateFormData({ primaryLanguage: e.target.value as any })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-blue-500"
            >
              <option value="arabic">{lang === 'ar' ? 'اللغة العربية (عامية ومبسطة قريبة للشارع)' : 'Arabic (Colloquial / Conversational)'}</option>
              <option value="english">{lang === 'ar' ? 'اللغة الإنجليزية' : 'English'}</option>
              <option value="bilingual">{lang === 'ar' ? 'ثنائية اللغة (Arabic & English)' : 'Bilingual (Arabic & English)'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Psychological Drivers: Pain Points, Motivations, Objections */}
      <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
          {lang === 'ar' ? 'سيكولوجية العميل: نقاط الألم والدوافع والاعتراضات' : 'Customer Psychology & Motivations'}
        </h3>

        <div className="space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {lang === 'ar' ? '1. ما هي أكبر نقطة ألم أو مشكلة يعاني منها العميل؟ (Pain Points) *' : '1. Core Customer Pain Points & Frustrations *'}
            </label>
            <textarea
              rows={2}
              value={formData.customerPainPoints}
              onChange={(e) => updateFormData({ customerPainPoints: e.target.value })}
              placeholder={lang === 'ar' ? 'مثال: الخوف من شراء ملابس وتطلع خامة رديئة أو المقاس غير مضبوط، أو صعوبة إيجاد خدمة موثوقة...' : 'e.g. Fear of buying clothes online and receiving poor material or wrong sizing...'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-600 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {lang === 'ar' ? '2. ما هي دوافع الشراء الأساسية؟ (Purchase Motivations)' : '2. Key Purchase Motivations & Desired Transformation'}
            </label>
            <textarea
              rows={2}
              value={formData.purchaseMotivations}
              onChange={(e) => updateFormData({ purchaseMotivations: e.target.value })}
              placeholder={lang === 'ar' ? 'مثال: التميز بمظهر شيك وجذاب، توفير الوقت، الإحساس بالأمان والضمان الممتد...' : 'e.g., Looking prestigious, feeling confident, convenience, and lifetime guarantee...'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-600 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {lang === 'ar' ? '3. ما هي أكثر الاعتراضات والأسئلة التي يكررها العملاء قبل الدفع؟ (Common Objections)' : '3. Frequent Objections Raised Before Paying'}
            </label>
            <textarea
              rows={2}
              value={formData.commonObjections}
              onChange={(e) => updateFormData({ commonObjections: e.target.value })}
              placeholder={lang === 'ar' ? 'مثال: هل المنتج أصلي؟ هل ينفع استبدال لو طلع المقاس ضيق؟ كم مصاريف الشحن لمحافظتي؟' : 'e.g., Is this authentic? Can I return or exchange if the fit is wrong? What is shipping cost?'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-600 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Customer Database Availability for Lookalikes */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-semibold text-white block flex items-center gap-1.5">
            <Database className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'ar' ? 'هل تمتلك قاعدة بيانات عملاء سابقين؟ (Customer Database)' : 'Do you have an existing customer list?'}</span>
          </span>
          <span className="text-[11px] text-slate-400">
            {lang === 'ar' ? 'أرقام هواتف وإيميلات لإنشاء جماهير مشابهة (Lookalike Audiences) فائقة الدقة' : 'Enables custom audiences and 1% Lookalike algorithmic targeting'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => updateFormData({ hasCustomerDatabase: true })}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              formData.hasCustomerDatabase ? 'bg-blue-600 text-white' : 'bg-slate-950 text-slate-400'
            }`}
          >
            {lang === 'ar' ? 'نعم، لدينا قائمة' : 'Yes, ready'}
          </button>
          <button
            type="button"
            onClick={() => updateFormData({ hasCustomerDatabase: false })}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              !formData.hasCustomerDatabase ? 'bg-blue-600 text-white' : 'bg-slate-950 text-slate-400'
            }`}
          >
            {lang === 'ar' ? 'لا، غير متوفرة' : 'No'}
          </button>
        </div>
      </div>

      {formData.hasCustomerDatabase && (
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
          <label className="block text-[11px] text-slate-400 mb-1">
            {lang === 'ar' ? 'حجم القائمة ونوع البيانات' : 'List size and data types available'}
          </label>
          <input
            type="text"
            value={formData.customerDatabaseSize || ''}
            onChange={(e) => updateFormData({ customerDatabaseSize: e.target.value })}
            placeholder={lang === 'ar' ? 'مثال: 3,000 رقم هاتف لعملاء أتموا الشراء بالفعل' : 'e.g. 2,500 verified phone numbers and emails'}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
          />
        </div>
      )}

      {/* Top 3 Competitors */}
      <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <Swords className="w-4 h-4 text-rose-400" />
          <span>{lang === 'ar' ? 'أبرز 3 منافسين مباشرين وروابطهم العامة' : 'Top 3 Direct Competitors'}</span>
        </h3>
        <p className="text-xs text-slate-400">
          {lang === 'ar' 
            ? 'سنقوم بدراسة إعلاناتهم النشطة في مكتبة إعلانات فيسبوك (Meta Ad Library) لمعرفة ما ينجح معهم' 
            : 'We audit their active ads in the Meta Ad Library to identify market opportunities'}
        </p>

        <div className="space-y-3">
          {[0, 1, 2].map((idx) => (
            <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">
                  {lang === 'ar' ? `اسم المنافس #${idx + 1}` : `Competitor #${idx + 1} Name`}
                </label>
                <input
                  type="text"
                  value={formData.competitors[idx]?.name || ''}
                  onChange={(e) => updateCompetitor(idx, 'name', e.target.value)}
                  placeholder={lang === 'ar' ? 'مثال: Brand X' : 'e.g., Brand X'}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">
                  {lang === 'ar' ? 'رابط الموقع أو الصفحة العامة' : 'Public URL / Social Page'}
                </label>
                <input
                  type="text"
                  value={formData.competitors[idx]?.url || ''}
                  onChange={(e) => updateCompetitor(idx, 'url', e.target.value)}
                  placeholder="https://competitor.com"
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white text-left"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">
                  {lang === 'ar' ? 'نقطة تميزهم أو عيبهم' : 'Their advantage or drawback'}
                </label>
                <input
                  type="text"
                  value={formData.competitors[idx]?.notes || ''}
                  onChange={(e) => updateCompetitor(idx, 'notes', e.target.value)}
                  placeholder={lang === 'ar' ? 'مثال: فيديوهاتهم قوية لكن أسعارهم عالية' : 'e.g. Great videos, but slower shipping'}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
