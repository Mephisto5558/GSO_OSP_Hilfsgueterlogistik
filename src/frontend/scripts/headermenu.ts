const
  menuButton = document.querySelector('#menu-button'),
  menu = document.querySelector('#menu');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });
}
else console.error('Required elements not found');

async function logout(): Promise<void> {
  const logoutSuccess = await fetch('/api/v1/auth/logout', {
    method: 'POST'
  });

  if (logoutSuccess.ok)
    globalThis.location.href = '/';
}

const logoutButton = document.querySelector('#logout-button');
if (logoutButton) {
  logoutButton.addEventListener('click', async () => {
    await logout();
  });
}