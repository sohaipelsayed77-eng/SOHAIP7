import React from 'react';
import { useApp } from '../../../context/AppContext';
import { 
  Headphones, 
  Clock, 
  MessageCircle, 
  CheckCircle, 
  Truck, 
  Boxes, 
  PhoneCall,
  AlertCircle
} from 'lucide-react';

export const StepSalesOperations: React.FC = () => {
  const { lang, formData, updateFormData } = useApp();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Headphones className="w-6 h-6 text-blue-500" />
          <span>{lang === 'ar' ? '8. العمليات البيعية وخدمة العملاء والشحن' : '8. Sales Velocity & Operational Fulfillment'}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {lang === 'ar' 
            ? 'الإعلانات تجلب المهتمين، لكن سرعة رد المبيعات ودقة التوصيل هي ما يحول النقرات إلى أرباح حقيقية' 
            : 'Ads generate buyer traffic, but sales response speed and fulfillment reliability turn clicks into profit'}
        </p>
      </div>

      {/* Response Speed & Responsible Person */}
      <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>{lang === 'ar' ? 'سرعة الرد والمتابعة البيعية' : 'Lead Response Velocity'}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {lang === 'ar' ? 'من يتولى الرد على الرسائل والطلبات الجديدة؟ *' : 'Who responds to incoming leads/inquiries? *'}
            </label>
            <input
              type="text"
              value={formData.whoHandlesLeadsOrOrders}
              onChange={(e) => updateFormData({ whoHandlesLeadsOrOrders: e.target.value })}
              placeholder={lang === 'ar' ? 'مثال: فريق مبيعات مخصص، أو صاحب العمل شخصياً' : 'e.g. Dedicated 3-person sales team, or the founder directly'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {lang === 'ar' ? 'متوسط سرعة الرد على العميل الجديد *' : 'Average Response Time to New Leads *'}
            </label>
            <select
              value={formData.averageResponseTime}
              onChange={(e) => updateFormData({ averageResponseTime: e.target.value as any })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-blue-500"
            >
              <option value="< 15 mins">{lang === 'ar' ? 'أقل من 15 دقيقة (استجابة فائقة السرعة - ممتاز)' : 'Under 15 minutes (Lightning fast - optimal)'}</option>
              <option value="15-60 mins">{lang === 'ar' ? 'من 15 إلى 60 دقيقة (معدل جيد)' : '15 to 60 minutes (Good standard)'}</option>
              <option value="1-4 hours">{lang === 'ar' ? 'من ساعة إلى 4 ساعات' : '1 to 4 hours'}</option>
              <option value="24 hours+">{lang === 'ar' ? 'خلال 24 ساعة أو أكثر (عنق زجاجة يحتاج معالجة)' : 'Over 24 hours (Critical bottleneck)'}</option>
              <option value="automated_instant">{lang === 'ar' ? 'ردود تلقائية فورية (Chatbot / Auto-responder)' : 'Automated instant responses'}</option>
            </select>
          </div>
        </div>

        {formData.averageResponseTime === '24 hours+' && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <p>
              {lang === 'ar'
                ? 'تحذير ميديا باينج: التأخر لأكثر من 24 ساعة يقلل نسبة إغلاق الصفقات بأكثر من 70% ويهدر ميزانية الإعلانات. سنساعدك في تنظيم ردود سريعة.'
                : 'Performance Warning: Delays over 24 hours diminish conversion rates by up to 70%. We recommend setting up auto-responders.'}
            </p>
          </div>
        )}
      </div>

      {/* CRM & Tool Usage */}
      <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <MessageCircle className="w-4 h-4 text-blue-400" />
          <span>{lang === 'ar' ? 'نظام إدارة ومتابعة العملاء المحتملين (CRM / Pipeline)' : 'Lead Tracking & CRM Setup'}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {lang === 'ar' ? 'الأداة المعتمدة لتسجيل ومتابعة الطلبات' : 'Sales Pipeline Tool'}
            </label>
            <select
              value={formData.salesFollowUpTool}
              onChange={(e) => updateFormData({ salesFollowUpTool: e.target.value as any })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-blue-500"
            >
              <option value="whatsapp_manual">{lang === 'ar' ? 'واتساب يدوي عادي على الهاتف' : 'Standard WhatsApp on smartphone'}</option>
              <option value="whatsapp_crm">{lang === 'ar' ? 'برنامج واتساب متقدم (WhatsApp Business / CRM)' : 'Advanced WhatsApp CRM (Wati, Respond.io, etc.)'}</option>
              <option value="google_sheets">{lang === 'ar' ? 'جداول بيانات Google Sheets مشتركة' : 'Shared Google Sheets tracking'}</option>
              <option value="dedicated_crm">{lang === 'ar' ? 'نظام CRM متخصص (HubSpot, Zoho, Salesforce)' : 'Dedicated CRM (HubSpot, Zoho, Salesforce)'}</option>
              <option value="website_direct">{lang === 'ar' ? 'مباشرة عبر متجر الويب ونظام إدارة الطلبات' : 'Direct e-commerce platform order dashboard'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {lang === 'ar' ? 'نسبة إغلاق المبيعات التقديرية (Closing Rate %)' : 'Estimated Sales Closing Rate (%)'}
            </label>
            <input
              type="text"
              value={formData.salesClosingRateEstimate}
              onChange={(e) => updateFormData({ salesClosingRateEstimate: e.target.value })}
              placeholder={lang === 'ar' ? 'مثال: 25% من المتصلين يحجزون، أو 85% تأكيد أوردرات' : 'e.g. 30% closing rate or 85% confirmation rate'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            {lang === 'ar' ? 'كيف يتم تأهيل العميل؟ (Lead Qualification)' : 'Lead Qualification & Screening Routine'}
          </label>
          <textarea
            rows={2}
            value={formData.leadQualificationProcess}
            onChange={(e) => updateFormData({ leadQualificationProcess: e.target.value })}
            placeholder={lang === 'ar' ? 'ما هي الأسئلة التي تطرحها لمعرفة هل العميل جاد ومناسب للشراء أم لا؟' : 'What screening questions do you ask to filter high-intent prospects?'}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-slate-600 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Order Confirmation & Shipping Capacity */}
      <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <Truck className="w-4 h-4 text-amber-400" />
          <span>{lang === 'ar' ? 'تأكيد الطلبات وسقف الشحن اليومي (Fulfillment)' : 'Order Confirmation & Fulfillment Capacity'}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === 'ar' ? 'طريقة تأكيد الطلب قبل الشحن' : 'Order Confirmation Method'}</span>
            </label>
            <select
              value={formData.orderConfirmationProcess}
              onChange={(e) => updateFormData({ orderConfirmationProcess: e.target.value as any })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-blue-500"
            >
              <option value="phone_confirmation_first">{lang === 'ar' ? 'مكالمة هاتفية لتأكيد العنوان والمقاس' : 'Phone call confirmation first'}</option>
              <option value="whatsapp_confirmation_first">{lang === 'ar' ? 'رسالة واتساب مع زر تأكيد' : 'WhatsApp confirmation message'}</option>
              <option value="instant_ship">{lang === 'ar' ? 'شحن فوري مباشر بدون مكالمة (للمدفوع أونلاين)' : 'Direct dispatch (automated)'}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'ar' ? 'شركة أو مندوب الشحن المتعاقد معه' : 'Shipping Carrier Partner'}</span>
            </label>
            <input
              type="text"
              value={formData.shippingPartner}
              onChange={(e) => updateFormData({ shippingPartner: e.target.value })}
              placeholder={lang === 'ar' ? 'مثال: بوسطة، أرامكس، شيب بلو، مندوب خاص' : 'e.g. Bosta, Aramex, DHL, In-house courier'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1 flex items-center gap-1">
              <Boxes className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'ar' ? 'أقصى طاقة تجهيز وشحن يومياً' : 'Daily Fulfillment Capacity'}</span>
            </label>
            <input
              type="text"
              value={formData.dailyFulfillmentCapacity}
              onChange={(e) => updateFormData({ dailyFulfillmentCapacity: e.target.value })}
              placeholder={lang === 'ar' ? 'مثال: 150 طلب يومياً' : 'e.g. 150-200 parcels/day'}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

    </div>
  );
};
