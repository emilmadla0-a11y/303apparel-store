/* Social page: arrows scroll the poster cards one at a time. */
(function () {
  const track = document.getElementById('pcarTrack'); if (!track) return;
  const prev = document.getElementById('pcarPrev'), next = document.getElementById('pcarNext'), count = document.getElementById('pcarCount');
  const cards = [...track.children];
  const step = () => { const c = cards[0]; return c ? c.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0) : 300; };
  function update() {
    const max = track.scrollWidth - track.clientWidth - 2;
    prev.disabled = track.scrollLeft <= 4; next.disabled = track.scrollLeft >= max;
    const n = cards.length, first = Math.min(n, Math.round(track.scrollLeft / step()) + 1);
    const last = next.disabled ? n : Math.min(n, first + Math.max(1, Math.floor(track.clientWidth / step() + 0.05)) - 1);
    count.textContent = first === last ? `${first} of ${n}` : `${first}–${last} of ${n}`;
  }
  prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next.click(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); prev.click(); }
  });
  addEventListener('resize', update); update();
})();
