/* Products page: search, category filter, sort and pagination. */
document.addEventListener('a303:ready', () => {
  const { esc, productCard, CATS, revealIn, $ } = window.A303;
  const PER_PAGE = 8;
  let cat = 'all', q = '', sort = '', page = 1, timer;

  const chips = () => $('#chips').innerHTML = [['all', 'All'], ...Object.entries(CATS)].map(([k, v]) =>
    `<li><button class="chip" type="button" data-cat="${k}" aria-pressed="${cat === k}">${v}</button></li>`).join('');

  function pagerButtons(current, pages) {
    if (pages <= 1) return '';
    const btn = (p, label, disabled, current_) => `<button type="button" data-page="${p}" ${disabled ? 'disabled' : ''} aria-current="${current_}">${label}</button>`;
    let out = btn(current - 1, '‹ Prev', current === 1, false);
    const nums = new Set([1, pages, current, current - 1, current + 1].filter(n => n >= 1 && n <= pages));
    let last = 0;
    [...nums].sort((a, b) => a - b).forEach(n => { if (n - last > 1) out += '<span class="gap">…</span>'; out += btn(n, n, false, n === current); last = n; });
    out += btn(current + 1, 'Next ›', current === pages, false);
    return out;
  }

  async function load() {
    const { items, total, page: p, pages } = await window.Store.listProducts({ category: cat, q, sort, page, perPage: PER_PAGE });
    page = p;
    $('#grid').innerHTML = items.map(productCard).join('');
    $('#grid').hidden = !total;
    revealIn($('#grid').querySelectorAll('.card'));
    $('#count').textContent = `${total} ${total === 1 ? 'product' : 'products'}`;
    $('#pager').innerHTML = pagerButtons(page, pages);
    const empty = $('#empty'); empty.hidden = total > 0;
    if (!total) empty.innerHTML = q
      ? `<h3>Nothing matches “${esc(q)}”</h3><p>Check the spelling or try a shorter search.</p>`
      : `<h3>${esc(CATS[cat] || 'Products')} are coming soon</h3><p>This category has no products yet.</p>`;
  }
  $('#chips').addEventListener('click', e => { const b = e.target.closest('[data-cat]'); if (b) { cat = b.dataset.cat; page = 1; chips(); load(); } });
  $('#q').addEventListener('input', e => { clearTimeout(timer); timer = setTimeout(() => { q = e.target.value.trim(); page = 1; load(); }, 250); });
  $('#searchForm').addEventListener('submit', e => { e.preventDefault(); q = $('#q').value.trim(); page = 1; load(); });
  $('#sort').addEventListener('change', e => { sort = e.target.value; page = 1; load(); });
  $('#pager').addEventListener('click', e => { const b = e.target.closest('[data-page]'); if (b && !b.disabled) { page = +b.dataset.page; load(); window.scrollTo({ top: $('#new-arrivals-top').offsetTop - 90, behavior: 'smooth' }); } });
  chips(); load();
});
