export interface QuestionnaireQuestion {
  id: string;
  section: string;
  titleAr: string;
  titleEn: string;
  type: 'SHORT_ANSWER' | 'PARAGRAPH' | 'MULTIPLE_CHOICE' | 'CHECKBOXES' | 'DROPDOWN' | 'LINEAR_SCALE';
  required: boolean;
  optionsAr?: string[];
  optionsEn?: string[];
  helperAr?: string;
  helperEn?: string;
  conditionalRule?: string;
}

export const QUESTIONNAIRE_MATRIX: QuestionnaireQuestion[] = [
  // SECTION 1: BUSINESS PROFILE
  {
    id: 'client_full_name',
    section: '1. معلومات النشاط التجاري والتواصل (Business Profile)',
    titleAr: 'الاسم الكامل للعميل / صاحب القرار',
    titleEn: 'Client / Decision-Maker Full Name',
    type: 'SHORT_ANSWER',
    required: true,
    helperAr: 'الاسم الثلاثي للشخص المسؤول عن اتخاذ القرارات التسويقية والتعاقد',
    helperEn: 'Full name of the authorized decision-maker'
  },
  {
    id: 'business_name',
    section: '1. معلومات النشاط التجاري والتواصل (Business Profile)',
    titleAr: 'اسم العلامة التجارية أو النشاط (Brand Name)',
    titleEn: 'Business / Brand Name',
    type: 'SHORT_ANSWER',
    required: true,
    helperAr: 'الاسم التجاري كما يظهر للجمهور في الإعلانات والسوشيال ميديا',
    helperEn: 'Official brand name used in public marketing'
  },
  {
    id: 'business_category',
    section: '1. معلومات النشاط التجاري والتواصل (Business Profile)',
    titleAr: 'تصنيف النشاط أو الصناعة',
    titleEn: 'Business Industry / Category',
    type: 'DROPDOWN',
    required: true,
    optionsAr: [
      'الأزياء والملابس (Fashion & Apparel)',
      'الجمال والعناية بالبشرة (Beauty & Skincare)',
      'الإلكترونيات والأجهزة (Electronics & Gadgets)',
      'المنزل والديكور والأثاث (Home & Furniture)',
      'الأغذية والمشروبات (Food & Beverage)',
      'الصحة واللياقة والمكملات (Health & Fitness)',
      'العقارات والتطوير العقاري (Real Estate)',
      'السيارات وخدماتها (Automotive)',
      'خدمات الشركات (B2B Services)',
      'التعليم والكورسات التدريبية (Education)',
      'العيادات والمراكز الطبية (Medical Clinics)',
      'الاستشارات والمالية (Finance & Legal)',
      'السياحة والفنادق (Travel & Tourism)',
      'نشاط آخر (Other)'
    ],
    optionsEn: [
      'Fashion & Apparel',
      'Beauty & Skincare',
      'Electronics & Gadgets',
      'Home & Furniture',
      'Food & Beverage',
      'Health & Fitness',
      'Real Estate',
      'Automotive',
      'B2B Services',
      'Education & Courses',
      'Medical Clinics',
      'Finance & Legal',
      'Travel & Tourism',
      'Other'
    ]
  },
  {
    id: 'contact_email',
    section: '1. معلومات النشاط التجاري والتواصل (Business Profile)',
    titleAr: 'البريد الإلكتروني للعمل',
    titleEn: 'Work Email Address',
    type: 'SHORT_ANSWER',
    required: true,
    helperAr: 'لإرسال التقارير، ملخصات الاجتماعات، وصلاحيات الوصول',
    helperEn: 'Used for sending briefs, reports, and asset permissions'
  },
  {
    id: 'whatsapp_number',
    section: '1. معلومات النشاط التجاري والتواصل (Business Profile)',
    titleAr: 'رقم الواتساب مع كود الدولة',
    titleEn: 'WhatsApp Phone Number (with Country Code)',
    type: 'SHORT_ANSWER',
    required: true,
    helperAr: 'مثال: +201012345678 أو +966501234567',
    helperEn: 'e.g., +201012345678 or +966501234567'
  },
  {
    id: 'has_website',
    section: '1. معلومات النشاط التجاري والتواصل (Business Profile)',
    titleAr: 'هل يمتلك النشاط موقعاً إلكترونياً أو متجراً للشراء؟',
    titleEn: 'Do you currently have an active website or e-commerce store?',
    type: 'MULTIPLE_CHOICE',
    required: true,
    optionsAr: ['نعم، لدينا موقع / متجر إلكتروني', 'لا، نعتمد على رسائل الواتساب أو صفحات التواصل'],
    optionsEn: ['Yes, we have an active website / store', 'No, we rely on WhatsApp or social pages']
  },
  {
    id: 'website_url',
    section: '1. معلومات النشاط التجاري والتواصل (Business Profile)',
    titleAr: 'رابط الموقع أو المتجر الإلكتروني (إن وجد)',
    titleEn: 'Website or Store URL (if applicable)',
    type: 'SHORT_ANSWER',
    required: false,
    helperAr: 'مثال: https://mybrand.com',
    helperEn: 'e.g. https://mybrand.com',
    conditionalRule: 'مطلوب فقط إذا تم اختيار: نعم لدينا موقع'
  },
  {
    id: 'business_model',
    section: '1. معلومات النشاط التجاري والتواصل (Business Profile)',
    titleAr: 'ما هو نموذج العمل الأساسي؟ (Business Model)',
    titleEn: 'Core Business Model',
    type: 'MULTIPLE_CHOICE',
    required: true,
    optionsAr: [
      'تجارة إلكترونية وشحن منتجات ملموسة (E-commerce)',
      'توليد عملاء محتملين واستشارات أو عقارات (Lead Generation)',
      'خدمة محلية أو عيادة أو متجر واقعي (Local Business / Clinic)',
      'منتجات رقمية ودورات تدريبية (Digital / Info Products)',
      'برمجيات وتطبيقات (SaaS / Mobile Apps)'
    ],
    optionsEn: [
      'E-commerce (physical products)',
      'Lead Generation (high-ticket services, real estate, B2B)',
      'Local Business / Clinic / Branch visits',
      'Digital / Info Products / Courses',
      'SaaS / Mobile App Installs'
    ]
  },

  // SECTION 2: PRODUCTS & UNIT ECONOMICS
  {
    id: 'what_do_you_sell',
    section: '2. المنتجات وتفاصيل العرض والأسعار (Products & Unit Economics)',
    titleAr: 'ما الذي يبيعه نشاطك بالتحديد؟ وصف مبسط للعرض الرئيسي',
    titleEn: 'What does your business sell? Concise overview of main offerings',
    type: 'PARAGRAPH',
    required: true,
    helperAr: 'وضح طبيعة المنتجات أو الخدمات وما الفائدة المباشرة للعميل',
    helperEn: 'Explain what you sell and the core transformation for the buyer'
  },
  {
    id: 'hero_products_and_prices',
    section: '2. المنتجات وتفاصيل العرض والأسعار (Products & Unit Economics)',
    titleAr: 'المنتجات الأكثر مبيعاً (Hero Products) وأسعارها وهامش الربح إن عُرف',
    titleEn: 'Top Best-Selling Products, Selling Prices & Gross Margins',
    type: 'PARAGRAPH',
    required: true,
    helperAr: 'مثال: هودي قطن بسعر 850 ج.م بهامش ربح 55%، بنطلون كارجو بسعر 700 ج.م',
    helperEn: 'e.g. Signature product at $50 (60% margin), bundle at $90'
  },
  {
    id: 'average_order_value',
    section: '2. المنتجات وتفاصيل العرض والأسعار (Products & Unit Economics)',
    titleAr: 'متوسط قيمة الفاتورة أو الطلب (AOV - Average Order Value)',
    titleEn: 'Average Order Value (AOV) / Average Transaction Value',
    type: 'SHORT_ANSWER',
    required: false,
    helperAr: 'متوسط ما يدفعه العميل في السلة الواحدة أو قيمة الصفقة المتوسطة',
    helperEn: 'Average basket size or average deal revenue per customer'
  },
  {
    id: 'shipping_and_payment_methods',
    section: '2. المنتجات وتفاصيل العرض والأسعار (Products & Unit Economics)',
    titleAr: 'وسائل الدفع وسياسة الشحن والتوصيل',
    titleEn: 'Payment Methods & Shipping / Delivery Policy',
    type: 'CHECKBOXES',
    required: true,
    optionsAr: [
      'الدفع عند الاستلام (Cash on Delivery - COD)',
      'بطاقات الائتمان والخصم المباشر أونلاين (Credit / Debit Cards)',
      'تحويلات إنستاباي والمحافظ الإلكترونية (Instapay / Wallets)',
      'التقسيط وخدمات اشترِ الآن وادفع لاحقاً (ValU / Tabby / Tamara)',
      'شحن مجاني للطلبات الكبيرة',
      'معاينة البضاعة مع المندوب قبل الاستلام'
    ],
    optionsEn: [
      'Cash on Delivery (COD)',
      'Online Credit/Debit Cards',
      'Mobile Wallets / Instant Bank Transfer',
      'Buy Now Pay Later (BNPL / Installments)',
      'Free Shipping Threshold',
      'Inspection upon delivery permitted'
    ]
  },
  {
    id: 'unique_selling_proposition',
    section: '2. المنتجات وتفاصيل العرض والأسعار (Products & Unit Economics)',
    titleAr: 'الميزة التنافسية الفريدة (USP): لماذا يشتري العميل منك بدلاً من المنافسين؟',
    titleEn: 'Unique Selling Proposition (USP): Why should customers buy from you instead of competitors?',
    type: 'PARAGRAPH',
    required: true,
    helperAr: 'خامة، سرعة، ضمان، سعر، نتيجة مضمونة، أو خدمة عملاء استثنائية',
    helperEn: 'Unique material, guarantee, speed, proprietary process, or unmatched pricing'
  },

  // SECTION 3: MARKETING & ADVERTISING HISTORY
  {
    id: 'active_marketing_channels',
    section: '3. تاريخ التسويق والإعلانات السابقة (Advertising History)',
    titleAr: 'القنوات والمنصات التي تستخدمها حالياً',
    titleEn: 'Active Marketing Channels Currently Utilized',
    type: 'CHECKBOXES',
    required: true,
    optionsAr: ['Facebook', 'Instagram', 'TikTok', 'Google Search / Shopping', 'Snapchat', 'YouTube', 'Influencers', 'لم نطلق إعلانات بعد'],
    optionsEn: ['Facebook', 'Instagram', 'TikTok', 'Google Search / Shopping', 'Snapchat', 'YouTube', 'Influencers', 'Have never run paid ads']
  },
  {
    id: 'has_run_ads_before',
    section: '3. تاريخ التسويق والإعلانات السابقة (Advertising History)',
    titleAr: 'هل قمت بإطلاق حملات إعلانية مدفوعة من قبل؟',
    titleEn: 'Have you previously run paid advertising campaigns?',
    type: 'MULTIPLE_CHOICE',
    required: true,
    optionsAr: ['نعم، قمنا بصرف ميزانيات إعلانية سابقاً', 'لا، هذه المرة الأولى لإطلاق إعلانات مدفوعة'],
    optionsEn: ['Yes, we have spent on paid ads before', 'No, this is our first time running paid ads']
  },
  {
    id: 'historical_results_and_cpa',
    section: '3. تاريخ التسويق والإعلانات السابقة (Advertising History)',
    titleAr: 'النتائج السابقة: كم كان متوسط الصرف الشهري وما هي أفضل النتائج وأكبر التحديات؟',
    titleEn: 'Past Performance: Monthly spend, CPA, ROAS, best campaigns and main bottlenecks',
    type: 'PARAGRAPH',
    required: false,
    helperAr: 'إذا لم تكن أطلقت إعلانات، اذكر توقعاتك وأسباب رغبتك في البدء الآن',
    helperEn: 'If no prior ads, describe your growth expectations and targets',
    conditionalRule: 'إذا اخترت نعم قمنا بصرف ميزانيات، اذكر الأرقام بدقة'
  },

  // SECTION 4: GOALS & BUDGET
  {
    id: 'primary_goals',
    section: '4. الأهداف والميزانية المقترحة (Goals, KPIs & Budget)',
    titleAr: 'ما هو الهدف التسويقي الأساسي الذي ترغب في تحقيقه؟',
    titleEn: 'What is your primary commercial advertising goal?',
    type: 'CHECKBOXES',
    required: true,
    optionsAr: [
      'مبيعات وطلبات شراء مباشرة عبر الموقع (Purchases / Orders)',
      'توليد عملاء محتملين واستمارات اتصال مؤهلة (Qualified Leads)',
      'محادثات واستفسارات بيع عبر الواتساب (WhatsApp Inquiries)',
      'زيارات عالية الجودة للمتجر الإلكتروني (Website Traffic)',
      'تثبيت واستخدام تطبيق الهاتف (App Installs)',
      'الوعي بالعلامة والانتشار في السوق (Brand Awareness)'
    ],
    optionsEn: [
      'Direct Website Purchases / Orders',
      'Qualified Lead Inquiries',
      'WhatsApp Sales Conversations',
      'High-Intent Website Traffic',
      'Mobile App Installs',
      'Brand Awareness & Market Reach'
    ]
  },
  {
    id: 'monthly_ad_spend_budget',
    section: '4. الأهداف والميزانية المقترحة (Goals, KPIs & Budget)',
    titleAr: 'الميزانية الشهرية المخصصة للصرف الإعلاني المباشر على المنصات (Ad Spend Only)',
    titleEn: 'Planned Monthly Ad Spend Budget (Platform Ad Spend Only - Excludes Agency Fees)',
    type: 'SHORT_ANSWER',
    required: true,
    helperAr: 'ملحوظة هامة: هذه الميزانية تذهب مباشرة لفيسبوك/جوجل وتختلف عن أتعاب إدارة الحملات. مثال: 30,000 ج.م أو $1,500',
    helperEn: 'Note: Excludes media buyer management fees. e.g. 50,000 EGP or $2,000 USD'
  },

  // SECTION 5: AUDIENCE & COMPETITORS
  {
    id: 'target_audience_demographics',
    section: '5. الجمهور المستهدف والمنافسون (Target Audience & Competitors)',
    titleAr: 'الفئة العمرية والمناطق الجغرافية واهتمامات العميل المثالي',
    titleEn: 'Target Audience Age Brackets, Geographic Markets & Key Characteristics',
    type: 'PARAGRAPH',
    required: true,
    helperAr: 'مثال: رجال وسيدات 22-45 سنة في المدن الرئيسية، مهتمون بـ ... ولديهم مشكلة ...',
    helperEn: 'e.g., ages 25-45 in major metropolitan areas seeking high quality...'
  },
  {
    id: 'top_competitors_links',
    section: '5. الجمهور المستهدف والمنافسون (Target Audience & Competitors)',
    titleAr: 'أبرز 3 منافسين مباشرين وروابط مواقعهم أو صفحاتهم العامة',
    titleEn: 'Top 3 Direct Competitors and their public website or social links',
    type: 'PARAGRAPH',
    required: true,
    helperAr: 'روابط صفحات فيسبوك، إنستغرام، أو مواقع المنافسين للاطلاع على استراتيجياتهم الإعلانية',
    helperEn: 'Public links to analyze their creative angles and ad libraries'
  },

  // SECTION 6: CREATIVES & OPERATIONS
  {
    id: 'available_creative_assets',
    section: '6. المواد الإبداعية والجاهزية التشغيلية (Creatives & Operations)',
    titleAr: 'المواد الإعلانية المتوفرة لديك حالياً',
    titleEn: 'Available Creative Assets Currently Ready',
    type: 'CHECKBOXES',
    required: true,
    optionsAr: [
      'صور فوتوغرافية احترافية للمنتجات بدقة عالية',
      'فيديوهات استعراضية للمنتج وتجربة الاستخدام',
      'فيديوهات صناع محتوى وتجارب عملاء حقيقية (UGC)',
      'آراء ومحادثات عملاء سابقة موثقة (Testimonials)',
      'عروض وخصومات وباقات محددة بوضوح',
      'لوجو وهوية بصرية واضحة'
    ],
    optionsEn: [
      'High-Resolution Product Photography',
      'Product Demo & Unboxing Videos',
      'Authentic UGC & Creator Clips',
      'Customer Reviews & Testimonials',
      'Clearly Defined Promotions & Bundles',
      'Brand Identity & High-Res Logo'
    ]
  },
  {
    id: 'creative_assets_drive_link',
    section: '6. المواد الإبداعية والجاهزية التشغيلية (Creatives & Operations)',
    titleAr: 'رابط مجلد Google Drive أو Dropbox للمواد الإعلانية (إن توفر)',
    titleEn: 'Public Google Drive / Dropbox link for creative assets (if ready)',
    type: 'SHORT_ANSWER',
    required: false,
    helperAr: 'يرجى التأكد من ضبط إذن الرابط على "Anyone with the link can view"',
    helperEn: 'Please set sharing permissions to "Anyone with the link can view"'
  },
  {
    id: 'sales_response_speed',
    section: '6. المواد الإبداعية والجاهزية التشغيلية (Creatives & Operations)',
    titleAr: 'كم يستغرق فريقك في المتوسط للرد على رسائل واستفسارات العملاء الجدد؟',
    titleEn: 'Average sales / customer service response time to new inquiries',
    type: 'MULTIPLE_CHOICE',
    required: true,
    optionsAr: [
      'أقل من 15 دقيقة (استجابة فورية فائقة)',
      'من 15 إلى 60 دقيقة',
      'من ساعة إلى 4 ساعات',
      'خلال 24 ساعة أو أكثر'
    ],
    optionsEn: [
      'Under 15 minutes (lightning fast)',
      '15 to 60 minutes',
      '1 to 4 hours',
      'Over 24 hours'
    ]
  },

  // SECTION 7: TECHNICAL TRACKING
  {
    id: 'technical_tracking_status',
    section: '7. البنية التقنية والتتبع (Technical Tracking Audit)',
    titleAr: 'ما هي الأصول التقنية المفعلة والمثبتة لديك حالياً؟',
    titleEn: 'Which tracking assets and business accounts are currently active?',
    type: 'CHECKBOXES',
    required: true,
    optionsAr: [
      'حساب مدير أعمال ميتا مفعل (Meta Business Portfolio)',
      'حساب إعلاني نشط ووسيلة دفع مربوطة',
      'بيكسل ميتا مثبت ويعمل على الموقع (Meta Pixel)',
      'واجهة تحويلات السيرفر مفعلة (Meta Conversions API - CAPI)',
      'توثيق النطاق في ميتا (Domain Verification)',
      'إحصاءات جوجل 4 مثبتة (GA4)',
      'مدير إشارات جوجل مثبت (Google Tag Manager)',
      'كتالوج منتجات محدث ومربوط بالإعلانات',
      'غير متأكد من الحالة التقنية ونحتاج لمراجعتها معاً'
    ],
    optionsEn: [
      'Active Meta Business Portfolio',
      'Active Ad Account with verified payment method',
      'Meta Pixel / Dataset active on website',
      'Meta Conversions API (CAPI) configured',
      'Domain Verification completed',
      'Google Analytics 4 (GA4) installed',
      'Google Tag Manager (GTM) installed',
      'Dynamic Product Catalog Feed synced',
      'Not sure / Need assistance auditing technical tracking'
    ]
  },

  // SECTION 8: PRIVACY CONSENT
  {
    id: 'privacy_and_access_agreement',
    section: '8. الخصوصية والموافقة (Privacy & Partner Access)',
    titleAr: 'الموافقة على سياسة الخصوصية ومنح الصلاحيات الرسمية',
    titleEn: 'Privacy Consent and Platform Access Agreement',
    type: 'CHECKBOXES',
    required: true,
    optionsAr: [
      'أوافق على سياسة الخصوصية وأقر بأن البيانات تُستخدم لأغراض دراسة وإدارة الحملات الإعلانية فقط، وأن منح الصلاحيات يتم عبر القنوات الرسمية دون مشاركة أي كلمات مرور أو بيانات بطاقات بنكية.'
    ],
    optionsEn: [
      'I agree to the privacy policy and understand that all data is strictly used for campaign strategy, and that platform access is granted solely via official business partner permissions without sharing passwords or payment cards.'
    ]
  }
];

