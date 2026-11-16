const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

export const formatDate = (iso: string) => dateFormatter.format(new Date(iso))
export const formatTime = (iso: string) => timeFormatter.format(new Date(iso))
export const formatDateTime = (iso: string) => `${formatDate(iso)}, ${formatTime(iso)}`