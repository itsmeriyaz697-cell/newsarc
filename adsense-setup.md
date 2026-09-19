# Google AdSense setup for NewsArc

## Current status

NewsArc is publicly reachable at https://newsarc-ga3f.vercel.app/ and includes a privacy policy, terms of use, contact page, editorial policy, corrections policy, `robots.txt`, and a sitemap. The site is launch-ready, but AdSense cannot be configured until the real Google publisher ID is available.

## Configure the publisher ID

1. Create or open the NewsArc property in the official Google AdSense account.
2. Copy the publisher ID in the format `pub-XXXXXXXXXXXXXXXX`.
3. Replace the placeholder in `client/public/ads.txt` with the exact record supplied by Google:

```text
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

4. Add the AdSense site script supplied by Google to `client/index.html` only after Google provides the account-specific script. Do not copy a publisher ID from another site.
5. Build and deploy the site, then confirm that `https://newsarc-ga3f.vercel.app/ads.txt` returns HTTP 200 and contains the exact approved record.
6. Add the site in AdSense and request review from the AdSense dashboard. Review is performed by Google and cannot be guaranteed by the deployment workflow.

## Editorial and policy requirements

Maintain original reporting or clearly attributed source-based summaries, visible author and publication dates, useful navigation, working legal pages, a reachable contact address, and transparent correction procedures. Avoid copied content, misleading headlines, invalid traffic, click incentives, excessive ads, and automatically generated pages without editorial review.

## Important limitation

The placeholder `ads.txt` must remain unchanged until the real publisher ID is known. A fabricated record can cause authorization and monetization problems.
