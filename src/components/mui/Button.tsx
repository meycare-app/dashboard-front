import React from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import { alpha, styled } from '@mui/material/styles'

interface CustomButtonStyleProps {
  outlined?: boolean
  category?: 'normal' | 'destructive'
}

const CustomButton = styled(Button)<CustomButtonStyleProps>(({
  theme,
  outlined,
  category,
}) => {
  const mainColor =
    category === 'destructive' ? '#D32F2F' : theme.palette.primary.main
  const contrastColor =
    category === 'destructive' ? '#fff' : theme.palette.primary.contrastText

  return {
    backgroundColor: outlined ? 'transparent' : mainColor,
    color: outlined ? mainColor : contrastColor,
    padding: '8px 22px',
    height: '42px',
    borderRadius: '4px',
    textTransform: 'none',
    fontWeight: 'semibold',
    border: outlined ? `1px solid ${mainColor}` : 'none',
    boxShadow: outlined
      ? 'none'
      : `
          0px 2px 4px -1px ${alpha('#000000', 0.2)},
          0px 4px 5px 0px ${alpha('#000000', 0.14)},
          0px 1px 10px 0px ${alpha('#000000', 0.12)}
        `,
    '&:hover': {
      backgroundColor: outlined
        ? alpha(mainColor, 0.08)
        : alpha(mainColor, 0.71),
    },
    '&:disabled': {
      backgroundColor: outlined
        ? 'transparent'
        : alpha(theme.palette.action.disabled, 0.12),
      color: outlined ? alpha(mainColor, 0.5) : theme.palette.action.disabled,
      border: outlined ? `1px solid ${alpha(mainColor, 0.5)}` : 'none',
      boxShadow: 'none',
    },
  }
})

interface CustomButtonProps extends ButtonProps {
  loading?: boolean
  outlined?: boolean
  category?: 'normal' | 'destructive'
}

const MyButton: React.FC<CustomButtonProps> = ({
  loading,
  outlined,
  category = 'normal',
  children,
  ...props
}) => {
  return (
    <CustomButton
      {...props}
      outlined={outlined}
      category={category}
      style={{
        ...props.style,
      }}
      disabled={loading || props.disabled}
    >
      {loading ? 'Loading...' : children}
    </CustomButton>
  )
}

export default MyButton
