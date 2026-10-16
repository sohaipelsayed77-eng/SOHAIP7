import { GoogleGenAI } from '@google/genai';
import { ClientIntakeData } from '../types';

export interface AIEnhancedBrief {
  executiveSummary: string;
  creativeStrategyAngles: string[];
  funnelBottlenecks: string[];
  suggestedTestingRoadmap: string[];
  isAIGenerated: boolean;
}

export async function generateAIEnhancedBrief(
  data: ClientIntakeData, 
  lang: 'ar' | 'en' = 'ar'
): Promise<AIEnhancedBrief> {
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (typeof process !== 'undefined' ? (process.env?.GEMINI_API_KEY || process.env?.VITE_GEMINI_API_KEY) : '');

  if (!apiKey) {
    // Provide deterministic strategic fallback
    return getFallbackAIEnhancedBrief(data, lang);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
You are a senior performance media buyer reviewing an advertising intake brief for a client.
Analyze this structured client data and provide a concise strategic assessment in ${lang === 'ar' ? 'Arabic' : 'English'}.

Client Name: ${data.clientFullName}
Brand Name: ${data.businessName}
Business Category: ${data.businessCategory}
Business Model: ${data.businessModel}
What they sell: ${data.whatDoYouSell}
USP: ${data.uniqueSellingProposition}
Monthly Ad Budget: ${data.monthlyAdSpendCustom || data.monthlyAdSpendBudgetRange} ${data.currency}
Active Channels: ${data.activeChannels.join(', ')}
Previous Spend & Results: ${data.previousMonthlyAdSpend} | Results: ${data.historicalResults}
Primary Goals: ${data.primaryGoals.join(', ')}
Target Audience: ${data.geographicLocations} - Ages ${data.audienceAgeRanges.join(', ')}
Pain Points: ${data.customerPainPoints}
Available Assets: ${data.availableAssets.join(', ')}
Response Time: ${data.averageResponseTime}
Tracking Setup: Pixel=${data.techPixelOrDataset}, CAPI=${data.techConversionsAPI}, GA4=${data.techGoogleAnalytics4}

IMPORTANT GUIDELINES:
- Clearly formulate recommendations as DRAFTS subject to human review.
- Do NOT guarantee ad results or invent fake metrics.
- Return output strictly as a JSON object with:
  "executiveSummary": "2-3 sentences overview",
  "creativeStrategyAngles": ["3 creative testing angles focusing on hooks and pain points"],
  "funnelBottlenecks": ["2-3 operational or tracking risks"],
  "suggestedTestingRoadmap": ["3 clear milestones for Week 1, Week 2, Month 1"]
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (text) {
      const parsed = JSON.parse(text);
      return {
        executiveSummary: parsed.executiveSummary || '',
        creativeStrategyAngles: parsed.creativeStrategyAngles || [],
        funnelBottlenecks: parsed.funnelBottlenecks || [],
        suggestedTestingRoadmap: parsed.suggestedTestingRoadmap || [],
        isAIGenerated: true
      };
    }
  } catch (err) {
    console.warn('Gemini API call skipped or encountered an error:', err);
  }

  return getFallbackAIEnhancedBrief(data, lang);
}

function getFallbackAIEnhancedBrief(data: ClientIntakeData, lang: 'ar' | 'en'): AIEnhancedBrief {
  if (lang === 'ar') {
    return {
      executiveSummary: `مشروع ${data.businessName || 'العميل'} يمتلك فرصة واعدة في نموذج ${data.businessModel === 'ecommerce' ? 'التجارة الإلكترونية' : 'الخدمات وتوليد العملاء'}. التركيز الأولي يجب أن ينصب على التحقق من كفاءة مسار التحويل وعرض القيمة قبل التوسع في الميزانيات.`,
      creativeStrategyAngles: [
        `زاوية إبراز المشكلة والحل (Problem-Agitation-Solution): إظهار معاناة العميل مع ${data.customerPainPoints || 'البدائل الحالية'} ثم تقديم المنتج كحل فوري.`,
        `زاوية الإثبات الاجتماعي الواقعي (Authentic UGC): فيديوهات تصوير عفوي بدون تكلف تُظهر استخدام المنتج الفعلي وتأكيد جودة ${data.uniqueSellingProposition || 'الخامة والخدمة'}.`,
        `زاوية كسر التردد (Risk Reversal Offer): التركيز على الدفع عند الاستلام والمعاينة المجانية أو الضمان لإزالة رهبة الشراء الأولى.`
      ],
      funnelBottlenecks: [
        data.techConversionsAPI !== 'yes' ? 'فقدان إشارات التحويل بسبب عدم تفعيل CAPI' : 'ضرورة استقرار معدل تحويل صفحة الهبوط',
        data.averageResponseTime === '24 hours+' ? 'تأخر الرد على العملاء لأكثر من 24 ساعة يهدد ضياع نتائج الحملات' : 'سرعة نفاد المخزون عند زيادة ميزانية الإعلانات',
        'الحاجة إلى تنويع المواد الإعلانية لمنع ارتفاع تكلفة الألف ظهور (CPM Fatigue)'
      ],
      suggestedTestingRoadmap: [
        'الأسبوع الأول: تدقيق أكواد التتبع (Pixel & CAPI) وإطلاق حملة اختبار 3 زوايا إبداعية مختلفة بميزانية متحفظة.',
        'الأسبوع الثاني: استبعاد الزوايا غير المجدية، ومضاعفة الصرف على الزاوية الفائزة (Scaling Phase 1).',
        'الشهر الأول: إطلاق حملات إعادة استهداف مخصصة (Retargeting) وتوسيع الجماهير المشابهة (Lookalikes).'
      ],
      isAIGenerated: false
    };
  }

  return {
    executiveSummary: `The brand ${data.businessName || 'Client'} has viable commercial positioning within the ${data.businessModel} model. Initial focus should center on conversion tracking validation and creative angle testing prior to scaling.`,
    creativeStrategyAngles: [
      `Problem-Agitation-Solution: Highlight the core frustration (${data.customerPainPoints || 'market alternatives'}) then introduce the product as the solution.`,
      `Authentic Social Proof (UGC): Unscripted product demo clips showcasing the real value and ${data.uniqueSellingProposition || 'quality differentiators'}.`,
      `Risk Reversal Hook: Emphasize guarantees, fast delivery, and flexible payment methods to eliminate hesitation.`
    ],
    funnelBottlenecks: [
      data.techConversionsAPI !== 'yes' ? 'Signal loss on iOS/ad-blockers due to missing CAPI' : 'Ensuring landing page conversion velocity',
      data.averageResponseTime === '24 hours+' ? 'Delayed response time jeopardizes qualified lead close rates' : 'Inventory buffer during scaling',
      'Continuous creative pipeline needed to counteract audience ad fatigue'
    ],
    suggestedTestingRoadmap: [
      'Week 1: Tracking audit (Pixel & CAPI) and launching 3 distinct creative angles under testing budget.',
      'Week 2: Pruning low performers and reallocating spend to winning creative hooks.',
      'Month 1: Introducing layered retargeting funnels and customer database lookalikes.'
    ],
    isAIGenerated: false
  };
}
