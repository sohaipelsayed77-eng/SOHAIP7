import { ClientIntakeData, AppSettings } from '../types';

export const DEFAULT_SETTINGS: AppSettings = {
  agencyName: 'Atlas Media Growth',
  tagline: 'Strategic Paid Advertising & Performance Growth',
  contactWhatsApp: '+20 100 000 0000',
  contactEmail: 'hello@atlasmediagrowth.com',
  accentColor: '#2563eb',
  defaultCurrency: 'EGP',
  defaultLanguage: 'ar',
  welcomeMessageAr: `مرحباً بك! يسعدنا بدء التعاون معك لإطلاق وتطوير حملاتك الإعلانية بأعلى كفاءة ممكنة.
يهدف هذا الاستبيان المركز إلى فهم طبيعة نشاطك التجاري، أهدافك البيعية، جاهزية البنية التقنية والإعلانية لديك، وتفاصيل المنتجات والميزانيات المقترحة.
يستغرق ملء النموذج حوالي 7 - 10 دقائق، وسيقوم النظام فوراً بتحليل البيانات وتجهيز ملف خطة العمل (Client Brief) المقترح.`,
  welcomeMessageEn: `Welcome! We are excited to collaborate on scaling your performance marketing campaigns.
This strategic onboarding intake captures your core business metrics, target goals, unit economics, technical tracking health, and creative assets.
It takes approximately 7–10 minutes to complete. A strategic onboarding brief and readiness audit will be generated upon submission.`,
  privacyPolicyAr: `نلتزم التزاماً صارماً بسرية وأمان بيانات نشاطك التجاري. كافة المعلومات والروابط والأرقام المالية التي تشاركها تُستخدم حصراً لغرض تخطيط، تدقيق، وإدارة الحملات الإعلانية المتفق عليها. لن يتم مشاركة بياناتك مع أي طرف ثالث أو بيعها تحت أي ظرف. لن نطلب منك مطلقاً مشاركة كلمات مرور شخصية أو بيانات بطاقات الدفع البنكية؛ وسيتم منح أي صلاحيات إعلانية عبر بوابات الأعمال الرسمية فقط (Meta Business Manager / Google Ads). يمكنك طلب تعديل أو حذف بياناتك بالكامل في أي وقت عبر التواصل معنا.`,
  privacyPolicyEn: `We strictly uphold the confidentiality and security of your business data. All metrics, links, and operational details shared are used exclusively for auditing, structuring, and running your agreed advertising campaigns. We will never share or sell your data. We never ask for personal account passwords or credit card numbers; access is granted strictly through official platform partner portals (Meta Business Portfolio / Google Ads). You may request the update or deletion of your records at any time.`
};

