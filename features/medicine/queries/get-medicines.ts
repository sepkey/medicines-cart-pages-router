export const getMedicines = async (page: number, perPage: number) => {
  const response = await fetch(
    `http://localhost:3001/medicines?_page=${page}&_per_page=${perPage}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch cart data");
  }
  const paginatedData = await response.json();
  return paginatedData;
};
