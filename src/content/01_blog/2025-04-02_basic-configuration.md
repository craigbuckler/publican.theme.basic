---
title: Basic theme configuration
description: How to change the basic site settings.
author: Craig Buckler
tags: Publican, theme, configuration
priority: 1.0
pinned: 0.9
hero: media/images/dials.avif
heroWidth: 1200
heroHeight: 600
heroAlt: dials
heroCaption: Image courtesy of <a href="https://unsplash.com/@adigold1">Adi Goldstein</a>
---

The theme is configured using two configuration files.


## `.env.dev`

`.env.dev` provides the development build configuration parameters. Change the values below `# site setup` to configure the site:

```ini
# build mode
NODE_ENV=development

# development server port
SERVE_PORT=8281

# content files
CONTENT_DIR=./src/content/

# template files
TEMPLATE_DIR=./src/template/
TEMPLATE_DEFAULT=default.html
TEMPLATE_LIST=list.html
TEMPLATE_TAG=tag.html

# build directory
BUILD_DIR=./build/

# root path
BUILD_ROOT=/

# site setup
SITE_LANGUAGE="en-US"
SITE_DOMAIN="https://publicanbasic.pages.dev"
SITE_VERSION="1.0.0"
SITE_TITLE="Publican basic theme"
SITE_DESCRIPTION="This is a basic Publican theme you can adapt or use as-is."
SITE_AUTHOR="Craig Buckler"
SITE_AUTHORURL="https://craigbuckler.com/"
SITE_WORDCOUNTSHOW=50
SITE_THEMECOLOR="#151719"
```

These values are passed to the main `publican.config.js` script when you run `npm start`. You must stop and restart the server when you make changes.


## `.env.prod`

`.env.prod` provides the production build configuration parameters where they differ from `.env.dev`:


```ini
# Overrides .env.dev defaults

# build mode
NODE_ENV=production
```

It should not ne necessary to change this file unless you want different development and production settings. For example, you may want to use the a `BUILD_ROOT` of `/` in development, but `/my-blog/` in production.

Both `.env` files are passed to the main `publican.config.js` script when you run `npm run build`. You must rerun it after making changes.
