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
  const id = quote.closest('.post').getAttribute('id').split('p')[1];
  const link = quote.href.split('#')[1];
  const target = document.querySelector(`#${link}`);

  if (target) {
    const replies = target.querySelector('.post-replies');
    const el = document.createElement('a');
    el.classList.add('reply-link');
    el.innerText = `>>${id}`;
    el.href = `#p${id}`;
    replies.appendChild(el);
  } else {
    quote.removeAttribute('href');
    quote.style.textDecoration = 'line-through';
  }
});

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