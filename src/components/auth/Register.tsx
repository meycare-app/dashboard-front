'use client'

import { useState } from "react";
import MyButton from "../mui/Button";
import TextInput from "../mui/TextInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "../shadcn/alert";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Digite um e-mail válido")
    .required("E-mail é obrigatório"),
});

export default function Register() {
  const { data: session } = useSession();
  const [alertVisible, setAlertVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setError(null);
      if (session?.user?.token) {
        try {
          const response = await fetch(
            `${process.env.API_URL}/admin/register-code`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session.user.token}`,
              },
              body: JSON.stringify({ email: values.email }),
            },
          );

          if (response.ok) {
            console.log("Cadastro realizado com sucesso!");
            setAlertVisible(true);
          } else {
            const errorText = await response.text();
            if (response.status === 422) {
              setError("Admin já cadastrado.");
            } else if (response.status === 409) {
              setError("Código anterior ainda válido.");
            } else {
              setError("Erro ao cadastrar administrador.");
            }
            console.error("Erro ao cadastrar administrador:", errorText);
          }
        } catch (error) {
          console.error("Erro na solicitação:", error);
        }
      } else {
        console.error("Token de autenticação não encontrado.");
      }
    },
  });

  return (
    <>
      {alertVisible && (
        <div className="mt-10 flex w-full justify-center">
          <Alert className="relative flex w-[70%] items-center justify-between">
            <div className="flex items-center gap-5">
              <CheckCircleOutlineIcon />
              <div>
                <AlertTitle>Administrador cadastrado</AlertTitle>
                <AlertDescription>
                  O usuário irá receber um e-mail com as informações para
                  cadastro.
                </AlertDescription>
              </div>
            </div>
            <button onClick={() => setAlertVisible(false)}>
              <CloseIcon />
            </button>
          </Alert>
        </div>
      )}
      <section className="mx-24 flex flex-grow flex-col items-center justify-center">
        <div className="flex min-w-128 flex-col items-center gap-8">
          <h1 className="mb-10 w-full text-center text-[34px] font-normal leading-[42px]">
            Cadastrar Administradores
          </h1>
          <form
            onSubmit={formik.handleSubmit}
            className="flex w-full flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <TextInput
                placeholder="E-mail"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <p className="ml-3 text-xs leading-5 opacity-60">
                Insira o e-mail do administrador
              </p>
            </div>
            <MyButton className="w-full" type="submit">
              CADASTRAR
            </MyButton>
          </form>
        </div>
      </section>
    </>
  );
}
