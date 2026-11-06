# Kotb Construction — Upload Guide

هذه الحزمة تحتوي على ملفات المصدر الخاصة بموقع Kotb Construction، ومعها إعدادات Vercel ونقطة دخول Express في الملف الجذري `index.ts`.

## حل خطأ No entrypoint found

يجب أن يكون الملفان التاليان في جذر مستودع GitHub، وليس داخل مجلد فرعي:

- `index.ts`
- `vercel.json`

إذا كان مستودع GitHub يحتوي على مجلد `qutb-construction` داخله، اجعل محتويات هذا المجلد هي محتويات الجذر في GitHub أو غيّر **Root Directory** في Vercel إلى `qutb-construction`.

## قبل النشر

لا ترفع أي ملف `.env` أو مفاتيح سرية إلى GitHub. أضف القيم داخل **Vercel → Project Settings → Environment Variables**، ثم أعد النشر.

المتغيرات المطلوبة حسب الخدمات المستخدمة:

```text
DATABASE_URL
JWT_SECRET
BUILT_IN_FORGE_API_URL
BUILT_IN_FORGE_API_KEY
VITE_APP_ID
OAUTH_SERVER_URL
VITE_OAUTH_PORTAL_URL
OWNER_OPEN_ID
OWNER_NAME
```

## إعدادات البناء

تمت إضافة `vercel.json` داخل الحزمة. إذا أدخلت الإعدادات يدوياً استخدم:

- Framework Preset: Vite أو Other
- Install Command: `pnpm install`
- Build Command: `pnpm build`
- Production Output Directory: `dist/public`

## النشر من GitHub

1. فك ضغط الحزمة.
2. ارفع الملفات الموجودة داخل مجلد `qutb-construction` إلى جذر مستودع GitHub.
3. تأكد أن `package.json` و`index.ts` و`vercel.json` ظاهرة في الصفحة الرئيسية للمستودع.
4. في Vercel اختر **Add New Project → Import Git Repository**.
5. اترك **Root Directory** فارغاً إذا كانت الملفات في جذر المستودع.
6. أضف متغيرات البيئة ثم اضغط Deploy.

المشروع يستخدم Vite للواجهة وExpress/tRPC للخادم. إعداد `index.ts` يصدّر تطبيق Express كـ Vercel Function، بينما `vercel.json` يوجه طلبات tRPC وOAuth والتخزين إلى الخادم ويحافظ على عمل SPA.

## ربط الدومين

بعد نجاح النشر افتح:

`Project → Settings → Domains → Add Domain`

أضف الدومين الأساسي ونسخة `www`، ثم انسخ سجلات DNS التي يعرضها Vercel إلى شركة حجز الدومين. لا تحذف سجلات البريد `MX` أو `SPF` أو `DKIM`.
