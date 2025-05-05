// Publican configuration
import { Publican, tacs } from 'publican';
import * as fnNav from './lib/nav.js';
import * as fnFormat from './lib/format.js';
import * as fnHooks from './lib/hooks.js';

const
  publican = new Publican(),
  isDev = (process.env.NODE_ENV === 'development'),
  servePort = parseInt(process.env.SERVE_PORT) || 8000;

console.log(`Building ${ isDev ? 'development' : 'production' } site`);

// Publican defaults
publican.config.dir.content = process.env.CONTENT_DIR;
publican.config.dir.template = process.env.TEMPLATE_DIR;
publican.config.dir.build = process.env.BUILD_DIR;
publican.config.root = process.env.BUILD_ROOT;

// default HTML templates
publican.config.defaultHTMLTemplate = process.env.TEMPLATE_DEFAULT;
publican.config.dirPages.template = process.env.TEMPLATE_LIST;
publican.config.tagPages.template = process.env.TEMPLATE_TAG;

// remove YYYY-MM-DD from filenames
publican.config.slugReplace.set(/\d{4}-\d{2}-\d{2}_/g, '');

// slug replacement strings - removes NN_ from slug
publican.config.slugReplace.set(/\d+_/g, '');

// default syntax language
publican.config.markdownOptions.prism.defaultLanguage = 'bash';

// sorting and pagination
publican.config.dirPages.size = 6;
publican.config.dirPages.sortBy = 'filename';
publican.config.dirPages.sortOrder = 1;
publican.config.dirPages.dir.blog = {
  sortBy: 'date',
  sortOrder: -1
};
publican.config.tagPages.size = 6;

// pass-through files
publican.config.passThrough.add({ from: './src/media/favicons', to: './' });
publican.config.passThrough.add({ from: './src/media/images', to: './media/images/' });

// determine post date from filename
publican.config.processContent.add( fnHooks.processFileDate );

// processPostRender hook: add <meta> tags
publican.config.processPostRender.add( fnHooks.postrenderMeta );

// jsTACs rendering defaults
tacs.config = tacs.config || {};
tacs.config.isDev = isDev;
tacs.config.language = process.env.SITE_LANGUAGE;
tacs.config.domain = isDev ? `http://localhost:${ servePort }` : process.env.SITE_DOMAIN;
tacs.config.title = process.env.SITE_TITLE;
tacs.config.description = process.env.SITE_DESCRIPTION;
tacs.config.author = process.env.SITE_AUTHOR;
tacs.config.authorUrl = process.env.SITE_AUTHORURL;
tacs.config.wordCountShow = parseInt(process.env.SITE_WORDCOUNTSHOW) || 0;
tacs.config.themeColor = process.env.SITE_THEMECOLOR || '#000';
tacs.config.donate = process.env.SITE_DONATE;
tacs.config.buildDate = new Date();

// jsTACS functions
tacs.fn = tacs.fn || {};
tacs.fn.nav = fnNav;
tacs.fn.format = fnFormat;

// replacement strings
publican.config.replace = new Map([
  [ '--ROOT--', publican.config.root ],
  [ '--COPYRIGHT--', `&copy;<time datetime="${ tacs.fn.format.dateYear() }">${ tacs.fn.format.dateYear() }</time>` ],
]);

// utils
publican.config.minify.enabled = !isDev;  // minify in production mode
publican.config.watch = isDev;            // watch in development mode
publican.config.logLevel = 2;             // output verbosity

// clear build directory
await publican.clean();

// build site
await publican.build();

// development server
if (isDev) {

  // dynamic import of livelocalhost in development mode
  const { livelocalhost } = await import('livelocalhost');

  livelocalhost.servedir = publican.config.dir.build;
  livelocalhost.serveport = servePort;
  livelocalhost.start();

}