export const EMPTY_INTAKE_DATA: ClientIntakeData = {
  id: '',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  status: 'new',
  clientFullName: '',
  businessName: '',
  businessCategory: 'fashion_apparel',
  contactEmail: '',
  whatsappNumber: '',
  country: 'مصر (Egypt)',
  targetMarkets: ['مصر'],
  websiteUrl: '',
  hasWebsite: true,
  socialLinks: {
    facebook: '',
    instagram: '',
    tiktok: '',
    snapchat: '',
    linkedin: '',
    youtube: ''
  },
  businessAge: '1-3 years',
  businessModel: 'ecommerce',
  decisionMakerRole: 'owner_founder',

  // Products
  whatDoYouSell: '',
  products: [
    {
      id: 'prod-1',
      name: '',
      description: '',
      price: '',
      grossMarginPercent: '',
      averageOrderValue: '',
      isHeroProduct: true
    }
  ],
  averageOrderValue: '',
  averageMonthlyOrdersOrLeads: '',
  repeatPurchaseRatePercent: '',
  shippingFeePolicy: 'شحن مجاني للطلبات فوق حد معين / مصاريف ثابتة',
  deliveryCoverage: 'كافة محافظات مصر',
  paymentMethods: ['الدفع عند الاستلام (COD)', 'بطاقات ائتمان / ميزة', 'Instapay'],
  returnPolicy: 'استبدال واسترجاع خلال 14 يوماً وفق قانون حماية المستهلك',
  stockAvailability: 'in_stock_ready',
  uniqueSellingProposition: '',

  // Marketing History
  activeChannels: ['Facebook', 'Instagram'],
  hasRunAdsBefore: true,
  previousMonthlyAdSpend: '20,000 - 50,000 ج.م',
  previousObjectives: ['Conversions (Purchases)', 'WhatsApp Messages'],
  historicalResults: '',
  historicalCPA: '',
  historicalROAS: '',
  bestPerformingCampaigns: '',
  worstCampaignsOrFailures: '',
  keyMarketingBottlenecks: '',
  otherAgencyOrBuyerInvolved: 'no',
  expectationsFromAds: '',

  // Goals & KPIs
  primaryGoals: ['purchases', 'whatsapp_messages'],
  targetKPI: 'roas',
  targetCostPerResult: '',
  monthlyRevenueTarget: '',
  monthlyLeadsOrOrdersTarget: '',
  timeframeToAchieve: '3_months',
  growthPriorities: '',

  // Budget
  currency: 'EGP',
  monthlyAdSpendBudgetRange: '20,000 - 50,000',
  monthlyAdSpendCustom: '',
  allocatedMediaBuyerFee: '',
  allocatedCreativeBudget: '',
  allocatedWebDevBudget: '',
  budgetNotes: '',

  // Audience
  audienceAgeRanges: ['22-34', '35-44'],
  audienceGender: 'all',
  geographicLocations: 'القاهرة الكبرى، الإسكندرية، الدلتا والمدن الرئيسية',
  primaryLanguage: 'arabic',
  customerPersonaTraits: '',
  customerPainPoints: '',
  purchaseMotivations: '',
  commonObjections: '',
  hasCustomerDatabase: false,
  customerDatabaseSize: '',
  competitors: [
    { name: '', url: '', notes: '' },
    { name: '', url: '', notes: '' },
    { name: '', url: '', notes: '' }
  ],
  competitiveDifferentiators: '',

  // Creatives
  availableAssets: ['high_res_photos', 'product_videos'],
  creativeAssetUrls: '',
  creativeProductionCapacity: 'client_shoots_phone',
  offersAndPromotions: '',
  landingPageUrls: '',

  // Sales & Operations
  whoHandlesLeadsOrOrders: '',
  averageResponseTime: '15-60 mins',
  salesFollowUpTool: 'whatsapp_manual',
  leadQualificationProcess: '',
  salesClosingRateEstimate: '',
  shippingPartner: '',
  orderConfirmationProcess: 'phone_confirmation_first',
  dailyFulfillmentCapacity: '',
  customerServiceChannels: ['WhatsApp', 'Instagram DM'],

  // Technical Tracking
  techMetaBusinessPortfolio: 'yes',
  techMetaAdAccount: 'yes',
  techFacebookPage: 'yes',
  techInstagramAccount: 'yes',
  techPixelOrDataset: 'yes',
  techConversionsAPI: 'not_sure',
  techDomainVerification: 'yes',
  techGoogleAnalytics4: 'yes',
  techGoogleTagManager: 'not_sure',
  techCrmIntegration: 'no',
  techProductCatalog: 'yes',
  techSetupNotes: '',

  // Timeline & Consent
  targetLaunchDate: 'خلال أسبوعين',
  additionalConstraints: '',
  howDidYouHearAboutUs: 'توصية مباشرة / Referral',
  privacyConsentAgreed: false
};

