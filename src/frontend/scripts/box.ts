document.querySelectorAll('.box').forEach((box) => {
  box.addEventListener('click', function(this: HTMLElement, event: MouseEvent) {
    const currentRow = this.closest('tr');
    
    if (currentRow) {
      const nextRow = currentRow.nextElementSibling as HTMLElement | null;
      
      if (nextRow) {
        const boxContent = nextRow.querySelector('.box-content') as HTMLElement | null;
        
        if (boxContent) {
          boxContent.classList.toggle('hidden');
          this.classList.toggle('active');
        }
      }
    }
  });
});