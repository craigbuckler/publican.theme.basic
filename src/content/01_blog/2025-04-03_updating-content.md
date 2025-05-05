---
title: Changing content
description: How to add, edit, and remove website content.
author: Craig Buckler
tags: Publican, theme, markdown, content
priority: 1.0
pinned: 0.8
hero: media/images/document.avif
heroWidth: 1200
heroHeight: 600
heroAlt: document
heroCaption: Image courtesy of <a href="https://unsplash.com/@amstram">Scott Graham</a>
---

The following sub-directories define site content:

* `src/content/` provides markdown and other content for sitemaps, RSS feeds, etc.
* `src/content/css/` provides CSS stylesheets
* `src/content/js/` provides client-side JavaScript functionality
* `src/media/` provides images and icons (copied as [pass-through files](https://publican.dev/docs/setup/pass-through-files/))

Examine these files to see how content is coded.


## Content files

The theme provides content files you can add, remove, or edit:

* home page: `src/content/#index.md`
* blog posts: `src/content/01_blog/*`
* about pages: `src/content/02_about/*`


## Navigation

The menu navigation follows the directory name order, so `01_blog` comes before `02_about`. If you rename `02_about` to `00_about`, it would appear before the blog.

The `NN_` value is removed from the path when creating a slug, so pages are rendered to `blog` and `about` directories in `build`.

Note:

* Index pages are automatically created in `/blog/` and `/about/` which list all the posts in that directory.
* Tag pages are automatically created at `/tag/<name>` which list all the pages with that specific tag. A page listing all tags is defined at `src/content/tag.html`.


## Blog filenames

Blog filenames define the date of the post in the format `YYYY-MM-DD_post-title.md`. The last file shown in the `src/content/01_blog/` directory is therefore the most recent post.

The `YYYY-MM-DD_` part of the filename is removed and used to set the blog date, so `src/content/01_blog/2025-05-01_my-latest-post.md` is rendered to `build/blog/my-latest-post/index.html` with a date of ${ tacs.fn.format.dateHuman('2025-05-01') }.

Note that any post dated later than today is rendered in development mode but will not appear on the production site.


## Front matter

[Front matter](https://publican.dev/docs/reference/front-matter/) is contained between `---` delimiters at the top of content files. These are `name: value` pairs which define meta data about the content that can be used in in [templates](--ROOT--blog/updating-themes/).

```md
---
title: Publican basic theme
menu: Home
description: This is a basic Publican theme you can adapt or use as-is.
template: home.html
priority: 1.0
index: weekly
tags: Publican, SSG, theme, jsTACS
---

The main content...
```


## Adding links

You can link to any page on the site using it's absolute path, such as `/about/`.

However, the `BUILD_ROOT` directory can be set in the [configuration](--ROOT--blog/basic-configuration/) so something other than `/` when your Publican site is hosted on a path of another site, such as `/mysite/`. The link to the About page is therefore `/mysite/about/`.

The root path can be inserted into any path using `−−ROOT−−` (defined as a [string replacement](https://publican.dev/docs/reference/publican-options/#string-replacement) in [`publican.config.js`](--ROOT--blog/advanced-configuration/)). You can therefore define links in markdown:

```md
[About page](−−ROOT−−about/)
```

or HTML:

```html
<a href="−−ROOT−−about/">About page</a>
```

and `−−ROOT−−` is replaced with the real root value when the site is built. Changing `BUILD_ROOT` will update all links in the site without manual editing.
