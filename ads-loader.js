/* NewsArc in-article AdSense loader.
   Loaded only on article routes and inserts one responsive unit after the article deck. */
const ADSENSE_CLIENT = 'ca-pub-3176406028641137';
const ADSENSE_SLOT = '2421000344';

function loadAdSense() {
  if (document.querySelector('script[data-newsarc-adsense]')) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.dataset.newsarcAdsense = 'true';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

function mountArticleAd() {
  if (!location.pathname.startsWith('/news/')) return;
  const article = document.querySelector('.article');
  const deck = article?.querySelector('.deck');
  if (!article || !deck || article.querySelector('[data-newsarc-ad]')) return;

  const wrapper = document.createElement('div');
  wrapper.dataset.newsarcAd = 'true';
  wrapper.className = 'newsarc-ad newsarc-ad-in-article';
  wrapper.setAttribute('aria-label', 'Advertisement');
  wrapper.innerHTML = `<ins class="adsbygoogle" style="display:block;text-align:center" data-ad-layout="in-article" data-ad-format="fluid" data-ad-client="${ADSENSE_CLIENT}" data-ad-slot="${ADSENSE_SLOT}"></ins>`;
  deck.insertAdjacentElement('afterend', wrapper);

  loadAdSense().then(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      wrapper.remove();
      console.warn('NewsArc AdSense unit could not load.', error);
    }
  }).catch(() => wrapper.remove());
}

const observer = new MutationObserver(mountArticleAd);
observer.observe(document.documentElement, { childList: true, subtree: true });
window.addEventListener('load', mountArticleAd, { once: true });
