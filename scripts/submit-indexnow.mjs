import { readFile, readdir } from 'node:fs/promises';



const siteUrl = (process.env.SITE_URL || 'https://newsarc-ga3f.vercel.app').replace(/\/$/, '');

const endpoint = process.env.INDEXNOW_ENDPOINT || 'https://api.indexnow.org/indexnow';

const key = process.env.INDEXNOW_KEY || (await readdir('.')).find((name) => /^[a-f0-9-]{8,128}\.txt$/i.test(name))?.replace(/\.txt$/, '');

if (!key) throw new Error('No IndexNow key file found at the repository root.');

const sitemap = await readFile('sitemap.xml', 'utf8');

const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

if (!urlList.length) throw new Error('No URLs found in sitemap.xml.');

for (let offset = 0; offset < urlList.length; offset += 10000) {
  
  const batch = urlList.slice(offset, offset + 10000);
  
  const response = await fetch(endpoint, { method: 'POST', headers: { 'content-type': 'application/json; charset=utf-8' }, body: JSON.stringify({ host: new URL(siteUrl).host, key, keyLocation: `${siteUrl}/${key}.txt`, urlList: batch }) });
  
  const body = await response.text();
  
  if (!response.ok) throw new Error(`IndexNow failed (${response.status}): ${body}`);
  
  console.log(`IndexNow accepted ${batch.length} URLs (${response.status}).`);
  
}







