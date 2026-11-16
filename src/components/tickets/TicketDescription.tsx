import { Controller } from 'react-hook-form'
import type { Control } from 'react-hook-form'
import { Button, FieldError, Label, TextArea, TextField } from '@heroui/react'
import { Send } from 'lucide-react'
import type { CreateTicketFormValues } from '@/lib/schemas'

type TicketDescriptionProps = {
  control: Control<CreateTicketFormValues>
  isSubmitting: boolean
  onCancel: () => void
}

const TicketDescription = ({ control, isSubmitting, onCancel }: TicketDescriptionProps) => {
  return (
    <div className="flex h-full flex-col gap-5 rounded-2xl bg-white p-6 shadow-sm">
      <Controller
        control={control}
        name="description"
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
              Deskripsi Masalah <span className="text-red-500">*</span>
            </Label>
            <TextArea placeholder="Jelaskan detail masalah yang Anda alami..." rows={14} />
            <FieldError>{fieldState.error?.message}</FieldError>
          </TextField>
        )}
      />

      <div className="mt-auto flex justify-end gap-3">
        <Button variant="secondary" onPress={onCancel} isDisabled={isSubmitting}>
          Batal
        </Button>
        <Button type="submit" variant="primary" isPending={isSubmitting}>
          <Send size={16} />
          Kirim Tiket
        </Button>
      </div>
    </div>
  )
}

export default TicketDescription