(() => {
  const button = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-header nav');
  if (!button || !nav) return;
  button.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? 'Close' : 'Menu';
  });
})();

(() => {
  const cards = [...document.querySelectorAll('[data-evidence-card]')];
  if (!cards.length) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'evidence-lightbox';
  lightbox.innerHTML = '<div class="evidence-lightbox__panel" role="dialog" aria-modal="true" aria-label="Expanded Power BI evidence"><button class="evidence-lightbox__close" type="button" aria-label="Close expanded evidence">×</button><img class="evidence-lightbox__image" alt=""></div>';
  document.body.append(lightbox);

  const image = lightbox.querySelector('.evidence-lightbox__image');
  const closeButton = lightbox.querySelector('.evidence-lightbox__close');
  let opener = null;
  const close = () => {
    lightbox.classList.remove('is-open');
    image.removeAttribute('src');
    opener?.focus();
  };
  cards.forEach(card => card.addEventListener('click', () => {
    opener = card;
    image.src = card.dataset.evidenceSrc;
    image.alt = card.querySelector('img')?.alt || 'Expanded Power BI evidence';
    lightbox.classList.add('is-open');
    closeButton.focus();
  }));
  closeButton.addEventListener('click', close);
  lightbox.addEventListener('click', event => { if (event.target === lightbox) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && lightbox.classList.contains('is-open')) close(); });
})();
