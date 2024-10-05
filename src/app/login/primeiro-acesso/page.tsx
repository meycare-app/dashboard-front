"use client";
import CheckEmail from "@/components/auth/PrimeiroAcesso/CheckEmail";
import CheckEmailCode from "@/components/auth/PrimeiroAcesso/CheckEmailCode";
import Registro from "@/components/auth/PrimeiroAcesso/Registro";
import LogoBar from "@/components/LogoBar";
import { useState } from "react";

export default function PrimeiroAcessoPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 2));

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <CheckEmail nextStep={nextStep} />;
      case 1:
        return <CheckEmailCode nextStep={nextStep} />;
      case 2:
        return <Registro />;
      default:
        return <CheckEmail nextStep={nextStep} />;
    }
  };

  return (
    <main className="flex">
      <LogoBar />
      {renderStep()}
    </main>
  );
}
