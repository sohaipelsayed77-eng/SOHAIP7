import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dir } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div 
      className={`fixed bottom-5 z-50 flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none transition-all ${
        dir === 'rtl' ? 'left-5' : 'right-5'
      }`}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 p-3.5 rounded-xl border text-sm font-medium shadow-xl pointer-events-auto transition-all animate-in fade-in slide-in-from-bottom-2 duration-200 ${
            toast.type === 'success'
              ? 'bg-slate-900/95 border-emerald-500/40 text-emerald-300'
              : toast.type === 'error'
              ? 'bg-slate-900/95 border-rose-500/40 text-rose-300'
              : 'bg-slate-900/95 border-blue-500/40 text-blue-300'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
          {toast.type === 'error' && <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0" />}
          <span className="flex-1 text-slate-100">{toast.message}</span>
        </div>
      ))}
    </div>
  );
};
