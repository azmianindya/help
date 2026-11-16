import { FieldError, Label, ListBox, Select } from '@heroui/react'

type SelectFieldProps = {
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
  label?: string
  showRequired?: boolean
  placeholder?: string
  ariaLabel?: string
  isInvalid?: boolean
  errorMessage?: string
  fullWidth?: boolean
  className?: string
}

const SelectField = ({
  options,
  value,
  onChange,
  label,
  showRequired,
  placeholder,
  ariaLabel,
  isInvalid,
  errorMessage,
  fullWidth,
  className,
}: SelectFieldProps) => {
  return (
    <Select
      aria-label={label ? undefined : ariaLabel}
      placeholder={placeholder}
      value={value || null}
      onChange={(key) => onChange(key === null ? '' : String(key))}
      isInvalid={isInvalid}
      fullWidth={fullWidth}
      className={className}
    >
      {label && (
        <Label>
          {label}
          {showRequired && <span className="ml-0.5 text-red-500">*</span>}
        </Label>
      )}
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      {isInvalid && <FieldError>{errorMessage}</FieldError>}
      <Select.Popover>
        <ListBox>
          {options.map((option) => (
            <ListBox.Item key={option.value} id={option.value} textValue={option.label}>
              {option.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  )
}

export default SelectField