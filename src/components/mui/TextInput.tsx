import React, { forwardRef } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import zIndex from "@mui/material/styles/zIndex";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-root": {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "4px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.grey[400],
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "& .MuiInputLabel-root": {
      color: theme.palette.text.primary,
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.text.primary,
    transform: "translate(14px, -6px) scale(0.75)",
    backgroundColor: theme.palette.background.paper,
    padding: "0 8px",
    zIndex: 1,
  },
  "& .MuiInputLabel-shrink": {
    transform: "translate(14px, -6px) scale(0.75)",
  },
}));

interface CustomTextFieldProps {
  loading?: boolean;
  icon?: React.ReactNode;
  textFieldProps?: TextFieldProps;
  label?: string;
  placeholder?: string;
}

const TextInput = forwardRef<HTMLInputElement, CustomTextFieldProps>(
  ({ loading, icon, textFieldProps, label, placeholder }, ref) => {
    return (
      <CustomTextField
        {...textFieldProps}
        label={label}
        placeholder={placeholder}
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          ...textFieldProps?.InputProps,
          startAdornment: icon ? (
            <div style={{ marginRight: 8 }}>{icon}</div>
          ) : null,
          endAdornment: loading ? (
            <CircularProgress size={24} />
          ) : (
            textFieldProps?.InputProps?.endAdornment
          ),
        }}
        inputRef={ref}
      />
    );
  },
);

export default TextInput;
