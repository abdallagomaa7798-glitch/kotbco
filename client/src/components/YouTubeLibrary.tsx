// مكتبة فيديوهات يوتيوب: بتعرض آخر فيديوهات القناة تلقائيًا من غير API key ولا backend
const UPLOADS_PLAYLIST = "UUFKxCZo8zChmfyJz9VYavMA"; // قائمة رفع قناة @eng.abdallagomaakotb
const CHANNEL_URL = "https://www.youtube.com/@eng.abdallagomaakotb";

export default function YouTubeLibrary() {
  return (
    <div style={{ width: "100%", maxWidth: 960, margin: "0 auto" }}>
      <div
        style={{
          position: "relative",
          paddingTop: "56.25%",
          borderRadius: 16,
          overflow: "hidden",
          background: "#000",
        }}
      >
        <iframe
          src={`https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST}`}
          title="فيديوهات قطب للبناء والتشطيبات على يوتيوب"
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: 0,
          }}
        />
      </div>
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "10px 24px",
            borderRadius: 999,
            background: "#ff3334",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          زيارة القناة على يوتيوب
        </a>
      </div>
    </div>
  );
}
