import MyButton from "../mui/Button";
import TextInput from "../mui/TextInput";

export default function Register() {
  return (
    <section className="mx-24 flex flex-grow flex-col items-center justify-center">
      <div className="flex min-w-128 flex-col items-center gap-8">
        <h1 className="mb-10 w-full text-center text-[34px] font-normal leading-[42px]">
          Cadastrar Administradores
        </h1>
        <div className="flex w-full flex-col gap-1">
          <TextInput placeholder="E-mail" />
          <p className="ml-3 text-xs leading-5 opacity-60">
            Insira o e-mail do administrador
          </p>
        </div>
        <MyButton className="w-full" onClick={() => console.log("oiu")}>
          CADASTRAR
        </MyButton>
      </div>
    </section>
  );
}
