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