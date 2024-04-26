import styled from 'styled-components/native'

export interface ContainerWrapperProps {
  padding?: string
  margin?: string
  backgroundColor?: string
  borderRadius?: string
  width?: string
  height?: string
  display?: string
  flexDirection?: string
  justifyContent?: string
  alignItems?: string
  border?: string
  shadow?: string
  media?: {
    large?: string
    xlarge?: string
  }
  flex?: string
}
export const ContainerWrapper = styled.View<ContainerWrapperProps>`
  padding: ${(props) => (props?.padding && `${props.padding}`) || 0}px;
  margin: ${(props) => props.margin || 0};
  background-color: ${(props) => props.backgroundColor || 'transparent'};
  border-radius: ${(props) => props.borderRadius || 0};
  width: ${(props) => props.width && `${props.width}`};
  height: ${(props) => props.height && `${props.height}`};
  display: ${(props) => props.display || 'flex'};
  flex-direction: ${(props) => props.flexDirection || 'column'};
  justify-content: ${(props) => props.justifyContent || 'flex-start'};
  align-items: ${(props) => props.alignItems || 'flex-start'};
  border: ${(props) => props.border || 'none'};
  flex: ${(props) => props.flex || 'none'};
`
