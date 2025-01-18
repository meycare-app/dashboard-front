"use client";
import CheckEmailCode from "@/components/auth/EsqueciASenha/CheckEmailCode";
import FindEmail from "@/components/auth/EsqueciASenha/FindEmail";
import ResetPassword from "@/components/auth/EsqueciASenha/ResetPassword";
import LogoBar from "@/components/LogoBar";
import { useState } from "react";

export default function PrimeiroAcessoPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 2));

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <FindEmail nextStep={nextStep} setEmail={setEmail} />;
      case 1:
        return (
          <CheckEmailCode
            nextStep={nextStep}
            email={email}
            setToken={setToken}
          />
        );
      case 2:
        return <ResetPassword token={token} />;
      default:
        return <FindEmail nextStep={nextStep} setEmail={setEmail} />;
    }
  };

  return (
    <main className="flex">
      <LogoBar />
      {renderStep()}
    </main>
  );
}
