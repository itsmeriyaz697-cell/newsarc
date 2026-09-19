export default function NewsArticleSchema({ headline, description, url, image, datePublished, dateModified, authorName, authorUrl, section }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline,
    description,
    url,
    image: image ? [image] : undefined,
    datePublished,
    dateModified: dateModified || datePublished,
    author: [{ "@type": "Person", name: authorName || "NewsArc", url: authorUrl || undefined }],
    publisher: {
      "@type": "NewsMediaOrganization",
      name: "NewsArc",
      url: "https://newsarc-ga3f.vercel.app/",
      logo: { "@type": "ImageObject", url: "https://newsarc-ga3f.vercel.app/favicon.svg" }
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    articleSection: section
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
