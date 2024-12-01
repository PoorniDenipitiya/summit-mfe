/*import React from 'react';
import { Card, Button } from 'antd';
import { CheckCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './CartNotification.css';

const CartNotification = ({ item }) => {
  return (
    <div className="cart-notification">
      <Card>
        <div className="notification-content">
          <CheckCircleOutlined className="success-icon" />
          <div className="notification-text">
            <h4>Added to Cart</h4>
            <p>{item.name} - Quantity: {item.quantity}</p>
          </div>
          <img src={item.image} alt={item.name} className="notification-image" />
        </div>
        <div className="notification-actions">
          <Button type="primary" icon={<ShoppingCartOutlined />}>
            <Link to="/cart">View Cart</Link>
          </Button>
          <Button>Continue Shopping</Button>
        </div>
      </Card>
    </div>
  );
};

export default CartNotification;

*/
/**** */

/*

import React from "react";
import { Card, Button } from "antd";
import { CheckCircleOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./CartNotification.css";

const CartNotification = ({ item = {} }) => {
  // Guard clause - if no item is provided, show a basic version
  if (!item?.name) {
    return (
      <div className="cart-notification">
        <Card>
          <div className="notification-content">
            <CheckCircleOutlined className="success-icon" />
            <div className="notification-text">
              <h4>Added to Cart</h4>
              <p>Item added successfully</p>
            </div>
          </div>
          <div className="notification-actions">
            <Button type="primary" icon={<ShoppingCartOutlined />}>
              <Link to="/cart">View Cart</Link>
            </Button>
            <Button>Continue Shopping</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="cart-notification">
      <Card>
        <div className="notification-content">
          <CheckCircleOutlined className="success-icon" />
          <div className="notification-text">
            <h4>Added to Cart</h4>
            <p>
              {item.name} - Quantity: {item.quantity || 1}
            </p>
          </div>
          {item.image && (
            <img
              src={item.image}
              alt={item.name}
              className="notification-image"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}
        </div>
        <div className="notification-actions">
          <Button type="primary" icon={<ShoppingCartOutlined />}>
            <Link to="/cart">View Cart</Link>
          </Button>
          <Button>Continue Shopping</Button>
        </div>
      </Card>
    </div>
  );
};

export default CartNotification;*/

import React from 'react';
import { Card, Button } from 'antd';
import { CheckCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './CartNotification.css';

const CartNotification = ({ item, onClose }) => {
  return (
    <div className="cart-notification">
      <Card>
        <div className="notification-content">
          <CheckCircleOutlined className="success-icon" />
          <div className="notification-text">
            <h4>Added to Cart</h4>
            <p>{item.name} - Quantity: {item.quantity || 1}</p>
            <p>Unit Price: Rs. {item.price.toFixed(2)}</p>
            <p>Total: Rs. {(item.price * (item.quantity || 1)).toFixed(2)}</p>
          </div>
          {item.image && (
            <img 
              src={item.image} 
              alt={item.name} 
              className="notification-image"
            />
          )}
        </div>
        <div className="notification-actions">
          <Link to="/cart">
            <Button type="primary" icon={<ShoppingCartOutlined />}>
              View Cart
            </Button>
          </Link>
          <Button onClick={onClose}>
            Continue Shopping
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CartNotification;
