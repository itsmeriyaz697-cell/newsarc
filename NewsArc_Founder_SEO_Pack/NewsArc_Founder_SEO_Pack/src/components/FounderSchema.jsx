export default function FounderSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://newsarc-ga3f.vercel.app/about/riyaz-chalise#person",
    "name": "Riyaz Chalise",
    "alternateName": "ITS ME RIYAZ",
    "jobTitle": "Founder of NewsArc",
    "url": "https://newsarc-ga3f.vercel.app/about/riyaz-chalise",
    "worksFor": {
      "@type": "NewsMediaOrganization",
      "@id": "https://newsarc-ga3f.vercel.app/#organization",
      "name": "NewsArc",
      "url": "https://newsarc-ga3f.vercel.app/"
    }
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
