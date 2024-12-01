/*import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, InputNumber, Pagination } from 'antd';
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import './BakeryPage.css';
import CartNotification from './CartNotification.js';
import eventBus from './shared-events';
import chickenpie from '../../../assets/chcicken&muchroompie.jpg';
import chickenroll from '../../../assets/chicken roll.jpg';
import chickenpastry from '../../../assets/coriander&fishpastry.jpg';
import chickenquiche from '../../../assets/crispychickenquiche.jpg';
import fishpatty from '../../../assets/fishpatty.jpg';
import vegetablesamosa from '../../../assets/vegetablesamosa.jpg';

const { Meta } = Card;

const bakeryItems = [
  { id: 1, name: 'Chicken & Mushroom Pie', image: chickenpie, price: 210.00 },
  { id: 2, name: 'Chicken Roll', image: chickenroll, price: 190.00 },
  { id: 3, name: 'Coriander & Fish Pastry', image: chickenpastry, price: 180.00 },
  { id: 4, name: 'Crispy Chicken Quiche', image: chickenquiche, price: 190.00 },
  { id: 5, name: 'Fish Patty', image: fishpatty, price: 170.00 },
  { id: 6, name: 'Vegetable Samosa', image: vegetablesamosa, price: 190.00 },
  { id: 7, name: 'Chicken & Mushroom Pie', image: chickenpie, price: 210.00 },
  { id: 8, name: 'Chicken Roll', image: chickenroll, price: 190.00 },
  { id: 9, name: 'Coriander & Fish Pastry', image: chickenpastry, price: 180.00 },
  { id: 10, name: 'Crispy Chicken Quiche', image: chickenquiche, price: 190.00 },
  { id: 11, name: 'Fish Patty', image: fishpatty, price: 170.00 },
  { id: 12, name: 'Vegetable Samosa', image: vegetablesamosa, price: 190.00 }
];

const BakeryPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationItem, setNotificationItem] = useState(null);
  const [cart, setCart] = useState([]);
  const pageSize = 8; 
  const [bakeryProducts, setBakeryProducts] = useState([]);

  useEffect(() => {
    // Listen for product additions
    const handleProductAdded = ({ category, product }) => {
      if (category === "Bakery") {
        setBakeryProducts((prevProducts) => [...prevProducts, product]);
      }
    };

    eventBus.on("productAdded", handleProductAdded);

    // Cleanup listener on unmount
    return () => {
      eventBus.off("productAdded", handleProductAdded);
    };
  }, []);

  useEffect(() => {
    // Listen for remove from cart requests
    eventBus.on('removeFromCart', handleRemoveFromCart);
    
    // Listen for cart state requests
    eventBus.on('requestCartState', () => {
      eventBus.emit('cartUpdated', cart);
    });

    return () => {
      eventBus.off('removeFromCart', handleRemoveFromCart);
    };
  }, [cart]);

  const handleRemoveFromCart = (itemToRemove) => {
    const updatedCart = cart.filter(item => item.id !== itemToRemove.id);
    setCart(updatedCart);
    eventBus.emit('cartUpdated', updatedCart);
  };

  const showModal = (item) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setQuantity(1);
  };

  const handleAddToCart = (item, qty = 1) => {
    const totalPrice = item.price * qty;
    const newItem = { ...item, quantity: qty, totalPrice };
    
    // Check if item already exists in cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    let updatedCart;
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += qty;
      updatedCart[existingItemIndex].totalPrice += totalPrice;
    } else {
      // Add new item if it doesn't exist
      updatedCart = [...cart, newItem];
    }
    
    setCart(updatedCart);
    eventBus.emit('cartUpdated', updatedCart);
    
    setNotificationItem(newItem);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
    handleCancel();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedItems = bakeryItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bakery-page">
      <h2>Bakery Items</h2>
      <div className="bakery-items">
        {paginatedItems.map(item => (
          <Card
            key={item.id}
            hoverable
            className="bakery-card"
            cover={<img alt={item.name} src={item.image} />}
            actions={[
              <Button icon={<ShoppingCartOutlined />} onClick={() => handleAddToCart(item)}>Add to Cart</Button>,
              <Button icon={<EyeOutlined />} onClick={() => showModal(item)}>Quick View</Button>
            ]}
          >
            <Meta 
              title={item.name} 
              description={<div className="price">Rs. {item.price.toFixed(2)}</div>} 
            />
          </Card>
        ))}
      </div>
      <div className="pagination-container">
        <Pagination
          current={currentPage}
          total={bakeryItems.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        {selectedItem && (
          <div className="quick-view-content">
            <div className="quick-view-image">
              <img src={selectedItem.image} alt={selectedItem.name} />
            </div>
            <div className="quick-view-details">
              <h2>{selectedItem.name}</h2>
              <h3>
                Price: Rs. {selectedItem.price.toFixed(2)} <br />
                Total: Rs. {(selectedItem.price * quantity).toFixed(2)}
              </h3>
              <p>{selectedItem.name}</p>
              <div className="quantity-selector">
                <span>{selectedItem.name.toUpperCase()} quantity</span>
                <InputNumber 
                  min={1} 
                  value={quantity} 
                  onChange={(value) => setQuantity(value || 1)} 
                />
              </div>
              <Button 
                type="primary" 
                size="large" 
                onClick={() => handleAddToCart(selectedItem, quantity)}
              >
                Add to cart
              </Button>
              <p className="availability">
                Product can be ordered on the following weekdays: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
              </p>
              <p className="availability">
                Product available on: 8:00am - 2:00pm, 2:00pm - 8:00pm
              </p>
            </div>
          </div>
        )}
      </Modal>
      {showNotification && notificationItem && (
        <CartNotification 
          item={notificationItem}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default BakeryPage;
*/




