---
title: Making JavaScript functionality changes
description: How to alter the client-side JavaScript functionality.
author: Craig Buckler
tags: Publican, theme, JavaScript
priority: 1.0
hero: media/images/machine.avif
heroWidth: 1200
heroHeight: 600
heroAlt: machine
heroCaption: Image courtesy of <a href="https://unsplash.com/@mikehindle">Mike Hindle</a>
---

This theme's client-side JavaScript files are managed by Publican rather than a third-party bundler such as esbuild or Rollup. JS files are contained in `src/content/js/` and mostly copied as-is -- although you could insert [jsTACS](https://publican.dev/docs/setup/jstacs/) `${ expressions }`{language=js} if required.


## `main.js`

`main.js` is the root entry script which `import`s others from the `lib` sub-directory:

* `lib/theme.js` -- handles theme switching
* `lib/share.js` -- handles social sharing button

You can add, remove, or rearrange JavaScript files as necessary.

> The template partial `src/template/_partials/htmlhead.html` sets a Content Security Policy in the HTML `<head>`. You may need to update the `<meta>` tag if you load resources from third-party domains.

Note that JavaScript is not hot-reloaded by the browser and you must manually refresh the page when a change is made.


## Template literals

Template literals intended for runtime processing must use `!{ expressions }`{language=js} to ensure jsTACS errors are not triggered during the build, e.g.

```js
const name = 'Craig';
console.log(`Hello !{ name }`);
```
