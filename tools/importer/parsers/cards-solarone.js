/* global WebImporter */

/**
 * Parser for cards-solarone block
 *
 * Source: https://themes.ainoblocks.io/solarone/
 * Base Block: cards
 *
 * Block Structure:
 * - Multiple rows (one per card)
 * - Row N: 2 columns - image | content (heading, description, author)
 *
 * Source HTML Patterns (from captured DOM):
 *
 * Pattern 1: Testimonial cards
 * <div class="wp-block-ainoblocks-testimonial">
 *   <div class="wp-block-ainoblocks-card">
 *     <div class="wp-block-ainoblocks-icon quote">...</div>
 *     <p>Testimonial text</p>
 *     <div class="wp-block-ainoblocks-flexbox">
 *       <figure><img/></figure>
 *       <div>
 *         <p><strong>Name</strong></p>
 *         <p>Role/Company</p>
 *       </div>
 *     </div>
 *   </div>
 * </div>
 *
 * Pattern 2: Blog post cards
 * <li class="wp-block-post">
 *   <figure class="wp-block-post-featured-image"><a><img/></a></figure>
 *   <div class="wp-block-post-terms">Categories</div>
 *   <h2 class="wp-block-post-title"><a>Title</a></h2>
 *   <div class="wp-block-post-excerpt"><p>Excerpt</p></div>
 * </li>
 *
 * Generated: 2026-01-05
 */
export default function parse(element, { document }) {
  const cells = [];

  // Check for testimonial card pattern
  if (element.classList.contains('wp-block-ainoblocks-testimonial') ||
      element.querySelector('.wp-block-ainoblocks-testimonial')) {

    const testimonial = element.classList.contains('wp-block-ainoblocks-testimonial')
      ? element
      : element.querySelector('.wp-block-ainoblocks-testimonial');

    // Extract avatar
    const avatar = testimonial.querySelector('.wp-block-ainoblocks-flexbox figure img') ||
                   testimonial.querySelector('.wp-block-ainoblocks-flexbox img');

    // Extract testimonial text (skip the quote icon paragraph)
    const textParagraphs = testimonial.querySelectorAll('.wp-block-ainoblocks-card > p');
    let testimonialText = null;
    textParagraphs.forEach(p => {
      if (p.textContent && p.textContent.trim().length > 20) {
        testimonialText = p;
      }
    });

    // Extract author info
    const authorContainer = testimonial.querySelector('.wp-block-ainoblocks-flexbox .wp-block-group') ||
                           testimonial.querySelector('.wp-block-ainoblocks-flexbox > div:last-child');
    let authorName = null;
    let authorRole = null;

    if (authorContainer) {
      const authorPs = authorContainer.querySelectorAll('p');
      if (authorPs.length >= 1) authorName = authorPs[0];
      if (authorPs.length >= 2) authorRole = authorPs[1];
    }

    // Build card row
    const imageCell = [];
    if (avatar) imageCell.push(avatar.cloneNode(true));

    const contentCell = [];
    if (testimonialText) contentCell.push(testimonialText.cloneNode(true));
    if (authorName) contentCell.push(authorName.cloneNode(true));
    if (authorRole) contentCell.push(authorRole.cloneNode(true));

    cells.push([imageCell, contentCell]);
  }
  // Check for blog post card pattern
  else if (element.classList.contains('wp-block-post') ||
           element.querySelector('.wp-block-post')) {

    const posts = element.classList.contains('wp-block-post')
      ? [element]
      : element.querySelectorAll('.wp-block-post');

    posts.forEach(post => {
      // Extract featured image
      const featuredImage = post.querySelector('.wp-block-post-featured-image img') ||
                           post.querySelector('figure img');

      // Extract categories/terms
      const terms = post.querySelector('.wp-block-post-terms');

      // Extract title
      const title = post.querySelector('.wp-block-post-title a') ||
                   post.querySelector('.wp-block-post-title') ||
                   post.querySelector('h2 a, h3 a');

      // Extract excerpt
      const excerpt = post.querySelector('.wp-block-post-excerpt p') ||
                     post.querySelector('.wp-block-post-excerpt');

      // Build card row
      const imageCell = [];
      if (featuredImage) imageCell.push(featuredImage.cloneNode(true));

      const contentCell = [];
      if (terms) contentCell.push(terms.cloneNode(true));
      if (title) contentCell.push(title.cloneNode(true));
      if (excerpt) contentCell.push(excerpt.cloneNode(true));

      cells.push([imageCell, contentCell]);
    });
  }
  // Fallback for generic card patterns
  else {
    const gridItems = element.querySelectorAll('.wp-block-ainoblocks-grid-item');

    gridItems.forEach(item => {
      const img = item.querySelector('img');
      const heading = item.querySelector('h2, h3, h4');
      const text = item.querySelector('p');

      const imageCell = img ? [img.cloneNode(true)] : [];
      const contentCell = [];
      if (heading) contentCell.push(heading.cloneNode(true));
      if (text) contentCell.push(text.cloneNode(true));

      if (imageCell.length > 0 || contentCell.length > 0) {
        cells.push([imageCell, contentCell]);
      }
    });
  }

  // Create block using WebImporter utility
  const block = WebImporter.Blocks.createBlock(document, { name: 'Cards-Solarone', cells });

  // Replace original element with structured block table
  element.replaceWith(block);
}
