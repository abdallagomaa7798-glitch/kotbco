
## إصلاح وظائف Vercel

تحتوي الحزمة الآن على `api/index.ts` كـ Vercel Function. لا تحذف مجلد `api` أو ملف `vercel.json`؛ فهما ضروريان لتشغيل مسارات tRPC وOAuth والتخزين. بعد رفع التعديلات إلى GitHub يجب تنفيذ Redeploy من Vercel.
