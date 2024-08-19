import React from 'react'
import styled, { css } from 'styled-components'

export interface ErrorProps {
  width?: string
  height?: string
  content?: string | React.ReactNode
}

const Error = ({ width = '100%', height = '400px', content = 'Error' }: ErrorProps) => {
  return (
    <SError width={width} height={height}>
      {content}
    </SError>
  )
}

const SError = styled.div<ErrorProps>`
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

export default Error
