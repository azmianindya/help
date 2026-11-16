import { Pagination as HeroPagination } from '@heroui/react'

type PaginationProps = {
  page: number
  totalPages: number
  totalItems: number
  pageSize: number
  onPageChange: (page: number) => void
  itemLabel?: string
}

type PageItem = number | 'start-ellipsis' | 'end-ellipsis'

const getPageItems = (page: number, totalPages: number): PageItem[] => {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const items: PageItem[] = [1]

  if (page > 3) items.push('start-ellipsis')

  const start = Math.max(2, page - 1)
  const end = Math.min(totalPages - 1, page + 1)
  for (let current = start; current <= end; current++) {
    items.push(current)
  }

  if (page < totalPages - 2) items.push('end-ellipsis')

  items.push(totalPages)

  return items
}

const Pagination = ({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  itemLabel = 'data',
}: PaginationProps) => {
  if (totalItems === 0) return null

  const from = (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, totalItems)

  return (
    <HeroPagination>
      <HeroPagination.Summary>
        {from}-{to} dari {totalItems} {itemLabel}
      </HeroPagination.Summary>
      <HeroPagination.Content>
        <HeroPagination.Item>
          <HeroPagination.Previous isDisabled={page === 1} onPress={() => onPageChange(page - 1)}>
            <HeroPagination.PreviousIcon />
            <span>Prev</span>
          </HeroPagination.Previous>
        </HeroPagination.Item>

        {getPageItems(page, totalPages).map((item) =>
          typeof item === 'number' ? (
            <HeroPagination.Item key={item}>
              <HeroPagination.Link isActive={item === page} onPress={() => onPageChange(item)}>
                {item}
              </HeroPagination.Link>
            </HeroPagination.Item>
          ) : (
            <HeroPagination.Item key={item}>
              <HeroPagination.Ellipsis />
            </HeroPagination.Item>
          ),
        )}

        <HeroPagination.Item>
          <HeroPagination.Next
            isDisabled={page === totalPages}
            onPress={() => onPageChange(page + 1)}
          >
            <span>Next</span>
            <HeroPagination.NextIcon />
          </HeroPagination.Next>
        </HeroPagination.Item>
      </HeroPagination.Content>
    </HeroPagination>
  )
}

export default Pagination