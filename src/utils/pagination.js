const paginate = (page, limit, total) => {
  const totalPages = Math.ceil(total / limit);
  const pages = Array.from(new Array(totalPages), (val, index) => index + 1);

  return {
    previous: page === 1 ? null : page - 1,
    next: page === totalPages ? null : page + 1,
    limit,
    pages,
    current: page,
    total: totalPages,
  };
};

export {
  paginate
};