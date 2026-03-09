// function hooks
import { createHash } from 'node:crypto';

// processContent hook: determine date from filename
export function processFileDate(data, filename) {

  if (data.date) return;

  const d = filename.match(/(\d{4}-\d{2}-\d{2})_/);
  if (d?.length === 2) data.date = new Date( d[1] );

}


// processRenderStart hook: generate inline scripts and CSP hashes
export function renderstartInlineScripts( tacs ) {

  tacs.script = new Map();
  tacs.script.set('theme', cspScript('document.documentElement.dataset.theme=localStorage.getItem("theme")||""'));
  tacs.script.set('speculation', cspScript(`{"prerender":[{"where":{"href_matches":"${ tacs.root }*"},"eagerness":"moderate"}]}`, 'speculationrules'));

}


// processPreRender hook: generate page inline scripts and CSP hashes
export function prerenderInlineScripts( data, tacs ) {

  data.script = new Map();
  data.script.set('schema', cspScript(
    '{' +
      '"@context":"http://schema.org/",' +
      '"@type":"Article",' +
      `"headline":"${ data.title }",` +
      `"description":"${ data.description }",` +
      `"datePublished":"${ tacs.fn.format.dateISO( data.date ) }T00:00:00+00:00",` +
      `"dateModified":"${ tacs.fn.format.dateISO( data.modified || data.date ) }T00:00:00+00:00",` +
      `"mainEntityOfPage":{"@type":"WebPage","@id":"${ tacs.config.domain }${ data.link }"},` +
      `"image":"${ tacs.config.domain }${ tacs.root }${ data.hero || 'favicon512.png' }",` +
      `"author":{"@type":"Person","name":"${ data.author || tacs.config.author || 'Anonymous' }","url":"${ data.authorUrl || tacs.config.authorUrl || 'https://publican.dev/' }"},` +
      `"inLanguage":"${ tacs.config.language }",` +
      '"contentLocation":"online",' +
      '"accessMode":["textual"],' +
      '"accessModeSufficient":"textual",' +
      '"isFamilyFriendly":true,' +
      `"wordCount":${ data.wordCount || 0 }` +
    '}',
    'application/ld+json'
  ));

}


// create hash a string
export function cspScript(code, type) {
  return {
    code: `<script${ type ? ` type="${ type }"` : '' }>${ code }</script>`,
    hash: createHash('sha256').update(code).digest('base64')
  };
}


// processPostRender hook: add further HTML meta data
export function postrenderMeta( output, data ) {
  if (data.isHTML) {
    output = output.replace('</head>', '<meta name="generator" content="Publican.dev">\n</head>');
  }
  return output;
}
