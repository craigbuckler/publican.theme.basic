// function hooks

// processContent hook: determine date from filename
export function processFileDate(data, filename) {

  if (data.date) return;

  const d = filename.match(/(\d{4}-\d{2}-\d{2})_/);
  if (d?.length === 2) data.date = new Date( d[1] );

}

// processPostRender hook: add further HTML meta data
export function postrenderMeta( output, data ) {
  if (data.isHTML) {
    output = output.replace('</head>', '<meta name="generator" content="Publican.dev">\n</head>');
  }
  return output;
}
