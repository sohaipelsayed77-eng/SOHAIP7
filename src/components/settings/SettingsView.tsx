import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DEFAULT_SETTINGS } from '../../constants/initialData';
import { Currency, Language } from '../../types';
import { 
  Settings, 
  Save, 
  RotateCcw, 
  Building2, 
  Palette, 
  Globe2, 
  ShieldCheck, 
  FileText,
  Mail,
  Phone
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { lang, settings, updateSettings, showToast } = useApp();
  
  const [formData, setFormData] = useState({ ...settings });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
  };

  const handleReset = () => {
    if (window.confirm(lang === 'ar' ? 'هل تريد استعادة الإعدادات الافتراضية؟' : 'Reset all settings to default?')) {
      setFormData({ ...DEFAULT_SETTINGS });
      updateSettings(DEFAULT_SETTINGS);
      showToast(lang === 'ar' ? 'تمت استعادة الإعدادات الافتراضية' : 'Settings restored to defaults', 'info');
    }
  };

  const currencies: Currency[] = ['EGP', 'USD', 'SAR', 'AED', 'EUR'];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="w-6 h-6 text-blue-500" />
          <h1 className="text-xl sm:text-2xl font-black text-white">
            {lang === 'ar' ? 'إعدادات وكالة الميديا باينج والنموذج' : 'Agency Branding & Intake Settings'}
          </h1>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 text-xs font-semibold transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{lang === 'ar' ? 'استعادة الافتراضي' : 'Reset to Defaults'}</span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Agency Identity */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span>{lang === 'ar' ? 'هوية العلامة التجارية للميديا باير' : 'Media Buyer Brand Identity'}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {lang === 'ar' ? 'اسم الوكالة أو الميديا باير' : 'Agency or Media Buyer Name'}
              </label>
              <input
                type="text"
                value={formData.agencyName}
                onChange={(e) => setFormData({ ...formData, agencyName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {lang === 'ar' ? 'الشعار النصي (Tagline)' : 'Tagline / Value Proposition'}
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{lang === 'ar' ? 'رقم الواتساب للتواصل' : 'Contact WhatsApp Number'}</span>
              </label>
              <input
                type="text"
                value={formData.contactWhatsApp}
                onChange={(e) => setFormData({ ...formData, contactWhatsApp: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-blue-400" />
                <span>{lang === 'ar' ? 'البريد الإلكتروني المهني' : 'Agency Email'}</span>
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {lang === 'ar' ? 'العملة الافتراضية' : 'Default Currency'}
              </label>
              <select
                value={formData.defaultCurrency}
                onChange={(e) => setFormData({ ...formData, defaultCurrency: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-blue-500"
              >
                {currencies.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                {lang === 'ar' ? 'اللغة الافتراضية' : 'Default Language'}
              </label>
              <select
                value={formData.defaultLanguage}
                onChange={(e) => setFormData({ ...formData, defaultLanguage: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-blue-500"
              >
                <option value="ar">{lang === 'ar' ? 'العربية (Arabic RTL)' : 'Arabic (RTL)'}</option>
                <option value="en">{lang === 'ar' ? 'English (LTR)' : 'English (LTR)'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Editable Welcome Message */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'ar' ? 'نص رسالة الترحيب القابلة للتعديل' : 'Editable Welcome Message'}</span>
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                {lang === 'ar' ? 'رسالة الترحيب بالعربية' : 'Welcome Message (Arabic)'}
              </label>
              <textarea
                rows={3}
                value={formData.welcomeMessageAr}
                onChange={(e) => setFormData({ ...formData, welcomeMessageAr: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                {lang === 'ar' ? 'رسالة الترحيب بالإنجليزية' : 'Welcome Message (English)'}
              </label>
              <textarea
                rows={3}
                value={formData.welcomeMessageEn}
                onChange={(e) => setFormData({ ...formData, welcomeMessageEn: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:border-blue-500"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Editable Privacy Policy */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>{lang === 'ar' ? 'سياسة الخصوصية وسرية البيانات القابلة للتعديل' : 'Editable Privacy Policy Text'}</span>
          </h2>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                {lang === 'ar' ? 'سياسة الخصوصية بالعربية' : 'Privacy Notice (Arabic)'}
              </label>
              <textarea
                rows={4}
                value={formData.privacyPolicyAr}
                onChange={(e) => setFormData({ ...formData, privacyPolicyAr: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                {lang === 'ar' ? 'سياسة الخصوصية بالإنجليزية' : 'Privacy Notice (English)'}
              </label>
              <textarea
                rows={4}
                value={formData.privacyPolicyEn}
                onChange={(e) => setFormData({ ...formData, privacyPolicyEn: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white focus:border-blue-500"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{lang === 'ar' ? 'حفظ كافة الإعدادات' : 'Save All Settings'}</span>
          </button>
        </div>

      </form>
    </div>
  );
};
