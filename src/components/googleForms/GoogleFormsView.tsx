import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  QUESTIONNAIRE_MATRIX, 
  GOOGLE_FORMS_SETUP_GUIDE, 
  QuestionnaireQuestion 
} from '../../constants/questionnaireGuide';
import { 
  createGoogleFormDirectly, 
  CreatedGoogleFormResult 
} from '../../lib/firebase';
import { 
  Sparkles, 
  ExternalLink, 
  Copy, 
  Check, 
  Globe2, 
  Table, 
  FileText, 
  BookOpen, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Layers,
  ArrowRight
} from 'lucide-react';

export const GoogleFormsView: React.FC = () => {
  const { lang, googleUser, googleToken, loginWithGoogle, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'create_api' | 'arabic_template' | 'english_template' | 'field_matrix' | 'setup_guide'>('create_api');
  const [isCreatingForm, setIsCreatingForm] = useState(false);
  const [createdForm, setCreatedForm] = useState<CreatedGoogleFormResult | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(lang === 'ar' ? 'تم النسخ للحافظة!' : 'Copied to clipboard!', 'success');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleCreateGoogleForm = async () => {
    if (!googleUser || !googleToken) {
      loginWithGoogle();
      return;
    }

    setIsCreatingForm(true);
    try {
      const title = lang === 'ar' ? 'استبيان انضمام العملاء الجدد - ميديا باينج' : 'Client Onboarding Brief - Media Buying';
      const result = await createGoogleFormDirectly(title, lang);
      setCreatedForm(result);
      showToast(lang === 'ar' ? 'تم إنشاء نموذج Google Forms بنجاح!' : 'Google Form created successfully!', 'success');
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Failed to create Google Form', 'error');
    } finally {
      setIsCreatingForm(false);
    }
  };

  // Group questionnaire questions by section for structured copying
  const sectionsMap = React.useMemo(() => {
    const map = new Map<string, QuestionnaireQuestion[]>();
    QUESTIONNAIRE_MATRIX.forEach(q => {
      const list = map.get(q.section) || [];
      list.push(q);
      map.set(q.section, list);
    });
    return map;
  }, []);

  const getFullQuestionnaireText = (language: 'ar' | 'en') => {
    let out = language === 'ar'
      ? `=== استبيان انضمام العملاء الجدد للميديا باير (جاهز لـ Google Forms) ===\n\n`
      : `=== Client Onboarding Questionnaire (Ready for Google Forms) ===\n\n`;

    sectionsMap.forEach((questions, sectionTitle) => {
      out += `\n[ ${sectionTitle} ]\n--------------------------------------------\n`;
      questions.forEach((q, idx) => {
        const title = language === 'ar' ? q.titleAr : q.titleEn;
        const helper = language === 'ar' ? q.helperAr : q.helperEn;
        const opts = language === 'ar' ? q.optionsAr : q.optionsEn;

        out += `\nس ${idx + 1}: ${title} ${q.required ? '*(مطلوب)*' : '(اختياري)'}\n`;
        out += `نوع السؤال في Google Forms: [ ${q.type} ]\n`;
        if (helper) out += `توضيح للمجيب: ${helper}\n`;
        if (opts && opts.length > 0) {
          out += `خيارات الإجابة:\n`;
          opts.forEach(o => {
            out += `  ○ ${o}\n`;
          });
        }
        if (q.conditionalRule) {
          out += `منطق شرطي: ${q.conditionalRule}\n`;
        }
      });
    });

    return out;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Banner */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              {lang === 'ar' ? 'تكامل ونماذج Google Forms المعتمدة' : 'Google Forms Integration & Blueprint'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {lang === 'ar' 
                ? 'إنشاء فوري عبر Google Forms API أو نسخ الهيكل الجاهز بالعربية والإنجليزية' 
                : 'Direct 1-Click Google Forms API Generator & ready-to-copy questionnaire blueprints'}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-800 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('create_api')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'create_api'
              ? 'border-blue-500 text-blue-400 bg-slate-900/60'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{lang === 'ar' ? '1. الإنشاء التلقائي عبر API' : '1. Auto API Generator'}</span>
        </button>

        <button
          onClick={() => setActiveTab('arabic_template')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'arabic_template'
              ? 'border-blue-500 text-blue-400 bg-slate-900/60'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{lang === 'ar' ? '2. نموذج عربي جاهز للنسخ' : '2. Arabic Questionnaire'}</span>
        </button>

        <button
          onClick={() => setActiveTab('english_template')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'english_template'
              ? 'border-blue-500 text-blue-400 bg-slate-900/60'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Globe2 className="w-4 h-4" />
          <span>{lang === 'ar' ? '3. English Template' : '3. English Questionnaire'}</span>
        </button>

        <button
          onClick={() => setActiveTab('field_matrix')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'field_matrix'
              ? 'border-blue-500 text-blue-400 bg-slate-900/60'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Table className="w-4 h-4" />
          <span>{lang === 'ar' ? '4. مصفوفة الحقول والأنواع' : '4. Fields Dictionary'}</span>
        </button>

        <button
          onClick={() => setActiveTab('setup_guide')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'setup_guide'
              ? 'border-blue-500 text-blue-400 bg-slate-900/60'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{lang === 'ar' ? '5. دليل الربط مع Sheets & CRM' : '5. Integration Guide'}</span>
        </button>
      </div>

      {/* Tab 1: Direct 1-Click Google Forms API Creator */}
      {activeTab === 'create_api' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-purple-950/40 border border-purple-500/30 space-y-6">
            <div className="max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400 block mb-2">
                {lang === 'ar' ? 'تكامل Google Workspace الرسمي' : 'Official Google Workspace Integration'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
                {lang === 'ar' ? 'إنشاء نموذج Google Forms مباشرة في حسابك بضغطة واحدة' : 'Generate Live Google Form in Your Drive with 1-Click'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {lang === 'ar'
                  ? 'بفضل تكامل Google Workspace Skill المصرح به، يستطيع التطبيق إنشاء استبيان تفاعلي فوري في حسابك على Google Drive، وتوفير رابط التعديل ورابط النشر للعملاء دون أي مجهود يدوي.'
                  : 'Leveraging our configured Google Workspace OAuth, the app directly interfaces with the Google Forms API to create a production questionnaire in your Google Drive.'}
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3">
              {googleUser ? (
                <button
                  onClick={handleCreateGoogleForm}
                  disabled={isCreatingForm}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-600/30 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isCreatingForm ? (lang === 'ar' ? 'جاري إنشاء النموذج...' : 'Generating Form...') : (lang === 'ar' ? 'إنشاء النموذج الآن في Google Forms' : 'Create Google Form Now')}</span>
                </button>
              ) : (
                <button
                  onClick={loginWithGoogle}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-blue-600/30 transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>{lang === 'ar' ? 'تسجيل الدخول بحساب Google لإنشاء النموذج' : 'Sign in with Google to Generate Form'}</span>
                </button>
              )}

              {googleUser && (
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-2 rounded-xl border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{lang === 'ar' ? `متصل بحساب: ${googleUser.email}` : `Connected as: ${googleUser.email}`}</span>
                </div>
              )}
            </div>

            {/* Created Form Success Banner */}
            {createdForm && (
              <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/40 space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{lang === 'ar' ? 'تم إنشاء النموذج في حسابك بنجاح!' : 'Google Form successfully created!'}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <a
                    href={createdForm.editUri}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-xs font-bold text-white block group-hover:text-blue-400">
                        {lang === 'ar' ? 'فتح صفحة تعديل النموذج (Edit Form)' : 'Open Edit Mode'}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {lang === 'ar' ? 'لإضافة ألوان، وتعديل الأسئلة' : 'Customize theme & settings in Google'}
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                  </a>

                  <a
                    href={createdForm.responderUri}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-emerald-500 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-xs font-bold text-white block group-hover:text-emerald-400">
                        {lang === 'ar' ? 'رابط النموذج العام للعملاء (Public View)' : 'Open Public Responder View'}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {lang === 'ar' ? 'الرابط الذي يملأه العميل' : 'Shareable link for client submission'}
                      </span>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-400" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Arabic Template Ready to Copy */}
      {activeTab === 'arabic_template' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">
              {lang === 'ar' ? 'الاستبيان باللغة العربية (منسق للأقسام والخيارات في Google Forms)' : 'Arabic Questionnaire Blueprint'}
            </span>
            <button
              onClick={() => handleCopy(getFullQuestionnaireText('ar'), 'full_ar')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer"
            >
              {copiedKey === 'full_ar' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'full_ar' ? 'تم النسخ بالكامل!' : 'نسخ الاستبيان كاملاً'}</span>
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 overflow-x-auto text-xs font-mono leading-relaxed text-slate-300 whitespace-pre-wrap max-h-[600px]">
            {getFullQuestionnaireText('ar')}
          </div>
        </div>
      )}

      {/* Tab 3: English Template Ready to Copy */}
      {activeTab === 'english_template' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">
              English Questionnaire Blueprint (Ready for manual copy-paste into Google Forms)
            </span>
            <button
              onClick={() => handleCopy(getFullQuestionnaireText('en'), 'full_en')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all cursor-pointer"
            >
              {copiedKey === 'full_en' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'full_en' ? 'Copied Full English!' : 'Copy Full English Template'}</span>
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 overflow-x-auto text-xs font-mono leading-relaxed text-slate-300 whitespace-pre-wrap max-h-[600px] text-left" dir="ltr">
            {getFullQuestionnaireText('en')}
          </div>
        </div>
      )}

      {/* Tab 4: Field Dictionary Matrix (Deliverable D) */}
      {activeTab === 'field_matrix' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">
              {lang === 'ar' ? 'مصفوفة الحقول والأنواع والشروط المنطقية (Field Dictionary)' : 'Field Matrix & Logic Rules'}
            </span>
            <span className="text-xs text-slate-500">
              {QUESTIONNAIRE_MATRIX.length} {lang === 'ar' ? 'حقل مخصص' : 'Configured Fields'}
            </span>
          </div>

          <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/60">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right rtl:text-right ltr:text-left">
                <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">{lang === 'ar' ? 'معرف الحقل (ID)' : 'Field ID'}</th>
                    <th className="p-3.5">{lang === 'ar' ? 'السؤال (عربي)' : 'Title (AR)'}</th>
                    <th className="p-3.5">{lang === 'ar' ? 'السؤال (EN)' : 'Title (EN)'}</th>
                    <th className="p-3.5">{lang === 'ar' ? 'نوع الحقل' : 'Type'}</th>
                    <th className="p-3.5">{lang === 'ar' ? 'إلزامي؟' : 'Required'}</th>
                    <th className="p-3.5">{lang === 'ar' ? 'الشرط المنطقي' : 'Conditional Logic'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {QUESTIONNAIRE_MATRIX.map((q) => (
                    <tr key={q.id} className="hover:bg-slate-850/50 transition-colors">
                      <td className="p-3.5 font-mono text-blue-400 font-semibold">{q.id}</td>
                      <td className="p-3.5 text-slate-200 font-medium">{q.titleAr}</td>
                      <td className="p-3.5 text-slate-400 font-mono text-[11px]">{q.titleEn}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                          {q.type}
                        </span>
                      </td>
                      <td className="p-3.5">
                        {q.required ? (
                          <span className="text-emerald-400 font-bold">✓ نعم</span>
                        ) : (
                          <span className="text-slate-500">اختياري</span>
                        )}
                      </td>
                      <td className="p-3.5 text-slate-400 text-[11px]">
                        {q.conditionalRule || '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Setup Guide (Deliverable E) */}
      {activeTab === 'setup_guide' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>{lang === 'ar' ? 'دليل التكامل الفني والربط التلقائي (Integration & Setup Documentation)' : 'Technical Integration Guide'}</span>
            </span>
            <button
              onClick={() => handleCopy(GOOGLE_FORMS_SETUP_GUIDE, 'guide')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              {copiedKey === 'guide' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'guide' ? 'تم النسخ!' : 'نسخ الدليل'}</span>
            </button>
          </div>

          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
            {GOOGLE_FORMS_SETUP_GUIDE}
          </div>
        </div>
      )}

    </div>
  );
};
