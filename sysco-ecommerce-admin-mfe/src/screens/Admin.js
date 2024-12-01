/*import React, { useState } from "react";
import { Form, Input, InputNumber, Button, Upload, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./Admin.css";
import { imageDb } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import eventBus from "./shared-events";

const { Option } = Select;

const Admin = () => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);

const handleImageChange = (info) => {
  const { file } = info;
  console.log("File status:", file.status);

  if (file.status === "removed") {
    setImageFile(null);
    console.log("File removed.");
  } else if (file.originFileObj) {
    setImageFile(file.originFileObj);
    console.log("Selected file:", file.originFileObj);
  } else {
    console.warn("File is not ready:", file);
  }
};
  

  
  const onFinish = async (values) => {
    if (!imageFile) {
      console.error("No file selected for upload.");
      return;
    }
    
   // console.log("Uploading file:", imageFile.name);

    try {
      const imgRef = ref(imageDb, `productimages/${v4()}`);
      await uploadBytes(imgRef, imageFile);
      const downloadURL = await getDownloadURL(imgRef);

      const newProduct = {
        ...values,
        imageUrl: downloadURL,
        id: v4(),
      };

      eventBus.emit("addProduct", {
        category: values.category,
        product: newProduct,
      });

      form.resetFields();
      setImageFile(null);

      message.success("Product added successfully!");
    } catch (error) {
      console.error("Error uploading product:", error);
      message.error("Failed to add product");
    }
  };

 /* const handleImageChange = (info) => {
    if (info.file.status !== "uploading") {
      console.log("Selected file:", info.file.originFileObj);
      setImageFile(info.file.originFileObj);
    }
  };
  
 

  return (
    <div className="admin-container">
      <h2 className="form-title">Add Product</h2>
      <Form
        className="admin-form"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ category: "Fresh Produce" }}
      >
        <Form.Item
          label="Product Category"
          name="category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select>
            <Option value="Fresh Produce">Fresh Produce</Option>
            <Option value="Meat & Poultry">Meat & Poultry</Option>
            <Option value="Seafood">Seafood</Option>
            <Option value="Dairy & Eggs">Dairy & Eggs</Option>
            <Option value="Bakery">Bakery</Option>
            <Option value="Beverages">Beverages</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please enter the product name!" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          label="Product Unit Price"
          name="price"
          rules={[{ required: true, message: "Please enter the unit price!" }]}
        >
          <InputNumber min={0} placeholder="Enter unit price" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Product Image"
          rules={[{ required: true, message: "Please upload a product image!" }]}
        >
          <Upload
            name="image"
            listType="picture"
            maxCount={1}
            onChange={handleImageChange}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Admin;

*/



