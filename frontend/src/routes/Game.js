import React from 'react'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'
import { HomeStyles } from '../components/HomeLayout'

const InputStyle = styled.input`
  margin-top: 1rem;
  width: 13rem;
  height: 3rem;
  border: 3px solid hotpink;
  border-radius: 7px;
  color: hotpink;
  font-size: 1rem;
  padding: 0 0.4rem;
`

const Game = ({match}) => {
  let mod = match.params.mod
  if (mod !== "join" && mod !== "create") {
    return <Redirect to="/" />
  }
    if (mod !== "join") {
      return (
      <HomeStyles>
        <h1 className="logo">Warewolf Online</h1>
          <InputStyle type="text" placeholder="Name"/>
          <InputStyle type="text" placeholder="Room id"/>
          <button className="small">Join</button>
      </HomeStyles>
    )
  }
  if (mod !== "create") {
    return (
      <HomeStyles >
          <h1 className="logo">Warewolf Online</h1>
          <InputStyle type="text" placeholder="Name"/>
          <button className="small">Create</button>
      </HomeStyles>
    )
  }
  
}

export default Game;