import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CustomTextField from 'src/@core/components/mui/text-field'
import Icon from 'src/@core/components/icon'

interface TableHeaderProps {
  value: string
  toggle?: () => void
  handleFilter: (val: string) => void
  title: string
  searchPlaceholder?: string
}

const TableHeader = (props: TableHeaderProps) => {
  const { handleFilter, toggle, value, title, searchPlaceholder } = props

  return (
    <Box
      sx={{
        py: 4,
        px: 6,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-end'
      }}
    >
      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <CustomTextField
          value={value}
          sx={{ mr: 4 }}
          placeholder={searchPlaceholder}
          onChange={e => handleFilter(e.target.value)}
        />

        <Button onClick={toggle} variant='contained' sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='tabler:plus' />
          {title}
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
