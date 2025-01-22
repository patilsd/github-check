

import React, { useState } from 'react';
import { Form, Input, Button, Rate, notification, Switch, DatePicker, Select } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getErrorMessage } from '../../helper/ErrorHelper';


const { Option } = Select;

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [useApi, setUseApi] = useState(true);
  const navigate = useNavigate();

  const handleToggleChange = (checked) => {
    setUseApi(checked);
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const userData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password:values.password,
        gender: values.gender,
        dateOfBirth: values.dateOfBirth.format('YYYY-MM-DD'),
        designation: values.designation,
        ratings: values.rating,
        experience: values.companyName
          ? [
              {
                companyName: values.companyName,
                companyAddress: values.companyAddress,
              },
            ]
          : [],
        contactInfo: {
          phone: values.phone,
          address: values.address,
          website: values.website,
        },
      };

      if (useApi) {
        const response = await axios.post('/auth/sign-up', userData);

        if (response.status === 201) {
          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
          }

          localStorage.setItem('loginTimestamp', new Date().getTime().toString());

          notification.success({
            message: 'Success',
            description: 'User created successfully! Redirecting to profile...',
          });

          navigate('/profile');
        }
      } else {
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('loginTimestamp', new Date().getTime().toString());

        notification.success({
          message: 'Success',
          description: 'User created successfully in local storage! Redirecting to profile...',
        });

        navigate('/profile');
      }
    } catch (error) {
      const errorMsg = getErrorMessage(error);
      notification.error({
        message: 'Error',
        description: errorMsg,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col lg:flex-row">
      <div className="flex justify-center items-center w-full lg:w-1/2 h-full rounded-br-full bg-teal-500 lg:block hidden">
        <div className="absolute top-[130px] left-[10px] text-5xl font-bold text-center" style={{ color: '#500073' }}>
          Let us Know About You!
        </div>
        <div className="absolute bottom-20 left-40">
          <img
            src="/images/signupImage.jpg"
            alt="Profile"
            className="rounded-full w-50 h-50 object-cover border-4 border-white"
          />
        </div>
      </div>
      <div className="max-w-2xl p-6 w-full h-full overflow-y-auto border border-gray-300 rounded-lg shadow-32xl">
        <div className="mb-4 flex justify-end items-center">
          <span>Use API</span>
          <Switch checked={useApi} onChange={handleToggleChange} />
        </div>
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <Form name="userForm" layout="vertical" onFinish={onFinish}>
          {/* Form Fields */}
          <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please input your First name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: 'Please input your Last name!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            label={<span className="text-lg text-blue-600 font-bold" style={{ color: '#500073' }}>Email</span>}
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input className="border-gray-300 rounded-md p-2" placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label={<span className="text-lg text-blue-600 font-bold" style={{ color: '#500073' }}>Phone</span>}
            name="phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input className="border-gray-300 rounded-md p-2" placeholder="Enter your phone number" />
          </Form.Item>

          <Form.Item
            label={<span className="text-lg text-blue-600 font-bold" style={{ color: '#500073' }}>Address</span>}
            name="address"
            rules={[{ required: true, message: 'Please input your address!' }]}
          >
            <Input className="border-gray-300 rounded-md p-2" placeholder="Enter your address" />
          </Form.Item>

          <Form.Item
            label={<span className="text-lg text-blue-600 font-bold" style={{ color: '#500073' }}>Date of Birth</span>}
            name="dateOfBirth"
            rules={[{ required: true, message: 'Please input your date of birth!' }]}
          >
            <DatePicker className="w-full border-gray-300 rounded-md p-2" />
          </Form.Item>

          <Form.Item
            label={<span className="text-lg text-blue-600 font-bold" style={{ color: '#500073' }}>Gender</span>}
            name="gender"
            rules={[{ required: true, message: 'Please select your gender!' }]}
          >
            <Select className="border-gray-300 rounded-md p-2 h-12" placeholder="Select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={<span className="text-lg font-bold" style={{ color: '#500073' }}>Designation</span>}
            name="designation"
            rules={[{ required: true, message: 'Please input your designation!' }]}
          >
            <Input className="border-gray-300 rounded-md p-2" placeholder="Enter your designation" />
          </Form.Item>

          <Form.Item
            label={<span className="text-lg font-bold" style={{ color: '#500073' }}>Company Name</span>}
            name="companyName"
            rules={[{ required: true, message: 'Please input your company name!' }]}
          >
            <Input className="border-gray-300 rounded-md p-2" placeholder="Enter your company name" />
          </Form.Item>

          <Form.Item
            label={<span className="text-lg font-bold" style={{ color: '#500073' }}>Company Address</span>}
            name="companyAddress"
            rules={[{ required: true, message: 'Please input your company address!' }]}
          >
            <Input className="border-gray-300 rounded-md p-2" placeholder="Enter your company address" />
          </Form.Item>

          <Form.Item
            label={<span className="text-lg font-bold" style={{ color: '#500073' }}>Website</span>}
            name="website"
            rules={[{ required: true, message: 'Please input your website!' }]}
          >
            <Input className="border-gray-300 rounded-md p-2" placeholder="Enter your website" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
            </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-4 text-center">
          <span>Already have an account? </span>
          <Link to="/login" className="text-blue-500">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm