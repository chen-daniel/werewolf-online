import React from 'react'
import styled, { css } from 'styled-components'
import back from '../assets/Back.jpg'
import werecat from '../assets/werecat.jpg'
import insomnicat from '../assets/insomnicat.jpg'
import seer from '../assets/seer.jpg'
import drunk from '../assets/drunk.jpg'
import minion from '../assets/minion.jpg'
import catBurglar from '../assets/cat-burglar.jpg'
import siameseTwin from '../assets/siamese-twin.jpg'
import troublemaker from '../assets/troublemaker.jpg'
import villager from '../assets/villager.jpg'


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
    font-size: 1.4rem;
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

    /*  BG-Images  */
  ${({role}) => !role ? 
    css`
      background: url(${back}) no-repeat center center/cover;
    ` : role === "werecat" && css`
      background: url(${werecat}) no-repeat center center/cover;
    `
  } 
  ${({role}) => role === "insomnicat" ? 
    css`
      background: url(${insomnicat}) no-repeat center center/cover;
    ` : role === "seer" && css`
      background: url(${seer}) no-repeat center center/cover;
    `
  } 
  ${({role}) => role === "drunk" ? 
    css`
      background: url(${drunk}) no-repeat center center/cover;
    ` : role === "minion" && css`
      background: url(${minion}) no-repeat center center/cover;
    `
  } 
  ${({role}) => role === "cat burglar" ? 
    css`
      background: url(${catBurglar}) no-repeat center center/cover;
    ` : role === "siamese twin" && css`
      background: url(${siameseTwin}) no-repeat center center/cover;
    `
  } 
  ${({role}) => role === "troublemaker" ?
    css`
      background: url(${troublemaker}) no-repeat center center/cover;
    ` : role === "villager" && css`
      background: url(${villager}) no-repeat center center/cover;
    ` 
  } 
  /* End BG-Images  */
`

const Card = ({me, deck, player, role, onClick, selected }) => {

  return (
    <CardStyle me={me} player={player} deck={deck} onClick={onClick} role={role} selected={selected}>
      {/* <h1>{role ? role.toUpperCase() : "X"}</h1> */}
      <></>
    </CardStyle>
  )
}

export default Card;

  // 'werecat', X
  // 'minion',
  // 'siamese twin',
  // 'seer', X
  // 'cat burglar', X
  // 'troublemaker',
  // 'drunk',
  // 'insomnicat', X