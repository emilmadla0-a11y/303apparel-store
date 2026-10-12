/* Landing page: featured products, promo countdown, video. */
document.addEventListener('a303:ready', async () => {
  const { esc, productCard, fmtDate, toast, revealIn, $ } = window.A303;

  const { items } = await window.Store.listProducts({ featured: true });
  $('#featGrid').innerHTML = items.length
    ? items.map(productCard).join('')
    : '<li class="empty" style="grid-column:1/-1"><h3>No featured products yet</h3><p>Check back soon.</p></li>';
  revealIn($('#featGrid').querySelectorAll('.card'));

  const p = await window.Store.getPromo();
  if (p.active) {
    $('#promo').hidden = false;
    revealIn([$('#promo .promo-banner')]);
    $('#promoPct').textContent = p.pct;
    $('#promoCode').textContent = p.code;
    $('#promoUntil').textContent = `Valid until ${fmtDate(p.validUntil)}.`;
    const end = new Date(p.validUntil + 'T23:59:59+08:00');
    const tick = () => {
      const ms = Math.max(0, end - Date.now());
      $('#cdD').textContent = Math.floor(ms / 864e5);
      $('#cdH').textContent = Math.floor(ms % 864e5 / 36e5);
      $('#cdM').textContent = Math.floor(ms % 36e5 / 6e4);
    };
    tick(); setInterval(tick, 30000);
    $('#copyCode').addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(p.code); toast(`${p.code} copied`, false); }
      catch (e) { toast(`Your code: ${p.code}`, false); }
    });
  }

  /* initVideoSystem() in common.js puts the video into #videoContent. This block only resizes the box around it (4:3, min to max width). */
  (function initResize() {
    const vid = $('#videoBox'), handle = $('#videoHandle'), label = $('#videoSize');
    const MIN_W = 260, MAX_W = 820;
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clamp = w => Math.min(MAX_W, Math.max(MIN_W, Math.round(w)));
    function apply(w, save) {
      w = clamp(w);
      vid.style.width = w + 'px';
      label.textContent = `${w} × ${Math.round(w * 3 / 4)} px, drag the corner to resize`;
      if (save) { try { localStorage.setItem('a303_video_w', w); } catch (e) { /* ignore */ } }
    }
    let saved = parseInt(localStorage.getItem('a303_video_w') || '', 10);
    apply(Number.isFinite(saved) ? saved : 560, false);

    let dragging = false, startX = 0, startY = 0, startW = 0;
    handle.addEventListener('pointerdown', e => {
      dragging = true; startX = e.clientX; startY = e.clientY; startW = vid.getBoundingClientRect().width;
      handle.setPointerCapture(e.pointerId);
      vid.style.transition = reduceMotion ? '' : 'none';
    });
    handle.addEventListener('pointermove', e => {
      if (!dragging) return;
      const d = ((e.clientX - startX) + (e.clientY - startY)) / 2;
      apply(startW + d, false);
    });
    function endDrag(e) { if (!dragging) return; dragging = false; apply(parseFloat(vid.style.width), true); }
    handle.addEventListener('pointerup', endDrag);
    handle.addEventListener('pointercancel', endDrag);
    handle.addEventListener('keydown', e => {
      const step = 24, w = vid.getBoundingClientRect().width;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); apply(w + step, true); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); apply(w - step, true); }
    });
  })();
});
