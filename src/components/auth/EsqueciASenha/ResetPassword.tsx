import MyButton from "@/components/mui/Button";
import TextInput from "@/components/mui/TextInput";
import ProgressBar from "./elements/ProgressBar";

export default function ResetPassword() {
  return (
    <section className="mx-24 flex grow items-center justify-center">
      <div className="flex min-w-128 flex-col gap-8">
        <ProgressBar step={3} />

        <h1 className="text-[24px] font-normal leading-[32.02px]">
          Redefinir a senha
        </h1>

        <div className="flex flex-col gap-4">
          <TextInput placeholder="Insira sua nova senha" />
          <TextInput placeholder="Confirme sua nova senha" />
          <MyButton>REDEFINIR</MyButton>
        </div>
      </div>
    </section>
  );
}
