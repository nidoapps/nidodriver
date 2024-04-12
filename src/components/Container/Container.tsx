import React from 'react';
import {ContainerWrapper, ContainerWrapperProps} from './styles';

interface ContainerProps extends ContainerWrapperProps {
  children: React.ReactNode;
}

const Container = ({children, ...props}: ContainerProps) => {
  return <ContainerWrapper {...props}>{children}</ContainerWrapper>;
};

export default Container;
