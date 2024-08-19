import styled from 'styled-components'
import { formatNumberWithCommas } from '../../utill'
import { CustomerPurchase } from './useCustomerDetailModal'

const ShopItem = ({ date, imgSrc, price, product, quantity }: CustomerPurchase) => {
  return (
    <SShopItem>
      <img src={imgSrc} alt={product} />
      <div>
        <div>{product}</div>
        <div>{formatNumberWithCommas(price)}원</div>
        <div>수량: {quantity}</div>
        <div>구매일: {date}</div>
      </div>
    </SShopItem>
  )
}

const SShopItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  img {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
`

export default ShopItem
