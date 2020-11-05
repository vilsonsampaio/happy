import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

interface SidebarButtonProps {
  isActive?: boolean;
}

export const Container = styled.div`
  ${({ theme }) => css`
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    max-width: 100vw;
    min-height: 100vh;

    background: ${theme.colors.backgroundDefault};

    @media (max-width: 768px) {
      ${Cards} {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 500px) {
      ${Siderbar} {
        max-width: initial;
        width: 100vw;
        height: 9.6rem;
        flex-direction: row;

        > div {  
          display: flex;
        }
      }

      ${SidebarButton}:first-child {
        margin-bottom: 0;
        margin-right: 1.6rem;
      }

      ${Main} {
        margin-left: 0;
        margin-top: 9.6rem;
      }
    }
  `}
`;

export const Siderbar = styled.aside`
  ${({ theme }) => css`
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    max-width: 9.6rem;
    height: 100%;

    padding: 3.2rem 2.4rem;

    background: ${theme.colors.primaryGradient};

    z-index: 999;

    > a > svg {
      width: 4.8rem;
      height: auto;
    }
  `}
`;

export const SidebarButton = styled.button<SidebarButtonProps>`
  ${({ theme, isActive }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 4.8rem;
    height: 4.8rem;

    background: ${ isActive ? theme.colors.secondary : theme.colors.primaryDark };
    color: ${ isActive ? theme.colors.textTitleSecondary : theme.colors.textInButton };

    border: none;
    border-radius: ${theme.radius.medium};

    outline: none;

    transition: ease-in-out 0.2s;

    cursor: pointer;

    :hover {
      background: ${ isActive ? theme.colors.secondary : theme.colors.primarySaturated};

      &:nth-child(2) svg g circle {
        stroke: ${theme.colors.primarySaturated};
      }
    }

    &:first-child {
      margin-bottom: 1.6rem;
    }

    > svg {
      width: 2.4rem;
      height: auto;
    }
  `}
`;

export const Main = styled.main`
  ${({ theme }) => css`
    flex: 1;

    display: flex;
    align-items: flex-start;
    justify-content: center;

    max-width: 112rem;
    min-height: 100vh;
    
    margin-left: 9.6rem;
`}
`;

export const MainWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;

    width: 85%;
    min-height: 100vh;

    padding: 6.4rem 0;

    > header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      padding-bottom: 2.4rem;

      border-bottom: solid 0.1rem ${theme.colors.backgroundLineInWhite};
      
      h1 {
        color: ${theme.colors.textTitle};

        font-weight: 700;
        font-size: 3.2rem;
        line-height: 3.4rem;
      }

      span {
        color: ${theme.colors.textComplementary};

        font-size: 1.6rem;
        line-height: auto;
      }
    }
  `}
`;

export const Cards = styled.main`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3.2rem;

    margin-top: 4rem;
  `}
`;

export const Card = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.shapesPrimary};

    border: solid 0.1rem ${theme.colors.backgroundLineInWhite};
    border-radius: ${theme.radius.default};

    overflow: hidden;

    .leaflet-container {
      width: 100%;
      height: 22rem;

      border-radius: ${theme.radius.default};
      border-bottom: solid 0.1rem ${theme.colors.backgroundLineInWhite};

      overflow: hidden;
    }

    > footer {
      display: flex;
      align-items: center;
      justify-content: space-between;

      padding: 1.6rem 3.2rem;
      
      > h2 {
        color: ${theme.colors.textTitle};

        font-weight: 700;
        font-size: 2.4rem;
        line-height: 3.4rem;
      }

      > div {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  `}
`;

export const CardButton = styled(Link)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 4.8rem;
    height: 4.8rem;

    background: ${theme.colors.backgroundDefault};
    
    border: none;
    border-radius: ${theme.radius.medium};

    transition: ease-in-out 0.3s;
    
    &:hover {
      background: ${theme.colors.inputs};
    }
    
    & + & {
      margin-left: 0.8rem;  
    }

    > svg {
      width: 2rem;
      height: auto;

      color: ${theme.colors.primary};
    }
  `}
`;

export const NoOrphanages = styled.div`
  ${({ theme }) => css`
    flex: 1;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > svg {
      width: 7rem;
      height: auto;
    }

    > p {
      margin-top: 1.6rem;

      color: ${theme.colors.textComplementary};

      font-size: 2.4rem;
      line-height: 3.4rem;
    }
  `}
`;