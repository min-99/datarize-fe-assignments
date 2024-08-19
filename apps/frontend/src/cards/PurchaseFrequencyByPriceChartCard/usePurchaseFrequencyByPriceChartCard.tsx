import axios from 'axios'
import useSWR from 'swr'
import { useCallback, useState } from 'react'
import queryString from 'query-string'

//  ---------- 타입 명시 부분 start ----------
export type PurchaseFrequencyResponse = PurchaseFrequency[]

export interface PurchaseFrequency {
  range: string
  count: string
}
//  ---------- 타입 명시 부분 end ----------

export const rangeLabel: { [key: string]: string } = {
  '0 - 20000': '2만원 이하',
  '20001 - 30000': '3만원 이하',
  '30001 - 40000': '4만원 이하',
  '40001 - 50000': '5만원 이하',
  '50001 - 60000': '6만원 이하',
  '60001 - 70000': '7만원 이하',
  '70001 - 80000': '8만원 이하',
  '80001 - 90000': '9만원 이하',
  '90001 - 100000': '10만원 이하',
}

const usePurchaseFrequencyByPriceChartCard = () => {
  const [from, setFrom] = useState<Date>()
  const [to, setTo] = useState<Date>()

  // API 호출
  const { isLoading, data, error } = useSWR<PurchaseFrequencyResponse>(
    `http://localhost:4000/api/purchase-frequency?${queryString.stringify({
      from: to && from?.toISOString().split('T')[0],
      to: from && to?.toISOString().split('T')[0],
    })}`,
    (url: string) => axios.get(url).then((res) => res.data),
  )

  if (error) console.error(error)

  // event handler 정의
  const handleChangeFrom = useCallback((date: Date | null) => {
    if (date) setFrom(date)
  }, [])

  const handleChangeTo = useCallback((date: Date | null) => {
    if (date) setTo(date)
  }, [])

  return { isLoading, error, from, to, data, handleChangeFrom, handleChangeTo }
}

export default usePurchaseFrequencyByPriceChartCard