export const DEMO_SUBMISSIONS: ClientIntakeData[] = [
  {
    ...EMPTY_INTAKE_DATA,
    id: 'demo-client-001',
    isDemo: true,
    status: 'qualified',
    createdAt: '2026-10-14T09:30:00.000Z',
    updatedAt: '2026-10-14T11:20:00.000Z',
    clientFullName: 'كريم المنشاوي (Karim El-Minshawy)',
    businessName: 'اوربان فاشون هب (Urban Fashion Hub)',
    businessCategory: 'fashion_apparel',
    contactEmail: 'karim@urbanfashioneg.com',
    whatsappNumber: '+201012345678',
    country: 'مصر',
    targetMarkets: ['مصر', 'الإمارات', 'السعودية'],
    websiteUrl: 'https://urbanfashioneg.shop',
    hasWebsite: true,
    socialLinks: {
      facebook: 'https://facebook.com/urbanfashioneg',
      instagram: 'https://instagram.com/urbanfashioneg',
      tiktok: 'https://tiktok.com/@urbanfashioneg'
    },
    businessAge: '1-3 years',
    businessModel: 'ecommerce',
    decisionMakerRole: 'owner_founder',
    whatDoYouSell: 'أزياء شبابية كاجوال قطنية مصنوعة بأعلى جودة وتصميمات حصرية للجنسين.',
    products: [
      {
        id: 'p1',
        name: 'هودي أوفر سايز فاخر (Signature Oversized Hoodie)',
        description: 'قطن مصري 100% مبطن ثقيل 420 جرام مع تطريز عالي الدقة',
        price: 950,
        grossMarginPercent: 62,
        averageOrderValue: 1250,
        isHeroProduct: true
      },
      {
        id: 'p2',
        name: 'كارغو بانتس بريميوم (Urban Cargo Pants)',
        description: 'بنطلون كارجو متعدد الجيوب بقصة عصرية ومقاومة للانكماش',
        price: 850,
        grossMarginPercent: 55,
        averageOrderValue: 1250,
        isHeroProduct: false
      }
    ],
    averageOrderValue: 1250,
    averageMonthlyOrdersOrLeads: 420,
    repeatPurchaseRatePercent: 28,
    shippingFeePolicy: 'شحن مجاني للطلبات فوق 1500 ج.م، و60 ج.م للشحن العادي',
    deliveryCoverage: 'كافة محافظات مصر خلال 48 إلى 72 ساعة',
    paymentMethods: ['الدفع عند الاستلام (COD)', 'بطاقات ائتمان / ميزة', 'Instapay', 'ValU التقسيط'],
    returnPolicy: 'معاينة مجانية أثناء الاستلام مع المندوب، واستبدال مجاني خلال 14 يوماً في حالة عيوب الصناعة',
    stockAvailability: 'in_stock_ready',
    uniqueSellingProposition: 'خامات قطن مصري أصيل مع معالجة ضد الوبر والانكماش وتصميمات عصرية بأسعار تنافس الماركات العالمية.',
    activeChannels: ['Facebook', 'Instagram', 'TikTok'],
    hasRunAdsBefore: true,
    previousMonthlyAdSpend: '45,000 ج.م',
    previousObjectives: ['Conversions (Purchases)', 'Catalog Sales'],
    historicalResults: 'متوسط العائد الإعلاني السابق ROAS كان 3.4x ولكن انخفض مؤخراً إلى 2.1x بسبب تكرار الإعلانات ومشاكل التتبع بعد تحديثات iOS.',
    historicalCPA: '110 ج.م للطلب المكتمل',
    historicalROAS: '2.8x',
    bestPerformingCampaigns: 'فيديوهات ريلز وتيك توك استعراض الخامات وتجربة اللبس الواقعية (UGC)',
    worstCampaignsOrFailures: 'صور المنتجات المصمتة الثابتة بالخلفيات البيضاء دون تجربة حقيقية',
    keyMarketingBottlenecks: 'عدم انتظام تجديد المحتوى الإعلاني، وضعف إعدادات Conversions API مما أثر على دقة التتبع واستهداف المبيعات.',
    otherAgencyOrBuyerInvolved: 'recently_left',
    primaryGoals: ['purchases', 'website_traffic'],
    targetKPI: 'roas',
    targetCostPerResult: '85 ج.م للطلب',
    monthlyRevenueTarget: '1,000,000 ج.م شهرياً',
    monthlyLeadsOrOrdersTarget: '800 طلب شهرياً',
    timeframeToAchieve: '3_months',
    growthPriorities: 'مضاعفة المبيعات اليومية مع الحفاظ على ROAS لا يقل عن 3.5x والتوسع في دول الخليج.',
    currency: 'EGP',
    monthlyAdSpendBudgetRange: '60,000 - 100,000',
    monthlyAdSpendCustom: 75000,
    allocatedMediaBuyerFee: '15,000 ج.م + نسبة عمولة من الأرباح',
    allocatedCreativeBudget: '10,000 ج.م شهرياً لجلسات التصوير وصناع المحتوى',
    allocatedWebDevBudget: '5,000 ج.م لتحسين سرعة متجر شوبيفاي وتجربة الشراء',
    budgetNotes: 'الميزانية مرنة وقابلة للزيادة الفورية حال استقرار العائد الإعلاني وتأكيد ربحية الحملات.',
    audienceAgeRanges: ['18-24', '25-34'],
    audienceGender: 'all',
    geographicLocations: 'القاهرة، الجيزة، الإسكندرية، المنصورة، طنطا',
    primaryLanguage: 'arabic',
    customerPersonaTraits: 'شباب جامعيون وموظفون في مقتبل حياتهم المهنية، يهتمون بالمظهر الأنيق والراحة والجودة العالية دون مبالغة في الأسعار.',
    customerPainPoints: 'الخوف من شراء ملابس أونلاين وتطلع خامة سيئة أو المقاس غير مضبوط، وتأخر التوصيل.',
    purchaseMotivations: 'المعاينة قبل الدفع، فخامة التغليف، وتوصيات مشاهير تيك توك ذوي المصداقية.',
    commonObjections: 'هل الخامة قطن حقيقي ولا بوليستر؟ هل متاح الاستبدال لو المقاس مش مظبوط؟',
    hasCustomerDatabase: true,
    customerDatabaseSize: 'قائمة بأكثر من 4,200 عميل سابق مع أرقام هواتف وإيميلات صالحة لـ Lookalike',
    competitors: [
      { name: 'Kite Wear', url: 'https://kitewear.eg', notes: 'قوي في الفيديوهات لكن أسعارهم مرتفعة' },
      { name: 'Squad Clothing', url: 'https://squadclothing.com', notes: 'تصميمات مشابهة لكن تقييمات الشحن عندهم متوسطة' },
      { name: 'Urban Peak', url: 'https://urbanpeak.co', notes: 'تركيزهم على الإيميل ماركتنج والمؤثرين' }
    ],
    competitiveDifferentiators: 'سرعة الشحن خلال 48 ساعة، خدمة معاينة الباكدج قبل الدفع، خامات قطنية معتمدة من معامل الغزل.',
    availableAssets: ['high_res_photos', 'product_videos', 'ugc', 'testimonials', 'logo_vectors', 'brand_guidelines'],
    creativeAssetUrls: 'https://drive.google.com/drive/folders/sample-urban-fashion-assets',
    creativeProductionCapacity: 'in_house_content_creator',
    offersAndPromotions: 'عرض الخصم 20% عند شراء قطعتين + شحن مجاني',
    landingPageUrls: 'https://urbanfashioneg.shop/collections/winter-oversized',
    whoHandlesLeadsOrOrders: 'فريق خدمة عملاء مكون من شخصين للرد على الواتساب والإنستغرام وتأكيد الطلبات',
    averageResponseTime: '< 15 mins',
    salesFollowUpTool: 'whatsapp_crm',
    leadQualificationProcess: 'الاتصال بالعميل خلال 30 دقيقة من إتمام الطلب لتأكيد المقاس والعنوان لمنع المرتجعات',
    salesClosingRateEstimate: 'نسبة تأكيد الطلبات الهاتفية 88%',
    shippingPartner: 'شركة بوسطة (Bosta) للشحن السريع',
    orderConfirmationProcess: 'phone_confirmation_first',
    dailyFulfillmentCapacity: '150 إلى 200 طرد يومياً مع إمكانية التوسع',
    customerServiceChannels: ['WhatsApp Business', 'Instagram Direct Messages', 'Phone Support'],
    techMetaBusinessPortfolio: 'yes',
    techMetaAdAccount: 'yes',
    techFacebookPage: 'yes',
    techInstagramAccount: 'yes',
    techPixelOrDataset: 'yes',
    techConversionsAPI: 'not_sure',
    techDomainVerification: 'yes',
    techGoogleAnalytics4: 'yes',
    techGoogleTagManager: 'not_sure',
    techCrmIntegration: 'yes',
    techProductCatalog: 'yes',
    techSetupNotes: 'حساب الإعلانات قديم ويعمل بدون تقييدات، ولكن بيكسل الميتا يحتاج تفعيل CAPI لتحسين تتبع أحداث Purchase.',
    targetLaunchDate: 'خلال 7 أيام عمل',
    additionalConstraints: 'ضرورة مراجعة الإعلانات الإبداعية والتأكد من مطابقتها لسياسات الميتا لتجنب أي حظر للحساب.',
    howDidYouHearAboutUs: 'توصية من رائد أعمال صديق',
    privacyConsentAgreed: true,
    internalNotes: 'عميل ممتاز، هوامش ربح جيدة (62%)، ولديه منتج بطل واضح. يحتاج فقط لضبط CAPI واختبار حملات تيك توك مع ريلز إنستغرام.'
  },
  {
    ...EMPTY_INTAKE_DATA,
    id: 'demo-client-002',
    isDemo: true,
    status: 'new',
    createdAt: '2026-10-15T14:15:00.000Z',
    updatedAt: '2026-10-15T14:15:00.000Z',
    clientFullName: 'د. سارة عزمي (Dr. Sarah Azmy)',
    businessName: 'عيادات إليت دينتال كير (Elite Dental Care)',
    businessCategory: 'medical_clinics',
    contactEmail: 'contact@elitedentalegypt.com',
    whatsappNumber: '+201123456789',
    country: 'مصر',
    targetMarkets: ['القاهرة الجديدة', 'مدينة نصر', 'المعادي'],
    websiteUrl: 'https://elitedentalegypt.com',
    hasWebsite: true,
    socialLinks: {
      facebook: 'https://facebook.com/elitedentalcare',
      instagram: 'https://instagram.com/elitedentalegypt'
    },
    businessAge: '3+ years',
    businessModel: 'leadgen',
    decisionMakerRole: 'owner_founder',
    whatDoYouSell: 'خدمات طب وتجميل الأسنان المتخصصة: زراعة الأسنان الرقمية، هوليوود سمايل، وتقويم الأسنان الشفاف.',
    products: [
      {
        id: 'p10',
        name: 'باقة زراعة الأسنان الفورية الألمانية',
        description: 'زراعة رقمية موجهة بالكمبيوتر بأحدث التقنيات مع ضمان مدى الحياة',
        price: 14000,
        grossMarginPercent: 45,
        averageOrderValue: 28000,
        isHeroProduct: true
      },
      {
        id: 'p11',
        name: 'ابتسامة هوليوود فينيرز 3D إيماكس',
        description: 'عدسات فينير سويسرية فائقة الدقة والجمال بدون برد مفرط للأسنان',
        price: 45000,
        grossMarginPercent: 50,
        averageOrderValue: 45000,
        isHeroProduct: false
      }
    ],
    averageOrderValue: 25000,
    averageMonthlyOrdersOrLeads: 85,
    repeatPurchaseRatePercent: 15,
    shippingFeePolicy: 'غير منطبق - خدمات طبية في المركز',
    deliveryCoverage: 'فرعي العيادة في التجمع الخامس والشيخ زايد',
    paymentMethods: ['نقداً', 'فيزا / ماستركارد', 'تقسيط بدون فوائد عبر البنوك'],
    returnPolicy: 'ضمان طبي معتمد ومتابعة مجانية لمدة 6 أشهر',
    stockAvailability: 'digital',
    uniqueSellingProposition: 'فريق استشاريين من أساتذة القصر العيني مع أجهزة مسح ثلاثي الأبعاد وتقنيات زراعة بدون جراحة مؤلمة.',
    activeChannels: ['Facebook', 'Instagram', 'Google'],
    hasRunAdsBefore: true,
    previousMonthlyAdSpend: '35,000 ج.م',
    previousObjectives: ['Lead Generation (Instant Forms)', 'WhatsApp Messages'],
    historicalResults: 'وصلنا لليدز بمتوسط 140 ج.م على استمارات فيسبوك لكن جودة اليدز كانت منخفضة وغير جادة.',
    historicalCPA: '140 ج.م لكل استمارة اتصال',
    historicalROAS: '3.8x قيمة علاجات مؤكدة',
    bestPerformingCampaigns: 'إعلانات رسائل الواتساب مع صور وفيديوهات حقيقية قبل وبعد الحالات',
    worstCampaignsOrFailures: 'استمارات فيسبوك الفورية (Instant Forms) العامة دون أسئلة تصفية',
    keyMarketingBottlenecks: 'عدم وجود مؤهل ليدز (Lead Qualifier) متخصص للتواصل الفوري في أول 10 دقائق.',
    otherAgencyOrBuyerInvolved: 'no',
    primaryGoals: ['leads', 'whatsapp_messages'],
    targetKPI: 'lead_count',
    targetCostPerResult: 'أقل من 200 ج.م لعميل جاد ومؤهل للحجز',
    monthlyRevenueTarget: '600,000 ج.م',
    monthlyLeadsOrOrdersTarget: '120 كشف واستشارة تخصصية شهرياً',
    timeframeToAchieve: '3_months',
    growthPriorities: 'جذب عملاء لخدمات الزراعة والهوليوود سمايل فقط وتجنب الكشوفات الروتينية منخفضة العائد.',
    currency: 'EGP',
    monthlyAdSpendBudgetRange: '40,000 - 70,000',
    monthlyAdSpendCustom: 50000,
    allocatedMediaBuyerFee: '12,000 ج.م شهرياً',
    allocatedCreativeBudget: '8,000 ج.م لإنتاج الفيديوهات الطبية التوعوية',
    allocatedWebDevBudget: '3,000 ج.م لصفحة حجز استشارة مخصصة (Landing Page)',
    budgetNotes: 'جاهزون لمضاعفة الصرف إذا كانت حجوزات الزراعة تتجاوز 10 حالات أسبوعياً.',
    audienceAgeRanges: ['35-44', '45-54', '55+'],
    audienceGender: 'all',
    geographicLocations: 'سكان القاهرة الجديدة، الشيخ زايد، 6 أكتوبر، مصر الجديدة، المعادي',
    primaryLanguage: 'arabic',
    customerPersonaTraits: 'رجال وسيدات أعمال، مهنيون وأصحاب دخل مرتفع يرغبون في رعاية طبية موثوقة بدون ألم.',
    customerPainPoints: 'الخوف من الألم، التجارب السابقة الفاشلة مع أطباء غير متخصصين، وصدمة الأسعار غير الشفافة.',
    purchaseMotivations: 'استعادة الثقة بالنفس والابتسامة المشرقة وضمان مدى الحياة على الزراعة.',
    commonObjections: 'هل الزراعة مؤلمة؟ كم يستغرق العلاج؟ هل يوجد تقسيط؟',
    hasCustomerDatabase: true,
    customerDatabaseSize: 'أكثر من 1,800 مريض مسجل في سيستم إدارة العيادة',
    competitors: [
      { name: 'Dental Experts', url: 'https://dentalexperts.eg', notes: 'يركزون على Google Search بقوة' },
      { name: 'Smile Studio', url: 'https://smilestudio.com', notes: 'قوي في إعلانات إنستغرام التوعوية' }
    ],
    competitiveDifferentiators: 'كشف رقمي مجاني بجهاز الـ CT Cone-Beam، وخطة علاجية مكتوبة بالأسعار الثابتة دون مفاجآت.',
    availableAssets: ['high_res_photos', 'video_reviews', 'testimonials', 'logo_vectors'],
    creativeAssetUrls: 'https://drive.google.com/drive/folders/sample-elite-dental-assets',
    creativeProductionCapacity: 'professional_agency',
    offersAndPromotions: 'فحص رقمي شامل وأشعة بانورامية مجانية مع أي خطة زراعة أو تجميل',
    landingPageUrls: 'https://elitedentalegypt.com/implant-consultation',
    whoHandlesLeadsOrOrders: 'مديرة استقبال متخصصة واستشاري تنسيق علاجي',
    averageResponseTime: '15-60 mins',
    salesFollowUpTool: 'whatsapp_crm',
    leadQualificationProcess: 'طرح 3 أسئلة أولية لمعرفة المشكلة الحالية وميزانية العميل قبل تحديد الموعد',
    salesClosingRateEstimate: '32% من المستفسرين الجادين يحضرون الكشف بالعيادة',
    shippingPartner: 'غير منطبق',
    orderConfirmationProcess: 'phone_confirmation_first',
    dailyFulfillmentCapacity: '8 استشارات زراعة وتجميل يومياً كحد أقصى للحفاظ على الجودة',
    customerServiceChannels: ['WhatsApp', 'Phone Call Support'],
    techMetaBusinessPortfolio: 'yes',
    techMetaAdAccount: 'yes',
    techFacebookPage: 'yes',
    techInstagramAccount: 'yes',
    techPixelOrDataset: 'yes',
    techConversionsAPI: 'no',
    techDomainVerification: 'yes',
    techGoogleAnalytics4: 'yes',
    techGoogleTagManager: 'no',
    techCrmIntegration: 'no',
    techProductCatalog: 'not_applicable',
    techSetupNotes: 'نحتاج بشدة لربط إعلانات جوجل ولاندنج بيدج تتبع نموذج الحجز مع GTM وGA4.',
    targetLaunchDate: 'في أقرب وقت ممكن',
    additionalConstraints: 'الالتزام بأخلاقيات الدعاية الطبية وموافقة وزارة الصحة ونقابة الأسنان.',
    howDidYouHearAboutUs: 'بحث عبر لينكد إن',
    privacyConsentAgreed: true,
    internalNotes: 'نشاط ذو قيمة عميل مرتفعة (High LTV). التوصية: إعلانات Google Search للباحثين عن زراعة وفينير + Meta Retargeting لصفحة الاستشارة.'
  }
];

