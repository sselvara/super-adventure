/* global WebImporter */

/**
 * Transformer for SolarOne website cleanup
 * Purpose: Remove non-content elements and fix WordPress-specific HTML issues
 * Applies to: themes.ainoblocks.io/solarone (all pages)
 * Generated: 2026-01-05
 *
 * SELECTORS EXTRACTED FROM:
 * - Captured DOM during migration workflow
 * - Page structure analysis from SolarOne homepage
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform'
};

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove header and navigation
    // EXTRACTED: Found header.wp-block-template-part in captured DOM
    WebImporter.DOMUtils.remove(element, [
      'header.wp-block-template-part',
      '.wp-block-navigation'
    ]);

    // Remove footer
    // EXTRACTED: Found footer.wp-block-template-part in captured DOM
    WebImporter.DOMUtils.remove(element, [
      'footer.wp-block-template-part'
    ]);

    // Remove skip link
    // EXTRACTED: Found a.skip-link.screen-reader-text in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.skip-link'
    ]);

    // Remove mobile-only and hidden elements
    // EXTRACTED: Found elements with mobile-hide, tablet-hide classes in captured DOM
    WebImporter.DOMUtils.remove(element, [
      '.mobile-hide.tablet-hide.desktop-show'
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Clean up remaining WordPress-specific elements
    WebImporter.DOMUtils.remove(element, [
      'noscript',
      'link',
      'style'
    ]);

    // Remove empty WordPress group wrappers
    const emptyGroups = element.querySelectorAll('.wp-block-group:empty');
    emptyGroups.forEach(group => group.remove());
  }
}
