import { Divider, TextField } from "@mui/material";

export default function SellsForm(){
  return(
    <div>
      <TextField
            className="w-[100%]"
            label="Produto"
            placeholder="Buscar pelo produto"
      />
      <div className="flex">
        <TextField
              className="w-[50%]"
              label="Produto"
              placeholder="Buscar pelo produto"
        />
        <TextField
              className="w-[50%]"
              label="Produto"
              placeholder="Buscar pelo produto"
        />
      </div>
      <TextField
            className="w-[100%]"
            label="Produto"
            placeholder="Buscar pelo produto"
      />
      <h2>Valores</h2>
      <Divider />
      <div className="flex">
        <TextField
              className="w-[50%]"
              label="Produto"
              placeholder="Buscar pelo produto"
        />
        <TextField
              className="w-[50%]"
              label="Produto"
              placeholder="Buscar pelo produto"
        />
      </div>
      <TextField
            className="w-[100%]"
            label="Produto"
            placeholder="Buscar pelo produto"
      />


      <button>Cadastrar Venda</button>
    </div>
  )
}