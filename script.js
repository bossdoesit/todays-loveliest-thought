'use strict';
const form = document.querySelector('#reflection-form');
const status = document.querySelector('#status');
form.addEventListener('submit', event => {
  event.preventDefault();
  const fields = [...form.querySelectorAll('input, textarea')];
  if (!fields.some(field => field.value.trim())) {
    status.textContent = 'Start with one small detail before keeping your reflection.';
    fields[0].focus();
    return;
  }
  const labels = ['NOTICE', 'NAME', 'REMEMBER', 'RESPOND'];
  const content = 'TODAY’S LOVELIEST THOUGHT\n' + new Date().toLocaleDateString() + '\n\n' + fields.map((field, i) => labels[i] + '\n' + field.value.trim()).join('\n\n');
  const url = URL.createObjectURL(new Blob([content], {type: 'text/plain;charset=utf-8'}));
  const link = document.createElement('a');
  link.href = url; link.download = 'my-loveliest-thought.txt';
  document.body.append(link); link.click(); link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  status.textContent = 'Your reflection is ready to download. Keep it somewhere meaningful.';
});
document.querySelector('#clear').addEventListener('click', () => {
  if ([...form.querySelectorAll('input, textarea')].some(field => field.value.trim()) && !confirm('Clear this reflection? Download a copy first if you want to keep it.')) return;
  form.reset(); status.textContent = 'Your reflection has been cleared.';
});

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
