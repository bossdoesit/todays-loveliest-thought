'use strict';
const video = document.querySelector('#hero-video');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
if (!motionPreference.matches) video.play().catch(() => {});
motionPreference.addEventListener('change', event => { if (event.matches) video.pause(); });

// HighLevel's iframe uses the iFrameSizer height protocol. Keep this bridge local:
// accept only sizing messages from this exact frame and origin, never form data.
// This leaves private reflections isolated from HighLevel's parent-page scripts.
const signupFrame = document.querySelector('#inline-mIYaYT9u8Yje8MxcDUWg');
if (signupFrame) {
  const signupOrigin = new URL(signupFrame.src).origin;
  const sizePrefix = '[iFrameSizer]';
  const initializeSizing = () => {
    signupFrame.contentWindow.postMessage(
      sizePrefix + signupFrame.id + ':0:false:false:32:true:true:0px:offset:null:0px:0',
      signupOrigin
    );
  };
  const resizeEvents = new Set([
    'init', 'resize', 'reset', 'mutationObserver', 'interval', 'size',
    'imageLoad', 'imageError', 'orientationchange', 'readystatechange',
    'transitionend', 'animationend', 'fontLoaded'
  ]);
  window.addEventListener('message', event => {
    if (event.origin !== signupOrigin || event.source !== signupFrame.contentWindow) return;
    if (Array.isArray(event.data) && event.data[0] === 'iframeLoaded') {
      initializeSizing();
      return;
    }
    if (typeof event.data !== 'string' || !event.data.startsWith(sizePrefix)) return;
    const [frameId, rawHeight, , type] = event.data.slice(sizePrefix.length).split(':');
    const height = Number(rawHeight);
    if (frameId !== signupFrame.id || !resizeEvents.has(type) ||
        !Number.isFinite(height) || height < 120 || height > 5000) return;
    signupFrame.style.height = Math.ceil(height + 5) + 'px';
  });
  signupFrame.addEventListener('load', initializeSizing);
  initializeSizing();
}

// The sandbox deliberately omits allow-same-origin. Parent-page analytics cannot
// read the private writing. Accept only this frame's numeric layout height.
const reflectionFrame = document.querySelector('#private-reflection');
if (reflectionFrame) {
  const requestReflectionHeight = () => reflectionFrame.contentWindow.postMessage('tlt-reflection-size-request', '*');
  window.addEventListener('message', event => {
    if (event.source !== reflectionFrame.contentWindow || event.origin !== 'null') return;
    const data = event.data;
    if (!data || data.type !== 'tlt-reflection-height' || typeof data.height !== 'number' ||
        !Number.isFinite(data.height) || data.height < 120 || data.height > 20000) return;
    reflectionFrame.style.height = Math.ceil(data.height + 6) + 'px';
  });
  reflectionFrame.addEventListener('load', requestReflectionHeight);
  requestReflectionHeight();
}
