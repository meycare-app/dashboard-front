import MyButton from "@/components/mui/Button";
import TextInput from "@/components/mui/TextInput";
import ProgressBar from "./elements/ProgressBar";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useState } from "react";

const validationSchema = yup.object({
  senha: yup.string().required("Senha é obrigatória"),
  confirmarSenha: yup
    .string()
    .oneOf([yup.ref("senha"), undefined], "As senhas devem ser iguais")
    .required("Confirmação de senha é obrigatória"),
});

export default function ResetPassword({ token }: { token: string }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      senha: "",
      confirmarSenha: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setError(null);
      try {
        const response = await fetch(
          `${process.env.API_URL}/admin/update-password`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              password: values.senha,
            }),
          },
        );

        if (!response.ok) {
          throw new Error();
        }

        router.push("/login");
      } catch {
        setError(
          "Não foi possível redefinir a senha. Por favor, tente novamente.",
        );
      }
    },
  });

  return (
    <section className="mx-24 flex grow items-center justify-center">
      <div className="flex min-w-128 flex-col gap-8">
        <ProgressBar step={3} />
        <h1 className="text-[24px] font-normal leading-[32.02px]">
          Redefinir a senha
        </h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <TextInput
            name="senha"
            placeholder="Insira sua nova senha"
            type="password"
            value={formik.values.senha}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.senha && Boolean(formik.errors.senha)}
            helperText={formik.touched.senha && formik.errors.senha}
          />
          <TextInput
            name="confirmarSenha"
            placeholder="Confirme sua nova senha"
            type="password"
            value={formik.values.confirmarSenha}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmarSenha &&
              Boolean(formik.errors.confirmarSenha)
            }
            helperText={
              formik.touched.confirmarSenha && formik.errors.confirmarSenha
            }
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <MyButton type="submit">REDEFINIR</MyButton>
        </form>
      </div>
    </section>
  );
}
