const menuButton = document.getElementById('menu-button');
const menu = document.getElementById('menu');

if (menuButton && menu) {
  menuButton.addEventListener('click', function(this: HTMLElement, event: MouseEvent) {
    menu.classList.toggle('hidden');
  });
} else {
  console.error('Required elements not found');
}