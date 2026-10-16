import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User, 
  signOut 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/forms.body');
provider.addScope('https://www.googleapis.com/auth/drive.file');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else if (!isSigningIn) {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Google sign in');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logoutGoogle = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

export interface CreatedGoogleFormResult {
  formId: string;
  responderUri: string;
  editUri: string;
}

export async function createGoogleFormDirectly(
  title: string, 
  language: 'ar' | 'en' = 'ar'
): Promise<CreatedGoogleFormResult> {
  const token = await getAccessToken();
  if (!token) {
    throw new Error(language === 'ar' ? 'يرجى تسجيل الدخول بحساب Google أولاً' : 'Please sign in with Google first');
  }

  // 1. Create Empty Form
  const createRes = await fetch('https://forms.googleapis.com/v1/forms', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      info: {
        title: title || 'Media Buyer Client Onboarding Form',
        documentTitle: title || 'Media Buyer Client Onboarding'
      }
    })
  });

  if (!createRes.ok) {
    const errData = await createRes.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `Failed to create Google Form: ${createRes.status}`);
  }

  const formData = await createRes.json();
  const formId = formData.formId;
  const responderUri = formData.responderUri || `https://docs.google.com/forms/d/e/${formId}/viewform`;
  const editUri = `https://docs.google.com/forms/d/${formId}/edit`;

  // 2. Batch update to populate core onboarding questions
  const sampleQuestions = [
    {
      title: language === 'ar' ? 'الاسم الكامل للعميل / صاحب القرار' : 'Client / Decision Maker Full Name',
      type: 'TEXT'
    },
    {
      title: language === 'ar' ? 'اسم النشاط التجاري أو العلامة التجارية' : 'Business / Brand Name',
      type: 'TEXT'
    },
    {
      title: language === 'ar' ? 'رقم الواتساب مع كود الدولة' : 'WhatsApp Phone Number (with Country Code)',
      type: 'TEXT'
    },
    {
      title: language === 'ar' ? 'رابط الموقع الإلكتروني أو صفحة المتجر' : 'Website or Store URL',
      type: 'TEXT'
    },
    {
      title: language === 'ar' ? 'ما الذي يبيعه نشاطك بالتحديد؟ وصف المنتجات أو الخدمات' : 'What does your business sell? Offer overview',
      type: 'PARAGRAPH'
    },
    {
      title: language === 'ar' ? 'الميزانية الشهرية المخصصة للصرف الإعلاني على المنصات' : 'Target Monthly Ad Spend Budget',
      type: 'TEXT'
    },
    {
      title: language === 'ar' ? 'الميزة التنافسية (USP): لماذا يشتري العميل منك بدلاً من المنافسين؟' : 'Unique Selling Proposition (USP)',
      type: 'PARAGRAPH'
    },
    {
      title: language === 'ar' ? 'رابط مجلد Google Drive للمواد الإعلانية والصور والفيديوهات' : 'Google Drive Link for Creative Assets',
      type: 'TEXT'
    }
  ];

  const requests = sampleQuestions.map((q, idx) => ({
    createItem: {
      item: {
        title: q.title,
        questionItem: {
          question: {
            required: true,
            textQuestion: {
              paragraph: q.type === 'PARAGRAPH'
            }
          }
        }
      },
      location: {
        index: idx
      }
    }
  }));

  try {
    await fetch(`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ requests })
    });
  } catch (batchErr) {
    console.warn('Batch update non-fatal error:', batchErr);
  }

  return {
    formId,
    responderUri,
    editUri
  };
}
