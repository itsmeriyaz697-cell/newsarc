import React from "react";

const SITE_NAME = "NewsArc";
const SITE_URL = "https://newsarc-ga3f.vercel.app";

export default function SEO({
  title = "NewsArc — आजको खबर, आजै",
  description = "Fast, factual news and explainers from Nepal and around the world.",
  path = "/",
  image = "/favicon.svg",
  type = "website"
}) {
  const canonical = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

  React.useEffect(() => {
    document.title = title;
    const setMeta = (name, content) => {
      let el = document.head.querySelector(`meta[name="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    const setProperty = (property, content) => {
      let el = document.head.querySelector(`meta[property="${property}"]`);
      if (!el) { el = document.createElement("meta"); el.setAttribute("property", property); document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", description);
    setMeta("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setProperty("og:site_name", SITE_NAME);
    setProperty("og:title", title);
    setProperty("og:description", description);
    setProperty("og:type", type);
    setProperty("og:url", canonical);
    setProperty("og:image", imageUrl);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", imageUrl);
    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) { canonicalLink = document.createElement("link"); canonicalLink.rel = "canonical"; document.head.appendChild(canonicalLink); }
    canonicalLink.href = canonical;
    let manifest = document.head.querySelector('link[rel="manifest"]');
    if (!manifest) { manifest = document.createElement("link"); manifest.rel = "manifest"; document.head.appendChild(manifest); }
    manifest.href = "/manifest.webmanifest";
  }, [title, description, canonical, imageUrl, type]);

  return null;
}
