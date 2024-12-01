import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, Avatar, Button, Badge, Popover } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  CloseOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./AppHeader.css";
import eventBus from "./shared-events";

const { Header } = Layout;

const AppHeader = () => {
  const [cart, setCart] = useState([]);
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth state changes
    const handleAuthStateChange = (newAuthState) => {
      setAuthState(newAuthState);
    };

    eventBus.on("authStateChanged", handleAuthStateChange);

    // Request initial auth state
    eventBus.emit("requestAuthState");

    // Listen for cart updates
    const handleCartUpdate = (updatedCart) => {
      setCart(updatedCart || []);
    };

    eventBus.on("cartUpdated", handleCartUpdate);
    eventBus.emit("requestCartState");

    return () => {
      eventBus.off("authStateChanged", handleAuthStateChange);
      eventBus.off("cartUpdated", handleCartUpdate);
    };
  }, []);

  const handleSignOut = () => {
    eventBus.emit("signOut");
    navigate("/"); // Redirect to login page after signing out
  };

  const removeFromCart = (item) => {
    eventBus.emit("removeFromCart", item);
  };

  const cartCount = cart?.length || 0;

  const cartContent = (
    <div className="cart-preview">
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
          <div className="cart-item-details">
            <h4>{item.name}</h4>
            <p>Quantity: {item.quantity}</p>
            <p>Price: Rs. {(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <Button
            type="text"
            danger
            onClick={() => removeFromCart(item)}
            icon={<CloseOutlined />}
          />
        </div>
      ))}
      <div className="cart-total">
        <strong>
          Total: Rs.{" "}
          {cart
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </strong>
      </div>
      <Button type="primary" block>
        <Link to="/cart">View Cart</Link>
      </Button>
    </div>
  );

  const userContent = (
    <div className="user-menu">
      {authState.isAuthenticated ? (
        <>
          <div className="user-info">
            <p>{authState.user.email}</p>
          </div>
          <Button onClick={handleSignOut} icon={<LogoutOutlined />} block>
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Button
            onClick={() => navigate("/")}
            icon={<LogoutOutlined />}
            block
            style={{ marginBottom: "8px" }}
          >
            Sign Out
          </Button>
        </>
      )}
    </div>
  );

  return (
    <Header className="app-header">
      <div className="logo">Foodies</div>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        className="menu"
      >
        <Menu.Item key="1">
          <Link to="/home">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/bakery">Bakery</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/contact">Contact</Link>
        </Menu.Item>
      </Menu>
      <div className="header-icons">
        <Popover
          content={cartContent}
          title="Your Cart"
          trigger="hover"
          placement="bottomRight"
        >
          <Badge count={cartCount} showZero>
            <ShoppingCartOutlined
              style={{ fontSize: "24px", color: "black" }}
            />
          </Badge>
        </Popover>
        <Popover content={userContent} trigger="hover" placement="bottomRight">
          <Avatar
            icon={<UserOutlined />}
            style={{
              marginLeft: "16px",
              backgroundColor: authState.isAuthenticated
                ? "#1890ff"
                : "#d9d9d9",
            }}
          />
        </Popover>
      </div>
    </Header>
    
  );
};

export default AppHeader;
