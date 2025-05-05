---
title: Advanced site configuration
description: How to change the publican.config.js file.
author: Craig Buckler
tags: Publican, theme, configuration
priority: 1.0
hero: media/images/plugin.avif
heroWidth: 1200
heroHeight: 600
heroAlt: plugin
heroCaption: Image courtesy of <a href="https://unsplash.com/@alexkixa">Alexandre Debiève</a>
---

The site build is configured by the `publican.config.js` file. It contains JavaScript code to:

* load and parse values set in the [`.env.dev` and `.env.prod`](--ROOT--blog/basic-configuration/) configuration files
* [modify page slugs](https://publican.dev/docs/reference/publican-options/#slug-string-replacement) to remove the initial number or date
* set the number of pages and sort order for [directory](https://publican.dev/docs/reference/publican-options/#directory-index-pages) and [tag](https://publican.dev/docs/reference/publican-options/#tag-index-pages) index pages
* [copy static files](https://publican.dev/docs/reference/publican-options/#pass-through-files) such as images and icons
* run [event hook functions](https://publican.dev/docs/reference/event-functions/) to examine and modify data
* append [custom global values and functions](https://publican.dev/docs/reference/global-properties/#custom-global-properties) to the `tacs` object
* define [replacement strings](https://publican.dev/docs/reference/publican-options/#string-replacement) such as [`−−ROOT−−`](--ROOT--blog/updating-content/#adding-links)
* [minify HTML](https://publican.dev/docs/reference/publican-options/#html-minification) in production mode
* [clean the build directory](https://publican.dev/docs/reference/publican-methods/#clean)
* [start the build](https://publican.dev/docs/reference/publican-methods/#build)
* [watch for file changes](https://publican.dev/docs/reference/publican-options/#watch-mode) in development mode
* [start a development mode server](https://www.npmjs.com/package/livelocalhost)

You can add your own Publican customisations as necessary.


## Function libraries

The theme provides the following code libraries in the `lib` directory.


### `hooks.js`

This exports two functions:

* `processFileDate()` extracts the post date from its filename
* `postrenderMeta()` adds a `Publican` generator meta tag to the HTML `<head>`

`publican.config.js` imports and uses these as [event hook functions](https://publican.dev/docs/reference/event-functions/):

```js
import * as fnHooks from './lib/hooks.js';

// determine post date from filename
publican.config.processContent.add( fnHooks.processFileDate );

// processPostRender hook: add <meta> tags
publican.config.processPostRender.add( fnHooks.postrenderMeta );
```


### `format.js`

This provides a number of formatting functions such as:

* `number()` -- displays a date in a readable format for the default locale
* `dateHuman()` -- displays a date in a readable format for the default locale
* `rss()` -- cleans HTML content and adds fully-qualified URLs for the RSS feed defined in `src/content/feed.xml`

`publican.config.js` imports and appends these functions to the `tacs` object:

```js
import * as fnFormat from './lib/format.js';

// jsTACS functions
tacs.fn = tacs.fn || {};
tacs.fn.format = fnFormat;
```

Therefore, templates can format dates and numbers, e.g.

```html
<ul>
  <li>Post written on ${ tacs.fn.format.dateHuman( data.date ) }</li>
  <li>${ tacs.fn.format.number( data.wordCount ) } words</li>
<ul>
```

To render:

* Post written on ${ tacs.fn.format.dateHuman( data.date ) }
* ${ tacs.fn.format.number( 1234 ) } words


### `nav.js`

This exports three functions:

* `mainMenu()` creates the menu in the page header by examining the top-level pages in the [global `tacs.nav` object](https://publican.dev/docs/reference/global-properties/#tacsnav)
* `breadcrumb()` creates a breadcrumb trail to the current page (shown above the page title) using the [global `tacs.nav` object](https://publican.dev/docs/reference/global-properties/#tacsnav)
* `pagination()` formats the list of pages (back, 1, 2, 3, ..., next) shown on [directory](--ROOT--blog/) and [tag](--ROOT--tag/publican/) indexes by examining the [`data.pagination` object](https://publican.dev/docs/reference/content-properties/#datapaginatation).

These are complex and would be cumbersome to create in `${ expressions }` alone. `publican.config.js` imports and appends these functions to the `tacs` object:

```js
import * as fnNav from './lib/nav.js';

// jsTACS functions
tacs.fn = tacs.fn || {};
tacs.fn.nav = fnNav;
```

The main menu can therefore be added to a template using code such as:

```html
<nav class="menu">
  ${ tacs.fn.nav.menuMain( data.link ) }
</nav>
```
