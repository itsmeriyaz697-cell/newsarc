export default function RiyazProfileSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "url": "https://newsarc-ga3f.vercel.app/about/riyaz-chalise",
    "mainEntity": {
      "@type": "Person",
      "@id": "https://newsarc-ga3f.vercel.app/about/riyaz-chalise#person",
      "name": "Riyaz Chalise",
      "alternateName": "ITS ME RIYAZ",
      "jobTitle": "Founder of NewsArc",
      "description": "Riyaz Chalise is the founder of NewsArc, a digital news and information platform.",
      "url": "https://newsarc-ga3f.vercel.app/about/riyaz-chalise",
      "worksFor": {
        "@type": "NewsMediaOrganization",
        "@id": "https://newsarc-ga3f.vercel.app/#organization",
        "name": "NewsArc",
        "url": "https://newsarc-ga3f.vercel.app/"
      }
    }
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
