import React from 'react';

import { Container, Title } from './styles';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
  return (
    <Container>
      <Title>{ title }</Title>
    </Container>
  );
};

export default PageHeader;
