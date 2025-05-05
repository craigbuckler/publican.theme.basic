---
title: Publican basic theme
menu: Home
description: This is a basic Publican theme you can adapt or use as-is.
template: home.html
priority: 1.0
index: weekly
tags: Publican, SSG, theme, jsTACS
---

${ data.description }

## Website features

The theme provides a high-performance, lightweight, HTML-first static site with:

* [home](--ROOT--) and [about](--ROOT--about/) pages
* [blog posts](--ROOT--blog/) with paginated index pages
* paginated [tag lists](--ROOT--tag/)
* a responsive mobile-first layout
* a light/dark theme switcher
* lightweight social sharing buttons
* SEO meta tags, [schema.org](https://schema.org/), and [Open Graph](https://ogp.me/) structured data
* syntax color coding
* an [RSS feed](--ROOT--feed.xml)
* [text](--ROOT--sitemap.txt) and [XML](--ROOT--sitemap.xml) sitemaps
* a [robots.txt](--ROOT--robots.txt) file pointing to the sitemaps
* a [website manifest](--ROOT--site.webmanifest)
* minimal unminified CSS (20Kb) and JavaScript (3Kb)
* [speculation rules](https://developer.mozilla.org/docs/Web/API/Speculation_Rules_API) for fast page loads
* printer-friendly layout
* strict [Content Security Policy](https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/Content_Security_Policy) settings to prevent malicious attacks


## Developer experience

The site builds in less than a second and provides:

* easy configuration with `.env` files
* markdown content
* fast build times and file watch mode
* development mode with a localhost server and hot reloading
* production mode with HTML minification
* simple HTML templates with JavaScript `${ expressions }`{language=js} ([jsTACS template engine](https://publican.dev/docs/setup/jstacs/))
* function libraries to build navigation menus and format values
* a Node.js only solution with minimal requirements

[Get started...](--ROOT--blog/quickstart/)
