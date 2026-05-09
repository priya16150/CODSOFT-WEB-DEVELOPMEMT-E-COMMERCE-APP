
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useCart } from '../context/CartContext';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;
  display: flex;
  flex-direction: column;
  height: 100%;
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.15);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  transition: transform 0.3s ease;
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Info = styled.div`
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: #333;
  line-height: 1.3;
`;

const Category = styled.p`
  color: #666;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
`;

const Rating = styled.div`
  color: #ffc107;
  margin: 0.5rem 0;
  font-size: 0.9rem;
`;

const Price = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
  color: #e67e22;
  margin: 0.5rem 0 1rem;
`;

const AddButton = styled.button`
  width: 100%;
  padding: 12px;
  background: ${props => props.disabled ? '#ccc' : '#2ecc71'};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s;
  margin-top: auto;
  &:hover:not(:disabled) {
    background: #27ae60;
    transform: scale(1.02);
  }
`;

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  // State to handle image fallback
  const [imgSrc, setImgSrc] = useState(product.image);

  return (
    <Card>
      <Image 
        src={imgSrc} 
        alt={product.name}
        onError={() => setImgSrc('https://picsum.photos/id/1/400/300')}
      />
      <Info>
        <Title>{product.name}</Title>
        <Category>{product.category}</Category>
        <Rating>
          {'★'.repeat(Math.floor(product.rating))}
          {'☆'.repeat(5 - Math.floor(product.rating))}
          ({product.numReviews})
        </Rating>
        <Price>${product.price.toFixed(2)}</Price>
        <AddButton disabled={product.stock === 0} onClick={() => addToCart(product, 1)}>
          {product.stock === 0 ? 'Out of Stock' : '🛒 Add to Cart'}
        </AddButton>
      </Info>
    </Card>
  );
};

export default ProductCard;