export const CATEGORY_OPTIONS: { id: string; labelAr: string; labelEn: string }[] = [
  { id: 'fashion_apparel', labelAr: 'الأزياء والملابس (Fashion & Apparel)', labelEn: 'Fashion & Apparel' },
  { id: 'beauty_skincare', labelAr: 'الجمال والعناية بالبشرة (Beauty & Skincare)', labelEn: 'Beauty & Skincare' },
  { id: 'electronics_gadgets', labelAr: 'الإلكترونيات والأجهزة (Electronics & Gadgets)', labelEn: 'Electronics & Gadgets' },
  { id: 'home_furniture', labelAr: 'المنزل والديكور والأثاث (Home & Furniture)', labelEn: 'Home & Furniture' },
  { id: 'food_beverage', labelAr: 'الأغذية والمشروبات (Food & Beverage)', labelEn: 'Food & Beverage' },
  { id: 'health_fitness', labelAr: 'الصحة واللياقة والمكملات (Health & Fitness)', labelEn: 'Health & Fitness' },
  { id: 'real_estate', labelAr: 'العقارات والتطوير العقاري (Real Estate)', labelEn: 'Real Estate' },
  { id: 'automotive', labelAr: 'السيارات وقطع الغيار (Automotive)', labelEn: 'Automotive' },
  { id: 'b2b_services', labelAr: 'خدمات الشركات والـ B2B', labelEn: 'B2B Services' },
  { id: 'education_courses', labelAr: 'التعليم والكورسات التدريبية (Education & Courses)', labelEn: 'Education & Courses' },
  { id: 'medical_clinics', labelAr: 'العيادات والمراكز الطبية (Medical & Clinics)', labelEn: 'Medical & Clinics' },
  { id: 'legal_finance', labelAr: 'الاستشارات والمالية والقانون (Finance & Legal)', labelEn: 'Finance & Legal' },
  { id: 'tourism_travel', labelAr: 'السياحة والسفر والفنادق (Travel & Tourism)', labelEn: 'Travel & Tourism' },
  { id: 'other', labelAr: 'نشاط تجاري آخر (Other Category)', labelEn: 'Other Business' }
];

