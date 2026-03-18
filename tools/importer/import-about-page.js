/* eslint-disable */
/* global WebImporter */

/**
 * Import script for about-page template
 * Source: https://themes.ainoblocks.io/solarone/about/
 * Generated: 2026-03-06
 */

// PARSER IMPORTS
import columnsSolaroneParser from './parsers/columns-solarone.js';
import cardsSolaroneParser from './parsers/cards-solarone.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/solarone-cleanup.js';
import sectionsTransformer from './transformers/solarone-sections.js';

// PARSER REGISTRY
const parsers = {
  'columns-solarone': columnsSolaroneParser,
  'cards-solarone': cardsSolaroneParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  sectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'about-page',
  description: 'About page with page heading, company stats with image, and team members grid',
  urls: ['https://themes.ainoblocks.io/solarone/about/'],
  blocks: [
    {
      name: 'columns-solarone',
      instances: ['.wp-block-group.has-background-primary-background-color .wp-block-ainoblocks-grid-container'],
    },
    {
      name: 'cards-solarone',
      instances: ['.wp-block-group.has-variant-background-primary-background-color .wp-block-ainoblocks-grid-item:nth-child(2) .wp-block-ainoblocks-grid-container'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero & Stats',
      selector: '.wp-block-group.alignfull.has-background-primary-background-color.pt__13.pb__18',
      style: null,
      blocks: ['columns-solarone'],
      defaultContent: ['.wp-block-group.has-background-primary-background-color h1'],
    },
    {
      id: 'section-2',
      name: 'Team Grid',
      selector: '.wp-block-group.alignfull.has-variant-background-primary-background-color.pt__18.pb__15',
      style: 'dark',
      blocks: ['cards-solarone'],
      defaultContent: [
        '.wp-block-group.has-variant-background-primary-background-color .wp-block-ainoblocks-grid-item:nth-child(1) p',
        '.wp-block-group.has-variant-background-primary-background-color .wp-block-ainoblocks-grid-item:nth-child(1) h2',
        '.wp-block-group.has-variant-background-primary-background-color .wp-block-ainoblocks-grid-item:nth-child(1) p:last-child',
      ],
    },
  ],
};

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using template selectors
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (section breaks + metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
