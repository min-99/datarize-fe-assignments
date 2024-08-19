import React from 'react'
import styled, { css } from 'styled-components'

export interface NoDataProps {
  width?: string
  height?: string
  content?: string | React.ReactNode
}

const NoData = ({ width = '100%', height = '400px', content = 'No Data' }: NoDataProps) => {
  return (
    <SNoData width={width} height={height}>
      {content}
    </SNoData>
  )
}

const SNoData = styled.div<NoDataProps>`
  ${(props) => css`
    width: ${props.width};
    height: ${props.height};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #d3d3d3;
  `}
`

export default NoData
