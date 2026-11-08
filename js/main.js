(function () {
  var t = document.querySelector('.nav-toggle'), l = document.querySelector('.nav-links');
  if (t && l) {
    t.addEventListener('click', function () {
      var o = l.classList.toggle('open');
      t.setAttribute('aria-expanded', o);
    });
  }
  document.querySelectorAll('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear(); });
})();

/* Contact form: set ENDPOINT to a FormSubmit or Formspree URL once Trevor picks an email. */
(function () {
  var ENDPOINT = ''; // TODO: e.g. https://formsubmit.co/ajax/your-email
  var f = document.getElementById('inquiry'), n = document.getElementById('form-note');
  if (!f) return;
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    if (f.website && f.website.value) return;
    if (!f.name.value || !f.email.value || !f.email.checkValidity()) { n.textContent = 'Please add your name and a valid email.'; return; }
    if (!ENDPOINT) { n.textContent = 'Booking by form opens soon. For now, message @trainertrev on Instagram.'; return; }
    var btn = f.querySelector('button[type=submit]'); btn.disabled = true;
    fetch(ENDPOINT, { method: 'POST', headers: { 'Accept': 'application/json' }, body: new FormData(f) })
      .then(function (r) { if (!r.ok) throw 0; f.reset(); n.textContent = 'Sent. He will reply soon.'; })
      .catch(function () { n.textContent = 'That did not send. Message @trainertrev on Instagram.'; })
      .then(function () { btn.disabled = false; });
  });
})();
