import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderStyled = styled.div`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 25px;
    background-color: #fff;
    color: #00796b;

    ul{
        display: flex;
        align-items: center;
        gap: 20px;
        font-size: 18px;
        font-weight: 500;
        list-style: none;
        margin: 0;

        li{
          a{
            color: #00796b;
            text-decoration: none;
          }
        }
    }

    @media (max-width: 420px){
      padding: 15px;

      .logo{
        font-size: 20px;
      }

      ul{
        font-size: 15px;
        margin-top: 5px;
        gap: 15px;
      }
    }
`;


export default function Header() {
  return (
    <HeaderStyled className="shadow">
        <h3 className="m-0 logo">SkyAndScreen</h3>

        <ul>
            <li><Link to={'weather'}>Weather</Link></li>
            <li><Link to={'movie'}>Movie</Link></li>
        </ul>
    </HeaderStyled>
  )
}
