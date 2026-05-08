import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getCategories } from '../services/api';

const Sidebar = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 100%;
  @media (max-width: 768px) { margin-bottom: 20px; }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #ffb199;
`;

const ClearBtn = styled.button`
  background: none;
  border: none;
  color: #ff0844;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 250px;
  overflow-y: auto;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #555;
  input:checked + span { color: #ff0844; }
`;

const PriceInputs = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ffb199;
    border-radius: 5px;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ffb199;
  border-radius: 5px;
  background: white;
`;

const FilterSidebar = ({ filters, onFilterChange }) => {
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedCategory, setSelectedCategory] = useState(filters.category || '');
  const [sortBy, setSortBy] = useState(filters.sort || '');

  useEffect(() => {
    getCategories().then(res => setCategories(res.data.categories));
  }, []);

  const handleCategory = (cat) => {
    setSelectedCategory(cat);
    onFilterChange({ category: cat === 'all' ? '' : cat });
  };
  const handlePrice = () => {
    onFilterChange({
      minPrice: priceRange.min || undefined,
      maxPrice: priceRange.max || undefined,
    });
  };
  const handleSort = (s) => {
    setSortBy(s);
    onFilterChange({ sort: s });
  };
  const clearAll = () => {
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setSortBy('');
    onFilterChange({ category: '', minPrice: undefined, maxPrice: undefined, sort: '' });
  };

  return (
    <Sidebar>
      <Header><h3 style={{ margin: 0, color: '#c70039' }}>Filters</h3><ClearBtn onClick={clearAll}>Clear All</ClearBtn></Header>
      <Section>
        <h4>Categories</h4>
        <CategoryList>
          <Label><input type="radio" name="cat" checked={selectedCategory === ''} onChange={() => handleCategory('all')} /> All Categories</Label>
          {categories.map(c => (
            <Label key={c}><input type="radio" name="cat" checked={selectedCategory === c} onChange={() => handleCategory(c)} /> {c}</Label>
          ))}
        </CategoryList>
      </Section>
      <Section>
        <h4>Price Range</h4>
        <PriceInputs>
          <input type="number" placeholder="Min" value={priceRange.min} onChange={e => setPriceRange({...priceRange, min: e.target.value})} onBlur={handlePrice} />
          <span>-</span>
          <input type="number" placeholder="Max" value={priceRange.max} onChange={e => setPriceRange({...priceRange, max: e.target.value})} onBlur={handlePrice} />
        </PriceInputs>
      </Section>
      <Section>
        <h4>Sort By</h4>
        <Select value={sortBy} onChange={e => handleSort(e.target.value)}>
          <option value="">Default</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Rating</option>
          <option value="newest">Newest First</option>
        </Select>
      </Section>
    </Sidebar>
  );
};

export default FilterSidebar;