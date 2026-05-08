import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Nav = styled.nav`
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  background: linear-gradient(135deg, #ff0844, #ffb199);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: none;
`;

const MenuIcon = styled.div`
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
  @media (max-width: 768px) { display: block; }
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 70px;
    left: ${({ open }) => (open ? '0' : '-100%')};
    opacity: ${({ open }) => (open ? '1' : '0')};
    transition: all 0.5s ease;
    background: white;
    padding: 2rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  &:hover { color: #ff0844; }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -12px;
  background: #ff0844;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 0.75rem;
`;

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Nav>
      <Container>
        <Logo to="/">ShopHub</Logo>
        <MenuIcon onClick={() => setOpen(!open)}>☰</MenuIcon>
        <NavMenu open={open}>
          <li><NavLink to="/" onClick={() => setOpen(false)}>Home</NavLink></li>
          <li><NavLink to="/products" onClick={() => setOpen(false)}>Products</NavLink></li>
          <li style={{ position: 'relative' }}>
            <NavLink to="/cart" onClick={() => setOpen(false)}>Cart</NavLink>
            {cartCount > 0 && <CartBadge>{cartCount}</CartBadge>}
          </li>
          {isAuthenticated ? (
            <>
              <li>Hi, {user?.name}</li>
              <li><button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#ff0844', cursor: 'pointer' }}>Logout</button></li>
            </>
          ) : (
            <>
              <li><NavLink to="/login" onClick={() => setOpen(false)}>Login</NavLink></li>
              <li><NavLink to="/register" onClick={() => setOpen(false)}>Register</NavLink></li>
            </>
          )}
        </NavMenu>
      </Container>
    </Nav>
  );
};

export default Navbar;