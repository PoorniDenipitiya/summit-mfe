import React from 'react';
import { Carousel } from 'antd';
import './CarouselComponent.css';
import freshImage from '../../../assets/fresh.jpeg';
import dairy from '../../../assets/dairy.jpeg';
import bakery from '../../../assets/bakery.png';
import chef from '../../../assets/chef.jpeg';

const CarouselComponent = () => {
  return (
    <Carousel autoplay className="categories-carousel">
      <div className="carousel-item">
        <img src={freshImage} alt="Fresh Produce" className="carousel-image" />
        <div className="carousel-text">
          <p>Fresh from the farm, delivered to your door – only at Foodies.</p>
        </div>
      </div>
      <div className="carousel-item">
        <img src={bakery} alt="Meat & Poultry" className="carousel-image" />
        <div className="carousel-text">
          <p>Savor the finest meats, seafood, and bakery delights with ease.</p>
        </div>
      </div>
      <div className="carousel-item">
        <img src={dairy} alt="Seafood" className="carousel-image" />
        <div className="carousel-text">
          <p>Craving quality? Foodies brings the freshest ingredients right to you.</p>
        </div>
      </div>
      <div className="carousel-item">
        <img src={chef} alt="Fresh Produce" className="carousel-image" />
        <div className="carousel-text">
          <p>Your one-stop shop for dairy, eggs, and beverages – fresher, faster.</p>
        </div>
      </div>
    </Carousel>
  );
};

export default CarouselComponent;