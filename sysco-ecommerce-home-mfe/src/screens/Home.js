import React from 'react';
//import Header from 'layout/AppHeader'; 
import CarouselComponent from './CarouselComponent'; 
import './Home.css'; 


const Home = () => {
  return (
    <div className="home-container" >
         {/* <Header /> */}
      <CarouselComponent /> 
    </div>
  );
};
 
export default Home;
