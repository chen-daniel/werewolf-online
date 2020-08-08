import React from "react";
import styled from "styled-components";
import { Link  } from "react-router-dom";

export const HomeStyles = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
  height: 100vh;
  color: hotpink;
  h2 {
    font-size: 2rem;
    margin: 0 0 1rem 0;
    font-weight:500;
  }
  .logo {
    margin: 0 0 0.5rem 0;
    font-size: 4rem;
  }
  button {
    font-size: 1.5rem;
    background: none;
    border: 4px solid hotpink;
    border-radius: 10px;
    width: 15rem;
    height: 4rem;
    margin-top: 2rem;
    font-weight: 600;
    color: hotpink;
    cursor: pointer;

  }
    .small {
    height: 3rem;
    width: 8rem;
    }

    a {
      margin: 0;
      height: auto;
    }
`;

const HomeLayout = () => {
  return (
    <HomeStyles>
      <h1 className="logo">Warewolf Online</h1>
      <Link to="/Game/create">
        <button>
          Create Room
        </button>
      </Link>
      
      <Link to="/Game/join" >
        <button>
        Join Room
        </button>
      </Link>
    </HomeStyles>
  );
};

export default HomeLayout;
