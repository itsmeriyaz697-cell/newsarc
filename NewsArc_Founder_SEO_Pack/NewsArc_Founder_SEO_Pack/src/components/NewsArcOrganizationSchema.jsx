export default function NewsArcOrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    "@id": "https://newsarc-ga3f.vercel.app/#organization",
    "name": "NewsArc",
    "alternateName": "NewsArc — आजको खबर, आजै",
    "url": "https://newsarc-ga3f.vercel.app/",
    "logo": {
      "@type": "ImageObject",
      "url": "https://newsarc-ga3f.vercel.app/favicon.svg"
    },
    "founder": {
      "@type": "Person",
      "@id": "https://newsarc-ga3f.vercel.app/about/riyaz-chalise#person",
      "name": "Riyaz Chalise",
      "url": "https://newsarc-ga3f.vercel.app/about/riyaz-chalise"
    }
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
