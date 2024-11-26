import MyButton from "@/components/mui/Button";
import ProgressBar from "./elements/ProgressBar";
import TextInput from "@/components/mui/TextInput";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Digite um e-mail válido")
    .required("E-mail é obrigatório"),
});

export default function FindEmail({ nextStep }: { nextStep: () => void }) {
  const router = useRouter();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema,
    onSubmit: () => nextStep(),
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
          <MyButton type="submit">CONTINUAR</MyButton>
          <MyButton onClick={() => router.push("/login")} outlined>
            VOLTAR
          </MyButton>
        </form>
      </div>
    </section>
  );
}
