import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const TemplateStyled = styled.div`
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  background-color: #e0f7fa;

  footer{
    width: 100%;
    align-items: center;
    
    p{
      position: absolute;
      bottom: 0;
      left: 43%;
      font-size: 14px;

      @media (max-width: 420px){
        left: 18%;
        font-size: 12px;
      }
    }
  }
`;

export default function Template() {
  return (
    <TemplateStyled>
        <section>
            <header>
                <Header/>
            </header>

            <main>
                <Outlet/>
            </main>

            <footer>
              <p>&copy; 2024 Weather App. All rights reserved.</p>
            </footer>
        </section>
    </TemplateStyled>
  )
}
