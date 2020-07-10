const home = (req, res) => res.render('index', {
  page: {
    title: 'Archivist'
  }
});

export {
  home
};