export const BUSINESS_MODEL_OPTIONS: { id: string; labelAr: string; labelEn: string; descAr: string; descEn: string }[] = [
  {
    id: 'ecommerce',
    labelAr: 'تجارة إلكترونية (E-commerce)',
    labelEn: 'E-commerce',
    descAr: 'متجر يبيع منتجات ملموسة عبر الشحن والدفع أونلاين أو عند الاستلام',
    descEn: 'Online store selling physical products with shipping & checkout'
  },
  {
    id: 'leadgen',
    labelAr: 'توليد عملاء محتملين (Lead Generation)',
    labelEn: 'Lead Generation',
    descAr: 'خدمات، استشارات، عقارات، أو صفقات تتطلب اتصالاً وتأهيلاً بيعياً',
    descEn: 'Services, real estate, or high-ticket sales requiring sales calls'
  },
  {
    id: 'localservice',
    labelAr: 'خدمة محلية أو متجر واقعي (Local Business / Clinic)',
    labelEn: 'Local Business',
    descAr: 'عيادات، مطاعم، صالونات، أو مراكز تخدم منطقة جغرافية محددة',
    descEn: 'Clinics, showrooms, restaurants serving a specific geographical area'
  },
  {
    id: 'infoproduct',
    labelAr: 'منتجات رقمية وكورسات (Info Products / Digital)',
    labelEn: 'Digital / Info Products',
    descAr: 'دورات تدريبية، اشتراكات رقمية، كتب إلكترونية أو برامج',
    descEn: 'Courses, digital memberships, ebooks or software'
  },
  {
    id: 'saas',
    labelAr: 'برمجيات كخدمة (SaaS & Apps)',
    labelEn: 'SaaS & Apps',
    descAr: 'تطبيقات للهواتف أو منصات سحابية تعتمد على الاشتراكات والتحميلات',
    descEn: 'Mobile apps or cloud platforms relying on subscriptions & installs'
  },
  {
    id: 'other',
    labelAr: 'نموذج عمل آخر (Other Model)',
    labelEn: 'Other Model',
    descAr: 'أنشطة هجينة أو خاصة',
    descEn: 'Hybrid or custom business model'
  }
];

