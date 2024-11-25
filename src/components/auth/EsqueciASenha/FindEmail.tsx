import MyButton from "@/components/mui/Button";
import ProgressBar from "./elements/ProgressBar";
import TextInput from "@/components/mui/TextInput";
import { useRouter } from "next/navigation";

export default function FindEmail({ nextStep }: { nextStep: () => void }) {
  const router = useRouter();

  return (
    <section className="mx-24 flex grow flex-col items-center justify-center">
      <div className="flex min-w-128 flex-col gap-8">
        <ProgressBar step={1} />
        <h1 className="text-[24px] font-normal leading-[32.02px]">
          Insira o e-mail cadastrado
        </h1>
        <div className="flex flex-col gap-4">
          <TextInput label="E-mail" placeholder="Insira seu e-mail" />
          <MyButton onClick={nextStep}>CONTINUAR</MyButton>
          <MyButton onClick={() => router.push("/login")} outlined>
            VOLTAR
          </MyButton>
        </div>
      </div>
    </section>
  );
}
