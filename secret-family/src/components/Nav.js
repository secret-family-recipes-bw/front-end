import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 0 1%;
    background: #420D09;
`;
const LogoText = styled.h1`
    font-family: 'Montez';
    color: #D4A59A;
    font-size: 3rem;
    margin: 0.3%;
`;
const NavLinks = styled.div`
    display: flex;
    width: 18%;
    justify-content: space-between;
`;

const Nav = props => {
    
    return (
        <NavBar>
            <LogoText>
                Secret Family Recipes
            </LogoText>
            <NavLinks>
                <NavLink
                    to="/"
                    exact
                    className='linkText'>
                    Home
                </NavLink>
                <NavLink
                    to="/about"
                    className='linkText'>
                    About
                </NavLink>
                <NavLink
                    to="/recipes"
                    className='linkText'>
                    Recipes
                </NavLink>
                <NavLink
                    to="/login"
                    className='linkText'>
                    Login
                </NavLink>
                <NavLink
                    to="/signup"
                    className='linkText'>
                    Register
                </NavLink>
            </NavLinks>
        </NavBar>
    )
}

export default Nav;