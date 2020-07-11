const paginate = (page, limit, total) => {
  const totalPages = total / limit;
  const pages = Array.from(new Array(Math.ceil(totalPages)), (val, index) => index + 1);

  return {
    limit,
    pages,
    current: page,
    total: totalPages,
  };
};

export {
  paginate
};