export const CHANNELS_LIST = [
  'Facebook',
  'Instagram',
  'TikTok',
  'Google Search & Shopping',
  'Snapchat',
  'YouTube',
  'Pinterest',
  'Influencer Collaborations',
  'Email & SMS Marketing'
];

export const PRIMARY_GOALS_LIST: { id: string; labelAr: string; labelEn: string }[] = [
  { id: 'purchases', labelAr: 'مبيعات وطلبات شراء مباشرة (Purchases / Orders)', labelEn: 'Purchases & Orders' },
  { id: 'leads', labelAr: 'عملاء محتملين واستمارات اتصال (Qualified Leads)', labelEn: 'Qualified Leads' },
  { id: 'whatsapp_messages', labelAr: 'محادثات واتساب ورسائل مباشرة (WhatsApp Messages)', labelEn: 'WhatsApp Messages' },
  { id: 'website_traffic', labelAr: 'زيارات نوعية للموقع أو المتجر (Targeted Traffic)', labelEn: 'Targeted Website Traffic' },
  { id: 'app_installs', labelAr: 'تثبيت تطبيق الهاتف (Mobile App Installs)', labelEn: 'Mobile App Installs' },
  { id: 'brand_awareness', labelAr: 'الوعي بالعلامة والانتشار (Brand Awareness & Reach)', labelEn: 'Brand Awareness & Reach' },
  { id: 'store_visits', labelAr: 'زيارات للمقر أو الفرع الواقعي (Local Store Visits)', labelEn: 'Store / Clinic Visits' }
];

