const
  menuButton = document.querySelector('#menu-button'),
  menu = document.querySelector('#menu');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
}
else console.error('Required elements not found');