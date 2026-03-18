/* global WebImporter */

/**
 * Sections transformer for SolarOne pages
 * Purpose: Insert section breaks (<hr>) between sections and add section-metadata blocks
 * Applies to: All SolarOne templates with multiple sections
 * Generated: 2026-03-06
 */

const TransformHook = {
  beforeTransform: 'beforeTransform',
  afterTransform: 'afterTransform',
};

export default function transform(hookName, element, payload) {
  if (hookName !== TransformHook.afterTransform) return;

  const { document, template } = payload;
  if (!template || !template.sections || template.sections.length < 2) return;

  // Process sections in reverse order to avoid DOM position shifts
  const sectionElements = [];
  template.sections.forEach((section) => {
    const selector = Array.isArray(section.selector) ? section.selector : [section.selector];
    let sectionEl = null;
    for (const sel of selector) {
      sectionEl = element.querySelector(sel);
      if (sectionEl) break;
    }
    if (sectionEl) {
      sectionElements.push({ config: section, element: sectionEl });
    }
  });

  // Insert section breaks between consecutive sections
  for (let i = 1; i < sectionElements.length; i += 1) {
    const sectionEl = sectionElements[i].element;
    const hr = document.createElement('hr');
    sectionEl.parentNode.insertBefore(hr, sectionEl);
  }

  // Add section-metadata blocks for sections with styles
  sectionElements.forEach(({ config, element: sectionEl }) => {
    if (config.style) {
      const cells = [
        ['Section Metadata'],
        ['style', config.style],
      ];
      const block = WebImporter.Blocks.createBlock(document, {
        name: 'Section Metadata',
        cells: [['style', config.style]],
      });
      // Insert section-metadata at the end of the section
      sectionEl.appendChild(block);
    }
  });
}
