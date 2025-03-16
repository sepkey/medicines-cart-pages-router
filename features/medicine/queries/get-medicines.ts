export const getMedicines = async (page: number, perPage: number) => {
  const res = await fetch(
    `http://localhost:3001/medicines?_page=${page}&_per_page=${perPage}`
  );
  if (!res.ok) throw new Error("Fetching medicines failed");
  const paginatedData = await res.json();
  return paginatedData;
};
