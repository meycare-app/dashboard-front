import MyButton from "@/components/mui/Button";
import OTPInput from "@/components/mui/OTPInput";

export default function CheckEmailCode({ nextStep }: { nextStep: () => void }) {
  const handleComplete = (code: string) => {
    console.log("Código inserido:", code);
  };

  return (
    <section className="mx-24 flex grow items-center justify-center">
      <div className="flex min-w-128 flex-col gap-8">
        <h1 className="text-[24px] font-normal leading-[32.02px]">
          Insira o código que você recebeu no e-mail
        </h1>
        <OTPInput length={6} onComplete={handleComplete} />
        <div className="flex flex-col gap-4">
          <MyButton onClick={nextStep}>CONTINUAR</MyButton>
        </div>
      </div>
    </section>
  );
}
