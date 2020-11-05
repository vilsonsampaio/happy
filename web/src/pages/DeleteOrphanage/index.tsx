import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { DeleteIllustration } from '../../assets/images';

import api from '../../services/api';

import { Container, Wrapper, Content, BackToDashboard } from './styles';

interface DeleteOrphanageParams {
  id: string;
}

const DeleteOrphanage: React.FC = () => {
  const params = useParams<DeleteOrphanageParams>();
  const history = useHistory();

  const [id, setId] = useState(0);
  const [name, setName] = useState('');

  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    api
      .delete(`orphanages/${id}`)
      .then(response => {
        toast.success('Orfanato excluído com sucesso!');
      })
      .catch(error => {
        console.error(error);

        if (error.response) {
          console.error(error.response.data.message);
        }

        toast.error('Ocorreu um erro ao deletar o orfanato');
      })
    ;
    
    setLoading(false);
    
    history.push('/dashboard');
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
              { loading ? 'Excluindo...' : 'Excluir' }
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
