import { Fragment } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Button from '@mui/material/Button'
import ListItem from '@mui/material/ListItem'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
import toast from 'react-hot-toast'
import { useDropzone } from 'react-dropzone'
import { Control, Controller } from 'react-hook-form'
import DropzoneWrapper from '../../../@core/styles/libs/react-dropzone'

type FileUploaderProps = {
  control: Control<any>
  name: string
  maxFiles?: number
  maxSize?: number
  accept?: Record<string, string[]>
}

const formatFileSize = (size: number) => {
  const kb = size / 1024

  return kb > 1000 ? `${(kb / 1024).toFixed(1)} mb` : `${kb.toFixed(1)} kb`
}

const renderFilePreview = (file: File) => {
  if (file.type.startsWith('image')) {
    return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
  }

  return <Icon icon='tabler:file-description' />
}

const ImageUploader = ({
  control,
  name,
  maxFiles = 5,
  maxSize = 2000000,
  accept = { 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] }
}: FileUploaderProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value = [], onChange }, fieldState: { error } }) => {
        const files: File[] = value?.filter(Boolean) ?? []

        const { getRootProps, getInputProps } = useDropzone({
          maxFiles,
          maxSize,
          accept,
          onDrop: acceptedFiles => {
            onChange([...files, ...acceptedFiles].slice(0, maxFiles))
          },
          onDropRejected: () => {
            toast.error(
              `You can only upload ${maxFiles} file(s) & maximum size of ${Math.round(maxSize / 1000000)} MB.`,
              { duration: 2000 }
            )
          }
        })

        const handleRemoveFile = (file: File) => {
          onChange(files.filter(f => f.name !== file.name))
        }

        const handleRemoveAllFiles = () => {
          onChange([])
        }

        return (
          <DropzoneWrapper>
            <Fragment>
              <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <Box
                  sx={{
                    display: 'flex',
                    textAlign: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <Box
                    sx={{
                      mb: 8.75,
                      width: 48,
                      height: 48,
                      display: 'flex',
                      borderRadius: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.08)`
                    }}
                  >
                    <Icon icon='tabler:upload' fontSize='1.75rem' />
                  </Box>
                  <Typography variant='h4' sx={{ mb: 2.5 }}>
                    Drop files here or click to upload.
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    Allowed {Object.values(accept).flat().join(', ')}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    Max {maxFiles} file(s) and max size of {Math.round(maxSize / 1000000)} MB
                  </Typography>
                </Box>
              </div>
              {error && <Typography sx={{ color: 'error.main', mt: 2 }}>{error.message}</Typography>}
              {files.length > 0 && (
                <Fragment>
                  <List>
                    {files.map(file => (
                      <ListItem key={file.name}>
                        <div className='file-details'>
                          <div className='file-preview'>{renderFilePreview(file)}</div>
                          <div>
                            <Typography className='file-name'>{file.name}</Typography>
                            <Typography className='file-size' variant='body2'>
                              {formatFileSize(file.size)}
                            </Typography>
                          </div>
                        </div>
                        <IconButton onClick={() => handleRemoveFile(file)}>
                          <Icon icon='tabler:x' fontSize={20} />
                        </IconButton>
                      </ListItem>
                    ))}
                  </List>
                  <div className='buttons'>
                    <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
                      Remove All
                    </Button>
                  </div>
                </Fragment>
              )}
            </Fragment>
          </DropzoneWrapper>
        )
      }}
    />
  )
}

export default ImageUploader
