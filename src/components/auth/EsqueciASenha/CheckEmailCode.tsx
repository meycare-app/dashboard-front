import MyButton from "@/components/mui/Button";
import ProgressBar from "./elements/ProgressBar";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/shadcn/input-otp";

interface CheckEmailCodeProps {
  nextStep: () => void;
  email: string;
  setToken: (token: string) => void;
}

export default function CheckEmailCode({
  nextStep,
  email,
  setToken,
}: CheckEmailCodeProps): JSX.Element {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleComplete = async () => {
    setError(null);
    try {
      const response = await fetch(`${process.env.API_URL}/admin/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          type: "PASSWORD_RECOVERY",
          code: code,
        }),
      });

      if (response.ok) {
        const { token } = await response.json();
        setToken(token);
        nextStep();
      } else if (response.status === 401) {
        setError("Código inválido.");
      } else if (response.status === 404) {
        setError("Usuário não encontrado.");
      } else if (response.status === 409) {
        setError("Código expirado.");
      } else {
        setError("Erro ao verificar o código.");
      }
    } catch (error) {
      setError("Erro na solicitação. Tente novamente.");
    }
  };

  const handleResendCode = async () => {
    setError(null);
    try {
      const response = await fetch(`${process.env.API_URL}/admin/send-code`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          type: "PASSWORD_RECOVERY",
        }),
      });

      if (response.ok) {
        setError("Novo código enviado com sucesso.");
      } else if (response.status === 409) {
        setError("Código anterior ainda é válido.");
      } else {
        setError("Erro ao enviar código.");
      }
    } catch (error) {
      setError("Erro na solicitação. Tente novamente.");
      console.error("Erro ao enviar o e-mail:", error);
    }
  };

  return (
    <section className="mx-24 flex grow items-center justify-center">
      <div className="flex min-w-128 flex-col gap-8">
        <ProgressBar step={2} />
        <h1 className="text-[24px] font-normal leading-[32.02px]">
          Insira o código que você recebeu no e-mail
        </h1>
        <InputOTP maxLength={5} onChange={(value: string) => setCode(value)}>
          <InputOTPGroup>
            <InputOTPSlot className="h-[56px] w-[50px]" index={0} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot className="h-[56px] w-[50px]" index={1} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot className="h-[56px] w-[50px]" index={2} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot className="h-[56px] w-[50px]" index={3} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot className="h-[56px] w-[50px]" index={4} />
          </InputOTPGroup>
        </InputOTP>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <div className="flex flex-col gap-4">
          <MyButton onClick={handleComplete}>CONTINUAR</MyButton>
          <MyButton outlined onClick={handleResendCode}>
            REENVIAR CÓDIGO
          </MyButton>
        </div>
      </div>
    </section>
  );
}
