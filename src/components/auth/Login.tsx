import MyButton from "@/components/mui/Button";
import TextInput from "@/components/mui/TextInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Digite um e-mail válido")
    .required("E-mail é obrigatório"),
  senha: yup.string().required("Senha é obrigatória"),
});

export default function Login() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      senha: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
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
            label="E-mail"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextInput
            label="Senha"
            name="senha"
            type="password"
            value={formik.values.senha}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.senha && Boolean(formik.errors.senha)}
            helperText={formik.touched.senha && formik.errors.senha}
          />
          <div className="flex flex-col gap-4">
            <Link
              className="text-gray-600 underline"
              href={"/login/esqueci-a-senha"}
            >
              Esqueceu a senha?
            </Link>
            <MyButton type="submit">ENTRAR</MyButton>
            <MyButton
              outlined
              onClick={() => router.push("/login/primeiro-acesso")}
            >
              ESSE É O MEU PRIMEIRO ACESSO
            </MyButton>
          </div>
        </form>
      </div>
    </section>
  );
}
