"use client";
import CheckEmailCode from "@/components/auth/PrimeiroAcesso/CheckEmailCode";
import LogoBar from "@/components/LogoBar";

export default function PrimeiroAcessoPage() {
  /* const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () =>
    setCurrentStep((prev: number) => Math.min(prev + 1, 2));

  const prevStep = () =>
    setCurrentStep((prev: number) => Math.max(prev - 1, 0));

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <CheckEmail nextStep={nextStep} />;
      case 1:
        return <CheckEmailCode nextStep={nextStep} prevStep={prevStep} />;
      case 2:
        return <Registro prevStep={prevStep} />;
      default:
        return <CheckEmail />;
    }
  }; */

  return (
    <main className="flex">
      <LogoBar />
      <CheckEmailCode />
    </main>
  );
}
