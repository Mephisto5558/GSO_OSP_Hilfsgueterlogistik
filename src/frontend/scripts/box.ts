document.querySelectorAll('.box').forEach(box => {
  box.addEventListener('click', () => {
    const currentRow = box.closest('tr');
    if (currentRow) {
      const nextRow = currentRow.nextElementSibling;
      if (!(nextRow instanceof HTMLElement)) return;
      if (nextRow) {
        const boxContent = nextRow.querySelector('.box-content');
        if (!(boxContent instanceof HTMLElement)) return;
        if (boxContent) {
          boxContent.classList.toggle('hidden');
          box.classList.toggle('active');
        }
      }
    }
  });
});