//ew worked - but with shared-events
/*import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  Select,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Admin.css";
import { imageDb } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import eventBus from "./shared-events";

const { Option } = Select;

const Admin = ({ onPostData }) => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (info) => {
    const { fileList } = info;
    if (fileList.length === 0) {
      setImageFile(null); // No file selected
    } else {
      const file = fileList[0].originFileObj;
      setImageFile(file); // Set the first file from the list
    }
  };

    const onFinish = async (values) => {
      if (!imageFile) {
        message.error("Please upload a product image!");
        return;
      }

      try {
        const imgRef = ref(imageDb, `productimages/${v4()}`);
        await uploadBytes(imgRef, imageFile);
        const downloadURL = await getDownloadURL(imgRef);

        const newProduct = {
          //...values,
       // imageUrl: downloadURL,
        //price: new Number(values.price).toFixed(2), // Ensure decimal conversion
      // id is not needed as backend generates it
        //id: v4(),
        
          name: values.name,
          category: values.category,
          price: Number(values.price).toFixed(2), // Ensure decimal conversion
          imageUrl: downloadURL,
        };

        // Send new product data to the BFF
        await onPostData(newProduct);

        // Emit new product data to listeners
        // eventBus.emit("addProduct", {
     //   category: values.category,
     //   product: newProduct,
     // }); 

        // Reset the form and clear the image file
        form.resetFields();
        setImageFile(null);

        message.success("Product added successfully!");

        // Navigate to the correct page based on the category
        if (values.category === "Bakery") {
          navigate("/bakery"); // Redirect to BakeryPage if category is Bakery
        } else {
          navigate(`/${values.category.toLowerCase().replace(/\s+/g, "")}`); // Redirect to a category-specific page
        }
      } catch (error) {
        console.error("Error uploading product:", error);
        message.error("Failed to add product. Please try again.");
      }
    };
  

  return (
    <div className="admin-container">
      <h2 className="form-title">Add Product</h2>
      <Form
        className="admin-form"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ category: "Fresh Produce" }}
        form={form}
      >
        <Form.Item
          label="Product Category"
          name="category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select>
            <Option value="Fresh Produce">Fresh Produce</Option>
            <Option value="Meat & Poultry">Meat & Poultry</Option>
            <Option value="Seafood">Seafood</Option>
            <Option value="Dairy & Eggs">Dairy & Eggs</Option>
            <Option value="Bakery">Bakery</Option>
            <Option value="Beverages">Beverages</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Product Name"
          name="name"
          rules={[
            { required: true, message: "Please enter the product name!" },
          ]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          label="Product Unit Price"
          name="price"
          rules={[{ required: true, message: "Please enter the unit price!" }]}
        >
          <InputNumber
            min={0}
            placeholder="Enter unit price"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Product Image"
          rules={[
            { required: true, message: "Please upload a product image!" },
          ]}
        >
          <Upload
            name="image"
            listType="picture"
            maxCount={1}
            onChange={handleImageChange}
            beforeUpload={() => false} // Prevent automatic upload
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Admin;
*/



//witout shared-event.js- all correct and form send the data coorectly. but after submitting the form redirect to a blank page.
import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  Select,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { redirect, useNavigate } from "react-router-dom";
import "./Admin.css";
import { imageDb } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import eventBus from "./shared-events";

const { Option } = Select;

const Admin = ({ onPostData }) => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (info) => {
    const { fileList } = info;
    if (fileList.length === 0) {
      setImageFile(null); // No file selected
    } else {
      const file = fileList[0].originFileObj;
      setImageFile(file); // Set the first file from the list
    }
    console.log("Uploading image file:", imageFile);

  };

  const onFinish = async (values) => {
    if (!imageFile) {
      message.error("Please upload a product image!");
      return;
    }

    try {
      const imgRef = ref(imageDb, `productimages/${v4()}`);
      await uploadBytes(imgRef, imageFile);
      const downloadURL = await getDownloadURL(imgRef);

      const newProduct = {
        name: values.name,
        category: values.category,
        price: Number(values.price).toFixed(2), // Ensure decimal conversion
        imageUrl: downloadURL,
      };

      console.log("Product to Post:", newProduct);

      // Send new product data to the BFF
      await onPostData(newProduct);

      // Emit the product to listeners
    eventBus.emit("productAdded", { category: values.category, product: newProduct });


      // Reset the form and clear the image file
   form.resetFields();
      setImageFile(null);
     
     message.success("Product added successfully!");

      
    } catch (error) {
      console.error("Error uploading product:", error);
      message.error("Failed to add product. Please try again.");
    }
  };

  

  return (
    <div className="admin-container">
      <h2 className="form-title">Add Product</h2>
      <Form
        className="admin-form"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ category: "Fresh Produce" }}
        form={form}
      >
        <Form.Item
          label="Product Category"
          name="category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select>
            <Option value="Fresh Produce">Fresh Produce</Option>
            <Option value="Meat & Poultry">Meat & Poultry</Option>
            <Option value="Seafood">Seafood</Option>
            <Option value="Dairy & Eggs">Dairy & Eggs</Option>
            <Option value="Bakery">Bakery</Option>
            <Option value="Beverages">Beverages</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please enter the product name!" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          label="Product Unit Price"
          name="price"
          rules={[{ required: true, message: "Please enter the unit price!" }]}
        >
          <InputNumber
            min={0}
            placeholder="Enter unit price"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Product Image"
          rules={[
            { required: true, message: "Please upload a product image!" },
          ]}
        >
          <Upload
            name="image"
            listType="picture"
            maxCount={1}
            onChange={handleImageChange}
            beforeUpload={() => false} // Prevent automatic upload
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Admin;
