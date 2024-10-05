import MyButton from "@/components/mui/Button";
import TextInput from "@/components/mui/TextInput";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckEmail({ nextStep }: { nextStep: () => void }) {
  const router = useRouter();

  return (
    <section className="flex grow items-center justify-center">
      <div className="flex min-w-128 flex-col gap-8">
        <h1 className="text-[24px] font-normal leading-[32.02px]">
          Entrar no Sistema
        </h1>
        <div className="flex flex-col gap-4">
          <TextInput placeholder="E-mail" />
        </div>
        <div className="flex flex-col gap-4">
          <Link className="text-gray-600 underline" href={""}>
            Esqueceu a senha?
          </Link>
          <MyButton onClick={nextStep}>CONTINUAR</MyButton>
          <MyButton onClick={() => router.push("/login")} outlined>
            VOLTAR
          </MyButton>
        </div>
      </div>
    </section>
  );
}
