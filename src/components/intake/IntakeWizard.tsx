import React from 'react';
import { useApp } from '../../context/AppContext';
import { StepWelcome } from './steps/StepWelcome';
import { StepBusinessProfile } from './steps/StepBusinessProfile';
import { StepProducts } from './steps/StepProducts';
import { StepMarketingHistory } from './steps/StepMarketingHistory';
import { StepGoalsKPIs } from './steps/StepGoalsKPIs';
import { StepBudget } from './steps/StepBudget';
import { StepAudienceCompetitors } from './steps/StepAudienceCompetitors';
import { StepCreatives } from './steps/StepCreatives';
import { StepSalesOperations } from './steps/StepSalesOperations';
import { StepTechnicalSetup } from './steps/StepTechnicalSetup';
import { StepTimelineConsent } from './steps/StepTimelineConsent';
import { StepReview } from './steps/StepReview';
import { StepSuccess } from './steps/StepSuccess';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  RotateCcw,
  Sparkles
} from 'lucide-react';

export const IntakeWizard: React.FC = () => {
  const { lang, dir, currentStep, setCurrentStep, resetForm } = useApp();
  const isRtl = dir === 'rtl';

  const stepTitles = [
    { num: 0, ar: 'المقدمة', en: 'Welcome' },
    { num: 1, ar: 'ملف النشاط', en: 'Profile' },
    { num: 2, ar: 'المنتجات', en: 'Products' },
    { num: 3, ar: 'تاريخ الإعلانات', en: 'History' },
    { num: 4, ar: 'الأهداف', en: 'Goals' },
    { num: 5, ar: 'الميزانية', en: 'Budget' },
    { num: 6, ar: 'الجمهور', en: 'Audience' },
    { num: 7, ar: 'المحتوى', en: 'Creatives' },
    { num: 8, ar: 'التشغيل', en: 'Operations' },
    { num: 9, ar: 'التتبع التقني', en: 'Tracking' },
    { num: 10, ar: 'الموافقة', en: 'Consent' },
    { num: 11, ar: 'المراجعة', en: 'Review' },
    { num: 12, ar: 'تم الإرسال', en: 'Success' }
  ];

  const totalFormSteps = 11;
  const progressPercent = currentStep === 0 
    ? 0 
    : currentStep >= 11 
    ? 100 
    : Math.round((currentStep / totalFormSteps) * 100);

  const handleNext = () => {
    if (currentStep < 12) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderActiveStep = () => {
    switch (currentStep) {
      case 0: return <StepWelcome />;
      case 1: return <StepBusinessProfile />;
      case 2: return <StepProducts />;
      case 3: return <StepMarketingHistory />;
      case 4: return <StepGoalsKPIs />;
      case 5: return <StepBudget />;
      case 6: return <StepAudienceCompetitors />;
      case 7: return <StepCreatives />;
      case 8: return <StepSalesOperations />;
      case 9: return <StepTechnicalSetup />;
      case 10: return <StepTimelineConsent />;
      case 11: return <StepReview />;
      case 12: return <StepSuccess />;
      default: return <StepWelcome />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      
      {/* Top Floating Progress Bar (Visible from Step 1 to 11) */}
      {currentStep > 0 && currentStep <= 11 && (
        <div className="sticky top-16 sm:top-20 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-md">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                  {currentStep}
                </span>
                <span className="text-white font-bold">
                  {lang === 'ar' ? stepTitles[currentStep]?.ar : stepTitles[currentStep]?.en}
                </span>
                <span className="text-slate-500 hidden sm:inline">
                  • {lang === 'ar' ? `المرحلة ${currentStep} من ${totalFormSteps}` : `Step ${currentStep} of ${totalFormSteps}`}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{lang === 'ar' ? 'حفظ تلقائي' : 'Autosaved'}</span>
                </span>
                <span className="font-bold text-blue-400">{progressPercent}%</span>
              </div>
            </div>

            {/* Progress line */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Clickable Step Pills for quick navigation */}
            <div className="hidden sm:flex items-center justify-between gap-1 mt-2.5 overflow-x-auto pb-1 text-[11px]">
              {stepTitles.slice(1, 12).map((st) => {
                const isActive = currentStep === st.num;
                const isPassed = currentStep > st.num;
                return (
                  <button
                    key={st.num}
                    type="button"
                    onClick={() => setCurrentStep(st.num)}
                    className={`px-2 py-0.5 rounded-md transition-colors whitespace-nowrap font-medium ${
                      isActive
                        ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
                        : isPassed
                        ? 'text-slate-400 hover:text-slate-200'
                        : 'text-slate-600 hover:text-slate-400'
                    }`}
                  >
                    {isPassed && <span className="inline mr-1 text-emerald-400">✓</span>}
                    {lang === 'ar' ? st.ar : st.en}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Step Content Area */}
      <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1">
        {renderActiveStep()}
      </main>

      {/* Bottom Sticky Action Bar (For Steps 1 to 10) */}
      {currentStep > 0 && currentStep <= 10 && (
        <div className="sticky bottom-0 z-30 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 py-3.5 px-4 sm:px-6 shadow-2xl">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            
            {/* Back Button */}
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs sm:text-sm border border-slate-700 transition-all cursor-pointer"
            >
              {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
              <span>{lang === 'ar' ? 'السابق' : 'Back'}</span>
            </button>

            {/* Middle Reset Link */}
            <button
              type="button"
              onClick={() => {
                if (window.confirm(lang === 'ar' ? 'هل تريد حقاً مسح النموذج والبدء من جديد؟' : 'Reset form and start fresh?')) {
                  resetForm();
                }
              }}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-400 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'بدء نموذج جديد' : 'Reset form'}</span>
            </button>

            {/* Next / Continue Button */}
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition-all cursor-pointer group"
            >
              <span>{currentStep === 10 ? (lang === 'ar' ? 'الانتقال للمراجعة النهائية' : 'Proceed to Review') : (lang === 'ar' ? 'المتابعة للتالي' : 'Continue')}</span>
              {isRtl ? (
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              ) : (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              )}
            </button>

          </div>
        </div>
      )}

    </div>
  );
};
