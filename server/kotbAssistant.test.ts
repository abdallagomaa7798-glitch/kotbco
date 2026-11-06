import { beforeEach, describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import { invokeLLM } from "./_core/llm";
import { generateImage } from "./_core/imageGeneration";

vi.mock("./_core/llm", () => ({ invokeLLM: vi.fn() }));
vi.mock("./_core/imageGeneration", () => ({ generateImage: vi.fn() }));

const mockedInvokeLLM = vi.mocked(invokeLLM);
const mockedGenerateImage = vi.mocked(generateImage);

function createContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("kotbAssistant", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("keeps the assistant response behind the specialized Egyptian Arabic prompt", async () => {
    mockedInvokeLLM.mockResolvedValue({
      choices: [{ message: { content: "خلينا نبدأ بالمقاسات والإضاءة اللي بتحبها." } }],
    } as Awaited<ReturnType<typeof invokeLLM>>);

    const caller = appRouter.createCaller(createContext());
    const result = await caller.kotbAssistant.chat({
      messages: [{ role: "user", content: "عايز أعمل تشطيب لغرفة معيشة" }],
    });

    expect(result.reply).toContain("المقاسات");
    expect(mockedInvokeLLM).toHaveBeenCalledOnce();
    const request = mockedInvokeLLM.mock.calls[0]?.[0];
    expect(request.messages[0]?.content).toContain("العامية المصرية");
    expect(request.messages[0]?.content).toContain("لا تعطي أسعاراً");
  });

  it("returns the generated concept URL and passes the client brief to image generation", async () => {
    mockedGenerateImage.mockResolvedValue({ url: "https://cdn.example.com/kotb-concept.png" });

    const caller = appRouter.createCaller(createContext());
    const result = await caller.kotbAssistant.generateDesign({
      brief: "غرفة نوم 4 في 5 متر، ألوان بيج وخشب، أسلوب هادئ مع تخزين عملي وإضاءة دافئة",
    });

    expect(result.imageUrl).toBe("https://cdn.example.com/kotb-concept.png");
    expect(mockedGenerateImage).toHaveBeenCalledOnce();
    expect(mockedGenerateImage.mock.calls[0]?.[0].prompt).toContain("غرفة نوم 4 في 5 متر");
  });

  it("keeps the latest client message when an existing-room photo is attached", async () => {
    mockedInvokeLLM.mockResolvedValue({
      choices: [{ message: { content: "شايف الصورة، خلينا نحدد مكان التخزين والإضاءة." } }],
    } as Awaited<ReturnType<typeof invokeLLM>>);

    const caller = appRouter.createCaller(createContext());
    await caller.kotbAssistant.chat({
      messages: [{ role: "user", content: "حلل الصورة واقترح توزيع أفضل" }],
      imageData: "data:image/jpeg;base64,abc",
    });

    const request = mockedInvokeLLM.mock.calls[0]?.[0];
    const latest = request.messages.at(-1)?.content;
    expect(Array.isArray(latest)).toBe(true);
    expect(JSON.stringify(latest)).toContain("اقترح توزيع أفضل");
  });
});
