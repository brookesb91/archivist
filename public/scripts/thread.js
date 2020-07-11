/**
 * TODO Clean all this mess
 */

// Toggle image size between thumb and full
const toggleImage = (e) => {
  const thumb = e.getAttribute('data-thumb');
  const full = e.getAttribute('data-full');

  if (e.src === thumb) {
    e.src = full;
  } else {
    e.src = thumb;
  }
};

// Add reply links to posts
// TODO - Revise
const quotes = document.querySelectorAll('.quotelink');

quotes.forEach(quote => {
  const post = quote.closest('.post');
  const id = post.getAttribute('id').split('p')[1];
  const link = quote.href.split('#')[1];
  const target = document.querySelector(`#${link}`);

  if (target) {
    const replies = target.querySelector('.post-replies');
    const el = document.createElement('a');
    el.classList.add('reply-link');
    el.innerText = `>>${id}`;
    el.href = `#p${id}`;

    let popover;

    el.addEventListener('mouseenter', function () {
      const position = getViewportOffset(this);
      position.top += 24;
      popover = showPopover(post, position);
    });

    el.addEventListener('mouseleave', function () {
      if (popover) {
        popover.destroy();
      }
    });

    replies.appendChild(el);
  } else {
    quote.removeAttribute('href');
    quote.style.textDecoration = 'line-through';
  }
});

const showPopover = (popover, position) => {
  const el = popover.cloneNode(true);
  el.classList.add('popover');
  el.style.position = 'absolute';
  el.style.top = `${position.top}px`;

  el.style.visibility = 'hidden';
  document.body.appendChild(el);

  // Left needs to be amended if the element is too wide to stay on the screen
  // left + el.width > vw ? {reduce left by the difference (diff = (left + width) - vw)}
  const maxX = position.left + el.offsetWidth;
  if (maxX > document.body.offsetWidth) {
    const diff = maxX - document.body.offsetWidth;
    position.left -= diff;
  }

  el.style.left = `${position.left}px`;
  el.style.visibility = 'visible';

  return {
    destroy: () => el.remove()
  };
};

const getViewportOffset = (el) => {
  var box = el.getBoundingClientRect();

  var body = document.body;
  var docEl = document.documentElement;

  var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  var clientTop = docEl.clientTop || body.clientTop || 0;
  var clientLeft = docEl.clientLeft || body.clientLeft || 0;

  var top = box.top + scrollTop - clientTop;
  var left = box.left + scrollLeft - clientLeft;

  return {
    top: Math.round(top),
    left: Math.round(left)
  };
};

/**
 * https://gist.github.com/0x263b/2bdd90886c2036a1ad5bcf06d6e6fb37
 */
String.prototype.toRGB = function () {
  var hash = 0;
  if (this.length === 0) return hash;
  for (let i = 0; i < this.length; i++) {
    hash = this.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  var rgb = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 255;
    rgb[i] = value;
  }
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
};

const contrastRGB = (rgb) => {
  const color = rgb.split(/\(([^)]+)\)/)[1].replace(/ /g, '');
  const r = parseInt(color.split(',')[0], 10),
    g = parseInt(color.split(',')[1], 10),
    b = parseInt(color.split(',')[2], 10);

  var contrast = (Math.round(r * 299) + Math.round(g * 587) + Math.round(b * 114)) / 1000;

  return (contrast >= 128) ? 'black' : 'white';
};

document.querySelectorAll('.post-id[data-id]').forEach(el => {
  const id = el.getAttribute('data-id');
  const background = id.toRGB();
  const color = contrastRGB(background);
  el.style.backgroundColor = background;
  el.style.color = color;
});