#!/usr/bin/env python3
"""Track NewsArc visibility using public checks and optional Google APIs.

Required: Python 3.10+ (standard library only).
Optional environment variables:
  GOOGLE_CSE_API_KEY and GOOGLE_CSE_ID  - ranking checks via Programmable Search JSON API
  GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN     - URL Inspection API access token
  GOOGLE_SEARCH_CONSOLE_SITE_URL         - property, default https://newsarc-ga3f.vercel.app/

The script never fails the workflow because a paid/credentialed API is absent; it
writes a JSON report with the checks that were available.
"""
from __future__ import annotations

import datetime as dt
import json
import os
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

SITE = os.getenv("NEWSARC_SITE_URL", "https://newsarc-ga3f.vercel.app").rstrip("/")
SITEMAP = f"{SITE}/sitemap.xml"
REPORT_DIR = Path(os.getenv("NEWSARC_REPORT_DIR", "reports/search-status"))
KEYWORDS = [
    "NewsArc",
    "NewsArc Nepal news",
    "Riyaz Chalise",
    "Nepal latest news",
]


def fetch(url: str, *, headers: dict[str, str] | None = None, data: bytes | None = None) -> tuple[int, str]:
    request = urllib.request.Request(url, headers={"User-Agent": "NewsArc-Search-Tracker/1.0", **(headers or {})}, data=data)
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return response.status, response.read().decode("utf-8", errors="replace")
    except urllib.error.HTTPError as exc:
        return exc.code, exc.read().decode("utf-8", errors="replace")
    except urllib.error.URLError as exc:
        return 0, str(exc)


def check_public_assets() -> dict:
    result = {"site": SITE, "homepage": {}, "robots": {}, "sitemap": {}}
    for name, url in (("homepage", SITE), ("robots", f"{SITE}/robots.txt"), ("sitemap", SITEMAP)):
        status, body = fetch(url)
        result[name] = {"url": url, "http_status": status, "ok": 200 <= status < 400, "bytes": len(body)}
        if name == "sitemap":
            result[name]["url_count"] = body.count("<loc>")
            result[name]["has_news_sitemap"] = "news:" in body
    return result


def google_rankings() -> dict:
    api_key, cx = os.getenv("GOOGLE_CSE_API_KEY"), os.getenv("GOOGLE_CSE_ID")
    if not api_key or not cx:
        return {"available": False, "reason": "Set GOOGLE_CSE_API_KEY and GOOGLE_CSE_ID to enable ranking checks."}
    rows = []
    for keyword in KEYWORDS:
        params = urllib.parse.urlencode({"key": api_key, "cx": cx, "q": keyword, "num": 10})
        status, body = fetch(f"https://www.googleapis.com/customsearch/v1?{params}")
        try:
            payload = json.loads(body)
        except json.JSONDecodeError:
            payload = {}
        rank = None
        matched_url = None
        for position, item in enumerate(payload.get("items", []), 1):
            link = item.get("link", "")
            if urllib.parse.urlparse(link).netloc.endswith(urllib.parse.urlparse(SITE).netloc):
                rank, matched_url = position, link
                break
        rows.append({"keyword": keyword, "http_status": status, "rank_top_10": rank, "matched_url": matched_url})
    return {"available": True, "engine": "Google Programmable Search", "results": rows}


def search_console_inspection() -> dict:
    token = os.getenv("GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN")
    if not token:
        return {"available": False, "reason": "Set GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN to enable URL Inspection checks."}
    property_url = os.getenv("GOOGLE_SEARCH_CONSOLE_SITE_URL", SITE + "/")
    urls = [SITE + "/", SITE + "/founder", SITE + "/sitemap.xml"]
    rows = []
    for inspection_url in urls:
        payload = json.dumps({"inspectionUrl": inspection_url, "siteUrl": property_url, "languageCode": "en-US"}).encode()
        status, body = fetch(
            "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect",
            headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
            data=payload,
        )
        try:
            data = json.loads(body)
        except json.JSONDecodeError:
            data = {"raw": body[:500]}
        result = data.get("inspectionResult", {}).get("indexStatusResult", {})
        rows.append({"url": inspection_url, "http_status": status, "verdict": result.get("verdict"), "coverage_state": result.get("coverageState"), "last_crawl_time": result.get("lastCrawlTime")})
    return {"available": True, "property": property_url, "results": rows}


def main() -> int:
    now = dt.datetime.now(dt.timezone.utc)
    report = {
        "generated_at": now.isoformat(),
        "checks": check_public_assets(),
        "google_rankings": google_rankings(),
        "search_console": search_console_inspection(),
    }
    REPORT_DIR.mkdir(parents=True, exist_ok=True)
    output = REPORT_DIR / f"{now.date().isoformat()}.json"
    output.write_text(json.dumps(report, indent=2) + "\n")
    print(json.dumps({"report": str(output), "site_ok": report["checks"]["homepage"]["ok"], "sitemap_urls": report["checks"]["sitemap"].get("url_count", 0), "rankings_enabled": report["google_rankings"]["available"], "search_console_enabled": report["search_console"]["available"]}, indent=2))
    return 0 if report["checks"]["homepage"]["ok"] else 1


if __name__ == "__main__":
    sys.exit(main())

# End of file
