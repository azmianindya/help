import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { toast } from '@heroui/react'
import { ArrowLeft } from 'lucide-react'
import { NavButton } from '@/components/Button'
import TicketDescription from '@/components/tickets/TicketDescription'
import TicketInfoFields from '@/components/tickets/TicketInfoFields'
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from '@/features/tickets/data'
import { useAuthStore } from '@/lib/auth-store'
import { createTicketSchema } from '@/lib/schemas'
import type { CreateTicketFormValues } from '@/lib/schemas'
import { useTicketStore } from '@/lib/ticket-store'
import { createTicket } from '@/lib/tickets'

const Create = () => {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const addTicket = useTicketStore((state) => state.addTicket)

  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState('')

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<CreateTicketFormValues>({
    resolver: zodResolver(createTicketSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'High',
    },
  })

  const handleFileSelect = (selected: File | null) => {
    if (!selected) {
      setFile(null)
      setFileError('')
      return
    }

    if (!ACCEPTED_FILE_TYPES.includes(selected.type)) {
      setFileError('Format file harus JPG, PNG, atau PDF')
      return
    }

    if (selected.size > MAX_FILE_SIZE) {
      setFileError('Ukuran file maksimal 5MB')
      return
    }

    setFile(selected)
    setFileError('')
  }

  const onSubmit = async (values: CreateTicketFormValues) => {
    try {
      // Lampiran belum dikirim ke mana pun karena DummyJSON tidak punya endpoint upload.
      const ticket = await createTicket(values, user?.id ?? 1)
      addTicket(ticket)
      toast.success('Tiket berhasil dibuat')
      await navigate({ to: '/tickets/$ticketId', params: { ticketId: String(ticket.id) } })
    } catch {
      toast.danger('Gagal membuat tiket, coba lagi')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <NavButton to="/tickets" variant="text" icon={ArrowLeft}>
          Kembali
        </NavButton>
        <div>
          <div className="text-2xl font-bold text-slate-900">Buat Tiket Baru</div>
          <div className="text-sm text-slate-500">
            Sampaikan masalah atau permintaan bantuan Anda
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <TicketInfoFields
            control={control}
            file={file}
            fileError={fileError}
            onFileSelect={handleFileSelect}
          />
        </div>
        <div className="lg:col-span-3">
          <TicketDescription
            control={control}
            isSubmitting={isSubmitting}
            onCancel={() => navigate({ to: '/tickets' })}
          />
        </div>
      </div>
    </form>
  )
}

export default Create