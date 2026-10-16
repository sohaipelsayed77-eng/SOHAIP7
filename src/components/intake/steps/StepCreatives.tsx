import React from 'react';
import { useApp } from '../../../context/AppContext';
import { ASSET_TYPES_LIST } from '../../../constants/initialData';
import { 
  Palette, 
  Video, 
  Link as LinkIcon, 
  Tag, 
  Sparkles, 
  ShieldCheck, 
  Camera,
  Layers
} from 'lucide-react';

export const StepCreatives: React.FC = () => {
  const { lang, formData, updateFormData } = useApp();

  const toggleAsset = (id: string) => {
    const current = formData.availableAssets || [];
    if (current.includes(id)) {
      updateFormData({ availableAssets: current.filter(a => a !== id) });
    } else {
      updateFormData({ availableAssets: [...current, id] });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Palette className="w-6 h-6 text-blue-500" />
          <span>{lang === 'ar' ? '7. المواد الإعلانية، المحتوى، والعروض (Creative Assets)' : '7. Creative Assets & Promotional Offers'}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {lang === 'ar' 
            ? 'المواد الإبداعية والفيديوهات تمثل 80% من نجاح خوارزميات ميتا وتيك توك في عصر الذكاء الاصطناعي' 
            : 'Creatives and video hooks represent 80% of algorithmic conversion lift on modern paid platforms'}
        </p>
      </div>

      {/* Available Assets Checkboxes */}
      <div>
        <label className="block text-xs font-semibold text-slate-200 mb-2">
          {lang === 'ar' ? 'ما هي المواد الإعلانية المتوفرة لديك حالياً؟ (اختر كل ما ينطبق) *' : 'Which creative assets are currently available? *'}
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {ASSET_TYPES_LIST.map((asset) => {
            const isChecked = (formData.availableAssets || []).includes(asset.id);
            return (
              <label
                key={asset.id}
                onClick={() => toggleAsset(asset.id)}
                className={`flex items-center gap-3 p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
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
                <span className="font-medium">{lang === 'ar' ? asset.labelAr : asset.labelEn}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Creative Production Capacity */}
      <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
        <label className="block text-xs font-semibold text-slate-200 flex items-center gap-1.5">
          <Camera className="w-4 h-4 text-emerald-400" />
          <span>{lang === 'ar' ? 'من المسؤول عن إنتاج وتصوير الفيديوهات والمحتوى الجديد؟ *' : 'Who produces and shoots new creative content? *'}</span>
        </label>
        <select
          value={formData.creativeProductionCapacity}
          onChange={(e) => updateFormData({ creativeProductionCapacity: e.target.value as any })}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:border-blue-500"
        >
          <option value="in_house_content_creator">{lang === 'ar' ? 'لدينا صانع محتوى ومصور داخلي في الشركة (In-house Creator)' : 'In-house content creator & dedicated editor'}</option>
          <option value="client_shoots_phone">{lang === 'ar' ? 'أقوم بالتصوير بنفسي باستخدام الهاتف المحمول (UGC / Reels)' : 'We shoot UGC internally on high-end smartphones'}</option>
          <option value="professional_agency">{lang === 'ar' ? 'نتعامل مع وكالة تصوير وإنتاج إعلامي خارجية' : 'We contract an external production house'}</option>
          <option value="need_media_buyer_guidance">{lang === 'ar' ? 'نحتاج مساعدة وتوجيه الميديا باير لإعداد سيناريوهات الإعلانات (Ad Scripts)' : 'Need media buyer guidance & hook scripts'}</option>
          <option value="no_content">{lang === 'ar' ? 'لا يتوفر لدينا محتوى حالياً ونبدأ من الصفر' : 'No current content; starting from scratch'}</option>
        </select>
      </div>

      {/* Public Drive / Cloud Assets Link */}
      <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <LinkIcon className="w-4 h-4 text-blue-400" />
            <span>{lang === 'ar' ? 'رابط مجلد Google Drive أو Dropbox للمواد الإعلانية' : 'Cloud Assets Folder (Google Drive / Dropbox Link)'}</span>
          </label>
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'آمن وسحابي' : 'Secure & Public Link'}</span>
          </span>
        </div>
        <p className="text-xs text-slate-400">
          {lang === 'ar' 
            ? 'يرجى وضع رابط مجلد السحابة والتأكد من إمكانية العرض (Anyone with the link can view). يفضل تجنب رفع ملفات سرية أو حساسة.' 
            : 'Provide a cloud folder link set to "Anyone with the link can view". Never share confidential files.'}
        </p>
        <input
          type="url"
          value={formData.creativeAssetUrls}
          onChange={(e) => updateFormData({ creativeAssetUrls: e.target.value })}
          placeholder="https://drive.google.com/drive/folders/your-assets"
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:border-blue-500 text-left"
          dir="ltr"
        />
      </div>

      {/* Offers and Promotions */}
      <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
        <label className="block text-xs font-semibold text-slate-200 flex items-center gap-1.5">
          <Tag className="w-4 h-4 text-amber-400" />
          <span>{lang === 'ar' ? 'العروض الترويجية الحالية أو المخطط لإطلاقها (Promotions & Offers)' : 'Promotional Offers & Bundles'}</span>
        </label>
        <p className="text-xs text-slate-400">
          {lang === 'ar' 
            ? 'مثال: خصم 20% للعملاء الجدد، اشتري قطعتين والثالثة مجاناً، شحن مجاني لأول طلب، باقة خاصة...' 
            : 'e.g. Buy 2 Get 1 Free, 20% introductory discount, free nationwide shipping over $50...'}
        </p>
        <textarea
          rows={2}
          value={formData.offersAndPromotions}
          onChange={(e) => updateFormData({ offersAndPromotions: e.target.value })}
          placeholder={lang === 'ar' ? 'اكتب تفاصيل العروض التي نستطيع استخدامها كخطاف إعلاني قوي...' : 'Outline the strongest offers we can feature in ad headlines...'}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:border-blue-500"
        />
      </div>

      {/* Landing Page URLs (if any) */}
      <div>
        <label className="block text-xs font-semibold text-slate-200 mb-1.5">
          {lang === 'ar' ? 'روابط صفحات الهبوط المخصصة (Landing Pages إن وجدت)' : 'Custom Landing Page URLs (if any)'}
        </label>
        <input
          type="url"
          value={formData.landingPageUrls}
          onChange={(e) => updateFormData({ landingPageUrls: e.target.value })}
          placeholder="https://yourstore.com/special-offer"
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-blue-500 text-left"
          dir="ltr"
        />
      </div>

    </div>
  );
};
