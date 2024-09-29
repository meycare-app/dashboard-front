import MyButton from "@/components/mui/Button";
import TextInput from "@/components/mui/TextInput";
import { useRef, useState } from "react";

export default function CheckEmailCode() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newCode = [...code];
    const inputValue = e.target.value;

    if (inputValue && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    newCode[index] = inputValue;
    setCode(newCode);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleContinue = () => {
    const fullCode = code.join("");
    console.log("Código inserido:", fullCode);
  };

  return (
    <section className="mx-24 flex grow items-center justify-center">
      <div className="flex min-w-128 flex-col gap-8">
        <h1 className="text-[24px] font-normal leading-[32.02px]">
          Insira o código que você recebeu no e-mail
        </h1>
        <div className="flex gap-4">
          {code.map((digit, index) => (
            <div className="max-w-16">
              <TextInput
                textFieldProps={{
                  value: digit,
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e, index),
                  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
                    handleKeyDown(e, index),
                  inputProps: { maxLength: 1, style: { textAlign: "center" } },
                  autoFocus: index === 0,
                }}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          <MyButton>CONTINUAR</MyButton>
        </div>
      </div>
    </section>
  );
}