export const GOOGLE_FORMS_SETUP_GUIDE = `
# دليل الربط والتكامل الفني (Integration & Setup Guide)

### 1. تكامل Google Forms و Google Drive (المفعل تلقائياً في التطبيق)
- التطبيق مزود بربط رسمي مع Google Forms API عبر Google OAuth المعتمد.
- بمجرد الضغط على زر "إنشاء النموذج في Google Forms" وتسجيل الدخول بحساب جوجل، يتم استدعاء واجهة برمجة التطبيقات (API) وإنشاء استبيان كامل بجميع الأسئلة والأقسام وخيارات الإجابة، مع إرجاع رابط التعديل ورابط النشر العام للعملاء مباشرة.
- لا يتم حفظ أي رموز وصول في الذاكرة المحلية (localStorage) حفاظاً على الأمان.

### 2. الربط مع Google Sheets لتخزين الردود تلقائياً
- عند فتح نموذج Google Forms الذي أنشأته:
  1. انتقل إلى تبويب "الردود" (Responses).
  2. اضغط على أيقونة "الربط بجداول بيانات Google" (Link to Sheets).
  3. سيتم إنشاء جدول بيانات جديد في Google Drive يتلقى كل إجابة عميل فور إرسالها بشكل لحظي وبصورة مجانية تماماً.

### 3. إشعارات البريد الإلكتروني الفورية (Email Notifications)
- داخل Google Forms: اضغط على القائمة ثلاثية النقاط (⋮) في تبويب الردود، ثم فعّل خيار: "الحصول على إشعارات بالبريد الإلكتروني للردود الجديدة".
- أو يمكنك استخدام أداة Google Workspace Apps Script المدمجة لإرسال بريد بتنسيق جميل لبريدك وللعميل فور الإرسال.

### 4. خيارات قاعدة البيانات السحابية (Cloud Database Persistence)
- في حال الرغبة بربط قاعدة بيانات مركزية لتخزين الاستمارات عبر الأجهزة:
  - يمكن ربط **Cloud SQL (PostgreSQL)** أو **Firebase Firestore**.
  - في الوضع الافتراضي، يتم حفظ الاستمارات محلياً في متصفحك (LocalStorage) لضمان الخصوصية والعمل بدون إنترنت، وتتضمن لوحة التحكم بيانات توضيحية مميزة بعلامة [تجريبي / Demo].
`;
