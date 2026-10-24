// Fixed public asset IDs only. No titles, arbitrary URLs, queries or form values.
export const contractCompanions = [
  { id: 'contract_record_responsibilities', slug: 'hubspot-contract-record-responsibilities', workbook: 'hubspot-contract-record-map.xlsx', pdf: 'hubspot-contract-record-map.pdf' },
  { id: 'contract_draft_handoff', slug: 'hubspot-contracts-renewal-quotes', workbook: 'hubspot-contract-handoff-setup.xlsx', pdf: 'hubspot-contract-handoff-setup.pdf' },
  { id: 'contract_phased_pricing', slug: 'hubspot-multi-year-contract-pricing', workbook: 'hubspot-phased-pricing-setup-workbook.xlsx', pdf: 'hubspot-phased-pricing-companion-pack.pdf' },
  { id: 'contract_renewal_expansion_reporting', slug: 'hubspot-renewal-expansion-revenue-reporting', workbook: 'hubspot-renewal-expansion-reporting.xlsx', pdf: 'hubspot-renewal-expansion-reporting.pdf' },
];

export function initContractCompanionEngagement() {
  const sourcePage = location.pathname;
  const pages = ['/resources/', ...contractCompanions.map(asset => `/posts/${asset.slug}/`)];
  if (!pages.includes(sourcePage) || window.__sbContractEngagementBound) return;
  window.__sbContractEngagementBound = true;
  function eligible() {
    if (window.__sbAnalyticsTest || typeof window.__sbTrack !== 'function') return false;
    try { return localStorage.getItem('sb_consent') === 'granted'; }
    catch (_) { return false; } // No readable choice means no engagement measurement.
  }
  function send(name, payload) {
    if (!eligible()) return false;
    try { window.__sbTrack(name, { ...payload, source_page: sourcePage }); return true; }
    catch (_) { return false; } // A blocked tracker must never prevent a download/play.
  }
  function localPath(href) {
    try {
      const url = new URL(href, location.origin);
      return url.origin === location.origin ? url.pathname : '';
    } catch (_) { return ''; }
  }

  // One delegated click handles pointer, keyboard and assistive activation. Repeated
  // intentional activations count again; never add a second pointerdown handler.
  document.addEventListener('click', event => {
    if (event.defaultPrevented) return;
    const link = event.target.closest?.('a[download][href]');
    if (!link) return;
    const path = localPath(link.getAttribute('href'));
    for (const asset of contractCompanions) {
      for (const [fileType, fileName] of [['xlsx', asset.workbook], ['pdf', asset.pdf]]) {
        if (path !== `/templates/${fileName}`) continue;
        send('resource_download', {
          resource_id: `${asset.id}_${fileType}`, file_name: fileName, file_type: fileType,
          placement: sourcePage === '/resources/' ? 'resources_companions' : 'article_companion',
          method: event.detail === 0 ? 'keyboard' : 'pointer',
        });
        return;
      }
    }
  });

  // Unique media-time coverage, not playhead position. Replay can fill gaps but cannot
  // count the same range twice. All state is memory-only, scoped to this document.
  for (const asset of contractCompanions) {
    const video = [...document.querySelectorAll('video')].find(element =>
      [...element.querySelectorAll('source[src]')].some(source =>
        localPath(source.getAttribute('src')) === `/videos/customer-contracts/${asset.slug}.mp4`));
    if (!video) continue;
    const ranges = [];
    const sent = new Set();
    let anchor = null;
    function reset() { anchor = null; }
    function addRange(start, end) {
      ranges.push([start, end]);
      ranges.sort((a, b) => a[0] - b[0]);
      for (let i = 1; i < ranges.length;) {
        if (ranges[i][0] <= ranges[i - 1][1]) {
          ranges[i - 1][1] = Math.max(ranges[i - 1][1], ranges[i][1]);
          ranges.splice(i, 1);
        } else i++;
      }
    }
    function emitOnce(key, name, payload) {
      if (!sent.has(key) && send(name, { video_id: asset.id, ...payload })) sent.add(key);
    }
    function sample() {
      if (!eligible() || document.visibilityState !== 'visible' || video.seeking) { reset(); return; }
      const time = video.currentTime;
      const wall = performance.now();
      const duration = video.duration;
      if (!Number.isFinite(duration) || duration <= 0) { reset(); return; }
      if (anchor) {
        const delta = time - anchor.time;
        const elapsed = (wall - anchor.wall) / 1000;
        // Reject seeks and long/hidden scheduling gaps. Require the browser's actual
        // played range to cover the interval too; dispatched events alone are no proof.
        const plausible = elapsed > 0 && elapsed <= 2 && delta > 0 &&
          delta <= elapsed * video.playbackRate + 0.15;
        let played = false;
        if (plausible) {
          for (let i = 0; i < video.played.length; i++) {
            if (video.played.start(i) <= anchor.time + 0.01 && video.played.end(i) >= time - 0.01) played = true;
          }
        }
        if (played) {
          addRange(Math.max(0, anchor.time), Math.min(time, duration));
          emitOnce('start', 'video_start', {});
        }
      }
      const percent = Math.min(100, ranges.reduce((sum, [start, end]) => sum + end - start, 0) / duration * 100);
      for (const threshold of [25, 50, 75]) {
        if (percent >= threshold) emitOnce(`progress_${threshold}`, 'video_progress', { percent: threshold });
      }
      // Some browsers dispatch pause before ended. Completion uses accumulated
      // coverage even if that pause already cleared the last playback anchor.
      if (video.ended && percent >= 90) emitOnce('complete', 'video_complete', { percent: Math.floor(percent) });
      anchor = !video.paused && !video.ended ? { time, wall } : null;
    }
    video.addEventListener('playing', sample);
    video.addEventListener('timeupdate', sample);
    video.addEventListener('pause', sample);
    video.addEventListener('ended', sample);
    for (const name of ['seeking', 'seeked', 'ratechange', 'waiting', 'emptied']) video.addEventListener(name, reset);
    document.addEventListener('visibilitychange', reset);
    window.addEventListener('storage', event => { if (event.key === 'sb_consent') reset(); });
  }
}
