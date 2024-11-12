import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import * as actions from '../../store/modules/auth/actions';
import { Container } from '../../styles/GlobalStyles';
import Loading from '../../components/Loading';
import { Form, Title } from './styled';
import axios from '../../services/axios';
import history from '../../services/history';

export default function Fotos({ match }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [foto, setFoto] = useState('');
  const id = get(match, 'params.id', '');

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        const Foto = get(data, 'Fotos[0].url', '');

        setFoto(Foto);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        toast.error('Erro ao obter imagem');
        history.push('/');
      }
    }

    getData();
  }, [id]);

  async function handleChange(e) {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setFoto(fileUrl);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', file);

    try {
      setIsLoading(true);

      await axios.post('/fotos/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Foto enviada com sucesso!');
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      const status = get(err, 'response.status', 0);
      toast.error('Erro ao enviar foto!');

      if (status === 401) dispatch(actions.loginFailure());
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>Fotos</Title>

      <Form>
        <label htmlFor="foto">
          {foto ? <img crossOrigin="" src={foto} alt="Foto" /> : 'Selecionar'}
          <input
            id="foto"
            type="file"
            onChange={handleChange}
            placeholder="Seu nome"
          />
        </label>
      </Form>
    </Container>
  );
}

Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
