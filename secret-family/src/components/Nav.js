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
    font-family: 'Dancing Script', cursive;
    color: #D4A59A;
`;
const NavLinks = styled.div`
    display: flex;
    width: 20%;
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
                    style={{
                        textDecoration: 'none',
                        color:'#F3E0DC'
                    }}>
                    Home
                </NavLink>
                <NavLink
                    to="/about"
                    style={{
                        textDecoration: 'none',
                        color:'#F3E0DC'
                    }}>
                    About
                </NavLink>
                <NavLink
                    to="/recipes"
                    style={{
                        textDecoration: 'none',
                        color:'#F3E0DC'
                    }}>
                    Recipes
                </NavLink>
                <NavLink
                    to="/login"
                    style={{
                        textDecoration: 'none',
                        color:'#F3E0DC'
                    }}>
                    Login
                </NavLink>
                <NavLink
                    to="/signup"
                    style={{
                        textDecoration: 'none',
                        color:'#F3E0DC'
                    }}>
                    Register
                </NavLink>
            </NavLinks>
        </NavBar>
    )
}

export default Nav;