import axios from 'axios'
import useSWR from 'swr'

//  ---------- 타입 명시 부분 start ----------
export type CustomerDetailResponse = CustomerPurchase[]

export interface CustomerPurchase {
  date: string
  imgSrc: string
  price: number
  product: string
  quantity: number
}
//  ---------- 타입 명시 부분 end ----------

const useCustomerDetailModal = (id: number) => {
  const { isLoading, data, error } = useSWR<CustomerDetailResponse>(
    `http://localhost:4000/api/customers/${id}/purchases`,
    (url: string) => axios.get(url).then((res) => res.data),
  )

  if (error) console.error(error)

  return { isLoading, data, error }
}

export default useCustomerDetailModal
