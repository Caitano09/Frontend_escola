import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  label {
    width: 180px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #eee;
    border: 5px dashed ${colors.primaryColor};
    margin: 30px auto;
    cursor: pointer;
    border-radius: 50%;
    overflow: hidden;
  }

  input {
    display: none;
  }

  img {
    width: 180px;
    height: 180px;
  }
`;

export const Title = styled.h1`
  text-align: center;
`;
