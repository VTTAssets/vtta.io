const fs = require("fs");
const path = require("path");
const marked = require("meta-marked");
const readingTime = require("reading-time");
const slugify = require("slugify");
const crypto = require("crypto");

/**
 * Renders a markdown file and analyzes the content for preparation
 * for AWS uploads and/or mongodb doc creation
 * @param {string} contentType asset | blog | article
 * @param {string} slug slugified content title
 * @param {string} filename markdown filename
 */
module.exports = (contentType, slug, filename) => {
  // temporary collections
  let toc = [];
  let uploads = [];

  // read the input file
  const input = fs.readFileSync(filename, {
    encoding: "utf8",
  });

  const hash = crypto.createHash("md5").update(input).digest("hex");
  // initialize the markdown renderer
  const renderer = new marked.Renderer();

  // extract all headings and nametag them to build a table of contents afterwards
  renderer.heading = function (text, level, raw, slugger) {
    const anchor = slugify(text, { remove: true, lower: true, strict: true });
    toc.push({
      anchor: anchor,
      level: level,
      text: text,
    });

    return `<h${level} class="ui header"><a name="${anchor}" class="anchor" href="#${anchor}"><span class="header-link"></span></a>${text}</h${level}>`;
  };

  // style all images for Semantic UI and extract relative src for upload to S3
  renderer.image = function (href, title, text) {
    if (!(href.indexOf("://") > 0 || href.indexOf("//") === 0)) {
      const newHref = `https://${process.env.SPACES_PREFIX}/${contentType}/${slug}/${href}`;
      const source = path.dirname(filename) + "/" + href;
      uploads.push({
        source: source,
        target: newHref,
      });
      href = newHref;
    }

    let sub = title ? title : text;
    if (sub && sub.length) {
      const lead = sub.split(":").shift();
      const remainder = sub.substring(lead.length + 1).trim();
      sub = `<p><span><strong>${lead}${
        remainder.length ? ":" : ""
      }</strong></span><span><em>${remainder}</em></span></p>`;
    } else {
      sub = "";
    }

    return `<div class="ui raised center aligned segment"><img src="${href}" class="ui fluid image" style="margin-bottom: 10px;">${sub}</div>`;
  };

  // apply the custom renderers
  marked.setOptions({
    renderer: renderer,
  });

  const renderToc = (toc) => {
    return `<div class="ui link list">${toc
      .filter((entry) => entry.level <= 3)
      .map(
        (entry) =>
          `<a class="item level-${entry.level}" href="#${entry.anchor}">${entry.text}</a>`
      )
      .join("")}</div>`;
  };

  // render the markdown
  const content = marked(input);

  // save the hash of the input
  content.meta.hash = hash;

  // save the content type
  content.meta.type = contentType;

  // url for this content
  content.meta.link = `${contentType}/${slug}`;

  // render the intro as markdown, too
  const intro = content.meta.intro.split("\n").join("\n\n");
  content.meta.intro = marked.noMeta(intro);

  // get the estimated reading time (super important)
  content.meta.readingTime = Math.ceil(readingTime(content.markdown).minutes);

  // create the table of contents
  content.meta.toc = renderToc(toc);

  // defaulting meta info
  if (typeof content.meta.author === "string") {
    content.meta.author = {
      name: content.meta.author,
      email: null,
      website: null,
    };
  }
  // set a default if none is found
  if (!content.meta.author && !content.meta.email && !content.meta.website) {
    content.meta.author = {
      name: "Sebastian",
      email: "vttassets@gmail.com",
      website: "https://www.vtta.io",
    };
  }

  // all found image uploads for the S3 sync
  // UPDATE: Not necessary anymore if synced with s3cmd
  // content.uploads = uploads;

  // return with all found information
  return Object.assign(content.meta, { html: content.html, uploads: uploads });
};
