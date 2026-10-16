import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ClientIntakeData } from '../../types';
import { calculateReadinessScore } from '../../lib/auditCalculator';
import { BriefDetailModal } from './BriefDetailModal';
import { 
  Search, 
  Filter, 
  Download, 
  PlusCircle, 
  BarChart3, 
  Building2, 
  Trash2, 
  Eye, 
  TrendingUp, 
  Sparkles, 
  Layers, 
  CheckCircle,
  HelpCircle,
  ShieldAlert
} from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { 
    lang, 
    submissions, 
    updateSubmission, 
    deleteSubmission, 
    activeBrief, 
    setActiveBriefId, 
    setCurrentView, 
    setCurrentStep,
    showToast 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [modelFilter, setModelFilter] = useState<string>('all');

  // Filter Submissions
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((item) => {
      const matchesSearch = 
        item.clientFullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.businessCategory.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchesModel = modelFilter === 'all' || item.businessModel === modelFilter;

      return matchesSearch && matchesStatus && matchesModel;
    });
  }, [submissions, searchQuery, statusFilter, modelFilter]);

  // Metrics
  const totalCount = submissions.length;
  const demoCount = submissions.filter(s => s.isDemo).length;
  const realCount = submissions.filter(s => !s.isDemo).length;
  const qualifiedCount = submissions.filter(s => s.status === 'qualified').length;

  const exportAllCSV = () => {
    if (submissions.length === 0) {
      showToast(lang === 'ar' ? 'لا توجد بيانات للتصدير' : 'No data to export', 'info');
      return;
    }

    const headers = [
      'ID',
      'Client Name',
      'Brand Name',
      'Category',
      'Business Model',
      'Status',
      'Readiness Score',
      'Target Budget',
      'Currency',
      'Primary KPI',
      'Email',
      'WhatsApp',
      'Created Date'
    ];

    const rows = submissions.map(s => {
      const score = calculateReadinessScore(s, 'en').overallScore;
      return [
        `"${s.id}"`,
        `"${s.clientFullName.replace(/"/g, '""')}"`,
        `"${s.businessName.replace(/"/g, '""')}"`,
        `"${s.businessCategory}"`,
        `"${s.businessModel}"`,
        `"${s.status}"`,
        score,
        `"${s.monthlyAdSpendCustom || s.monthlyAdSpendBudgetRange}"`,
        `"${s.currency}"`,
        `"${s.targetKPI}"`,
        `"${s.contactEmail}"`,
        `"${s.whatsappNumber}"`,
        `"${new Date(s.createdAt).toISOString()}"`
      ];
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `media-buyer-client-briefs-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showToast(lang === 'ar' ? 'تم تصدير ملف CSV بنجاح' : 'CSV exported successfully', 'success');
  };

  const statusTags = [
    { id: 'all', labelAr: 'الكل', labelEn: 'All' },
    { id: 'new', labelAr: 'جديد', labelEn: 'New' },
    { id: 'reviewing', labelAr: 'قيد المراجعة', labelEn: 'Reviewing' },
    { id: 'qualified', labelAr: 'مؤهل للشراكة', labelEn: 'Qualified' },
    { id: 'awaiting_info', labelAr: 'بانتظار معلومات', labelEn: 'Awaiting Info' },
    { id: 'not_a_fit', labelAr: 'غير مناسب', labelEn: 'Not a Fit' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Banner & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {lang === 'ar' ? 'لوحة تحكم استبيانات وملفات العملاء' : 'Media Buyer Client Briefs Portal'}
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {totalCount} {lang === 'ar' ? 'ملف' : 'Briefs'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {lang === 'ar' 
              ? 'مراجعة بيانات العملاء، تقييم الجاهزية الإعلانية، وتوليد تقارير خطة العمل' 
              : 'Review client responses, ads readiness scores, and strategic briefs'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={exportAllCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-800 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'تصدير كـ CSV' : 'Export CSV'}</span>
          </button>

          <button
            onClick={() => {
              setCurrentStep(1);
              setCurrentView('intake');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{lang === 'ar' ? 'استبيان عميل جديد' : 'New Client Intake'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 block mb-1">
            {lang === 'ar' ? 'إجمالي الملفات المستلمة' : 'Total Briefs'}
          </span>
          <span className="text-xl sm:text-2xl font-black text-white">{totalCount}</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 block mb-1">
            {lang === 'ar' ? 'عملاء مؤهلون للشراكة' : 'Qualified Clients'}
          </span>
          <span className="text-xl sm:text-2xl font-black text-emerald-400">{qualifiedCount}</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 block mb-1">
            {lang === 'ar' ? 'استمارات حقيقية' : 'Real Submissions'}
          </span>
          <span className="text-xl sm:text-2xl font-black text-blue-400">{realCount}</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
          <span className="text-[11px] text-slate-400 block mb-1">
            {lang === 'ar' ? 'بيانات تجريبية إيضاحية' : 'Demo Samples'}
          </span>
          <span className="text-xl sm:text-2xl font-black text-amber-400">{demoCount}</span>
        </div>
      </div>

      {/* Local Storage Disclaimer Note */}
      <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-blue-400 shrink-0" />
          <span>
            {lang === 'ar'
              ? 'تنويه: يتم حفظ الاستمارات في متصفحك المحلي (Client Storage). البيانات المعلمة بـ [تجريبي] هي أمثلة توضيحية لمتجر إلكتروني وعيادة طبية.'
              : 'Notice: Briefs are stored in your browser local storage. Items tagged [Demo] illustrate complete profiles for an e-commerce store and a dental clinic.'}
          </span>
        </div>
      </div>

      {/* Search & Filters Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute top-3 right-3 rtl:right-3 rtl:left-auto ltr:left-3 ltr:right-auto pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'ar' ? 'البحث بالاسم، النشاط، أو التصنيف...' : 'Search by name, brand, or category...'}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-blue-500 rtl:pr-9 ltr:pl-9"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {statusTags.map((t) => (
            <button
              key={t.id}
              onClick={() => setStatusFilter(t.id)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-all ${
                statusFilter === t.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200'
              }`}
            >
              {lang === 'ar' ? t.labelAr : t.labelEn}
            </button>
          ))}
        </div>
      </div>

      {/* Briefs Cards / List */}
      {filteredSubmissions.length === 0 ? (
        <div className="p-12 rounded-3xl bg-slate-900/30 border border-dashed border-slate-800 text-center space-y-4">
          <Building2 className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-300">
            {lang === 'ar' ? 'لا توجد استبيانات مطابقة للبحث' : 'No matching client briefs found'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {lang === 'ar' ? 'جرب تغيير معايير البحث أو ابدأ ملء استبيان عميل جديد' : 'Try adjusting your search criteria or start a new client intake form.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSubmissions.map((brief) => {
            const audit = calculateReadinessScore(brief, lang);

            return (
              <div
                key={brief.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
              >
                {/* Card Top: Brand & Score */}
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-blue-400 transition-colors">
                          {brief.businessName}
                        </h3>
                        {brief.isDemo && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            {lang === 'ar' ? 'تجريبي' : 'Demo'}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 block mt-0.5">
                        {brief.clientFullName}
                      </span>
                    </div>

                    {/* Score Tag */}
                    <div className="text-center px-2 py-1 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                      <span className="text-xs font-black text-blue-400">{audit.overallScore}</span>
                      <span className="text-[9px] text-slate-500 block">/100</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {brief.whatDoYouSell || '—'}
                  </p>
                </div>

                {/* Key Metrics Chips */}
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-3 border-t border-slate-800/80">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-850">
                    <span className="text-slate-500 block text-[10px]">{lang === 'ar' ? 'الميزانية المستهدفة' : 'Target Budget'}</span>
                    <span className="font-bold text-slate-200 truncate block">
                      {brief.monthlyAdSpendCustom || brief.monthlyAdSpendBudgetRange} {brief.currency}
                    </span>
                  </div>

                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-850">
                    <span className="text-slate-500 block text-[10px]">{lang === 'ar' ? 'المؤشر الأهم' : 'Target KPI'}</span>
                    <span className="font-bold text-emerald-400 truncate block">
                      {brief.targetKPI.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Card Footer: Status & Action Buttons */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/60">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase ${
                    brief.status === 'qualified' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                    brief.status === 'reviewing' ? 'bg-blue-500/10 text-blue-400 border-blue-500/30' :
                    brief.status === 'awaiting_info' ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' :
                    brief.status === 'not_a_fit' ? 'bg-slate-800 text-slate-400 border-slate-700' :
                    'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                  }`}>
                    {brief.status.replace('_', ' ')}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setActiveBriefId(brief.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'عرض التقرير' : 'View Brief'}</span>
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا الملف؟' : 'Delete this brief?')) {
                          deleteSubmission(brief.id);
                        }
                      }}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                      title={lang === 'ar' ? 'حذف' : 'Delete'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Brief Detail Modal */}
      {activeBrief && (
        <BriefDetailModal
          brief={activeBrief}
          onClose={() => setActiveBriefId(null)}
        />
      )}

    </div>
  );
};
