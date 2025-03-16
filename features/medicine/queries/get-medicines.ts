const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getMedicines = async (page: number, perPage: number) => {
  const response = await fetch(
    `${BASE_URL}/medicines?_page=${page}&_per_page=${perPage}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch cart data");
  }
  const paginatedData = await response.json();
  return paginatedData;
};