export const ASSET_TYPES_LIST: { id: string; labelAr: string; labelEn: string }[] = [
  { id: 'high_res_photos', labelAr: 'صور احترافية عالية الجودة للمنتجات', labelEn: 'High-Res Product Photos' },
  { id: 'product_videos', labelAr: 'فيديوهات استعراضية للمنتج أثناء الاستخدام', labelEn: 'Product Demo Videos' },
  { id: 'ugc', labelAr: 'محتوى صانعي محتوى ومستخدمين حقيقيين (UGC)', labelEn: 'User-Generated Content (UGC)' },
  { id: 'testimonials', labelAr: 'آراء وتقييمات العملاء المكتوبة (Reviews)', labelEn: 'Customer Written Reviews' },
  { id: 'video_reviews', labelAr: 'فيديوهات تجارب حقيقية لعملاء سابقين', labelEn: 'Video Testimonials' },
  { id: 'offer_banners', labelAr: 'تصميمات وبنرات عروض ترويجية جاهزة', labelEn: 'Promo / Offer Banners' },
  { id: 'brand_guidelines', labelAr: 'دليل الهوية البصرية والألوان (Brand Guidelines)', labelEn: 'Brand Identity Guidelines' },
  { id: 'logo_vectors', labelAr: 'شعار بدقة عالية وخلفية شفافة (Vector/PNG)', labelEn: 'High-Res Logo Vectors' }
];

