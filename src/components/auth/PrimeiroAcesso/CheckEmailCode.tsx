import MyButton from "@/components/mui/Button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/shadcn/input-otp";
import { useState } from "react";

type CheckEmailCodeProps = {
  nextStep: () => void;
  email: string;
  setToken: (token: string) => void;
};

export default function CheckEmailCode({
  nextStep,
  email,
  setToken,
}: CheckEmailCodeProps): JSX.Element {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerifyCode = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.API_URL}/admin/verify-code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "ACTIVATE_ADMIN_ACCOUNT",
          email,
          code,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-24 flex grow items-center justify-center">
      <div className="flex min-w-128 flex-col gap-8">
        <h1 className="text-[24px] font-normal leading-[32.02px]">
          Insira o código que você recebeu no e-mail
        </h1>
        <div className="flex flex-col gap-4">
          <InputOTP maxLength={5} onChange={(value: string) => setCode(value)}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
            </InputOTPGroup>
          </InputOTP>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <MyButton
            onClick={handleVerifyCode}
            disabled={loading || code.length < 5}
          >
            {loading ? "Verificando..." : "CONTINUAR"}
          </MyButton>
        </div>
      </div>
    </section>
  );
}
