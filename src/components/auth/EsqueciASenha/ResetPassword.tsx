import MyButton from "@/components/mui/Button";
import TextInput from "@/components/mui/TextInput";
import ProgressBar from "./elements/ProgressBar";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  senha: yup.string().required("Senha é obrigatória"),
  confirmarSenha: yup
    .string()
    .oneOf([yup.ref("senha"), undefined], "As senhas devem ser iguais")
    .required("Confirmação de senha é obrigatória"),
});

export default function ResetPassword() {
  const formik = useFormik({
    initialValues: {
      senha: "",
      confirmarSenha: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Senha redefinida:", values);
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
          <MyButton type="submit">REDEFINIR</MyButton>
        </form>
      </div>
    </section>
  );
}
