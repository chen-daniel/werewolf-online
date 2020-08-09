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
    font-size: 2.5rem;
    margin: 0;
    padding: 0;
    line-height: 1;
  }

  ${(props) => props.me &&
    css`
    height: 27rem;
    width: 17rem;
   border: 5px solid deeppink;
  `}
  ${(props) => props.deck &&
    css`
    height: 9rem;
    width: 6rem;
    border: 5px solid darkcyan;
  `}
  ${(props) => props.player &&
    css`
    border: 5px solid purple;
    height: 12rem;
    width: 8rem;
  `}
  ${(props) => props.werewolf && props.role === "werewolf" ?  css` 
    border: 10px solid black;
  `
  : null
  }
`

const Card = ({me, deck, player, role, werewolf, name}) => {

  return (
    <CardStyle me={me} player={player} deck={deck} name={name} role={role} werewolf={werewolf}>
      <h1>{name ? name.toUpperCase() : "X"}</h1>
    </CardStyle>
  )
}

export default Card;