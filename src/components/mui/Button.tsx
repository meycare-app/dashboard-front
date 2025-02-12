import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";

const CustomButton = styled(Button)<{ outlined?: boolean }>(
  ({ theme, outlined }) => ({
    backgroundColor: outlined ? "transparent" : theme.palette.primary.main,
    color: outlined
      ? theme.palette.primary.main
      : theme.palette.primary.contrastText,
    padding: "8px 22px",
    height: "42px",
    borderRadius: "4px",
    textTransform: "none",
    fontWeight: "semibold",
    border: outlined ? `1px solid ${theme.palette.primary.main}` : "none",
    boxShadow: outlined
      ? "none"
      : `
        0px 2px 4px -1px ${alpha("#000000", 0.2)},
        0px 4px 5px 0px ${alpha("#000000", 0.14)},
        0px 1px 10px 0px ${alpha("#000000", 0.12)}
      `,
    "&:hover": {
      backgroundColor: outlined
        ? alpha(theme.palette.primary.main, 0.08)
        : alpha(theme.palette.primary.main, 0.71),
    },
    "&:disabled": {
      backgroundColor: outlined
        ? "transparent"
        : alpha(theme.palette.action.disabled, 0.12),
      color: outlined
        ? alpha(theme.palette.primary.main, 0.5)
        : theme.palette.action.disabled,
      border: outlined
        ? `1px solid ${alpha(theme.palette.primary.main, 0.5)}`
        : "none",
      boxShadow: "none",
    },
  }),
);

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
  outlined?: boolean;
}

const MyButton: React.FC<CustomButtonProps> = ({
  loading,
  outlined,
  children,
  ...props
}) => {
  return (
    <CustomButton
      {...props}
      outlined={outlined}
      style={{
        ...props.style,
      }}
      disabled={loading || props.disabled}
    >
      {loading ? "Loading..." : children}
    </CustomButton>
  );
};

export default MyButton;
