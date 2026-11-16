import { Avatar } from '@heroui/react'
import { formatDateTime } from '@/lib/format'
import type { TicketComment } from '@/lib/types'

type TicketCommentsProps = {
  requesterName: string
  requesterImage?: string
  description: string
  createdAt: string
  comments: TicketComment[]
}

type MessageProps = {
  name: string
  image?: string
  date: string
  body: string
}

const Message = ({ name, image, date, body }: MessageProps) => {
  return (
    <div className="flex gap-3">
      <Avatar size="sm">
        <Avatar.Image src={image} alt={name} />
        <Avatar.Fallback>{name.slice(0, 1).toUpperCase()}</Avatar.Fallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-slate-900">{name}</div>
        <div className="text-xs text-slate-400">{date}</div>
        <div className="mt-1 text-sm text-slate-700">{body}</div>
      </div>
    </div>
  )
}

const TicketComments = ({
  requesterName,
  requesterImage,
  description,
  createdAt,
  comments,
}: TicketCommentsProps) => {
  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-sm">
      <Message
        name={requesterName}
        image={requesterImage}
        date={formatDateTime(createdAt)}
        body={description}
      />

      {comments.map((comment) => (
        <Message
          key={comment.id}
          name={comment.author.fullName}
          date={formatDateTime(comment.createdAt)}
          body={comment.body}
        />
      ))}
    </div>
  )
}

export default TicketComments