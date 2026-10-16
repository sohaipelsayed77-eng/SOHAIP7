import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Briefcase, 
  LayoutDashboard, 
  FileText, 
  Settings as SettingsIcon, 
  Globe, 
  LogOut, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    lang, 
    setLang, 
    currentView, 
    setCurrentView, 
    settings, 
    submissions, 
    googleUser, 
    isLoggingIn, 
    loginWithGoogle, 
    logoutFromGoogle 
  } = useApp();

  const realCount = submissions.filter(s => !s.isDemo).length;
  const totalCount = submissions.length;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand & Agency Title */}
          <div className="flex items-center gap-3">
            <div 
              onClick={() => setCurrentView('intake')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base sm:text-lg text-white tracking-tight">
                    {settings.agencyName || 'Atlas Media'}
                  </span>
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    Media Buyer Intake
                  </span>
                </div>
                <p className="text-xs text-slate-400 hidden sm:block">
                  {lang === 'ar' ? 'نظام استقبال العملاء وتدقيق الجاهزية الإعلانية' : 'Client Onboarding & Ads Readiness Audit'}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Views */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setCurrentView('intake')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                currentView === 'intake'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>{lang === 'ar' ? 'استبيان العميل' : 'Client Intake Form'}</span>
            </button>

            <button
              onClick={() => setCurrentView('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                currentView === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{lang === 'ar' ? 'لوحة تحكم العملاء' : 'Client Briefs'}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                currentView === 'dashboard' ? 'bg-blue-800 text-blue-100' : 'bg-slate-800 text-slate-300'
              }`}>
                {totalCount}
              </span>
            </button>

            <button
              onClick={() => setCurrentView('forms_guide')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                currentView === 'forms_guide'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{lang === 'ar' ? 'تكامل Google Forms' : 'Google Forms Setup'}</span>
            </button>

            <button
              onClick={() => setCurrentView('settings')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                currentView === 'settings'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <SettingsIcon className="w-4 h-4" />
              <span>{lang === 'ar' ? 'الإعدادات' : 'Settings'}</span>
            </button>
          </nav>

          {/* Right Action Area: Google Auth & Language Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Google Account Status */}
            {googleUser ? (
              <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-slate-800">
                <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-lg text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline font-medium truncate max-w-[120px]">
                    {googleUser.displayName || 'Google'}
                  </span>
                </div>
                <button
                  onClick={logoutFromGoogle}
                  title={lang === 'ar' ? 'تسجيل الخروج من Google' : 'Sign out from Google'}
                  className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={loginWithGoogle}
                disabled={isLoggingIn}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all shadow-sm"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>{isLoggingIn ? (lang === 'ar' ? 'جاري الاتصال...' : 'Connecting...') : (lang === 'ar' ? 'ربط Google Forms' : 'Connect Forms')}</span>
              </button>
            )}

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700/60 transition-colors"
              title={lang === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
            >
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === 'ar' ? 'English' : 'عربي (RTL)'}</span>
            </button>

            {/* Mobile Navigation Dropdown Toggle */}
            <div className="flex md:hidden">
              <select
                value={currentView}
                onChange={(e) => setCurrentView(e.target.value as any)}
                className="bg-slate-800 text-slate-200 text-xs rounded-lg px-2 py-1.5 border border-slate-700 font-medium"
              >
                <option value="intake">{lang === 'ar' ? 'الاستبيان' : 'Intake'}</option>
                <option value="dashboard">{lang === 'ar' ? `العملاء (${totalCount})` : `Briefs (${totalCount})`}</option>
                <option value="forms_guide">{lang === 'ar' ? 'Google Forms' : 'Google Forms'}</option>
                <option value="settings">{lang === 'ar' ? 'الإعدادات' : 'Settings'}</option>
              </select>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
