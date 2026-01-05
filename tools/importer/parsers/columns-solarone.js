/* global WebImporter */

/**
 * Parser for columns-solarone block
 *
 * Source: https://themes.ainoblocks.io/solarone/
 * Base Block: columns
 *
 * Block Structure:
 * - Row 1: Multiple columns (2-5 depending on content)
 *
 * Source HTML Patterns (from captured DOM):
 *
 * Pattern 1: Icon + text columns (3 columns)
 * <div class="wp-block-ainoblocks-grid-container">
 *   <div class="wp-block-ainoblocks-grid-item">
 *     <div class="wp-block-ainoblocks-flexbox">
 *       <figure class="wp-block-image"><img/></figure>
 *       <p>Text</p>
 *     </div>
 *   </div>
 *   ...
 * </div>
 *
 * Pattern 2: Feature columns (2 columns - text | image or image | text)
 * <div class="wp-block-ainoblocks-grid-container">
 *   <div class="wp-block-ainoblocks-grid-item">
 *     <div class="wp-block-group">
 *       <p class="has-accent-primary-color">Eyebrow</p>
 *       <h2>Heading</h2>
 *       <p>Description</p>
 *       <div class="wp-block-ainoblocks-multiple-buttons">...</div>
 *     </div>
 *   </div>
 *   <div class="wp-block-ainoblocks-grid-item">
 *     <figure class="wp-block-image"><img/></figure>
 *   </div>
 * </div>
 *
 * Pattern 3: Logo columns (5 columns)
 * Multiple grid-items each containing a figure with brand logo
 *
 * Generated: 2026-01-05
 */
export default function parse(element, { document }) {
  // Get all grid items
  const gridItems = element.querySelectorAll(':scope > .wp-block-ainoblocks-grid-item');

  if (gridItems.length === 0) {
    // Fallback for non-grid container structures
    const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Solarone', cells: [[]] });
    element.replaceWith(block);
    return;
  }

  // Build cells - one row with columns based on grid items
  const columns = [];

  gridItems.forEach((item) => {
    const columnContent = [];

    // Check for flexbox pattern (icon + text)
    const flexbox = item.querySelector('.wp-block-ainoblocks-flexbox');
    if (flexbox) {
      const icon = flexbox.querySelector('.wp-block-image img, figure img');
      const text = flexbox.querySelector('p');
      if (icon) columnContent.push(icon.cloneNode(true));
      if (text) columnContent.push(text.cloneNode(true));
    } else if (item.querySelector('.wp-block-group')) {
      // Check for group pattern (feature text content)
      const group = item.querySelector('.wp-block-group');

      const eyebrow = group.querySelector('.has-accent-primary-color');
      const heading = group.querySelector('h2.wp-block-heading, h2');
      const desc = group.querySelector('p.has-font-secondary-color, p.has-text-m-font-size');
      const buttons = group.querySelectorAll('.wp-block-ainoblocks-button a');

      if (eyebrow) columnContent.push(eyebrow.cloneNode(true));
      if (heading) columnContent.push(heading.cloneNode(true));
      if (desc) columnContent.push(desc.cloneNode(true));
      buttons.forEach((btn) => columnContent.push(btn.cloneNode(true)));
    } else if (item.querySelector('.wp-block-image, figure')) {
      // Check for image-only pattern (logo or feature image)
      const img = item.querySelector('.wp-block-image img, figure img');
      if (img) columnContent.push(img.cloneNode(true));
    } else {
      // Check for direct text content
      const text = item.querySelector('p, h2, h3');
      if (text) columnContent.push(text.cloneNode(true));
    }

    columns.push(columnContent);
  });

  const cells = [columns];

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Columns-Solarone', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
