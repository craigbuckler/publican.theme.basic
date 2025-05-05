---
title: Making CSS style changes
description: How to alter the look and feel of the Publican website.
author: Craig Buckler
tags: Publican, theme, CSS
priority: 1.0
hero: media/images/paint.avif
heroWidth: 1200
heroHeight: 600
heroAlt: paint
heroCaption: Image courtesy of <a href="https://unsplash.com/@davidpisnoy">David Pisnoy</a>
---

This theme's CSS files are managed by Publican rather than a third-party bundler such as esbuild, PostCSS, or Lightning. CSS files are contained in `src/content/css/` and mostly copied as-is -- although you could insert [jsTACS](https://publican.dev/docs/setup/jstacs/) `${ expressions }`{language=js} if required.


## `main.css`

`main.css` is the root stylesheet which `@import`s others from the sub-directories:

* `core` -- default element styles
* `components` -- specific components such as the header, footer, titles, etc.

You can add, remove, or rearrange CSS files as necessary.

> The template partial `src/template/_partials/htmlhead.html` sets a Content Security Policy in the HTML `<head>`. You may need to update the `<meta>` tag if you load resources from third-party domains.

In development mode, a date/time value is appended as a querystring to the `@import` URL to ensure CSS files are hot-reloaded when a change occurs. It is not added when creating a production build.

```css
---
refresh: ${ tacs.config.isDev ? `?${ +new Date() }` : '' }
---
@import url('./core/elements.css${ data.refresh }');
```


## `core/variables.css`

You can change CSS variables defined in `core/variables.css` to modify fonts, layout dimensions, and colors.

Colors are defined using the [CSS `light-dark()` function](https://developer.mozilla.org/docs/Web/CSS/color_value/light-dark) which sets light and dark theme colors. For example, the primary background color:

```css
:root {
  --color-back1: light-dark(#fff, #151719);
}
```
