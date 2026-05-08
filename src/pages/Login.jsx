import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '../context/AuthContext';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, #ff0844, #ffb199);
`;

const LeftPanel = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 50px 40px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
  h2 { text-align: center; margin-bottom: 30px; color: #c70039; }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ffb199;
  border-radius: 8px;
  font-size: 1rem;
  &:focus { outline: none; border-color: #ff0844; box-shadow: 0 0 0 2px rgba(255,8,68,0.2); }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #ff0844;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  &:hover:not(:disabled) { background: #c70039; transform: translateY(-2px); }
  &:disabled { background: #ccc; }
`;

const ErrorMsg = styled.div`
  background: #ffe0e0;
  color: #c70039;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 20px;
  text-align: center;
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 40px;
  background: rgba(0,0,0,0.1);
  backdrop-filter: blur(5px);
`;

const AnimatedBox = styled.div`
  animation: ${float} 3s ease-in-out infinite;
  margin-bottom: 30px;
`;

const RotatingIcon = styled.div`
  font-size: 80px;
  animation: ${rotate} 10s linear infinite;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const res = await login(email, password);
    if (res.success) navigate('/products');
    else setError(res.error);
    setLoading(false);
  };

  return (
    <Page>
      <LeftPanel>
        <Card>
          <h2>Welcome Back</h2>
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label>Email Address</label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div style={{ marginBottom: '25px' }}>
              <label>Password</label>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Sign In'}</Button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '25px' }}>
            New to ShopHub? <Link to="/register" style={{ color: '#ff0844' }}>Create an account</Link>
          </p>
        </Card>
      </LeftPanel>
      <RightPanel>
        <AnimatedBox><RotatingIcon>🛍️</RotatingIcon></AnimatedBox>
        <h2>Shop with Joy</h2>
        <p>Discover amazing products, exclusive deals, and fast delivery.</p>
        <div style={{ marginTop: '40px', fontSize: '1.5rem' }}>✨ 🚀 💎</div>
      </RightPanel>
    </Page>
  );
};
export default Login;