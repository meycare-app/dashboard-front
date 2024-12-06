import Appbar from "@/components/menu/Navbar";
import { Divider } from "@mui/material";
import SellsForm from "./components/SellsForm";

export default async function vendas() {

  return (
    <>
      <Appbar />
      <main className="mx-auto mt-8 w-4/5">
        <div>
          <h1 className="mb-2 text-4xl">Vendas</h1>
          <Divider />
        </div>

        <SellsForm />
      </main>
    </>
  )
}