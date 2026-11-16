import { Button } from '@heroui/react'
import { RotateCcw } from 'lucide-react'
import SearchBar from '@/components/SearchBar'
import SelectField from '@/components/SelectField'
import { categoryFilterOptions, statusFilterOptions } from '@/features/tickets/data'

type FilterBarProps = {
  search: string
  onSearchChange: (value: string) => void
  status: string
  onStatusChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  onReset: () => void
}

const FilterBar = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  category,
  onCategoryChange,
  onReset,
}: FilterBarProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SearchBar
        value={search}
        onChange={onSearchChange}
        placeholder="Cari tiket..."
        className="min-w-60 flex-1"
      />
      <SelectField
        ariaLabel="Filter status"
        options={statusFilterOptions}
        value={status}
        onChange={onStatusChange}
        className="w-44"
      />
      <SelectField
        ariaLabel="Filter kategori"
        options={categoryFilterOptions}
        value={category}
        onChange={onCategoryChange}
        className="w-44"
      />
      <Button isIconOnly variant="secondary" aria-label="Reset filter" onPress={onReset}>
        <RotateCcw size={16} />
      </Button>
    </div>
  )
}

export default FilterBar