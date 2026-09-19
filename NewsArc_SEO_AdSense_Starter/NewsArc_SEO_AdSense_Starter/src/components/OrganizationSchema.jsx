export default function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "NewsArc",
    url: "https://newsarc-ga3f.vercel.app/",
    logo: { "@type": "ImageObject", url: "https://newsarc-ga3f.vercel.app/favicon.svg" }
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
