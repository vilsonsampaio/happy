import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import { MapMarker } from '../../assets/images';

import { Container } from './styles';

const Sidebar: React.FC = () => {
  const { goBack } = useHistory();

  return (
    <Container>
      <Link to="/">
        <MapMarker />
      </Link>

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft />
        </button>
      </footer>
    </Container>
  );
};

export default Sidebar;
