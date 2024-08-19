import styled from 'styled-components'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import DatePicker from 'react-datepicker'
import { Error, Loading } from '../../components'
import usePurchaseFrequencyByPriceChartCard, {
  PurchaseFrequencyResponse,
  rangeLabel,
} from './usePurchaseFrequencyByPriceChartCard'
import { SWRResponse } from '../../type'

const PurchaseFrequencyByPriceChartCard = () => {
  const { isLoading, data, error, from, to, handleChangeFrom, handleChangeTo } = usePurchaseFrequencyByPriceChartCard()

  return (
    <SPurchaseFrequencyByPriceChartBox className="card_container">
      <h3>[가격대별 구매 빈도 차트]</h3>
      {/* -------- 검색 부분 start -------- */}
      <div>
        날짜 선택:&nbsp;
        <DatePicker
          selected={from}
          name="from"
          onChange={handleChangeFrom}
          selectsStart
          startDate={from}
          endDate={to}
        />
        &nbsp;&nbsp;~&nbsp;&nbsp;
        <DatePicker
          selected={to}
          name="to"
          onChange={handleChangeTo}
          selectsEnd
          startDate={from}
          endDate={to}
          minDate={from}
        />
      </div>
      {/* -------- 검색 부분 end -------- */}
      {/* -------- 차트  -------- */}
      <Chart isLoading={isLoading} data={data} error={error} />
    </SPurchaseFrequencyByPriceChartBox>
  )
}

// ----------- 내부 Chart 컴포넌트 start -----------
interface ChartProps extends SWRResponse<PurchaseFrequencyResponse> {}

const Chart = ({ isLoading, data, error }: ChartProps) => {
  if (isLoading) return <Loading />
  if (error) return <Error content={`Error Message : ${error}`} />
  return (
    <>
      {Number(data?.length) > 0 && (
        <div className="dashboard-chart">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <XAxis
                dataKey={({ range = '' }) => {
                  return rangeLabel[range]
                }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  )
}
// ----------- 내부 Chart 컴포넌트 end -----------

const SPurchaseFrequencyByPriceChartBox = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #d3d3d3;
  padding: 10px 25px;

  .dashboard-chart {
    margin-top: 20px;
  }
`

export default PurchaseFrequencyByPriceChartCard
