import React from 'react'
import styled, {css} from 'styled-components'

const CardStyle = styled.div`
  height: 12rem;
  width: 9rem;
  background: pink;
  border-radius: 13px;
  box-shadow: 0 0.2rem 1rem rgba(0, 0, 0, 0.15);
  display: flex;
  color: #fff;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 7rem;
    margin: 0;
    padding: 0;
    line-height: 1;
  }

  ${(props) => props.me &&
    css`
    height: 35rem;
    width: 21rem;
   border: 5px solid deeppink;
  `}
  ${(props) => props.deck &&
    css`
    height: 11rem;
    width: 8rem;
    border: 5px solid darkcyan;
  `}
  ${(props) => props.player &&
    css`
    border: 5px solid purple;
    height: 17rem;
    width: 11rem;
  `}
`

const Card = ({me, deck, player}) => {

  return (
    <CardStyle me={me} player={player} deck={deck}>
    <h1>X</h1>
    </CardStyle>
  )
}

export default Card;