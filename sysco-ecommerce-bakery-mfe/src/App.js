import React from "react";
import BakeryPage from "./screens/BakeryPage";
import BakerySeeMore from "./screens/BakerySeeMore";
import "antd/dist/reset.css";

const App = () => {
  return (
    <div>
      {/* <h1>Categories</h1> */}
      <BakeryPage />
      <BakerySeeMore />
    </div>
  );
};

export default App;
