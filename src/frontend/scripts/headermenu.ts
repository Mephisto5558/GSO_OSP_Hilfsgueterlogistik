const
  menuButton = document.getElementById('menu-button'),
  menu = document.getElementById('menu');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
}
else console.error('Required elements not found');