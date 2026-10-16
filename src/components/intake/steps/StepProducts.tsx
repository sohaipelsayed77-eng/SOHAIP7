import React from 'react';
import { useApp } from '../../../context/AppContext';
import { ProductItem } from '../../../types';
import { 
  Package, 
  Plus, 
  Trash2, 
  Star, 
  DollarSign, 
  Truck, 
  CreditCard, 
  HelpCircle,
  Sparkles,
  Layers
} from 'lucide-react';

export const StepProducts: React.FC = () => {
  const { lang, formData, updateFormData } = useApp();

  const addProduct = () => {
    const newProduct: ProductItem = {
      id: `prod-${Date.now()}`,
      name: '',
      description: '',
      price: '',
      grossMarginPercent: '',
      averageOrderValue: '',
      isHeroProduct: formData.products.length === 0
    };
    updateFormData({ products: [...formData.products, newProduct] });
  };

  const removeProduct = (id: string) => {
    if (formData.products.length <= 1) return;
    updateFormData({ products: formData.products.filter(p => p.id !== id) });
  };

  const updateProductField = (id: string, updates: Partial<ProductItem>) => {
    updateFormData({
      products: formData.products.map(p => p.id === id ? { ...p, ...updates } : p)
    });
  };

  const togglePaymentMethod = (method: string) => {
    const current = formData.paymentMethods || [];
    if (current.includes(method)) {
      updateFormData({ paymentMethods: current.filter(m => m !== method) });
    } else {
      updateFormData({ paymentMethods: [...current, method] });
    }
  };

  const commonPaymentMethods = [
    { id: 'cod', labelAr: 'الدفع عند الاستلام (COD)', labelEn: 'Cash on Delivery (COD)' },
    { id: 'cards', labelAr: 'بطاقات ائتمان / ميزة / كروت بنكية', labelEn: 'Online Credit / Debit Cards' },
    { id: 'instapay', labelAr: 'تحويلات Instapay ومحافظ الهاتف', labelEn: 'Instapay / Mobile Wallets' },
    { id: 'bnpl', labelAr: 'التقسيط (ValU / Tabby / Tamara)', labelEn: 'Buy Now Pay Later (ValU/Tabby/Tamara)' },
    { id: 'bank_transfer', labelAr: 'تحويل بنكي مسبق (B2B)', labelEn: 'Direct Bank Wire' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
          <Package className="w-6 h-6 text-blue-500" />
          <span>{lang === 'ar' ? '2. المنتجات، الأسعار، وهامش الربحية' : '2. Products, Pricing & Unit Economics'}</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {lang === 'ar' 
            ? 'فهم تفاصيل العرض وهوامش الربح هو ما يحدد أقصى تكلفة اكتساب (CPA) يمكننا دفعها للطلب دون خسارة' 
            : 'Detailed product economics determine our allowable CPA and campaign profitability threshold'}
        </p>
      </div>

      {/* What do you sell */}
      <div>
        <label className="block text-xs font-semibold text-slate-200 mb-1.5">
          {lang === 'ar' ? 'ما الذي يبيعه نشاطك بالتحديد؟ (وصف عام للمنتجات أو الخدمات) *' : 'What does your business sell? (Concise overview) *'}
        </label>
        <textarea
          rows={2}
          required
          value={formData.whatDoYouSell}
          onChange={(e) => updateFormData({ whatDoYouSell: e.target.value })}
          placeholder={lang === 'ar' ? 'مثال: ملابس قطنية شبابية كاجوال عالية الجودة، أو خدمات زراعة وتجميل أسنان رقمية...' : 'e.g., Premium oversized hoodies made of 100% Egyptian cotton...'}
          className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      {/* Multiple Products List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>{lang === 'ar' ? 'قائمة المنتجات / الخدمات الرئيسية الأكثر مبيعاً' : 'Key Products & Best Sellers'}</span>
          </label>
          <button
            type="button"
            onClick={addProduct}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'إضافة منتج آخر' : 'Add Product'}</span>
          </button>
        </div>

        {formData.products.map((product, index) => (
          <div 
            key={product.id}
            className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 transition-all hover:border-slate-750"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-blue-400 text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-sm font-semibold text-white">
                  {product.name || (lang === 'ar' ? `منتج #${index + 1}` : `Product #${index + 1}`)}
                </span>
                {product.isHeroProduct && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{lang === 'ar' ? 'المنتج البطل (Hero Product)' : 'Hero Product'}</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateProductField(product.id, { isHeroProduct: !product.isHeroProduct })}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                    product.isHeroProduct
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                  title={lang === 'ar' ? 'تحديد كمنتج رئيسي في الحملة' : 'Mark as flagship hero product'}
                >
                  {product.isHeroProduct ? (lang === 'ar' ? '★ منتج بطل' : '★ Hero') : (lang === 'ar' ? 'تحديد كبطل' : 'Set Hero')}
                </button>

                {formData.products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProduct(product.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-[11px] text-slate-400 mb-1">
                  {lang === 'ar' ? 'اسم المنتج / الخدمة *' : 'Product / Service Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={product.name}
                  onChange={(e) => updateProductField(product.id, { name: e.target.value })}
                  placeholder={lang === 'ar' ? 'مثال: هودي أوفر سايز فاخر' : 'e.g. Signature Oversized Hoodie'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  {lang === 'ar' ? `سعر البيع (${formData.currency}) *` : `Price (${formData.currency}) *`}
                </label>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => updateProductField(product.id, { price: e.target.value === '' ? '' : Number(e.target.value) })}
                  placeholder="850"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  {lang === 'ar' ? 'وصف سريع للمنتج وميزته' : 'Short product description'}
                </label>
                <input
                  type="text"
                  value={product.description}
                  onChange={(e) => updateProductField(product.id, { description: e.target.value })}
                  placeholder={lang === 'ar' ? 'خامة قطن 100% مبطن...' : '100% Egyptian cotton, brushed fleece...'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1 flex items-center justify-between">
                  <span>{lang === 'ar' ? 'هامش الربح الإجمالي التقديري (%)' : 'Gross Margin Estimate (%)'}</span>
                  <span className="text-[10px] text-blue-400">
                    {product.grossMarginPercent ? `${product.grossMarginPercent}%` : ''}
                  </span>
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={product.grossMarginPercent}
                  onChange={(e) => updateProductField(product.id, { grossMarginPercent: e.target.value === '' ? '' : Number(e.target.value) })}
                  placeholder={lang === 'ar' ? 'مثال: 55%' : 'e.g. 55%'}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Financial Metrics: AOV, Monthly Volume, Repeat Rate */}
      <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-1.5">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span>{lang === 'ar' ? 'المؤشرات الاقتصادية لحجم التداول (Unit Economics)' : 'Unit Economics & Order Metrics'}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {lang === 'ar' ? `متوسط قيمة الطلب / السلة (${formData.currency})` : `Average Order Value - AOV (${formData.currency})`}
            </label>
            <input
              type="number"
              value={formData.averageOrderValue}
              onChange={(e) => updateFormData({ averageOrderValue: e.target.value === '' ? '' : Number(e.target.value) })}
              placeholder="1200"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:border-blue-500"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">
              {lang === 'ar' ? 'إجمالي المبيعات مقسوماً على عدد الطلبات' : 'Total revenue / total orders'}
            </span>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {lang === 'ar' ? 'متوسط الطلبات أو العملاء شهرياً' : 'Average Monthly Orders / Leads'}
            </label>
            <input
              type="number"
              value={formData.averageMonthlyOrdersOrLeads}
              onChange={(e) => updateFormData({ averageMonthlyOrdersOrLeads: e.target.value === '' ? '' : Number(e.target.value) })}
              placeholder="350"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:border-blue-500"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">
              {lang === 'ar' ? 'الوتيرة الحالية قبل إطلاق الحملات الجديدة' : 'Current baseline volume before new ads'}
            </span>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              {lang === 'ar' ? 'نسبة إعادة الشراء (%) إن عُرفت' : 'Repeat Purchase Rate (%)'}
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={formData.repeatPurchaseRatePercent}
              onChange={(e) => updateFormData({ repeatPurchaseRatePercent: e.target.value === '' ? '' : Number(e.target.value) })}
              placeholder="25%"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-600 focus:border-blue-500"
            />
            <span className="text-[10px] text-slate-500 mt-1 block">
              {lang === 'ar' ? 'العملاء الذين يعودون للشراء مرة أخرى' : 'Customer lifetime retention estimate'}
            </span>
          </div>
        </div>
      </div>

      {/* Shipping, Delivery, Stock & Payment */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5 flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-blue-400" />
            <span>{lang === 'ar' ? 'سياسة الشحن والتوصيل والمناطق المغطاة' : 'Shipping Policy & Coverage'}</span>
          </label>
          <input
            type="text"
            value={formData.shippingFeePolicy}
            onChange={(e) => updateFormData({ shippingFeePolicy: e.target.value })}
            placeholder={lang === 'ar' ? 'شحن مجاني فوق 1500 ج.م، و60 ج.م للشحن العادي لكافة المحافظات' : 'Free shipping over $50, flat rate nationwide delivery'}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5">
            {lang === 'ar' ? 'حالة توفر المخزون (Stock Readiness)' : 'Stock & Inventory Availability'}
          </label>
          <select
            value={formData.stockAvailability}
            onChange={(e) => updateFormData({ stockAvailability: e.target.value as any })}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:border-blue-500"
          >
            <option value="in_stock_ready">{lang === 'ar' ? 'جاهز في المخزن للشحن الفوري خلال 24-48 ساعة' : 'In stock, ready for immediate dispatch'}</option>
            <option value="made_to_order">{lang === 'ar' ? 'تصنيع حسب الطلب (Made-to-Order / Takes 5-7 days)' : 'Made-to-Order (takes 5-7 days)'}</option>
            <option value="dropshipping">{lang === 'ar' ? 'دروب شيبينج أو موردين خارجيين' : 'Dropshipping / External Supplier'}</option>
            <option value="limited_stock">{lang === 'ar' ? 'كميات محدودة ونحتاج لتنسيق سقف الصرف' : 'Limited stock (capping spend needed)'}</option>
            <option value="digital">{lang === 'ar' ? 'خدمة أو منتج رقمي متاح دائماً' : 'Digital service / Unlimited'}</option>
          </select>
        </div>
      </div>

      {/* Payment Methods Checkboxes */}
      <div>
        <label className="block text-xs font-semibold text-slate-200 mb-2 flex items-center gap-1.5">
          <CreditCard className="w-4 h-4 text-emerald-400" />
          <span>{lang === 'ar' ? 'طرق الدفع المتاحة للعملاء حالياً' : 'Accepted Payment Methods'}</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {commonPaymentMethods.map((pm) => {
            const isChecked = (formData.paymentMethods || []).includes(pm.labelAr) || (formData.paymentMethods || []).includes(pm.labelEn);
            return (
              <label
                key={pm.id}
                onClick={() => togglePaymentMethod(lang === 'ar' ? pm.labelAr : pm.labelEn)}
                className={`flex items-center gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
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
                <span>{lang === 'ar' ? pm.labelAr : pm.labelEn}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Unique Selling Proposition (USP) */}
      <div className="p-5 rounded-2xl bg-blue-950/20 border border-blue-900/40">
        <label className="block text-xs font-semibold text-blue-200 mb-1.5 flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{lang === 'ar' ? 'الميزة التنافسية الفريدة (USP): لماذا يشتري العميل منك بدلاً من المنافسين؟ *' : 'Unique Selling Proposition (USP): Why do customers choose you over rivals? *'}</span>
        </label>
        <p className="text-xs text-blue-300/80 mb-2">
          {lang === 'ar' 
            ? 'هذه النقطة هي جوهر زوايا الإعلانات وكتابة الإعلانات (Ad Copywriting) وخطافات الفيديو (Video Hooks)' 
            : 'This is the core foundation for crafting high-converting ad hooks and copy angles.'}
        </p>
        <textarea
          rows={3}
          required
          value={formData.uniqueSellingProposition}
          onChange={(e) => updateFormData({ uniqueSellingProposition: e.target.value })}
          placeholder={lang === 'ar' ? 'مثال: خامات قطن طبيعي معالجة ضد الوبر والانكماش مع إمكانية المعاينة قبل الدفع واستبدال مجاني...' : 'e.g., Authentic Egyptian cotton with lifetime anti-pilling guarantee and free inspection upon delivery...'}
          className="w-full bg-slate-950 border border-blue-900/60 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-400 transition-colors"
        />
      </div>

    </div>
  );
};
