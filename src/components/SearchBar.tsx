import { SearchField } from '@heroui/react'

type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

const SearchBar = ({ value, onChange, placeholder = 'Cari...', className }: SearchBarProps) => {
  return (
    <SearchField
      aria-label={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      fullWidth
    >
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input placeholder={placeholder} />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  )
}

export default SearchBar