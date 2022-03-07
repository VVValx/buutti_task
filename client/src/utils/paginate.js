const paginate = (items, currentPage, pageSize) => {
  const start = (currentPage - 1) * pageSize;
  const end = currentPage * pageSize;
  return items.slice(start, end);
};

export default paginate;
