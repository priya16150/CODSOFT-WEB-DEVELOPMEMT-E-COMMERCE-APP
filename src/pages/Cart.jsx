import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Page = styled.div`
  min-height: 100vh;
  background: #fff0f2;
  h1 { margin-bottom: 30px; color: #c70039; }
`;

const Content = styled.div`
  display: flex;
  gap: 30px;
  @media (max-width: 768px) { flex-direction: column; }
`;

const ItemsTable = styled.div`
  flex: 2;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const HeaderRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1.5fr 1fr 0.5fr;
  padding: 15px;
  background: #fff0f2;
  border-radius: 5px;
  font-weight: bold;
  color: #c70039;
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1.5fr 1fr 0.5fr;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  img { width: 80px; height: 80px; object-fit: cover; border-radius: 5px; }
`;

const QtyBtn = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid #ffb199;
  background: white;
  border-radius: 5px;
  cursor: pointer;
  &:hover:not(:disabled) { background: #ffb199; }
  &:disabled { opacity: 0.5; }
`;

const Summary = styled.div`
  flex: 1;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  height: fit-content;
`;

const CheckoutBtn = styled(Link)`
  display: block;
  width: 100%;
  padding: 15px;
  background: #ff0844;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  &:hover { background: #c70039; }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 100px 20px;
  h2 { font-size: 2rem; margin-bottom: 20px; color: #c70039; }
`;

const Cart = () => {
  const { cartItems, totalAmount, updateQuantity, removeFromCart, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const shipping = totalAmount > 50 ? 0 : 10;
  const tax = totalAmount * 0.1;
  const final = totalAmount + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <EmptyCart>
        <h2>Your Cart is Empty</h2>
        <Link to="/products" style={{ padding: '15px 30px', background: '#ff0844', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>Continue Shopping</Link>
      </EmptyCart>
    );
  }

  return (
    <Page>
      <div className="container">
        <h1>Shopping Cart</h1>
        <Content>
          <ItemsTable>
            <HeaderRow><div>Product</div><div>Price</div><div>Quantity</div><div>Total</div><div></div></HeaderRow>
            {cartItems.map(item => (
              <CartItem key={item.product}>
                <ItemInfo><img src={item.image} alt={item.name} /><div><h3>{item.name}</h3></div></ItemInfo>
                <div>${item.price.toFixed(2)}</div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <QtyBtn onClick={() => updateQuantity(item.product, item.quantity-1)}>-</QtyBtn>
                  <span>{item.quantity}</span>
                  <QtyBtn onClick={() => updateQuantity(item.product, item.quantity+1)} disabled={item.quantity >= item.stock}>+</QtyBtn>
                </div>
                <div style={{ fontWeight: 'bold', color: '#ff0844' }}>${(item.price * item.quantity).toFixed(2)}</div>
                <button onClick={() => removeFromCart(item.product)} style={{ background: 'none', border: 'none', color: '#ff0844', cursor: 'pointer' }}>Remove</button>
              </CartItem>
            ))}
            <button onClick={clearCart} style={{ marginTop: '20px', padding: '10px 20px', background: '#c70039', color: 'white', border: 'none', borderRadius: '5px' }}>Clear Cart</button>
          </ItemsTable>
          <Summary>
            <h2 style={{ color: '#c70039' }}>Order Summary</h2>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}><span>Subtotal:</span><span>${totalAmount.toFixed(2)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}><span>Shipping:</span><span>${shipping.toFixed(2)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}><span>Tax (10%):</span><span>${tax.toFixed(2)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', fontWeight: 'bold', fontSize: '1.2rem', borderTop: '2px solid #f0f0f0' }}><span>Total:</span><span>${final.toFixed(2)}</span></div>
            </div>
            {isAuthenticated ? <CheckoutBtn to="/checkout">Proceed to Checkout</CheckoutBtn> : <CheckoutBtn to="/login">Login to Checkout</CheckoutBtn>}
          </Summary>
        </Content>
      </div>
    </Page>
  );
};
export default Cart;