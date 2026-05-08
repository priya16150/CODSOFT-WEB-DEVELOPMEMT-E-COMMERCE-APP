import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder, updateOrderPayment } from '../services/api';

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

const Shipping = styled.div`
  flex: 2;
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const Summary = styled.div`
  flex: 1.5;
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const PlaceOrderBtn = styled.button`
  width: 100%;
  padding: 15px;
  background: #ff0844;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  &:hover:not(:disabled) { background: #c70039; }
  &:disabled { background: #ccc; cursor: not-allowed; }
`;

const Checkout = () => {
  const { cartItems, totalAmount, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState({ fullName: '', address: '', city: '', postalCode: '', country: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
    if (cartItems.length === 0) navigate('/cart');
  }, [isAuthenticated, cartItems, navigate]);

  const shipping = totalAmount > 50 ? 0 : 10;
  const tax = totalAmount * 0.1;
  const final = totalAmount + shipping + tax;

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const res = await createOrder({
        items: cartItems,
        shippingAddress: address,
        paymentMethod: 'cod',
        itemsPrice: totalAmount,
        shippingPrice: shipping,
        totalPrice: final,
      });
      const orderId = res.data.order._id;
      await updateOrderPayment(orderId, {
        id: 'mock_' + Date.now(),
        status: 'succeeded',
        updateTime: new Date().toISOString(),
      });
      clearCart();
      alert('Order placed successfully! (Cash on Delivery)');
      navigate('/products');
    } catch (err) {
      alert('Failed to place order: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <div className="container">
        <h1>Checkout</h1>
        <Content>
          <Shipping>
            <h2 style={{ color: '#c70039' }}>Shipping Address</h2>
            {['fullName', 'address', 'city', 'postalCode', 'country'].map(field => (
              <div key={field} style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>
                  {field === 'fullName' ? 'Full Name' : field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  value={address[field]}
                  onChange={e => setAddress({ ...address, [field]: e.target.value })}
                  style={{ width: '100%', padding: '12px', border: '1px solid #ffb199', borderRadius: '5px' }}
                  required
                />
              </div>
            ))}
          </Shipping>
          <Summary>
            <h2 style={{ color: '#c70039' }}>Order Summary</h2>
            {cartItems.map(item => (
              <div key={item.product} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 0', borderBottom: '1px solid #f0f0f0' }}>
                <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }} />
                <div style={{ flex: 1 }}><div><strong>{item.name}</strong></div><div>Qty: {item.quantity}</div></div>
                <div style={{ fontWeight: 'bold', color: '#ff0844' }}>${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
            <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '2px solid #f0f0f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}><span>Subtotal:</span><span>${totalAmount.toFixed(2)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}><span>Shipping:</span><span>${shipping.toFixed(2)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}><span>Tax:</span><span>${tax.toFixed(2)}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', fontWeight: 'bold', fontSize: '1.2rem' }}><span>Total:</span><span>${final.toFixed(2)}</span></div>
            </div>
            <PlaceOrderBtn onClick={handlePlaceOrder} disabled={loading}>
              {loading ? 'Placing Order...' : 'Place Order (Cash on Delivery)'}
            </PlaceOrderBtn>
          </Summary>
        </Content>
      </div>
    </Page>
  );
};
export default Checkout;