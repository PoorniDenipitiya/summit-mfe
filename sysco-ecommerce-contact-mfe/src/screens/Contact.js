import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import "./Contact.css";

const Contact = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    // Simulate an API call
    setTimeout(() => {
      message.success("Thank you for contacting us! We will get back to you soon.");
      form.resetFields();
      setLoading(false);
    }, 1500);
  };

  const onFinishFailed = (errorInfo) => {
    message.error("Please complete the required fields.");
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>If you have any questions or feedback, feel free to reach out to us using the form below.</p>
      <Form
        form={form}
        name="contact-form"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className="contact-form"
      >
        <Form.Item
          name="name"
          label="Your Name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Enter your name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Your Email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          name="message"
          label="Your Message"
          rules={[{ required: true, message: "Please enter your message" }]}
        >
          <Input.TextArea rows={4} placeholder="Type your message here" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Contact;
