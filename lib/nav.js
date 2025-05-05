// navigation functions
import { tacs } from 'publican';

// main menu navigation (top level)
export function menuMain( currentPage ) {

  return '<ul>' +
      tacs.nav.map(n => {

        const data = n.data;
        if (!data.link || !data.menu) return '';

        let ret = data.menu;
        if (currentPage === data.link) ret = `<strong>${ ret }</strong>`;
        else ret = `<a href="${ data.link }">${ ret }</a>`;

        return `<li>${ ret }</li>\n`;

      }).join('\n') +
    '</ul>';

}


// breadcrumb navigation
export function breadcrumb( currentPage ) {

  const crumb = [];
  recurseNav( tacs.nav );

  const ret = crumb
    .map(n => `<li>${ n.link && n.index ? `<a href="${ n.link }">` : ''}${ n.menu }${ n.link && n.index ? '</a>' : ''}</li>`)
    .join('\n');

  return ret ? `<nav class="breadcrumb">\n<ol>\n${ ret }</ol>\n</nav>` : '';

  function recurseNav(nav) {

    let found;

    nav.forEach(n => {

      found = found || currentPage === n.data.link;

      if (!found) {
        found = recurseNav(n.children);
        if (found) crumb.unshift(n.data);
      }

    });

    return found;

  }

}


// paged navigation
export function pagination( pagination ) {

  if (!(pagination?.href?.length > 1)) return;

  const
    pt = pagination.pageTotal,
    pc = pagination.pageCurrent;

  let ret = '', last = 0;

  // back
  ret += `<li class="back">${ pagination.hrefBack ? `<a href="${ pagination.hrefBack }" title="previous index page">` : '<span>' }&#9668;${ pagination.hrefBack ? '</a>' : '</span>' }</li>\n`;

  pagination.href.forEach((page, pIdx)  => {

    const
      maxp = pc === 0 || pc + 1 === pt ? 3 : 2,
      current = pIdx === pc;

    if (current || pIdx === 0 || pIdx + 1 === pt || pt < 7 || (pIdx + maxp > pc && pIdx - maxp < pc)) {

      last = pIdx;
      if (current) {
        ret += `<li class="current"><strong>${ pIdx + 1 }</strong></li>`;
      }
      else {
        ret += `<li><a href="${ page }">${ pIdx + 1 }</a></li>`;
      }

    }
    else {

      if (last + 1 === pIdx) {
        ret += '<li class="gap">&hellip;</li>';
      }

    }

  });


  // next
  ret += `<li class="next">${ pagination.hrefNext ? `<a href="${ pagination.hrefNext }" title="next index page">` : '<span>' }&#9658;${ pagination.hrefNext ? '</a>' : '</span>' }</li>\n`;

  return `<nav class="pagination"><ul>${ ret }</ul></nav>`;

}
