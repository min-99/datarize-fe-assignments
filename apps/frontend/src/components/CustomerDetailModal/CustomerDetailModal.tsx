import styled from 'styled-components'
import { formatNumberWithCommas } from '../../utill'
import Modal, { ModalProps } from '../Modal'
import useCustomerDetailModal, { CustomerDetailResponse, CustomerPurchase } from './useCustomerDetailModal'
import { Loading, NoData, Error } from '../'
import { SWRResponse } from '../../type'
import ShopItem from './ShopItem'

export interface CustomerDetailModalProps extends Omit<ModalProps, 'children'> {
  id: number
  name: string
  count: number // 총 구매 횟수
  totalAmount: number // 총 구매 금액
}

const CustomerDetailModal = ({
  id,
  name,
  count,
  totalAmount,
  isOpen,
  handleClose: onClose,
}: CustomerDetailModalProps) => {
  const { isLoading, data, error } = useCustomerDetailModal(id)

  return (
    <Modal isOpen={isOpen} handleClose={onClose}>
      <SCustomerDetailModal>
        <h3>[{name} 고객님]</h3>
        <br />
        <div>총 구매 횟수: {formatNumberWithCommas(count)}회</div>
        <div>총 구매 금액: {formatNumberWithCommas(totalAmount)}원</div>
        <Content isLoading={isLoading} data={data} error={error} />
      </SCustomerDetailModal>
    </Modal>
  )
}

// ------- 내부 Modal 컴포넌트 start -------
interface ContentProps extends SWRResponse<CustomerDetailResponse> {}

const Content = ({ isLoading, data, error }: ContentProps) => {
  if (isLoading) return <Loading />
  if (!data || data?.length === 0) return <NoData />
  if (error) return <Error content={`Error Message : ${error}`} />
  return (
    <>
      {data?.map((item: CustomerPurchase) => (
        <ShopItem key={item.date} {...item} />
      ))}
    </>
  )
}
// ------- 내부 Modal 컴포넌트 end -------

const SCustomerDetailModal = styled.div`
  padding: 20px;
  width: 400px;

  div + div {
    margin-top: 10px;
  }
`

export default CustomerDetailModal
