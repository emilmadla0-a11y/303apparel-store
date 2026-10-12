/* Contact page: company info from config.js and the message form. */
document.addEventListener('a303:ready', () => {
  const { esc, ICON, $ } = window.A303;
  const c = window.SITE.COMPANY;

  $('#infoList').innerHTML = `
    <div><dt>Address</dt><dd>${c.address.map(esc).join('<br>')}</dd></div>
    <div><dt>Contact number</dt><dd><a href="tel:${esc(c.phone.replace(/\s/g, ''))}">${esc(c.phone)}</a></dd></div>
    <div><dt>Email address</dt><dd><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></dd></div>
    <div><dt>Business hours</dt><dd>${esc(c.hours)}</dd></div>
    <div><dt>Social media</dt><dd><ul class="social">${Object.entries(c.social).map(([k, u]) => `<li><a href="${esc(u)}" aria-label="${k}">${ICON[k]}</a></li>`).join('')}</ul></dd></div>`;

  const today = new Date().toISOString().slice(0, 10);
  $('#cDate').value = today;

  $('#contactForm').addEventListener('submit', async e => {
    e.preventDefault();
    const f = e.target, msg = $('#formMsg'), btn = $('#sendBtn');
    if (!f.reportValidity()) return;
    btn.disabled = true; msg.className = 'msg'; msg.textContent = 'Sending…';
    try {
      const r = await window.Store.addMessage({ name: f.name.value, email: f.email.value, subject: f.subject.value, message: f.message.value });
      msg.className = 'msg ok'; msg.textContent = r.message; f.reset(); $('#cDate').value = today;
    } catch (err) { msg.className = 'msg err'; msg.textContent = err.message; }
    btn.disabled = false;
  });
});
