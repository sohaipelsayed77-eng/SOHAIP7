import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { ToastContainer } from './components/common/ToastContainer';
import { IntakeWizard } from './components/intake/IntakeWizard';
import { DashboardView } from './components/dashboard/DashboardView';
import { GoogleFormsView } from './components/googleForms/GoogleFormsView';
import { SettingsView } from './components/settings/SettingsView';
import { ShieldCheck, Heart } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, lang, settings } = useApp();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header */}
      <Header />

      {/* Main View Container */}
      <div className="flex-1">
        {currentView === 'intake' && <IntakeWizard />}
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'forms_guide' && <GoogleFormsView />}
        {currentView === 'settings' && <SettingsView />}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500 text-center no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>
              {lang === 'ar' ? 'نظام استقبال العملاء وتدقيق الجاهزية الإعلانية للميديا باير' : 'Media Buyer Client Onboarding & Ads Readiness System'}
            </span>
          </div>

          <div className="text-slate-500">
            © {new Date().getFullYear()} {settings.agencyName}. {lang === 'ar' ? 'كافة الحقوق محفوظة.' : 'All rights reserved.'}
          </div>
        </div>
      </footer>

      {/* Global Toast Alerts */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
