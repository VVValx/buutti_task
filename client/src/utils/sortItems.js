const sortItems = (items) => {
  return items.sort((a, b) =>
    a.title > b.title ? 1 : b.title > a.title ? -1 : 0
  );
};

export default sortItems;
