import React from 'react';
import { useApp } from '../../../context/AppContext';
import { 
  CATEGORY_OPTIONS, 
  BUSINESS_MODEL_OPTIONS 
} from '../../../constants/initialData';
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Share2,
  AlertCircle
} from 'lucide-react';

export const StepBusinessProfile: React.FC = () => {
  const { lang, formData, updateFormData } = useApp();

  return (
    <div className="space-y-6">
      
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Building2 className="w-6 h-6 text-blue-500" />
          <span>{lang === 'ar' ? '1. معلومات النشاط التجاري وصاحب القرار' : '1. Business Profile & Decision-Maker'}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {lang === 'ar' 
            ? 'المعلومات الأساسية للتعرف على هويتك التجارية وتحديد القنوات المناسبة للتواصل والتعاقد' 
            : 'Core business identity and decision-maker contact details'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Client Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5">
            {lang === 'ar' ? 'الاسم الكامل للعميل / صاحب القرار *' : 'Client / Decision-Maker Full Name *'}
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute top-3.5 right-3.5 rtl:right-3.5 rtl:left-auto ltr:left-3.5 ltr:right-auto pointer-events-none" />
            <input
              type="text"
              required
              value={formData.clientFullName}
              onChange={(e) => updateFormData({ clientFullName: e.target.value })}
              placeholder={lang === 'ar' ? 'مثال: كريم المنشاوي' : 'e.g., Karim El-Minshawy'}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors rtl:pr-10 ltr:pl-10"
            />
          </div>
        </div>

        {/* Business / Brand Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5">
            {lang === 'ar' ? 'اسم العلامة التجارية أو النشاط التجاري *' : 'Business / Brand Name *'}
          </label>
          <div className="relative">
            <Building2 className="w-4 h-4 text-slate-400 absolute top-3.5 right-3.5 rtl:right-3.5 rtl:left-auto ltr:left-3.5 ltr:right-auto pointer-events-none" />
            <input
              type="text"
              required
              value={formData.businessName}
              onChange={(e) => updateFormData({ businessName: e.target.value })}
              placeholder={lang === 'ar' ? 'مثال: Urban Fashion Hub' : 'e.g., Urban Fashion Hub'}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors rtl:pr-10 ltr:pl-10"
            />
          </div>
        </div>

        {/* Business Category */}
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5">
            {lang === 'ar' ? 'تصنيف النشاط أو الصناعة *' : 'Business Industry / Category *'}
          </label>
          <select
            value={formData.businessCategory}
            onChange={(e) => updateFormData({ businessCategory: e.target.value })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat.id} value={cat.id} className="bg-slate-900 text-white">
                {lang === 'ar' ? cat.labelAr : cat.labelEn}
              </option>
            ))}
          </select>
        </div>

        {/* Decision-Maker Status */}
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5">
            {lang === 'ar' ? 'صفتك / دورك في اتخاذ القرار *' : 'Your Role / Decision-Maker Status *'}
          </label>
          <select
            value={formData.decisionMakerRole}
            onChange={(e) => updateFormData({ decisionMakerRole: e.target.value as any })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
          >
            <option value="owner_founder">{lang === 'ar' ? 'المؤسس / المالك (Owner / Founder)' : 'Owner / Founder'}</option>
            <option value="marketing_director">{lang === 'ar' ? 'مدير التسويق (Marketing Director / Head of Growth)' : 'Marketing Director / Head of Growth'}</option>
            <option value="general_manager">{lang === 'ar' ? 'المدير التنفيذي أو العام (CEO / General Manager)' : 'CEO / General Manager'}</option>
            <option value="partner">{lang === 'ar' ? 'شريك في العمل (Managing Partner)' : 'Managing Partner'}</option>
            <option value="other">{lang === 'ar' ? 'دور آخر' : 'Other'}</option>
          </select>
        </div>

        {/* Contact Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5">
            {lang === 'ar' ? 'البريد الإلكتروني للعمل *' : 'Business Email Address *'}
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute top-3.5 right-3.5 rtl:right-3.5 rtl:left-auto ltr:left-3.5 ltr:right-auto pointer-events-none" />
            <input
              type="email"
              required
              value={formData.contactEmail}
              onChange={(e) => updateFormData({ contactEmail: e.target.value })}
              placeholder="name@business.com"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors rtl:pr-10 ltr:pl-10"
            />
          </div>
        </div>

        {/* WhatsApp Phone Number */}
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5">
            {lang === 'ar' ? 'رقم الواتساب للتواصل المباشر *' : 'WhatsApp Phone Number *'}
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute top-3.5 right-3.5 rtl:right-3.5 rtl:left-auto ltr:left-3.5 ltr:right-auto pointer-events-none" />
            <input
              type="tel"
              required
              value={formData.whatsappNumber}
              onChange={(e) => updateFormData({ whatsappNumber: e.target.value })}
              placeholder="+20 100 000 0000"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors rtl:pr-10 ltr:pl-10 text-left"
              dir="ltr"
            />
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            {lang === 'ar' ? 'يرجى كتابة كود الدولة (+20 لمصر، +966 للسعودية، إلخ)' : 'Include international country code'}
          </span>
        </div>

        {/* Country & Target Markets */}
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5">
            {lang === 'ar' ? 'بلد التأسيس والمقر الرئيسي *' : 'Headquarters / Base Country *'}
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute top-3.5 right-3.5 rtl:right-3.5 rtl:left-auto ltr:left-3.5 ltr:right-auto pointer-events-none" />
            <input
              type="text"
              value={formData.country}
              onChange={(e) => updateFormData({ country: e.target.value })}
              placeholder={lang === 'ar' ? 'مثال: مصر / الإمارات / السعودية' : 'e.g. Egypt / UAE / Saudi Arabia'}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors rtl:pr-10 ltr:pl-10"
            />
          </div>
        </div>

        {/* Business Age */}
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5">
            {lang === 'ar' ? 'عمر النشاط التجاري في السوق *' : 'Business Age / Years Operating *'}
          </label>
          <div className="relative">
            <Calendar className="w-4 h-4 text-slate-400 absolute top-3.5 right-3.5 rtl:right-3.5 rtl:left-auto ltr:left-3.5 ltr:right-auto pointer-events-none" />
            <select
              value={formData.businessAge}
              onChange={(e) => updateFormData({ businessAge: e.target.value as any })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors rtl:pr-10 ltr:pl-10"
            >
              <option value="< 6 months">{lang === 'ar' ? 'أقل من 6 أشهر (إطلاق جديد)' : 'Less than 6 months (New Launch)'}</option>
              <option value="6-12 months">{lang === 'ar' ? 'من 6 أشهر إلى سنة' : '6 to 12 months'}</option>
              <option value="1-3 years">{lang === 'ar' ? 'من سنة إلى 3 سنوات (مستقر ومثبت)' : '1 to 3 years'}</option>
              <option value="3+ years">{lang === 'ar' ? 'أكثر من 3 سنوات (نشاط راسخ)' : '3+ years (Established)'}</option>
            </select>
          </div>
        </div>

      </div>

      {/* Business Model Selection Cards */}
      <div className="pt-2">
        <label className="block text-xs font-semibold text-slate-200 mb-2">
          {lang === 'ar' ? 'نموذج العمل الأساسي (Business Model) *' : 'Core Business Model *'}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {BUSINESS_MODEL_OPTIONS.map((model) => {
            const isSelected = formData.businessModel === model.id;
            return (
              <div
                key={model.id}
                onClick={() => updateFormData({ businessModel: model.id as any })}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-blue-600/10 border-blue-500 text-white shadow-md shadow-blue-500/10'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm">
                    {lang === 'ar' ? model.labelAr : model.labelEn}
                  </span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-blue-400 bg-blue-500' : 'border-slate-600'
                  }`}>
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-normal">
                  {lang === 'ar' ? model.descAr : model.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Website & Store Presence (Conditional Logic) */}
      <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-sm font-semibold text-white block">
              {lang === 'ar' ? 'هل يمتلك النشاط موقعاً إلكترونياً أو متجراً للشراء؟' : 'Do you have an active website or e-commerce store?'}
            </span>
            <span className="text-xs text-slate-400">
              {lang === 'ar' ? 'شوبيفاي، ووكومرس، سلة، زد، أو موقع مخصص' : 'Shopify, WooCommerce, Salla, Zid, or custom web platform'}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
            <button
              type="button"
              onClick={() => updateFormData({ hasWebsite: true })}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                formData.hasWebsite
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'ar' ? 'نعم، لدينا موقع' : 'Yes, active website'}
            </button>
            <button
              type="button"
              onClick={() => updateFormData({ hasWebsite: false })}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                !formData.hasWebsite
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang === 'ar' ? 'لا، نعتمد على الواتساب/السوشيال' : 'No, social/WhatsApp only'}
            </button>
          </div>
        </div>

        {/* Conditional Field: Website URL if Yes */}
        {formData.hasWebsite ? (
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              {lang === 'ar' ? 'رابط الموقع أو المتجر الإلكتروني' : 'Website or Store URL'}
            </label>
            <div className="relative">
              <Globe className="w-4 h-4 text-slate-400 absolute top-3.5 right-3.5 rtl:right-3.5 rtl:left-auto ltr:left-3.5 ltr:right-auto pointer-events-none" />
              <input
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => updateFormData({ websiteUrl: e.target.value })}
                placeholder="https://yourstore.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors rtl:pr-10 ltr:pl-10 text-left"
                dir="ltr"
              />
            </div>
          </div>
        ) : (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
            <p>
              {lang === 'ar'
                ? 'ملحوظة للميديا باير: في حال عدم وجود موقع، سيتم توجيه الحملات نحو Click-to-WhatsApp أو Instagram Direct أو Lead Forms المدمجة مع تأهيل فوري للمحادثات.'
                : 'Note: Without a website, traffic strategy will route directly into Click-to-WhatsApp, Instagram DM, or native Lead Forms.'}
            </p>
          </div>
        )}
      </div>

      {/* Social Media Profiles */}
      <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800">
        <div className="flex items-center gap-2 mb-3">
          <Share2 className="w-4 h-4 text-blue-400" />
          <h3 className="text-sm font-semibold text-white">
            {lang === 'ar' ? 'روابط صفحات السوشيال ميديا الحالية' : 'Social Media Channel Links'}
          </h3>
        </div>
        <p className="text-xs text-slate-400 mb-4">
          {lang === 'ar' 
            ? 'للاطلاع على نبرة المحتوى، جودة التصاميم السابقة، وتفاعل الجمهور الحالي' 
            : 'Allows the media buyer to analyze tone of voice, visual identity, and current engagement'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Facebook Page</label>
            <input
              type="text"
              value={formData.socialLinks.facebook || ''}
              onChange={(e) => updateFormData({
                socialLinks: { ...formData.socialLinks, facebook: e.target.value }
              })}
              placeholder="https://facebook.com/yourpage"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-blue-500 text-left"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Instagram Profile</label>
            <input
              type="text"
              value={formData.socialLinks.instagram || ''}
              onChange={(e) => updateFormData({
                socialLinks: { ...formData.socialLinks, instagram: e.target.value }
              })}
              placeholder="https://instagram.com/yourhandle"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-blue-500 text-left"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">TikTok Account</label>
            <input
              type="text"
              value={formData.socialLinks.tiktok || ''}
              onChange={(e) => updateFormData({
                socialLinks: { ...formData.socialLinks, tiktok: e.target.value }
              })}
              placeholder="https://tiktok.com/@youraccount"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-blue-500 text-left"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">LinkedIn / Other</label>
            <input
              type="text"
              value={formData.socialLinks.linkedin || ''}
              onChange={(e) => updateFormData({
                socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
              })}
              placeholder="https://linkedin.com/company/yourbrand"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-blue-500 text-left"
              dir="ltr"
            />
          </div>
        </div>
      </div>

    </div>
  );
};
