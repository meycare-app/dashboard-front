import MyButton from "../mui/Button";
import TextInput from "../mui/TextInput";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Digite um e-mail válido")
    .required("E-mail é obrigatório"),
});

export default function Register() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
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
  );
}
