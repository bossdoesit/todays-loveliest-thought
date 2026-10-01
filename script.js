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
const videoControl = document.querySelector('#video-control');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
function syncVideoLabel() { videoControl.textContent = video.ended ? 'Replay animation' : video.paused ? 'Play animation' : 'Pause animation'; }
video.addEventListener('play', syncVideoLabel);
video.addEventListener('pause', syncVideoLabel);
video.addEventListener('ended', syncVideoLabel);
video.addEventListener('error', () => { videoControl.hidden = true; });
videoControl.addEventListener('click', () => {
  if (video.paused || video.ended) {
    if (video.ended) video.currentTime = 0;
    video.play().catch(() => { syncVideoLabel(); });
  } else video.pause();
});
if (!motionPreference.matches) video.play().catch(syncVideoLabel);
motionPreference.addEventListener('change', event => { if (event.matches) video.pause(); });
