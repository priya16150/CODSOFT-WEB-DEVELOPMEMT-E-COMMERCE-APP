import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';


const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px #ff0844; }
  50% { box-shadow: 0 0 20px #ff0844; }
  100% { box-shadow: 0 0 5px #ff0844; }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;


const HeroSection = styled.div`
  background: linear-gradient(135deg, #ff0844, #ffb199);
  color: white;
  padding: 120px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const HeroContent = styled.div`
  animation: ${fadeUp} 0.8s ease-out;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TypingWrapper = styled.div`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  min-height: 4rem;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 3px;
  margin-left: 5px;
  background: white;
  animation: ${blink} 0.7s step-end infinite;
`;

const GetStartedBtn = styled(Link)`
  display: inline-block;
  padding: 15px 40px;
  background: white;
  color: #ff0844;
  text-decoration: none;
  border-radius: 50px;
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  &:hover {
    transform: translateY(-3px);
    background: #fff5f5;
    box-shadow: 0 8px 25px rgba(255,8,68,0.4);
  }
`;

const FeaturesSection = styled.div`
  background: #fff0f2;
  padding: 80px 0;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #c70039;
  position: relative;
  display: inline-block;
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: #ff0844;
    border-radius: 2px;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 30px 20px;
  border-radius: 15px;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  &:hover {
    transform: translateY(-8px);
    animation: ${glow} 0.5s ease;
  }
`;

const Icon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: #ff0844;
`;

const FeatureDesc = styled.p`
  color: #666;
`;

const Footer = styled.footer`
  background: #ff0844;
  color: white;
  text-align: center;
  padding: 40px;
  margin-top: 50px;
`;

const Home = () => {
  // Typing animation – list of phrases to type
  const phrases = [
    "Shop the best deals",
    "Fast delivery guaranteed",
    "Secure payments",
    "24/7 customer support"
  ];
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeout;

    if (!isDeleting && charIndex <= currentPhrase.length) {
      
      timeout = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex(prev => prev + 1);
      }, 100);
    } else if (!isDeleting && charIndex > currentPhrase.length) {
   
      timeout = setTimeout(() => setIsDeleting(true), 1500);
    } else if (isDeleting && charIndex > 0) {
    
      timeout = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex(prev => prev - 1);
      }, 50);
    } else if (isDeleting && charIndex === 0) {
     
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, phrases]);

  return (
    <>
      <HeroSection>
        <HeroContent>
          <Title>Welcome to ShopHub</Title>
          <TypingWrapper>
            {displayText}
            <Cursor>|</Cursor>
          </TypingWrapper>
          <GetStartedBtn to="/login">Get Started →</GetStartedBtn>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <div className="container">
          <SectionTitle>Why Choose Us?</SectionTitle>
          <FeaturesGrid>
            <FeatureCard>
              <Icon>🚚</Icon>
              <FeatureTitle>Free Shipping</FeatureTitle>
              <FeatureDesc>On orders over $50</FeatureDesc>
            </FeatureCard>
            <FeatureCard>
              <Icon>🛡️</Icon>
              <FeatureTitle>Secure Payment</FeatureTitle>
              <FeatureDesc>100% secure transactions</FeatureDesc>
            </FeatureCard>
            <FeatureCard>
              <Icon>🔄</Icon>
              <FeatureTitle>Easy Returns</FeatureTitle>
              <FeatureDesc>30-day return policy</FeatureDesc>
            </FeatureCard>
            <FeatureCard>
              <Icon>💬</Icon>
              <FeatureTitle>24/7 Support</FeatureTitle>
              <FeatureDesc>Dedicated customer service</FeatureDesc>
            </FeatureCard>
          </FeaturesGrid>
        </div>
      </FeaturesSection>

      <Footer>
        <p>© 2024 ShopHub. All rights reserved. | @ ShopHub</p>
      </Footer>
    </>
  );
};

export default Home;
