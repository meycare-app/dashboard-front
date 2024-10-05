import { useRef, useState } from "react";
import TextInput from "./TextInput";

interface OTPInputProps {
  length: number;
  onComplete: (code: string) => void;
  autoFocus?: boolean;
  inputClassName?: string;
  containerClassName?: string;
}

const OTPInput: React.FC<OTPInputProps> = ({
  length,
  onComplete,
  autoFocus = true,
  inputClassName = "",
  containerClassName = "",
}) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newCode = [...code];
    const inputValue = e.target.value;

    if (inputValue && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    newCode[index] = inputValue;
    setCode(newCode);

    if (newCode.join("").length === length) {
      onComplete(newCode.join(""));
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className={`flex gap-4 ${containerClassName}`}>
      {code.map((digit, index) => (
        <div className={`max-w-16 ${inputClassName}`} key={index}>
          <TextInput
            textFieldProps={{
              value: digit,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, index),
              onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(e, index),
              inputProps: { maxLength: 1, style: { textAlign: "center" } },
              autoFocus: autoFocus && index === 0,
            }}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default OTPInput;
