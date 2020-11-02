import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { DeleteIllustration } from '../../assets/images';

import { Container, Wrapper, Content, BackToDashboard } from './styles';

interface DeleteOrphanageParams {
  id: string;
}

const DeleteOrphanage: React.FC = () => {
  const params = useParams<DeleteOrphanageParams>();
  const history = useHistory();

  const [id, setId] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    const id = Number(params.id);

    const { search } = window.location;
    const queryParams = new URLSearchParams(search);

    const name = queryParams.get('name');

    if (!id) {
      toast.error('ID não informado!');

      history.push('/dashboard');

      return;
    }

    setId(id);

    if (name) {
      setName(name);
    }

  }, [params, history]);

  function handleClick() {
  }

  return (
    <Container>
      <Wrapper className="container">
        <Content>
          <h1>Excluir!</h1>
          <p>
            Você tem certeza que quer <br/>
            excluir {`${name ? name : 'o orfanato'}`}?
          </p>

          <div>
            <BackToDashboard as="button" onClick={handleClick} type="button">
              Excluir
            </BackToDashboard>
            
            <BackToDashboard to="/dashboard">
              Voltar para dashboard
            </BackToDashboard>
          </div>
        </Content>

        <DeleteIllustration />
      </Wrapper>
    </Container>
  );
};

export default DeleteOrphanage;
