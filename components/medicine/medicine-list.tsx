import type { Medicine } from "@/types";
import MedicineItem from "./medicine-item";

type MedicineListProps = {
  medicines: Medicine[];
};

export default async function MedicineList({ medicines }: MedicineListProps) {
  return (
    <div className="w-full max-w-[600px] flex flex-col gap-4 mx-auto ">
      {medicines.map((medicine) => (
        <MedicineItem key={medicine.id} medicine={medicine} />
      ))}
    </div>
  );
}
