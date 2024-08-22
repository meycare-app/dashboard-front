"use client";
import MyButton from "@/components/mui/Button";
import TextInput from "@/components/mui/TextInput";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <section className="flex grow items-center justify-center">
        <div className="min-w-128 flex flex-col gap-8">
          <h1 className="text-[24px] font-normal leading-[32.02px]">
            Entrar no Sistema
          </h1>
          <div className="flex flex-col gap-4">
            <TextInput label="E-mail" />
            <TextInput label="Senha" />
          </div>
          <div className="flex flex-col gap-4">
            <Link className="text-gray-600 underline" href={""}>
              Esqueceu a senha?
            </Link>
            <MyButton>ENTRAR</MyButton>
            <MyButton outlined>ESSE É O MEU PRIMEIRO ACESSO</MyButton>
          </div>
        </div>
      </section>
    </>
  );
}
