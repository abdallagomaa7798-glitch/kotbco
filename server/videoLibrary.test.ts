import { afterEach, describe, expect, it, vi } from "vitest";
import { getVideoLibrary } from "./videoLibrary";

describe("video library", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("maps public YouTube feed entries to official embeds and keeps curated sources", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(`<?xml version="1.0"?><feed>
      <entry><yt:videoId xmlns:yt="http://www.youtube.com/xml/schemas/2015">abc123</yt:videoId><title><![CDATA[ جولة قطب الجديدة ]]></title><published>2026-09-05T10:00:00Z</published></entry>
      <entry><yt:videoId xmlns:yt="http://www.youtube.com/xml/schemas/2015">def456</yt:videoId><title>تفاصيل التشطيب</title><published>2026-09-04T10:00:00Z</published></entry>
    </feed>`, { status: 200 })));

    const result = await getVideoLibrary();
    const youtube = result.videos.filter((video) => video.platform === "youtube");

    expect(result.source).toBe("live");
    expect(youtube).toHaveLength(2);
    expect(youtube[0]?.id).toBe("youtube-abc123");
    expect(youtube[0]?.embedUrl).toContain("youtube-nocookie.com/embed/abc123");
    expect(result.videos.some((video) => video.platform === "facebook")).toBe(true);
  });

  it("returns a safe fallback when the live source is unavailable", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));

    const result = await getVideoLibrary();

    expect(result.source).toBe("fallback");
    expect(result.videos.length).toBeGreaterThan(0);
    expect(result.videos.every((video) => video.id.length > 0)).toBe(true);
  });
});
