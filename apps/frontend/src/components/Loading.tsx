import React from 'react'
import styled, { css } from 'styled-components'

export interface LoadingProps {
  width?: string
  height?: string
  content?: string | React.ReactNode
}

const Loading = ({ width = '100%', height = '400px', content = 'Loading...' }: LoadingProps) => {
  return (
    <SLoading width={width} height={height}>
      {content}
    </SLoading>
  )
}

const SLoading = styled.div<LoadingProps>`
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

export default Loading
