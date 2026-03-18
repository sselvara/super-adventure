var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-about-page.js
  var import_about_page_exports = {};
  __export(import_about_page_exports, {
    default: () => import_about_page_default
  });

  // tools/importer/parsers/columns-solarone.js
  function parse(element, { document }) {
    const gridItems = element.querySelectorAll(":scope > .wp-block-ainoblocks-grid-item");
    if (gridItems.length === 0) {
      const block2 = WebImporter.Blocks.createBlock(document, { name: "Columns-Solarone", cells: [[]] });
      element.replaceWith(block2);
      return;
    }
    const columns = [];
    gridItems.forEach((item) => {
      const columnContent = [];
      const flexbox = item.querySelector(".wp-block-ainoblocks-flexbox");
      if (flexbox) {
        const icon = flexbox.querySelector(".wp-block-image img, figure img");
        const text = flexbox.querySelector("p");
        if (icon) columnContent.push(icon.cloneNode(true));
        if (text) columnContent.push(text.cloneNode(true));
      } else if (item.querySelector(".wp-block-group")) {
        const group = item.querySelector(".wp-block-group");
        const eyebrow = group.querySelector(".has-accent-primary-color");
        const heading = group.querySelector("h2.wp-block-heading, h2");
        const desc = group.querySelector("p.has-font-secondary-color, p.has-text-m-font-size");
        const buttons = group.querySelectorAll(".wp-block-ainoblocks-button a");
        if (eyebrow) columnContent.push(eyebrow.cloneNode(true));
        if (heading) columnContent.push(heading.cloneNode(true));
        if (desc) columnContent.push(desc.cloneNode(true));
        buttons.forEach((btn) => columnContent.push(btn.cloneNode(true)));
      } else if (item.querySelector(".wp-block-image, figure")) {
        const img = item.querySelector(".wp-block-image img, figure img");
        if (img) columnContent.push(img.cloneNode(true));
      } else {
        const text = item.querySelector("p, h2, h3");
        if (text) columnContent.push(text.cloneNode(true));
      }
      columns.push(columnContent);
    });
    const cells = [columns];
    const block = WebImporter.Blocks.createBlock(document, { name: "Columns-Solarone", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-solarone.js
  function parse2(element, { document }) {
    const cells = [];
    if (element.classList.contains("wp-block-ainoblocks-testimonial") || element.querySelector(".wp-block-ainoblocks-testimonial")) {
      const testimonial = element.classList.contains("wp-block-ainoblocks-testimonial") ? element : element.querySelector(".wp-block-ainoblocks-testimonial");
      const avatar = testimonial.querySelector(".wp-block-ainoblocks-flexbox figure img") || testimonial.querySelector(".wp-block-ainoblocks-flexbox img");
      const textParagraphs = testimonial.querySelectorAll(".wp-block-ainoblocks-card > p");
      let testimonialText = null;
      textParagraphs.forEach((p) => {
        if (p.textContent && p.textContent.trim().length > 20) {
          testimonialText = p;
        }
      });
      const authorContainer = testimonial.querySelector(".wp-block-ainoblocks-flexbox .wp-block-group") || testimonial.querySelector(".wp-block-ainoblocks-flexbox > div:last-child");
      let authorName = null;
      let authorRole = null;
      if (authorContainer) {
        const authorPs = authorContainer.querySelectorAll("p");
        if (authorPs.length >= 1) [authorName] = authorPs;
        if (authorPs.length >= 2) [, authorRole] = authorPs;
      }
      const imageCell = [];
      if (avatar) imageCell.push(avatar.cloneNode(true));
      const contentCell = [];
      if (testimonialText) contentCell.push(testimonialText.cloneNode(true));
      if (authorName) contentCell.push(authorName.cloneNode(true));
      if (authorRole) contentCell.push(authorRole.cloneNode(true));
      cells.push([imageCell, contentCell]);
    } else if (element.classList.contains("wp-block-post") || element.querySelector(".wp-block-post")) {
      const posts = element.classList.contains("wp-block-post") ? [element] : element.querySelectorAll(".wp-block-post");
      posts.forEach((post) => {
        const featuredImage = post.querySelector(".wp-block-post-featured-image img") || post.querySelector("figure img");
        const terms = post.querySelector(".wp-block-post-terms");
        const title = post.querySelector(".wp-block-post-title a") || post.querySelector(".wp-block-post-title") || post.querySelector("h2 a, h3 a");
        const excerpt = post.querySelector(".wp-block-post-excerpt p") || post.querySelector(".wp-block-post-excerpt");
        const imageCell = [];
        if (featuredImage) imageCell.push(featuredImage.cloneNode(true));
        const contentCell = [];
        if (terms) contentCell.push(terms.cloneNode(true));
        if (title) contentCell.push(title.cloneNode(true));
        if (excerpt) contentCell.push(excerpt.cloneNode(true));
        cells.push([imageCell, contentCell]);
      });
    } else {
      const gridItems = element.querySelectorAll(".wp-block-ainoblocks-grid-item");
      gridItems.forEach((item) => {
        const img = item.querySelector("img");
        const heading = item.querySelector("h2, h3, h4");
        const text = item.querySelector("p");
        const imageCell = img ? [img.cloneNode(true)] : [];
        const contentCell = [];
        if (heading) contentCell.push(heading.cloneNode(true));
        if (text) contentCell.push(text.cloneNode(true));
        if (imageCell.length > 0 || contentCell.length > 0) {
          cells.push([imageCell, contentCell]);
        }
      });
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "Cards-Solarone", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/solarone-cleanup.js
  var TransformHook = {
    beforeTransform: "beforeTransform",
    afterTransform: "afterTransform"
  };
  function transform(hookName, element, _payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header.wp-block-template-part",
        ".wp-block-navigation"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "footer.wp-block-template-part"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".skip-link"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".mobile-hide.tablet-hide.desktop-show"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "noscript",
        "link",
        "style"
      ]);
      const emptyGroups = element.querySelectorAll(".wp-block-group:empty");
      emptyGroups.forEach((group) => group.remove());
    }
  }

  // tools/importer/transformers/solarone-sections.js
  var TransformHook2 = {
    beforeTransform: "beforeTransform",
    afterTransform: "afterTransform"
  };
  function transform2(hookName, element, payload) {
    if (hookName !== TransformHook2.afterTransform) return;
    const { document, template } = payload;
    if (!template || !template.sections || template.sections.length < 2) return;
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
    for (let i = 1; i < sectionElements.length; i += 1) {
      const sectionEl = sectionElements[i].element;
      const hr = document.createElement("hr");
      sectionEl.parentNode.insertBefore(hr, sectionEl);
    }
    sectionElements.forEach(({ config, element: sectionEl }) => {
      if (config.style) {
        const cells = [
          ["Section Metadata"],
          ["style", config.style]
        ];
        const block = WebImporter.Blocks.createBlock(document, {
          name: "Section Metadata",
          cells: [["style", config.style]]
        });
        sectionEl.appendChild(block);
      }
    });
  }

  // tools/importer/import-about-page.js
  var parsers = {
    "columns-solarone": parse,
    "cards-solarone": parse2
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "about-page",
    description: "About page with page heading, company stats with image, and team members grid",
    urls: ["https://themes.ainoblocks.io/solarone/about/"],
    blocks: [
      {
        name: "columns-solarone",
        instances: [".wp-block-group.has-background-primary-background-color .wp-block-ainoblocks-grid-container"]
      },
      {
        name: "cards-solarone",
        instances: [".wp-block-group.has-variant-background-primary-background-color .wp-block-ainoblocks-grid-item:nth-child(2) .wp-block-ainoblocks-grid-container"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero & Stats",
        selector: ".wp-block-group.alignfull.has-background-primary-background-color.pt__13.pb__18",
        style: null,
        blocks: ["columns-solarone"],
        defaultContent: [".wp-block-group.has-background-primary-background-color h1"]
      },
      {
        id: "section-2",
        name: "Team Grid",
        selector: ".wp-block-group.alignfull.has-variant-background-primary-background-color.pt__18.pb__15",
        style: "dark",
        blocks: ["cards-solarone"],
        defaultContent: [
          ".wp-block-group.has-variant-background-primary-background-color .wp-block-ainoblocks-grid-item:nth-child(1) p",
          ".wp-block-group.has-variant-background-primary-background-color .wp-block-ainoblocks-grid-item:nth-child(1) h2",
          ".wp-block-group.has-variant-background-primary-background-color .wp-block-ainoblocks-grid-item:nth-child(1) p:last-child"
        ]
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_about_page_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_about_page_exports);
})();
