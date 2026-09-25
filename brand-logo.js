document.addEventListener('DOMContentLoaded', () => {
  const addBrand = () => {
    const target = document.querySelector('.topline .wrap') || document.querySelector('.site-header .wrap') || document.querySelector('#app');
    if (!target || target.querySelector('.brand-box')) return;

    const brand = document.createElement('a');
    brand.href = '/';
    brand.className = 'brand-box';
    brand.setAttribute('aria-label', 'NewsArc home');
    brand.innerHTML = `
      <span class="brand-mark">
        <img src="/newsarc-logo.svg" alt="NewsArc logo" width="32" height="32">
      </span>
      <span class="brand-text">
        <span class="brand-main">NewsArc</span>
        <span class="brand-sub">LIVE</span>
      </span>
    `;

    const first = target.firstElementChild;
    if (first) {
      target.insertBefore(brand, first);
    } else {
      target.appendChild(brand);
    }
  };

  addBrand();
  const observer = new MutationObserver(() => addBrand());
  const root = document.querySelector('#app');
  if (root) observer.observe(root, { childList: true, subtree: true });
});
