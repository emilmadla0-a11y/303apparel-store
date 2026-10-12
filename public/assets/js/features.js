/* Features page: price range and piece count from the catalog. */
document.addEventListener('a303:ready', async () => {
  const { peso, $ } = window.A303;
  const { items } = await window.Store.listProducts({});
  if (!items.length) return;
  const prices = items.map(p => p.price);
  $('#priceRange').textContent = `${items.length} pieces from ${peso(Math.min(...prices))} to ${peso(Math.max(...prices))}.`;
});
