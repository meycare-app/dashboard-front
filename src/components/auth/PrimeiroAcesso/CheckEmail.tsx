import MyButton from "@/components/mui/Button";
import TextInput from "@/components/mui/TextInput";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { useState } from "react";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Digite um e-mail válido")
    .required("E-mail é obrigatório"),
});

type CheckEmailProps = {
  nextStep: () => void;
  setEmail: (email: string) => void;
};

export default function CheckEmail({ nextStep, setEmail }: CheckEmailProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: async (values) => {
      setEmail(values.email);
      setError(null);

      try {
        const response = await fetch(
          `${process.env.API_URL}/admin/verify-check-activation-code`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: values.email }),
          },
        );

        if (response.ok) {
          console.log("Email enviado com sucesso");
          nextStep();
        } else {
          setError("Você não foi cadastrado no sistema. Peça o acesso.");
        }
      } catch (error) {
        setError("Erro na solicitação. Tente novamente.");
      }
    },
  });

  return (
    <section className="flex grow items-center justify-center">
      <div className="flex min-w-128 flex-col gap-8">
        <h1 className="text-[24px] font-normal leading-[32.02px]">
          Entrar no Sistema
        </h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <TextInput
            name="email"
            placeholder="E-mail"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <div className="flex flex-col gap-4">
            <Link className="text-gray-600 underline" href={"/login"}>
              Esqueceu a senha?
            </Link>
            <MyButton type="submit">CONTINUAR</MyButton>
            <MyButton onClick={() => router.push("/login")} outlined>
              VOLTAR
            </MyButton>
          </div>
        </form>
      </div>
    </section>
  );
}
