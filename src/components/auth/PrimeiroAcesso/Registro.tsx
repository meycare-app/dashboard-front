import Image from "next/image";
import MeycareLogo from "@/assets/logo.svg";
import TextInput from "@/components/mui/TextInput";
import MyButton from "@/components/mui/Button";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  nome: yup.string().required("Nome é obrigatório"),
  senha: yup.string().required("Senha é obrigatória"),
  confirmarSenha: yup
    .string()
    .oneOf([yup.ref("senha"), undefined], "As senhas devem ser iguais")
    .required("Confirmação de senha é obrigatória"),
});

export default function Registro() {
  const formik = useFormik({
    initialValues: {
      nome: "",
      senha: "",
      confirmarSenha: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Registro concluído:", values);
    },
  });

  return (
    <section className="flex grow items-center justify-center">
      <div className="flex min-w-128 flex-col items-center justify-center gap-8">
        <div className="relative h-24 w-128 min-w-[60%] rounded-md bg-light-background">
          <Image
            src={MeycareLogo}
            alt="Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="flex w-full flex-col gap-4"
        >
          <h1 className="text-[24px] font-normal leading-[32.02px]">
            Entrar no Sistema
          </h1>
          <h2 className="text-base font-normal leading-6 opacity-60">
            Agora você precisa fazer a sua senha e informar seu nome
          </h2>
          <TextInput
            name="nome"
            placeholder="Informe seu nome"
            value={formik.values.nome}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.nome && Boolean(formik.errors.nome)}
            helperText={formik.touched.nome && formik.errors.nome}
          />
          <TextInput
            name="senha"
            placeholder="Insira sua senha"
            type="password"
            value={formik.values.senha}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.senha && Boolean(formik.errors.senha)}
            helperText={formik.touched.senha && formik.errors.senha}
          />
          <TextInput
            name="confirmarSenha"
            placeholder="Informe a mesma senha"
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
          <MyButton type="submit">CONFIRMAR</MyButton>
        </form>
      </div>
    </section>
  );
}
