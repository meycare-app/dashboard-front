import MyButton from "@/components/mui/Button";
import ProgressBar from "./elements/ProgressBar";
import TextInput from "@/components/mui/TextInput";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Digite um e-mail válido")
    .required("E-mail é obrigatório"),
});

interface findEmailProps {
  nextStep: () => void;
  setEmail: (email: string) => void;
}

export default function FindEmail({
  nextStep,
  setEmail,
}: findEmailProps): JSX.Element {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: async (values) => {
      setError(null);
      try {
        const response = await fetch(`${process.env.API_URL}/admin/send-code`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            type: "PASSWORD_RECOVERY",
          }),
        });

        if (response.ok) {
          setEmail(values.email);
          nextStep();
        } else if (response.status === 409) {
          setError("Código anterior ainda é válido.");
        } else {
          setError("Erro ao enviar código.");
        }
      } catch (error) {
        setError("Erro na solicitação. Tente novamente.");
        console.error("Erro ao enviar o e-mail:", error);
      }
    },
  });

  return (
    <section className="mx-24 flex grow flex-col items-center justify-center">
      <div className="flex min-w-128 flex-col gap-8">
        <ProgressBar step={1} />
        <h1 className="text-[24px] font-normal leading-[32.02px]">
          Insira o e-mail cadastrado
        </h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <TextInput
            label="E-mail"
            name="email"
            placeholder="Insira seu e-mail"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <MyButton type="submit">CONTINUAR</MyButton>
          <MyButton onClick={() => router.push("/login")} outlined>
            VOLTAR
          </MyButton>
        </form>
      </div>
    </section>
  );
}
