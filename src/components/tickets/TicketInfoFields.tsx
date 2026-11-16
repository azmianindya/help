import { useRef, useState } from 'react'
import { Controller } from 'react-hook-form'
import type { Control } from 'react-hook-form'
import { FieldError, Input, Label, TextField } from '@heroui/react'
import { CloudUpload, X } from 'lucide-react'
import SelectField from '@/components/SelectField'
import { categoryOptions, priorityOptions } from '@/features/tickets/data'
import type { CreateTicketFormValues } from '@/lib/schemas'

type TicketInfoFieldsProps = {
  control: Control<CreateTicketFormValues>
  file: File | null
  fileError: string
  onFileSelect: (file: File | null) => void
}

const TicketInfoFields = ({ control, file, fileError, onFileSelect }: TicketInfoFieldsProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const openFilePicker = () => inputRef.current?.click()

  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-sm">
      <div className="font-semibold text-slate-900">Informasi Tiket</div>

      <Controller
        control={control}
        name="title"
        render={({ field, fieldState }) => (
          <TextField
            fullWidth
            name={field.name}
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            isInvalid={fieldState.invalid}
          >
            <Label>
              Judul Masalah <span className="text-red-500">*</span>
            </Label>
            <Input placeholder="Contoh: Laptop tidak bisa terhubung ke WiFi" />
            <FieldError>{fieldState.error?.message}</FieldError>
          </TextField>
        )}
      />

      <Controller
        control={control}
        name="category"
        render={({ field, fieldState }) => (
          <SelectField
            label="Kategori"
            showRequired
            placeholder="Pilih kategori"
            options={categoryOptions}
            value={field.value ?? ''}
            onChange={field.onChange}
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            fullWidth
          />
        )}
      />

      <Controller
        control={control}
        name="priority"
        render={({ field, fieldState }) => (
          <SelectField
            label="Prioritas"
            showRequired
            placeholder="Pilih prioritas"
            options={priorityOptions}
            value={field.value ?? ''}
            onChange={field.onChange}
            isInvalid={fieldState.invalid}
            errorMessage={fieldState.error?.message}
            fullWidth
          />
        )}
      />

      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium text-slate-700">Lampiran (Opsional)</div>

        <div
          role="button"
          tabIndex={0}
          onClick={openFilePicker}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              openFilePicker()
            }
          }}
          onDragOver={(event) => {
            event.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(event) => {
            event.preventDefault()
            setIsDragging(false)
            onFileSelect(event.dataTransfer.files[0] ?? null)
          }}
          className={`flex cursor-pointer flex-col items-center gap-1 rounded-xl border-2 border-dashed px-4 py-6 text-center text-sm transition-colors ${
            isDragging
              ? 'border-[#6553E8] bg-[#6553E8]/5'
              : 'border-slate-200 hover:border-[#6553E8]'
          }`}
        >
          <CloudUpload size={28} className="text-[#6553E8]" />
          <div className="text-slate-600">Drag &amp; drop file di sini atau pilih file</div>
          <div className="text-xs text-slate-400">Format: JPG, PNG, PDF (Max. 5MB)</div>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          className="hidden"
          onChange={(event) => {
            onFileSelect(event.target.files?.[0] ?? null)
            event.target.value = ''
          }}
        />

        {file && (
          <div className="flex items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm">
            <div className="truncate text-slate-700">{file.name}</div>
            <button
              type="button"
              aria-label="Hapus lampiran"
              onClick={() => onFileSelect(null)}
              className="cursor-pointer text-slate-400 hover:text-slate-700"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {fileError && <div className="text-xs text-red-600">{fileError}</div>}
      </div>
    </div>
  )
}

export default TicketInfoFields