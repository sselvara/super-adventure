export default function decorate(block) {
  // Remove empty columns (no meaningful content)
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      if (!col.textContent.trim() && !col.querySelector('img, picture')) {
        col.remove();
      }
    });
  });

  // Recount columns after cleanup
  const activeCols = [...block.firstElementChild.children];
  block.classList.add(`columns-solarone-${activeCols.length}-cols`);

  // setup image columns - detect both <picture> and bare <img> elements
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      const img = col.querySelector('img');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          picWrapper.classList.add('columns-solarone-img-col');
        }
      } else if (img && !col.querySelector('h1, h2, h3, h4, h5, h6')) {
        // Column has an image but no headings - treat as image column
        col.classList.add('columns-solarone-img-col');
      }
    });
  });
}
