import React, { useState, useEffect } from 'react';
import { Card, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import freshImage from '../../../assets/fresh.jpeg';
import seafood from '../../../assets/seafood.jpeg';
import poultry from '../../../assets/poultry.jpeg';
import dairy from '../../../assets/dairy.jpeg';
import bakery from '../../../assets/bakery.png';
import beverages from '../../../assets/beverages.jpeg';
import eventBus from './shared-events';

import './Categories.css';

const { Meta } = Card;

const categoriesConfig = [
  { id: 1, title: 'Fresh Produce', image: freshImage, description: 'Fruits, vegetables, and herbs.', path: '/fresh-produce' },
  { id: 2, title: 'Meat & Poultry', image: poultry, description: 'Quality meats and poultry.', path: '/meat-poultry' },
  { id: 3, title: 'Seafood', image: seafood, description: 'Fresh seafood and fish.', path: '/seafood' },
  { id: 4, title: 'Dairy & Eggs', image: dairy, description: 'Milk, cheese, and more.', path: '/dairy-eggs' },
  { id: 5, title: 'Bakery', image: bakery, description: 'Bread, pastries, and desserts.', path: '/bakery' },
  { id: 6, title: 'Beverages', image: beverages, description: 'Juices, soda, and more.', path: '/beverages' },
];

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(categoriesConfig);

  useEffect(() => {
    // Listen for new product additions
    const handleAddProduct = (data) => {
      // Update the specific category's product list
      setCategories(prevCategories => 
        prevCategories.map(category => 
          category.title === data.category 
            ? { 
                ...category, 
                products: [...(category.products || []), data.product] 
              } 
            : category
        )
      );
    };

    eventBus.on('addProduct', handleAddProduct);

    return () => {
      eventBus.off('addProduct', handleAddProduct);
    };
  }, []);

  const handleCategoryClick = (path, category) => {
    // Pass category data when navigating
    navigate(path, { state: { category } });
  };

  return (
    <div className="categories-container">
      <Row gutter={[16, 16]}>
        {categories.map(category => (
          <Col key={category.id} xs={24} sm={12} md={8} lg={8}>
            <Card
              hoverable
              cover={<img alt={category.title} src={category.image} />}
              className="category-card"
              onClick={() => handleCategoryClick(category.path || '/', category)}
            >
              <Meta 
                title={category.title} 
                description={`${category.description} ${category.products ? `(${category.products.length} items)` : ''}`} 
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Categories;