import React, { forwardRef, useState, useRef, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import { Box, Typography, IconButton, CircularProgress } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import Image from 'next/image'

const Container = styled('div')<{ imageSelected?: boolean }>(
  ({ theme, imageSelected }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: imageSelected ? 'row' : 'column',
    border: imageSelected ? 'none' : `2px dashed ${theme.palette.grey[200]}`,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    cursor: 'pointer',
    transition: 'border-color 0.2s ease-in-out',
    '&:hover': {
      borderColor: theme.palette.primary.main,
    },
    '&:focus-within': {
      outline: 'none',
      borderColor: theme.palette.primary.main,
    },
  }),
)

const FileNameBox = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  padding: theme.spacing(1),
  borderRadius: 4,
}))

interface ImageInputProps {
  label?: string
  accept?: string
  name?: string
  value?: File | null
  onChange?: (file: File | null) => void
  error?: boolean
  helperText?: string
  loading?: boolean
  maxSizeMB?: number
}

const ImageInput = forwardRef<HTMLInputElement, ImageInputProps>(
  (
    {
      label = 'Selecione a imagem do produto',
      accept = 'image/*',
      name,
      value,
      onChange,
      error,
      helperText,
      loading,
      maxSizeMB = 3,
    },
    ref,
  ) => {
    const [internalFile, setInternalFile] = useState<File | null>(value || null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
      if (internalFile) {
        const url = URL.createObjectURL(internalFile)
        setPreviewUrl(url)
        return () => URL.revokeObjectURL(url)
      } else {
        setPreviewUrl(null)
      }
    }, [internalFile])

    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.click()
      }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        if (file.size / 1024 / 1024 > maxSizeMB) {
          alert(`Tamanho máximo de ${maxSizeMB}MB excedido!`)
          event.target.value = ''
          return
        }
        setInternalFile(file)
        onChange?.(file)
      }
    }

    const handleRemoveFile = () => {
      setInternalFile(null)
      onChange?.(null)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }

    return (
      <Box width="100%">
        <Typography
          variant="subtitle2"
          sx={{
            marginBottom: 0.5,
            color: error ? 'error.main' : 'text.primary',
          }}
        >
          {label}
        </Typography>
        <Container
          onClick={handleClick}
          tabIndex={0}
          imageSelected={!!internalFile}
        >
          {!internalFile ? (
            <>
              <Typography variant="body2" className="underline" color="#2F5ED7">
                {label}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                SVG, PNG, JPG (máx. {maxSizeMB}MB)
              </Typography>
            </>
          ) : (
            <>
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                <FileNameBox sx={{ marginTop: 0 }}>
                  {previewUrl && (
                    <Image
                      src={previewUrl}
                      alt={internalFile.name}
                      width={40}
                      height={40}
                      style={{
                        objectFit: 'cover',
                        marginRight: 8,
                        borderRadius: 4,
                      }}
                    />
                  )}
                  <Typography variant="body2" noWrap sx={{ maxWidth: '70%' }}>
                    {internalFile.name}
                  </Typography>
                  <IconButton
                    aria-label="remover arquivo"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRemoveFile()
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </FileNameBox>
              )}
            </>
          )}
        </Container>

        {error && helperText && (
          <Typography variant="caption" color="error">
            {helperText}
          </Typography>
        )}

        <input
          ref={(el) => {
            inputRef.current = el
            if (typeof ref === 'function') {
              ref(el)
            } else if (ref) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              ref.current = el
            }
          }}
          type="file"
          name={name}
          accept={accept}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </Box>
    )
  },
)

ImageInput.displayName = 'ImageInput'

export default ImageInput
