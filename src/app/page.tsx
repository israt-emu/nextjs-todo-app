import TodoAddForm from "./components/TodoAddForm";
import TodoTable from "./components/TodoTable";
import {ColumnDef} from "@tanstack/react-table";
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

const Home = async () => {
  const data = await getData();
  return (
    <main>
      <TodoAddForm />
      <TodoTable columns={columns} data={data} />
    </main>
  );
};

export default Home;
