import axios from 'axios'
import useSWR from 'swr'
import { useCallback, useState } from 'react'
import queryString from 'query-string'
import { Customer, ASC, DESC, SortBy } from '../../type'
import { createColumnHelper, Row } from '@tanstack/react-table'
import { formatNumberWithCommas } from '../../utill'

//  ---------- 타입 명시 부분 start ----------
export type TopCustomersListResponse = Customer[]
export type ColumnType = typeof columns
//  ---------- 타입 명시 부분 end ----------

//  ---------- table columns 정의 start ----------
const columnHelper = createColumnHelper<Customer>()

const columns = [
  columnHelper.accessor('id', {
    header: () => <div className="text_left">고객 ID</div>,
    cell: (info) => <div className="text_left">{info.getValue()}</div>,
  }),
  columnHelper.accessor('name', {
    header: () => <div className="text_center">이름</div>,
    cell: (info) => <div className="text_center">{info.getValue()}</div>,
  }),
  columnHelper.accessor('count', {
    header: () => <div className="text_right">총 구매 횟수</div>,
    cell: (info) => <div className="text_right">{formatNumberWithCommas(Number(info.getValue()))}</div>,
  }),
  columnHelper.accessor('totalAmount', {
    header: () => <div className="text_right">총 구매 금액</div>,
    cell: (info) => <div className="text_right">{formatNumberWithCommas(Number(info.getValue()))}</div>,
  }),
]
//  ---------- table columns 정의 end ----------

export const sortByLabel = {
  [ASC]: '오름차순',
  [DESC]: '내림차순',
}

const useTopCustomersListCard = () => {
  const [sortBy, setSortBy] = useState<SortBy>()
  const [name, setName] = useState<string>()
  const [modal, setModal] = useState<{ isOpen: boolean; customer: Partial<Customer> }>({
    isOpen: false,
    customer: {},
  })

  // API 호출
  const { isLoading, data, error } = useSWR<TopCustomersListResponse>(
    `http://localhost:4000/api/customers?${queryString.stringify({
      sortBy,
      name,
    })}`,
    (url: string) => axios.get(url).then((res) => res.data),
  )

  if (error) console.error(error)

  // event handler 정의
  const handleChangeSortBy = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSortBy(value as SortBy)
  }, [])

  const handleChangeName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setName(value)
  }, [])

  const handleClickRow = useCallback((row: Row<Customer>) => {
    if (row.original.id)
      setModal({
        isOpen: true,
        customer: {
          ...row.original,
        },
      })
  }, [])

  const handleCloseModal = useCallback(() => {
    setModal({
      isOpen: false,
      customer: {},
    })
  }, [])

  return {
    isLoading,
    modal,
    sortBy,
    name,
    data,
    columns,
    handleChangeSortBy,
    handleChangeName,
    handleClickRow,
    handleCloseModal,
  }
}

export default useTopCustomersListCard
