// Lackiertechnik Schedler – kleine Helfer, keine externen Bibliotheken
(() => {
  // Jahr im Footer
  const y = document.getElementById('jahr');
  if (y) y.textContent = new Date().getFullYear();

  // Mobiles Menü
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  if (nav && toggle) {
    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('use').setAttribute('href', open ? '#i-x' : '#i-menu');
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  }

  // Aktiven Menüpunkt beim Scrollen markieren
  const links = [...document.querySelectorAll('.nav a[href^="#"]')];
  const targets = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && targets.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          links.forEach(a => a.classList.toggle('is-current', a.getAttribute('href') === '#' + en.target.id));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    targets.forEach(t => io.observe(t));
  }

  // Bilder-Slider (wechselt automatisch, pausiert bei Maus/Fokus, respektiert "weniger Bewegung")
  const slider = document.querySelector('.slider');
  if (slider) {
    const slides = [...slider.querySelectorAll('.slide')];
    const dots = slider.querySelector('.slider-dots');
    let i = 0, timer = null;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const show = (n) => {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle('is-active', k === i));
      [...dots.children].forEach((d, k) => d.setAttribute('aria-selected', String(k === i)));
    };
    if (slides.length > 1) {
      slides.forEach((_, k) => {
        const b = document.createElement('button');
        b.type = 'button'; b.setAttribute('role', 'tab');
        b.setAttribute('aria-label', 'Bild ' + (k + 1));
        b.addEventListener('click', () => { show(k); restart(); });
        dots.appendChild(b);
      });
      const start = () => { if (!reduce) timer = setInterval(() => show(i + 1), 6000); };
      const stop = () => clearInterval(timer);
      const restart = () => { stop(); start(); };
      slider.addEventListener('mouseenter', stop);
      slider.addEventListener('mouseleave', start);
      slider.addEventListener('focusin', stop);
      slider.addEventListener('focusout', start);
      show(0); start();
    }
  }

  // Kontaktformular
  // FORM_ENDPOINT leer = Anfrage wird als vorbereitete E-Mail geöffnet.
  // Mit Endpunkt (z. B. eigener Formular-Dienst) wird direkt gesendet.
  const FORM_ENDPOINT = '';
  const EMAIL = 'ms@schema.at';
  const form = document.getElementById('anfrage');
  if (form) {
    const status = form.querySelector('.form-status');
    const say = (msg, cls) => { status.className = 'form-status ' + cls; status.innerHTML = msg; };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let firstBad = null;
      form.querySelectorAll('[required]').forEach(el => {
        const bad = !el.value.trim() || (el.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value.trim()));
        el.setAttribute('aria-invalid', String(bad));
        if (bad && !firstBad) firstBad = el;
      });
      if (firstBad) { say('Bitte füllen Sie die markierten Felder aus.', 'err'); firstBad.focus(); return; }

      const d = Object.fromEntries(new FormData(form).entries());
      const body = [
        'Name: ' + d.name,
        d.firma ? 'Unternehmen: ' + d.firma : '',
        'E-Mail: ' + d.email,
        d.telefon ? 'Telefon: ' + d.telefon : '',
        d.anlage ? 'Anlage: ' + d.anlage : '',
        '', d.nachricht
      ].filter((l, k) => l !== '' || k === 5).join('\n');

      if (FORM_ENDPOINT) {
        try {
          const r = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ ...d, _subject: 'Anfrage über die Website' }) });
          if (!r.ok) throw new Error(r.status);
          say('Vielen Dank! Ihre Anfrage wurde gesendet. Ich melde mich so bald wie möglich.', 'ok');
          form.reset();
        } catch {
          say('Das Senden hat leider nicht geklappt. Bitte schreiben Sie direkt an <a href="mailto:' + EMAIL + '">' + EMAIL + '</a> oder rufen Sie an: <a href="tel:+436647847517">+43 664 7847517</a>.', 'err');
        }
        return;
      }

      const href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Anfrage über die Website') + '&body=' + encodeURIComponent(body);
      window.location.href = href;
      say('Ihr E-Mail-Programm sollte sich jetzt mit der fertigen Anfrage öffnen – bitte dort noch auf „Senden“ klicken.<br>Falls sich nichts öffnet: Schreiben Sie direkt an <a href="mailto:' + EMAIL + '">' + EMAIL + '</a> oder rufen Sie an: <a href="tel:+436647847517">+43 664 7847517</a>.', 'ok');
    });
  }
})();
