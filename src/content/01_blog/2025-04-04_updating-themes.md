---
title: Changing templates
description: How to change the HTML page content structure.
author: Craig Buckler
tags: Publican, theme, HTML, template
priority: 1.0
hero: media/images/template.avif
heroWidth: 1200
heroHeight: 600
heroAlt: template
heroCaption: Image courtesy of <a href="https://unsplash.com/@halacious">Hal Gatewood</a>
---

Templates are provided in `src/template/`. These define the HTML structure where page content is slotted (although you can create templates for any type of text file). You can add, remove, or modify any template file.

> The template partial `src/template/_partials/htmlhead.html` sets a Content Security Policy in the HTML `<head>`. You may need to update the `<meta>` tag if you load resources from third-party domains.


## `default.html`

The `default.html` template is used by most pages. It `include`s partials from the `_partials` sub-directory and the page content defined in `${ data.content }`:

```html
${ include('_partials/htmlhead.html') }
${ include('_partials/header.html') }

<main>

  ${ include('_partials/title.html') }
  ${ include('_partials/hero.html') }

  ${ data.content }

  ${ include('_partials/schema.html') }

</main>

${ include('_partials/share.html') }
${ include('_partials/backnext.html') }
${ include('_partials/htmlfoot.html') }
```

Other templates are defined for the home page (`home.html`), directory indexes (`list.html`), tag index pages (`tag.html`), and tag list and 404 pages (`simple.html`).

Note that Publican passes the following values to templates:

* page [content properties](https://publican.dev/docs/reference/content-properties/) as a `data` object
* site [global properties](https://publican.dev/docs/reference/global-properties/) as a `tacs` object (such as [menu navigation](https://publican.dev/docs/reference/global-properties/#tacsnav) and [tags](https://publican.dev/docs/reference/global-properties/#tacstag)).

The [`publican.config.js` configuration script](--ROOT--blog/advanced-configuration/) can also append values and functions to the global `tacs` object.


## Template partials

Partial files contain snippets which can separate logic or be reused in different templates.

For example, the `_partial/hero.html` file provides logic to show a hero image when a `hero` value is defined in the content's front matter:

```html
${ data.hero && `
    <figure class="hero">
      <img
        src="${ tacs.root }${ data.hero }"
        width="${ data.heroWidth || 1000 }"
        height="${ data.heroHeight || 500 }"
        alt="${ data.heroAlt || 'decorative' }"
        loading="eager"
      />
      ${ data.heroCaption &&
        `<figcaption>${ data.heroCaption }</figcaption>` }
    </figure>
`}
