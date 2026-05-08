import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) setCartItems(JSON.parse(saved));
  }, []);

  // Save to localStorage and recalc total
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    const total = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    setTotalAmount(total);
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.product === product._id);
      if (existing) {
        return prev.map(i =>
          i.product === product._id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      } else {
        return [...prev, {
          product: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
          stock: product.stock
        }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(i => i.product !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) return removeFromCart(productId);
    setCartItems(prev =>
      prev.map(i =>
        i.product === productId
          ? { ...i, quantity: Math.min(quantity, i.stock) }
          : i
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, totalAmount, addToCart, removeFromCart, updateQuantity, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};