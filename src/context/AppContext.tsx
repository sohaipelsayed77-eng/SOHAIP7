import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  Language, 
  ClientIntakeData, 
  AppSettings 
} from '../types';
import { 
  DEFAULT_SETTINGS, 
  EMPTY_INTAKE_DATA, 
  DEMO_SUBMISSIONS 
} from '../constants/initialData';
import { 
  initAuth, 
  googleSignIn, 
  logoutGoogle 
} from '../lib/firebase';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  dir: 'rtl' | 'ltr';
  currentView: 'intake' | 'dashboard' | 'forms_guide' | 'settings';
  setCurrentView: (view: 'intake' | 'dashboard' | 'forms_guide' | 'settings') => void;
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
  submissions: ClientIntakeData[];
  addSubmission: (data: ClientIntakeData) => void;
  updateSubmission: (id: string, updates: Partial<ClientIntakeData>) => void;
  deleteSubmission: (id: string) => void;
  activeBrief: ClientIntakeData | null;
  setActiveBriefId: (id: string | null) => void;
  formData: ClientIntakeData;
  updateFormData: (updates: Partial<ClientIntakeData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  resetForm: () => void;
  googleUser: User | null;
  googleToken: string | null;
  isLoggingIn: boolean;
  loginWithGoogle: () => Promise<void>;
  logoutFromGoogle: () => Promise<void>;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEYS = {
  SUBMISSIONS: 'mb_onboarding_submissions_v1',
  SETTINGS: 'mb_onboarding_settings_v1',
  DRAFT: 'mb_onboarding_draft_v1',
  STEP: 'mb_onboarding_step_v1',
  LANG: 'mb_onboarding_lang_v1'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    return (saved === 'ar' || saved === 'en') ? saved : 'ar';
  });

  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    localStorage.setItem(STORAGE_KEYS.LANG, lang);
  }, [lang, dir]);

  const [currentView, setCurrentView] = useState<'intake' | 'dashboard' | 'forms_guide' | 'settings'>('intake');
  const [activeBriefId, setActiveBriefId] = useState<string | null>(null);

  // Settings
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(next));
      return next;
    });
    showToast(lang === 'ar' ? 'تم حفظ التعديلات بنجاح' : 'Settings saved successfully', 'success');
  };

  // Submissions (Include DEMO clients by default if empty)
  const [submissions, setSubmissions] = useState<ClientIntakeData[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return DEMO_SUBMISSIONS;
    } catch {
      return DEMO_SUBMISSIONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [submissions]);

  // Form State and AutoSave
  const [formData, setFormData] = useState<ClientIntakeData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DRAFT);
      if (saved) {
        return { ...EMPTY_INTAKE_DATA, ...JSON.parse(saved), id: JSON.parse(saved).id || `client-${Date.now()}` };
      }
    } catch (e) {
      console.warn('Draft load error', e);
    }
    return { ...EMPTY_INTAKE_DATA, id: `client-${Date.now()}` };
  });

  const [currentStep, setCurrentStepState] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STEP);
    return saved ? Math.max(0, parseInt(saved, 10) || 0) : 0;
  });

  const setCurrentStep = (step: number) => {
    setCurrentStepState(step);
    localStorage.setItem(STORAGE_KEYS.STEP, step.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateFormData = (updates: Partial<ClientIntakeData>) => {
    setFormData(prev => {
      const next = { ...prev, ...updates, updatedAt: new Date().toISOString() };
      localStorage.setItem(STORAGE_KEYS.DRAFT, JSON.stringify(next));
      return next;
    });
  };

  const resetForm = () => {
    const newForm = { ...EMPTY_INTAKE_DATA, id: `client-${Date.now()}` };
    setFormData(newForm);
    localStorage.removeItem(STORAGE_KEYS.DRAFT);
    localStorage.removeItem(STORAGE_KEYS.STEP);
    setCurrentStepState(0);
  };

  const addSubmission = (data: ClientIntakeData) => {
    setSubmissions(prev => [data, ...prev]);
    localStorage.removeItem(STORAGE_KEYS.DRAFT);
    localStorage.removeItem(STORAGE_KEYS.STEP);
    showToast(lang === 'ar' ? 'تم استلام الاستبيان بنجاح!' : 'Brief submitted successfully!', 'success');
  };

  const updateSubmission = (id: string, updates: Partial<ClientIntakeData>) => {
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, ...updates, updatedAt: new Date().toISOString() } : s));
    showToast(lang === 'ar' ? 'تم تحديث حالة العميل' : 'Brief status updated', 'success');
  };

  const deleteSubmission = (id: string) => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
    if (activeBriefId === id) setActiveBriefId(null);
    showToast(lang === 'ar' ? 'تم حذف الملف' : 'Item deleted', 'info');
  };

  const activeBrief = submissions.find(s => s.id === activeBriefId) || null;

  // Google OAuth Auth State
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
        setGoogleToken(token);
      },
      () => {
        setGoogleUser(null);
        setGoogleToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setIsLoggingIn(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setGoogleUser(res.user);
        setGoogleToken(res.accessToken);
        showToast(
          lang === 'ar' 
            ? `مرحباً ${res.user.displayName || 'بك'}! تم الاتصال بـ Google بنجاح` 
            : `Welcome ${res.user.displayName || ''}! Connected to Google`, 
          'success'
        );
      }
    } catch (err: any) {
      console.error(err);
      showToast(err.message || 'Google Sign-in failed', 'error');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logoutFromGoogle = async () => {
    await logoutGoogle();
    setGoogleUser(null);
    setGoogleToken(null);
    showToast(lang === 'ar' ? 'تم تسجيل الخروج من Google' : 'Signed out from Google', 'info');
  };

  // Toast System
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang: setLangState,
        dir,
        currentView,
        setCurrentView,
        settings,
        updateSettings,
        submissions,
        addSubmission,
        updateSubmission,
        deleteSubmission,
        activeBrief,
        setActiveBriefId,
        formData,
        updateFormData,
        currentStep,
        setCurrentStep,
        resetForm,
        googleUser,
        googleToken,
        isLoggingIn,
        loginWithGoogle,
        logoutFromGoogle,
        toasts,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
