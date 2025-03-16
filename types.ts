export type Medicine = {
  id: number | string;
  name: string;
  price: number;
  image: string;
  description?: string;
};

export type Item = {
  quantity: number;
  id?: string;
  medicineId: number | string;
  price: number;
  name: string;
};
