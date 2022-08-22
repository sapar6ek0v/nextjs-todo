import styled from 'styled-components'
import { colors } from '../../constants'

export const StyledInput = styled.input`
  background-color: ${colors.darkBlue};
  color: white;
  padding: 10px 10px 10px 20px;
  font-size: 17px;
  border: none;
  border-radius: 17px 0 0 17px;
  width: 500px;
  transition: background-color 200ms ease-in-out;
  &::placeholder {
    color: ${colors.white};
    opacity: 0.7;
  }
  &:focus {
    outline: none;
  }
  &:hover {
    background: ${colors.inputHv};
    cursor: text;
  }
`

export const Button = styled.button`
  background: ${colors.btnBg};
  color: ${colors.white};
  padding: 10px;
  font-size: 17px;
  border: none;
  border-radius: 0 17px 17px 0;
  -webkit-transition: all 0.4s linear;
  transition: all 0.4s linear;
  font-style: italic;
  font-family: Georgia, 'Times New Roman', Times, serif;
  &:hover {
    background: ${colors.btnHv};
  }
  &:active {
    color: ${colors.btnAc};
  }
  &:disabled {
    background: ${colors.red};
    cursor: no-drop;
  }
`
