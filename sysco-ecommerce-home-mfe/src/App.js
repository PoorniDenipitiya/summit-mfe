import { Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductDetail from "./components/ProductDetail";
import AuthRoute from "./AuthRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <AuthRoute>
              <HomeScreen />
            </AuthRoute>
          }
        />
        <Route
          path="/products/:id"
          element={
            <AuthRoute>
              <ProductDetail />
            </AuthRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
