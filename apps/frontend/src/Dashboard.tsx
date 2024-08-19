import styled from 'styled-components'
import { PurchaseFrequencyByPriceChartCard, TopCustomersListCard } from './cards'

const Dashboard = () => {
  return (
    <SDashboardBox>
      <h2>Datarize Frontend 대시보드(과제)</h2>
      <PurchaseFrequencyByPriceChartCard />
      <TopCustomersListCard />
    </SDashboardBox>
  )
}

const SDashboardBox = styled.div`
  height: 100%;
  margin: 15px 40px;

  /* Card 간격 조정 */
  .card_container + .card_container {
    margin-top: 50px;
  }
`

export default Dashboard
