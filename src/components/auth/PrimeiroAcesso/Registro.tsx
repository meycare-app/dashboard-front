import Image from "next/image";
import MeycareLogo from "@/assets/logo.svg";
import TextInput from "@/components/mui/TextInput";
import MyButton from "@/components/mui/Button";
import router from "next/router";

export default function Registro() {
  return (
    <section className="flex grow items-center justify-center">
      <div className="flex min-w-128 flex-col items-center justify-center gap-8">
        <div className="bg-light-background relative h-24 w-128 min-w-[60%] rounded-md">
          <Image
            src={MeycareLogo}
            alt="Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="flex w-full flex-col gap-8 p-4">
          <div>
            <h1 className="text-[24px] font-normal leading-[32.02px]">
              Entrar no Sistema
            </h1>
            <h2 className="text-base font-normal leading-6 opacity-60">
              Agora você precisa fazer a sua senha e informar seu nome
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <TextInput placeholder="Informe seu nome" />
            <TextInput placeholder="Insira sua senha" />
            <TextInput placeholder="Informe a mesma senha" />
          </div>
          <div className="flex flex-col gap-4">
            <MyButton onClick={() => console.log("oi")}>CONFIRMAR</MyButton>
          </div>
        </div>
      </div>
    </section>
  );
}