export const TECH_ITEMS: { key: keyof ClientIntakeData; labelAr: string; labelEn: string; descAr: string; descEn: string }[] = [
  {
    key: 'techMetaBusinessPortfolio',
    labelAr: 'مدير أعمال ميتا (Meta Business Portfolio / BM)',
    labelEn: 'Meta Business Portfolio / BM',
    descAr: 'حساب الأعمال الرسمي لإدارة الأصول ومشاركة الصلاحيات',
    descEn: 'Official business account to manage assets and partner access'
  },
  {
    key: 'techMetaAdAccount',
    labelAr: 'حساب إعلاني مفعل على ميتا (Meta Ad Account)',
    labelEn: 'Meta Ad Account',
    descAr: 'حساب إعلاني نشط مع وسيلة دفع مضافة صالحة',
    descEn: 'Active ad account with a valid payment method'
  },
  {
    key: 'techFacebookPage',
    labelAr: 'صفحة فيسبوك رسمية (Facebook Page)',
    labelEn: 'Facebook Page',
    descAr: 'صفحة منشورة ومربوطة بمدير الأعمال',
    descEn: 'Published page connected to the business portfolio'
  },
  {
    key: 'techInstagramAccount',
    labelAr: 'حساب إنستغرام احترافي (Instagram Professional Account)',
    labelEn: 'Instagram Professional Account',
    descAr: 'حساب بيزنس أو منشئ محتوى مربوط بصفحة الفيسبوك',
    descEn: 'Business or creator account linked to the Facebook Page'
  },
  {
    key: 'techPixelOrDataset',
    labelAr: 'بيكسل ميتا أو مجموعة البيانات (Meta Pixel / Dataset)',
    labelEn: 'Meta Pixel / Dataset',
    descAr: 'كود التتبع مثبت في موقعك ويرسل أحداث البيع والتصفح',
    descEn: 'Tracking code installed on your store sending events'
  },
  {
    key: 'techConversionsAPI',
    labelAr: 'واجهة برمجة تطبيقات التحويلات (Conversions API - CAPI)',
    labelEn: 'Conversions API (CAPI)',
    descAr: 'تتبع من جانب السيرفر لتجاوز قيود حظر الإعلانات وملفات الكوكيز',
    descEn: 'Server-side tracking bypasses ad-blockers & iOS restrictions'
  },
  {
    key: 'techDomainVerification',
    labelAr: 'توثيق النطاق في ميتا (Meta Domain Verification)',
    labelEn: 'Meta Domain Verification',
    descAr: 'تأكيد ملكية دومين موقعك عبر سجلات DNS أو كود الميتا',
    descEn: 'Confirmed domain ownership in Meta via DNS or HTML'
  },
  {
    key: 'techGoogleAnalytics4',
    labelAr: 'إحصاءات جوجل 4 (Google Analytics 4 - GA4)',
    labelEn: 'Google Analytics 4 (GA4)',
    descAr: 'لقياس حركة الزوار ومصادر الزيارات بدقة ومعدلات الارتداد',
    descEn: 'To measure traffic sources, user journeys and conversions'
  },
  {
    key: 'techGoogleTagManager',
    labelAr: 'مدير إشارات جوجل (Google Tag Manager - GTM)',
    labelEn: 'Google Tag Manager (GTM)',
    descAr: 'لإدارة أكواد التتبع والبيكسلات دون الحاجة لتعديل كود الموقع',
    descEn: 'To manage tags and pixels without hardcoding web scripts'
  },
  {
    key: 'techProductCatalog',
    labelAr: 'كتالوج المنتجات الديناميكي (Meta / Google Product Catalog)',
    labelEn: 'Product Catalog Feed',
    descAr: 'موجز منتجات محدث تلقائياً لإعلانات الـ Advantage+ Catalog',
    descEn: 'Dynamic synced product catalog for Advantage+ shopping ads'
  },
  {
    key: 'techCrmIntegration',
    labelAr: 'نظام إدارة علاقات العملاء أو الربط التلقائي (CRM / Zapier / Make)',
    labelEn: 'CRM / Lead Automation',
    descAr: 'نقل فوري لبيانات المستفسرين لفريق المبيعات عبر الواتساب أو الإيميل',
    descEn: 'Instant automated lead forwarding to your sales team'
  }
];
