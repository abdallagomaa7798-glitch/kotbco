import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getVideoLibrary } from "./videoLibrary";
import { invokeLLM } from "./_core/llm";
import { generateImage } from "./_core/imageGeneration";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  videoLibrary: router({
    list: publicProcedure.query(() => getVideoLibrary()),
  }),

  kotbAssistant: router({
    chat: publicProcedure.input(z.object({
      messages: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(6000) })).max(30),
      imageData: z.string().max(8_000_000).optional(),
    })).mutation(async ({ input }) => {
      const system = `أنت «قطب»، مستشار تصميم وتشطيبات وهندسة تابع لشركة قطب للبناء والتشطيبات في الإسكندرية. اتكلم بالعامية المصرية المهذبة، لكن بمستوى خبير: رد عملي ومفيد وليس كلاماً عاماً. افهم المطلوب، قدم اقتراحاً محدداً، ثم اسأل سؤالين أو ثلاثة فقط عند نقص البيانات. اجمع نوع المكان والأبعاد والاستخدام والطراز والألوان والخامات والإضاءة والتخزين وموقع التنفيذ. عند طلب صورة، ابنِ brief واضحاً يصف التوزيع والخامات والإضاءة والألوان والتفاصيل القابلة للتنفيذ، واطلب البيانات الناقصة قبل التوليد. لا تعطي أسعاراً أو وعوداً؛ السعر بعد المعاينة والمقايسة، والتواصل على واتساب 01272988610 أو kotbdesign@gmail.com. ارفض بأدب أي سؤال خارج البناء والتشطيبات والتصميم والهندسة. لو أرسل صورة حلل التوزيع والخامات والإضاءة ولا تحدد هوية الأشخاص. لا تدّعي أن أي صورة مشروع منفذ، وابتعد عن الردود المكررة.`;
      const userMessages = input.messages.map((message) => ({ role: message.role, content: message.content }));
      const content = input.imageData ? [{ type: "text" as const, text: `العميل أرسل صورة للوضع الحالي. حللها بصرياً من ناحية التوزيع والخامات والإضاءة، بدون تحديد هوية أي شخص. رسالة العميل: ${userMessages.at(-1)?.content || "يريد رأياً مبدئياً في الصورة"}` }, { type: "image_url" as const, image_url: { url: input.imageData, detail: "low" as const } }] : undefined;
      const response = await invokeLLM({ messages: [{ role: "system", content: system }, ...userMessages.slice(0, -1), { role: "user", content: content || userMessages.at(-1)?.content || "ابدأ مع العميل" }] });
      const raw = response.choices?.[0]?.message?.content;
      return { reply: typeof raw === "string" ? raw : Array.isArray(raw) ? raw.map((part) => "text" in part ? part.text : "").join("") : "خلينا نبدأ بتفاصيل المكان والمساحة والألوان اللي بتحبها." };
    }),
    generateDesign: publicProcedure.input(z.object({ brief: z.string().min(20).max(5000), imageData: z.string().max(8_000_000).optional() })).mutation(async ({ input }) => {
      const prompt = `Create one premium, photorealistic architectural interior design concept for Kotb Construction based on this client brief: ${input.brief}. Treat every stated room type, size, style, color, material, lighting and storage requirement as important. Show coherent camera framing, realistic proportions, clear circulation, buildable joinery, layered lighting and believable materials. Do not mix unrelated room types or styles. No people, logos, text or watermark. This is an illustrative concept only, not a completed project.`;
      const result = await generateImage({ prompt, ...(input.imageData ? { originalImages: [{ url: input.imageData, mimeType: "image/jpeg" }] } : {}) });
      if (!result.url) throw new Error("Image generation returned no URL");
      return { imageUrl: result.url };
    }),
  }),

  // TODO: add feature routers here, e.g.
  // todo: router({
  //   list: protectedProcedure.query(({ ctx }) =>
  //     db.getUserTodos(ctx.user.id)
  //   ),
  // }),
});

export type AppRouter = typeof appRouter;
