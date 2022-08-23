import styled from 'styled-components'
import { colors } from '../../constants'

export const StyledListCard = styled.div`
  background: ${colors.darkBlue};
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: 18px;
  border-radius: 30px;
  transition: background-color 200ms ease-in-out;
  width: 500px;
  padding: 10px 19px;
  margin: 0 auto 20px;
  color: ${colors.white};
  height: 55px;
`

export const ListItem = styled.div`
  font-size: 20px;
  flex: 1;
  color: ${colors.white};
  word-break: break-all;
`

export const UpdateInput = styled.input`
  color: ${colors.white};
  flex: 1;
  background: transparent;
  border: 1px solid ${colors.grey};
  border-radius: 30px;
  padding: 0 0 5px 13px;
  transition: all 0.4s linear;
  &:focus {
    outline: none;
  }
`

export const Button = styled.button`
  color: ${(props) => props.color};
  font-size: 19px;
  cursor: pointer;
  margin: 0 5px;
  border: none;
  outline: none;
`
