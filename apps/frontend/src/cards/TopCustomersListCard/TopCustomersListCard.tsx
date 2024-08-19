import styled from 'styled-components'
import useTopCustomersListCard, { ColumnType, TopCustomersListResponse, sortByLabel } from './useTopCustomersListCard'
import { ASC, Customer, DESC, SWRResponse } from '../../type'
import CustomerDetailModal from '../../components/CustomerDetailModal'
import { NoData, Loading, Error, Table } from '../../components'
import { Row } from '@tanstack/react-table'

const TopCustomersListCard = () => {
  const {
    isLoading,
    modal,
    data,
    columns,
    name,
    sortBy,
    handleChangeSortBy,
    handleChangeName,
    handleClickRow,
    handleCloseModal,
  } = useTopCustomersListCard()

  return (
    <STopCustomersListBox className="card_container">
      <h3>[가장 많이 구매한 고객 목록]</h3>
      {/* -------- 검색 부분 start -------- */}
      <SSearchBox>
        <div>
          총 구매금액 별 :
          <label key={ASC}>
            <input type="radio" name="sortBy" value={ASC} checked={sortBy === ASC} onChange={handleChangeSortBy} />
            {sortByLabel[ASC]}
          </label>
          <label key={DESC}>
            <input type="radio" name="sortBy" value={DESC} checked={sortBy === DESC} onChange={handleChangeSortBy} />
            {sortByLabel[DESC]}
          </label>
        </div>
        <div>
          이름 검색:
          <input type="text" onChange={handleChangeName} value={name} />
        </div>
      </SSearchBox>
      {/* -------- 검색 부분 end -------- */}
      <div>
        <CustomerList
          isLoading={isLoading}
          data={data}
          error={null}
          columns={columns}
          handleClickRow={handleClickRow}
        />
      </div>
      {modal.customer.id && modal.customer.name && modal.customer.count && modal.customer.totalAmount && (
        <CustomerDetailModal
          isOpen={modal.isOpen}
          handleClose={handleCloseModal}
          id={modal.customer.id}
          name={modal.customer.name}
          count={modal.customer.count}
          totalAmount={modal.customer.totalAmount}
        />
      )}
    </STopCustomersListBox>
  )
}

{
  /* -------- 내부 고객 리스트 컴포넌트 start -------- */
}
interface CustomerListProps extends SWRResponse<TopCustomersListResponse> {
  columns: ColumnType
  handleClickRow: (row: Row<Customer>, e: React.MouseEvent<HTMLTableRowElement>) => void
}

const CustomerList = ({ isLoading, data, error, columns, handleClickRow }: CustomerListProps) => {
  if (isLoading) return <Loading />
  if (!data || data?.length === 0) return <NoData />
  if (error) return <Error content={`Error Message : ${error}`} />
  return <>{data && data.length > 0 && <Table data={data} columns={columns} onRowClick={handleClickRow} />}</>
}
{
  /* -------- 내부 고객 리스트 컴포넌트 end -------- */
}

const STopCustomersListBox = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #d3d3d3;
  padding: 10px 25px;
  min-height: 600px;

  .dashboard-chart {
    margin-top: 20px;
  }
`

const SSearchBox = styled.div`
  padding-bottom: 25px;

  div + div {
    margin-top: 10px;
  }
`

export default TopCustomersListCard
