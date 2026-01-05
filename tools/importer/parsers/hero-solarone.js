/* global WebImporter */

/**
 * Parser for hero-solarone block
 *
 * Source: https://themes.ainoblocks.io/solarone/
 * Base Block: hero
 *
 * Block Structure:
 * - Row 1: Two columns - text content (eyebrow, heading, CTA, description) | image
 *
 * Source HTML Pattern (from captured DOM):
 * <div class="wp-block-ainoblocks-grid-container">
 *   <div class="wp-block-ainoblocks-grid-item">
 *     <div class="wp-block-group">
 *       <p class="has-accent-primary-color">Eyebrow</p>
 *       <h2>Heading</h2>
 *       <div class="wp-block-ainoblocks-flexbox">
 *         <div class="wp-block-ainoblocks-button"><a>CTA</a></div>
 *         <p>Description</p>
 *       </div>
 *     </div>
 *   </div>
 *   <div class="wp-block-ainoblocks-grid-item">
 *     <figure class="wp-block-image"><img/></figure>
 *   </div>
 * </div>
 *
 * Generated: 2026-01-05
 */
export default function parse(element, { document }) {
  // Extract eyebrow text
  const eyebrow = element.querySelector('.has-accent-primary-color') ||
                  element.querySelector('p:first-of-type');

  // Extract heading
  const heading = element.querySelector('h2.wp-block-heading') ||
                  element.querySelector('h2') ||
                  element.querySelector('h1');

  // Extract CTA button
  const ctaButton = element.querySelector('.wp-block-ainoblocks-button a') ||
                    element.querySelector('a.wp-block-ainoblocks-button__link');

  // Extract description text (in flexbox container)
  const flexbox = element.querySelector('.wp-block-ainoblocks-flexbox');
  let description = null;
  if (flexbox) {
    const descP = flexbox.querySelector('p.has-font-secondary-color') ||
                  flexbox.querySelector('p:last-of-type');
    if (descP) description = descP;
  }

  // Extract hero image
  const heroImage = element.querySelector('.wp-block-image img') ||
                    element.querySelector('figure img');

  // Build cells array - two column layout
  const leftCell = [];
  if (eyebrow) leftCell.push(eyebrow.cloneNode(true));
  if (heading) leftCell.push(heading.cloneNode(true));
  if (ctaButton) leftCell.push(ctaButton.cloneNode(true));
  if (description) leftCell.push(description.cloneNode(true));

  const rightCell = [];
  if (heroImage) rightCell.push(heroImage.cloneNode(true));

  const cells = [
    [leftCell, rightCell]
  ];

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Hero-Solarone', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
