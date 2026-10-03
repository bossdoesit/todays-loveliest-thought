'use strict';

// Keep staging, previews, and local QA out of the production property.
(() => {
  if (!['todaysloveliestthought.com', 'www.todaysloveliestthought.com'].includes(location.hostname)) return;

  const containerId = 'GTM-TS4MQ72R';
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };

  // Only public page metadata and deliberately named campaign labels belong here.
  // The private reflection form is isolated in an opaque-origin sandbox iframe.
  const page = new URL(location.href);
  const config = {
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: page.origin + page.pathname
  };
  try {
    const referrer = new URL(document.referrer);
    config.page_referrer = referrer.origin + referrer.pathname;
  } catch {
    config.page_referrer = '';
  }
  for (const key of ['source', 'medium', 'campaign', 'content', 'term']) {
    const value = page.searchParams.get('utm_' + key);
    if (value && /^[a-zA-Z0-9_-]{1,100}$/.test(value)) {
      config['campaign_' + (key === 'campaign' ? 'name' : key)] = value;
    }
  }

  // Queue privacy defaults before GTM starts. The container owns the single
  // Google tag; do not add a second gtag('config', ...) call here.
  window.gtag('set', config);
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const tag = document.createElement('script');
  tag.async = true;
  tag.src = 'https://www.googletagmanager.com/gtm.js?id=' + containerId;
  document.head.append(tag);
})();
