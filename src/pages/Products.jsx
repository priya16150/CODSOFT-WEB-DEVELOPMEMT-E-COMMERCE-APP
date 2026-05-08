import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import Loader from '../components/Loader';

const Page = styled.div`
  min-height: 100vh;
  background: #fff0f2;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  h1 { font-size: 2.5rem; color: #c70039; margin-bottom: 20px; }
  input {
    max-width: 500px;
    width: 100%;
    padding: 12px 20px;
    border: 2px solid #ffb199;
    border-radius: 25px;
    font-size: 1rem;
    &:focus { outline: none; border-color: #ff0844; }
  }
`;

const Content = styled.div`
  display: flex;
  gap: 30px;
  @media (max-width: 768px) { flex-direction: column; }
`;

const SidebarWrap = styled.div`
  width: 280px;
  @media (max-width: 768px) { width: 100%; }
`;

const ProductsGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
`;

const NoProducts = styled.div`
  text-align: center;
  padding: 60px;
  background: white;
  border-radius: 10px;
  color: #666;
`;

const Products = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: '', minPrice: undefined, maxPrice: undefined, sort: '' });
  const [search, setSearch] = useState('');

  useEffect(() => {
    getProducts({}).then(res => {
      setAllProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    let result = [...allProducts];
    if (search) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filters.category) result = result.filter(p => p.category === filters.category);
    if (filters.minPrice) result = result.filter(p => p.price >= filters.minPrice);
    if (filters.maxPrice) result = result.filter(p => p.price <= filters.maxPrice);
    if (filters.sort === 'price_asc') result.sort((a,b) => a.price - b.price);
    else if (filters.sort === 'price_desc') result.sort((a,b) => b.price - a.price);
    else if (filters.sort === 'rating') result.sort((a,b) => b.rating - a.rating);
    else if (filters.sort === 'newest') result.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    setFiltered(result);
  }, [allProducts, filters, search]);

  if (loading) return <Loader />;
  return (
    <Page>
      <div className="container">
        <Header>
          <h1>Our Products</h1>
          <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
        </Header>
        <Content>
          <SidebarWrap><FilterSidebar filters={filters} onFilterChange={setFilters} /></SidebarWrap>
          {filtered.length === 0 ? <NoProducts>No products found.</NoProducts> : <ProductsGrid>{filtered.map(p => <ProductCard key={p._id} product={p} />)}</ProductsGrid>}
        </Content>
      </div>
    </Page>
  );
};
export default Products;