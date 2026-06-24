import { EmployeeForm } from "@/components/EmployeeForm";
import { EmployeeTable } from "@/components/EmployeeTable";

export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-6 py-16">
      <h1 className="text-xl font-semibold">Funcionários</h1>
      <EmployeeForm />
      <EmployeeTable />
    </div>
  );
}
