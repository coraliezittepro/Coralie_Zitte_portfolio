const menuButton = document.querySelector('.menu');
const navLinks = document.querySelector('.nav-links');

if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

const filterButtons = document.querySelectorAll('.filter');
const projectCards = document.querySelectorAll('.card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;

    projectCards.forEach((card) => {
      const categories = card.dataset.category?.split(' ') || [];
      card.hidden = filter !== 'all' && !categories.includes(filter);
    });
  });
});

const dialog = document.querySelector('#projectDialog');

if (dialog) {
  const title = dialog.querySelector('#modalTitle');
  const description = dialog.querySelector('#modalDesc');
  const tags = dialog.querySelector('#modalTags');
  const projectLink = dialog.querySelector('#modalLink');

  projectCards.forEach((card) => {
    card.addEventListener('click', () => {
      title.textContent = card.dataset.title || '';
      description.textContent = card.dataset.desc || '';
      tags.replaceChildren();

      (card.dataset.tags || '').split(',').filter(Boolean).forEach((tag) => {
        const item = document.createElement('span');
        item.textContent = tag;
        tags.append(item);
      });

      projectLink.href = card.dataset.url || '#';
      dialog.showModal();
    });
  });

  dialog.querySelector('.modal-close')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
