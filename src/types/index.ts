export type Language = 'ar' | 'en';

export type BusinessModel = 'ecommerce' | 'leadgen' | 'localservice' | 'saas' | 'infoproduct' | 'other';

export type BusinessCategory = 
  | 'fashion_apparel'
  | 'beauty_skincare'
  | 'electronics_gadgets'
  | 'home_furniture'
  | 'food_beverage'
  | 'health_fitness'
  | 'real_estate'
  | 'automotive'
  | 'b2b_services'
  | 'education_courses'
  | 'medical_clinics'
  | 'legal_finance'
  | 'tourism_travel'
  | 'other';

export type Currency = 'EGP' | 'USD' | 'SAR' | 'AED' | 'EUR' | 'KWD';

export type AuditStatus = 'yes' | 'no' | 'not_sure' | 'not_applicable';

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  price: number | '';
  grossMarginPercent: number | '';
  averageOrderValue?: number | '';
  isHeroProduct: boolean;
}

export interface CompetitorItem {
  name: string;
  url: string;
  notes: string;
}

export interface ClientIntakeData {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: 'new' | 'reviewing' | 'awaiting_info' | 'qualified' | 'not_a_fit';
  internalNotes?: string;
  isDemo?: boolean;

  // Step 1: Business Profile
  clientFullName: string;
  businessName: string;
  businessCategory: BusinessCategory | string;
  contactEmail: string;
  whatsappNumber: string;
  country: string;
  targetMarkets: string[]; // e.g. Egypt, KSA, UAE, GCC, Global
  websiteUrl: string;
  hasWebsite: boolean;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    tiktok?: string;
    snapchat?: string;
    linkedin?: string;
    youtube?: string;
  };
  businessAge: '< 6 months' | '6-12 months' | '1-3 years' | '3+ years';
  businessModel: BusinessModel;
  decisionMakerRole: 'owner_founder' | 'marketing_director' | 'cmo' | 'general_manager' | 'partner' | 'other';

  // Step 2: Products & Offerings
  whatDoYouSell: string;
  products: ProductItem[];
  averageOrderValue: number | '';
  averageMonthlyOrdersOrLeads: number | '';
  repeatPurchaseRatePercent: number | '';
  shippingFeePolicy: string; // Free above X, flat fee, etc.
  deliveryCoverage: string; // Cairo/Giza, all Egypt, GCC, etc.
  paymentMethods: string[]; // Cash on delivery, Credit Card, Instapay, Valu, etc.
  returnPolicy: string;
  stockAvailability: 'in_stock_ready' | 'made_to_order' | 'dropshipping' | 'limited_stock' | 'digital';
  uniqueSellingProposition: string; // Why customers buy from you

  // Step 3: Marketing & Advertising History
  activeChannels: string[]; // Facebook, Instagram, TikTok, Google, Snapchat, YouTube, Pinterest, Influencers, None
  hasRunAdsBefore: boolean;
  previousMonthlyAdSpend: string;
  previousObjectives: string[];
  historicalResults: string; // CPA, ROAS, results
  historicalCPA?: string;
  historicalROAS?: string;
  bestPerformingCampaigns: string;
  worstCampaignsOrFailures: string;
  keyMarketingBottlenecks: string;
  otherAgencyOrBuyerInvolved: 'no' | 'currently_active' | 'recently_left' | 'in_house_team';
  expectationsFromAds?: string; // If no prior ads

  // Step 4: Goals and KPIs
  primaryGoals: string[]; // purchases, leads, whatsapp_messages, website_traffic, app_installs, brand_awareness, store_visits
  targetKPI: 'cpa' | 'roas' | 'lead_count' | 'sales_volume' | 'revenue' | 'messages';
  targetCostPerResult: string;
  monthlyRevenueTarget: string;
  monthlyLeadsOrOrdersTarget: string;
  timeframeToAchieve: '1_month' | '3_months' | '6_months' | '12_months';
  growthPriorities: string;

  // Step 5: Budget & Unit Economics
  currency: Currency;
  monthlyAdSpendBudgetRange: string;
  monthlyAdSpendCustom: number | '';
  allocatedMediaBuyerFee: string;
  allocatedCreativeBudget: string;
  allocatedWebDevBudget: string;
  budgetNotes: string;

  // Step 6: Target Audience & Competitors
  audienceAgeRanges: string[];
  audienceGender: 'all' | 'predominantly_female' | 'predominantly_male';
  geographicLocations: string;
  primaryLanguage: 'arabic' | 'english' | 'bilingual' | 'other';
  customerPersonaTraits: string;
  customerPainPoints: string;
  purchaseMotivations: string;
  commonObjections: string;
  hasCustomerDatabase: boolean; // For lookalikes / custom audiences
  customerDatabaseSize?: string;
  competitors: CompetitorItem[];
  competitiveDifferentiators: string;

  // Step 7: Creative Assets
  availableAssets: string[]; // high_res_photos, product_videos, ugc, testimonials, video_reviews, offer_banners, brand_guidelines, logo_vectors
  creativeAssetUrls: string; // Google Drive / Dropbox link
  creativeProductionCapacity: 'in_house_content_creator' | 'client_shoots_phone' | 'professional_agency' | 'need_media_buyer_guidance' | 'no_content';
  offersAndPromotions: string; // BOGO, 20% off, free shipping, bundles
  landingPageUrls: string;

  // Step 8: Sales & Fulfillment Operations
  whoHandlesLeadsOrOrders: string; // Internal sales team, founder, customer service rep
  averageResponseTime: '< 15 mins' | '15-60 mins' | '1-4 hours' | '24 hours+' | 'automated_instant';
  salesFollowUpTool: 'whatsapp_manual' | 'whatsapp_crm' | 'google_sheets' | 'dedicated_crm' | 'website_direct';
  leadQualificationProcess: string;
  salesClosingRateEstimate: string;
  shippingPartner: string;
  orderConfirmationProcess: 'instant_ship' | 'phone_confirmation_first' | 'whatsapp_confirmation_first';
  dailyFulfillmentCapacity: string;
  customerServiceChannels: string[];

  // Step 9: Tracking & Technical Setup (Audit Checklist)
  techMetaBusinessPortfolio: AuditStatus;
  techMetaAdAccount: AuditStatus;
  techFacebookPage: AuditStatus;
  techInstagramAccount: AuditStatus;
  techPixelOrDataset: AuditStatus;
  techConversionsAPI: AuditStatus;
  techDomainVerification: AuditStatus;
  techGoogleAnalytics4: AuditStatus;
  techGoogleTagManager: AuditStatus;
  techCrmIntegration: AuditStatus;
  techProductCatalog: AuditStatus;
  techSetupNotes: string;

  // Step 10: Timeline, Additional Notes & Privacy
  targetLaunchDate: string;
  additionalConstraints: string;
  howDidYouHearAboutUs: string;
  privacyConsentAgreed: boolean;
  termsAgreedTimestamp?: string;
}

export interface ReadinessScoreResult {
  overallScore: number; // 0 - 100
  rating: 'exceptional' | 'ready' | 'needs_preparation' | 'high_risk';
  breakdown: {
    tracking: number; // 0 - 25
    creatives: number; // 0 - 25
    economics: number; // 0 - 25
    operations: number; // 0 - 25
  };
  strengths: string[];
  blockers: string[];
  recommendedChannels: string[];
  suggestedDiscoveryQuestions: string[];
  actionPlanSteps: string[];
}

export interface AppSettings {
  agencyName: string;
  tagline: string;
  logoUrl?: string;
  contactWhatsApp: string;
  contactEmail: string;
  accentColor: string; // hex or tailwind class
  defaultCurrency: Currency;
  defaultLanguage: Language;
  welcomeMessageAr: string;
  welcomeMessageEn: string;
  privacyPolicyAr: string;
  privacyPolicyEn: string;
}
