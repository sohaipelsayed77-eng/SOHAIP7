import { ClientIntakeData, ReadinessScoreResult } from '../types';

export function calculateReadinessScore(data: ClientIntakeData, lang: 'ar' | 'en' = 'ar'): ReadinessScoreResult {
  let trackingScore = 0;
  let creativesScore = 0;
  let economicsScore = 0;
  let operationsScore = 0;

  const strengths: string[] = [];
  const blockers: string[] = [];
  const recommendedChannels: string[] = [];
  const suggestedDiscoveryQuestions: string[] = [];
  const actionPlanSteps: string[] = [];

  // ================= 1. TRACKING & TECH AUDIT (Max 25) =================
  let trackingItemsCount = 0;
  if (data.techMetaBusinessPortfolio === 'yes') { trackingScore += 3; trackingItemsCount++; }
  if (data.techMetaAdAccount === 'yes') { trackingScore += 3; trackingItemsCount++; }
  if (data.techPixelOrDataset === 'yes') { trackingScore += 5; trackingItemsCount++; }
  if (data.techConversionsAPI === 'yes') { trackingScore += 5; trackingItemsCount++; }
  if (data.techDomainVerification === 'yes') { trackingScore += 3; trackingItemsCount++; }
  if (data.techGoogleAnalytics4 === 'yes') { trackingScore += 3; trackingItemsCount++; }
  if (data.techGoogleTagManager === 'yes') { trackingScore += 3; trackingItemsCount++; }

  if (trackingScore >= 20) {
    strengths.push(
      lang === 'ar'
        ? 'بنية التتبع الرقمي (Pixel / CAPI / GA4) متقدمة ومكتملة، مما يتيح استهدافاً وخوارزميات تعلم آلي عالية الكفاءة.'
        : 'Solid technical tracking infrastructure (Pixel, CAPI & GA4 ready) allowing optimal algorithmic machine learning.'
    );
  } else {
    if (data.techConversionsAPI !== 'yes') {
      blockers.push(
        lang === 'ar'
          ? 'واجهة Conversions API غير مفعلة، مما يفقد الحملات حتى 25% من إشارات الشراء بسبب متصفحات iOS وحواجب الإعلانات.'
          : 'Conversions API (CAPI) is missing or unverified, causing significant signal loss on iOS and ad-blocked devices.'
      );
      actionPlanSteps.push(
        lang === 'ar'
          ? 'إعداد وربط Meta Conversions API عبر السيرفر قبل إطلاق أي ميزانية تحويلات بيعية.'
          : 'Setup and verify Meta Conversions API via server/gateway before launching conversion spend.'
      );
    }
    if (data.techPixelOrDataset !== 'yes') {
      blockers.push(
        lang === 'ar'
          ? 'بيكسل التتبع الأساسي غير مثبت أو غير مفعل في الموقع.'
          : 'Core Meta Pixel / Dataset is not installed or active.'
      );
    }
  }

  // ================= 2. CREATIVES & ASSETS AUDIT (Max 25) =================
  const assets = data.availableAssets || [];
  if (assets.includes('product_videos')) creativesScore += 6;
  if (assets.includes('ugc')) creativesScore += 6;
  if (assets.includes('testimonials') || assets.includes('video_reviews')) creativesScore += 5;
  if (assets.includes('high_res_photos')) creativesScore += 4;
  if (data.creativeAssetUrls && data.creativeAssetUrls.trim().length > 5) creativesScore += 4;

  if (assets.includes('ugc') || assets.includes('product_videos')) {
    strengths.push(
      lang === 'ar'
        ? 'توافر فيديوهات واقعية ومحتوى صناع المحتوى (UGC)، وهو العنصر الأكثر حسماً في تخفيض تكلفة الاكتساب CPA على إنستغرام وتيك توك.'
        : 'Availability of authentic UGC and video assets, the primary driver of low acquisition costs across Reels and TikTok.'
    );
  } else {
    blockers.push(
      lang === 'ar'
        ? 'نقص في محتوى الفيديو الطبيعي والـ UGC. الاعتماد على الصور الثابتة فقط يرفع تكلفة الشراء بنسبة تصل إلى 40%.'
        : 'Shortage of authentic video and UGC assets. Relying solely on static photos inflates CPA.'
    );
    actionPlanSteps.push(
      lang === 'ar'
        ? 'تصوير من 3 إلى 5 فيديوهات قصيرة (Reels / Hooks) بالهاتف مع التركيز على أول 3 ثوانٍ وحل المشكلة.'
        : 'Produce 3-5 short UGC videos/hooks focusing on customer pain points in the first 3 seconds.'
    );
  }

  // ================= 3. UNIT ECONOMICS & PRICING AUDIT (Max 25) =================
  const heroProduct = data.products?.[0];
  const margin = Number(heroProduct?.grossMarginPercent) || 0;
  const aov = Number(data.averageOrderValue) || Number(heroProduct?.price) || 0;

  if (margin >= 50) {
    economicsScore += 12;
    strengths.push(
      lang === 'ar'
        ? `هامش ربح إجمالي قوي (${margin}%) يمنح مرونة كافية لامتصاص تكاليف الإعلانات وتحقيق ربحية صافية مستدامة.`
        : `Strong gross margin (${margin}%) provides healthy cushion to absorb advertising acquisition costs profitably.`
    );
  } else if (margin >= 30) {
    economicsScore += 8;
  } else if (margin > 0) {
    economicsScore += 3;
    blockers.push(
      lang === 'ar'
        ? `هامش الربح الإجمالي منخفض (${margin}%). قد يكون من الصعب تحقيق عائد إيجابي إلا برفع متوسط قيمة الطلب AOV أو عروض الباقات.`
        : `Low gross margin (${margin}%). Profitability will require aggressive bundling or higher AOV.`
    );
    actionPlanSteps.push(
      lang === 'ar'
        ? 'ابتكار عروض حزم مجمعة (Bundles / Buy 2 Get 1) لرفع متوسط قيمة الفاتورة AOV وتغطية تكلفة الإعلان.'
        : 'Create bundled offers or minimum spend thresholds to elevate average order value.'
    );
  } else {
    economicsScore += 5; // not specified
  }

  if (aov > 800) {
    economicsScore += 8;
  } else if (aov > 400) {
    economicsScore += 5;
  } else if (aov > 0) {
    economicsScore += 3;
  }

  if (data.monthlyAdSpendCustom || data.monthlyAdSpendBudgetRange) {
    economicsScore += 5;
  }

  // ================= 4. OPERATIONS & SALES VELOCITY (Max 25) =================
  if (data.averageResponseTime === '< 15 mins') {
    operationsScore += 12;
    strengths.push(
      lang === 'ar'
        ? 'سرعة استجابة فائقة للعملاء (< 15 دقيقة) ترفع احتمالية إغلاق الصفقات وتأكيد الطلبات بأكثر من 3 أضعاف.'
        : 'Ultra-fast response time (< 15 minutes) dramatically enhances lead conversion and order confirmation rates.'
    );
  } else if (data.averageResponseTime === '15-60 mins') {
    operationsScore += 8;
  } else if (data.averageResponseTime === '24 hours+') {
    operationsScore += 2;
    blockers.push(
      lang === 'ar'
        ? 'بطء الرد على استفسارات العملاء والطلبات (أكثر من 24 ساعة) يمثل خطراً تشغيلياً جسيماً يضيع ميزانية الإعلانات.'
        : 'Delayed response time (> 24 hours) is a severe bottleneck that will waste paid traffic spend.'
    );
    actionPlanSteps.push(
      lang === 'ar'
        ? 'تفعيل ردود آلية ذكية ونظام إشعارات فورية على الواتساب للرد خلال الدقائق الأولى.'
        : 'Set up instant automated WhatsApp replies and assign dedicated response coverage.'
    );
  } else {
    operationsScore += 6;
  }

  if (data.salesFollowUpTool === 'whatsapp_crm' || data.salesFollowUpTool === 'dedicated_crm') {
    operationsScore += 8;
  } else if (data.salesFollowUpTool === 'google_sheets' || data.salesFollowUpTool === 'website_direct') {
    operationsScore += 6;
  } else {
    operationsScore += 3;
  }

  if (data.orderConfirmationProcess === 'phone_confirmation_first' || data.orderConfirmationProcess === 'whatsapp_confirmation_first') {
    operationsScore += 5;
  } else {
    operationsScore += 5;
  }

  // Totals
  const overallScore = Math.min(100, Math.max(0, trackingScore + creativesScore + economicsScore + operationsScore));

  let rating: ReadinessScoreResult['rating'] = 'needs_preparation';
  if (overallScore >= 80) rating = 'exceptional';
  else if (overallScore >= 65) rating = 'ready';
  else if (overallScore >= 45) rating = 'needs_preparation';
  else rating = 'high_risk';

  // Strategic Channel Recommendations
  if (data.businessModel === 'ecommerce') {
    recommendedChannels.push(
      lang === 'ar'
        ? 'Meta Advantage+ Shopping Campaigns (Instagram Reels & Feed)'
        : 'Meta Advantage+ Shopping Campaigns (Instagram Reels & Feed)',
      lang === 'ar'
        ? 'TikTok Spark Ads & Catalog Shopping Ads'
        : 'TikTok Spark Ads & Catalog Shopping Ads',
      lang === 'ar'
        ? 'Google Performance Max (PMax) & Shopping'
        : 'Google Performance Max (PMax) & Shopping'
    );
  } else if (data.businessModel === 'leadgen' || data.businessModel === 'localservice') {
    recommendedChannels.push(
      lang === 'ar'
        ? 'Meta Click-to-WhatsApp Ads مع رسائل ترحيبية مؤهلة'
        : 'Meta Click-to-WhatsApp Ads with automated qualification flows',
      lang === 'ar'
        ? 'Google Search Ads للباحثين عن الخدمة بنية شراء مباشرة'
        : 'Google Search Ads targeting high-intent commercial keywords',
      lang === 'ar'
        ? 'Meta Instant Forms مع 2-3 أسئلة تصفية مخصصة'
        : 'Meta Instant Lead Forms with custom screening questions'
    );
  } else {
    recommendedChannels.push(
      lang === 'ar'
        ? 'Meta Direct-to-Landing Page Conversion Ads'
        : 'Meta Direct-to-Landing Page Conversion Ads',
      lang === 'ar'
        ? 'Google Search & YouTube Action Campaigns'
        : 'Google Search & YouTube Action Campaigns'
    );
  }

  // Suggested Discovery Call Questions for the Media Buyer
  if (lang === 'ar') {
    suggestedDiscoveryQuestions.push(
      'ما هي النسبة الحقيقية للطلبات المرتجعة أو الملغاة بعد الشحن (RTO / Cancellation Rate)؟',
      'إذا حققنا هدفك وضاعفنا المبيعات الأسبوع القادم، هل الطاقة التشغيلية والمخزون مستعدان فوراً؟',
      'ما هو السبب الأكثر تكراراً الذي يجعل العميل يتردد في الدفع أو تأكيد الحجز عند التواصل معه؟',
      'هل يوجد استعداد لتوفير مقاطع فيديو ومحتوى جديد أسبوعياً لمكافحة إرهاق الإعلانات (Ad Fatigue)؟',
      'ما هو أعلى سعر متاح لاكتساب العميل (Maximum Break-even CPA) الذي عنده لا تخسر ولا تكسب؟'
    );
  } else {
    suggestedDiscoveryQuestions.push(
      'What is your historical return or order cancellation rate after shipping (RTO)?',
      'If we double orders next week, does your inventory and operations team have the capacity to deliver without delays?',
      'What is the #1 objection prospects mention when your sales team contacts them?',
      'Can you commit to providing 2-3 fresh video hooks per week to counteract ad creative fatigue?',
      'What is your true maximum break-even CPA threshold where you do not lose money?'
    );
  }

  return {
    overallScore,
    rating,
    breakdown: {
      tracking: trackingScore,
      creatives: creativesScore,
      economics: economicsScore,
      operations: operationsScore
    },
    strengths,
    blockers,
    recommendedChannels,
    suggestedDiscoveryQuestions,
    actionPlanSteps
  };
}
