export const paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.length > pageSize ? [...items].splice(startIndex, pageSize) : items;
};
