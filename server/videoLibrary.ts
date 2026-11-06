export type LibraryVideo = {
  id: string;
  platform: "youtube" | "facebook" | "instagram" | "tiktok";
  title: string;
  description?: string;
  publishedAt?: string;
  thumbnail?: string;
  embedUrl: string;
  sourceUrl: string;
  status: "synced" | "curated" | "awaiting_connection";
};

const YOUTUBE_CHANNEL_ID = "UCFKxCZo8zChmfyJz9VYavMA";
const YOUTUBE_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;

const curatedVideos: LibraryVideo[] = [
  {
    id: "facebook-1907850477285573",
    platform: "facebook",
    title: "مقاطع من أعمال قطب على الطبيعة",
    description: "فيديو عام من صفحة قطب للبناء والتشطيبات.",
    embedUrl: "https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1907850477285573%2F&show_text=false&width=560",
    sourceUrl: "https://www.facebook.com/reel/1907850477285573/",
    status: "curated",
  },
  {
    id: "instagram-connection-pending",
    platform: "instagram",
    title: "فيديوهات Instagram ستظهر هنا تلقائياً",
    description: "نحتاج موافقة حساب kotb_co لتفعيل المزامنة الرسمية.",
    embedUrl: "",
    sourceUrl: "https://www.instagram.com/kotb_co/",
    status: "awaiting_connection",
  },
  {
    id: "tiktok-connection-pending",
    platform: "tiktok",
    title: "فيديوهات TikTok ستظهر هنا تلقائياً",
    description: "نحتاج موافقة حساب @kotbco لتفعيل المزامنة الرسمية.",
    embedUrl: "",
    sourceUrl: "https://www.tiktok.com/@kotbco",
    status: "awaiting_connection",
  },
];

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function readTag(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return match ? decodeXml(match[1].trim()) : "";
}

export async function getVideoLibrary(): Promise<{ videos: LibraryVideo[]; source: "live" | "fallback"; lastSyncedAt: string }> {
  try {
    const response = await fetch(YOUTUBE_FEED_URL, { headers: { Accept: "application/atom+xml" }, signal: AbortSignal.timeout(7000) });
    if (!response.ok) throw new Error(`YouTube feed returned ${response.status}`);
    const xml = await response.text();
    const entries = Array.from(xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)).map((match) => match[1]);
    const youtubeVideos: LibraryVideo[] = entries.map((entry) => {
      const videoId = readTag(entry, "yt:videoId");
      const title = readTag(entry, "title") || "فيديو جديد من قناة قطب";
      const publishedAt = readTag(entry, "published");
      return {
        id: `youtube-${videoId}`,
        platform: "youtube" as const,
        title,
        publishedAt,
        thumbnail: videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : undefined,
        embedUrl: videoId ? `https://www.youtube-nocookie.com/embed/${videoId}?rel=0` : "",
        sourceUrl: videoId ? `https://www.youtube.com/watch?v=${videoId}` : "https://youtube.com/@eng.abdallagomaakotb",
        status: "synced" as const,
      };
    }).filter((video) => video.id !== "youtube-");

    const seen = new Set<string>();
    const videos = [...youtubeVideos, ...curatedVideos].filter((video) => {
      if (seen.has(video.id)) return false;
      seen.add(video.id);
      return true;
    });
    return { videos, source: "live", lastSyncedAt: new Date().toISOString() };
  } catch (error) {
    console.warn("[VideoLibrary] YouTube sync unavailable, serving fallback:", error);
    return { videos: curatedVideos, source: "fallback", lastSyncedAt: new Date().toISOString() };
  }
}
