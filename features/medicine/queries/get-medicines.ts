const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const getMedicines = async () => {
  // const response = await fetch(
  //   `${BASE_URL}/medicines?_page=${page}&_per_page=${perPage}`
  // );

  const response = await fetch(`${BASE_URL}/medicines`);
  if (!response.ok) {
    throw new Error("Failed to fetch cart data");
  }
  const paginatedData = await response.json();
  return paginatedData;
};