import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, InputNumber, Pagination } from 'antd';
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import './BakeryPage.css';
import CartNotification from './CartNotification.js';
import eventBus from './shared-events';
import axios from 'axios'; // Make sure to import axios

const { Meta } = Card;

const BakeryPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationItem, setNotificationItem] = useState(null);
  const [cart, setCart] = useState([]);
  const pageSize = 8; 
  const [bakeryProducts, setBakeryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bakery products from backend
  useEffect(() => {
    const fetchBakeryProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products?category=Bakery');
        setBakeryProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bakery products:', error);
        setLoading(false);
      }
    };

    fetchBakeryProducts();
  }, []);

  // Listen for new product additions
  useEffect(() => {
    const handleProductAdded = ({ category, product }) => {
      if (category === "Bakery") {
        setBakeryProducts((prevProducts) => [...prevProducts, product]);
      }
    };

    eventBus.on("productAdded", handleProductAdded);

    return () => {
      eventBus.off("productAdded", handleProductAdded);
    };
  }, []);

  // Rest of the existing event listeners and methods remain the same
  useEffect(() => {
    eventBus.on('removeFromCart', handleRemoveFromCart);
    
    eventBus.on('requestCartState', () => {
      eventBus.emit('cartUpdated', cart);
    });

    return () => {
      eventBus.off('removeFromCart', handleRemoveFromCart);
    };
  }, [cart]);

  const handleRemoveFromCart = (itemToRemove) => {
    const updatedCart = cart.filter(item => item.id !== itemToRemove.id);
    setCart(updatedCart);
    eventBus.emit('cartUpdated', updatedCart);
  };

  const showModal = (item) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setQuantity(1);
  };

  const handleAddToCart = (item, qty = 1) => {
    const totalPrice = item.price * qty;
    const newItem = { ...item, quantity: qty, totalPrice };
    
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);
    let updatedCart;
    
    if (existingItemIndex >= 0) {
      updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += qty;
      updatedCart[existingItemIndex].totalPrice += totalPrice;
    } else {
      updatedCart = [...cart, newItem];
    }
    
    setCart(updatedCart);
    eventBus.emit('cartUpdated', updatedCart);
    
    setNotificationItem(newItem);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
    handleCancel();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Paginate bakery products
  const paginatedItems = bakeryProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bakery-page">
      <h2>Bakery Items</h2>
      <div className="bakery-items">
        {paginatedItems.map(item => (
          <Card
            key={item.id}
            hoverable
            className="bakery-card"
            cover={<img alt={item.name} src={item.imageUrl} />}
            actions={[
              <Button icon={<ShoppingCartOutlined />} onClick={() => handleAddToCart(item)}>Add to Cart</Button>,
              <Button icon={<EyeOutlined />} onClick={() => showModal(item)}>Quick View</Button>
            ]}
          >
            <Meta 
              title={item.name} 
              description={<div className="price">Rs. {parseFloat(item.price).toFixed(2)}</div>} 
            />
          </Card>
        ))}
      </div>
      <div className="pagination-container">
        <Pagination
          current={currentPage}
          total={bakeryProducts.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
      <Modal
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={700}
      >
        {selectedItem && (
          <div className="quick-view-content">
            <div className="quick-view-image">
              <img src={selectedItem.imageUrl} alt={selectedItem.name} />
            </div>
            <div className="quick-view-details">
              <h2>{selectedItem.name}</h2>
              <h3>
                Unit Price: Rs. {parseFloat(selectedItem.price).toFixed(2)} <br />
                Total Price: Rs. {(parseFloat(selectedItem.price) * quantity).toFixed(2)}
              </h3>
              <p>{selectedItem.name}</p>
              <div className="quantity-selector">
                <span>{selectedItem.name.toUpperCase()} quantity</span>
                <InputNumber 
                  min={1} 
                  value={quantity} 
                  onChange={(value) => setQuantity(value || 1)} 
                />
              </div>
              <Button 
                type="primary" 
                size="large" 
                onClick={() => handleAddToCart(selectedItem, quantity)}
              >
                Add to cart
              </Button>
              <p className="availability">
                Product can be ordered on the following weekdays: Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
              </p>
              <p className="availability">
                Product available on: 8:00am - 2:00pm, 2:00pm - 8:00pm
              </p>
            </div>
          </div>
        )}
      </Modal>
      {showNotification && notificationItem && (
        <CartNotification 
          item={notificationItem}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default BakeryPage;
