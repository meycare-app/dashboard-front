import { Check } from "@mui/icons-material";

export default function ProgressBar({ step }: { step: number }) {
  const getCircleClass = (currentStep: number) =>
    currentStep < step
      ? "bg-unused-gray text-white"
      : currentStep === step
        ? "bg-primary-gold text-white"
        : "bg-unused-gray text-white";

  const getCircleContent = (currentStep: number) =>
    currentStep < step ? <Check /> : currentStep;

  return (
    <div className="flex w-full items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full p-3 text-xs ${getCircleClass(1)}`}
        >
          {getCircleContent(1)}
        </div>
        <p className="text-sm font-medium leading-[21.98px]">E-mail</p>
      </div>

      <div className={`h-px flex-grow bg-unused-gray`}></div>

      <div className="flex items-center gap-2">
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full p-3 text-xs ${getCircleClass(2)}`}
        >
          {getCircleContent(2)}
        </div>
        <p className="text-sm font-medium leading-[21.98px]">Enviar link</p>
      </div>

      <div className={`h-px flex-grow bg-unused-gray`}></div>

      <div className="flex items-center gap-2">
        <div
          className={`flex h-6 w-6 items-center justify-center rounded-full p-3 text-xs ${getCircleClass(3)}`}
        >
          {getCircleContent(3)}
        </div>
        <p className="text-sm font-medium leading-[21.98px]">Redefinir senha</p>
      </div>
    </div>
  );
}
