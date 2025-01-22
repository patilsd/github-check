
// import React, { useState, useEffect } from 'react';
// import { Form, Input, Button, Checkbox, notification, Typography, Switch } from 'antd';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { getErrorMessage } from '../../helper/ErrorHelper';
// import axios from 'axios';

// const { Text } = Typography;

// const LoginForm = () => {
//   const [loading, setLoading] = useState(false);
//   const [useApi, setUseApi] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation(); // Access location object
//   const from = location.state?.from || '/'; // Default to home if no state

//   useEffect(() => {
//     const loginTimestamp = localStorage.getItem('loginTimestamp');
//     const authToken = localStorage.getItem('authToken');

//     if (authToken && loginTimestamp && Date.now() - loginTimestamp < 24 * 60 * 60 * 1000) {
//       navigate('/profile'); 
//     }
//   }, [navigate]);

//   const handleToggleChange = (checked) => {
//     setUseApi(checked);
//   };

//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       if (useApi) {
        
//         const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
//           email: values.email,
//           password: values.password,
//         });
//         if (response.status === 200 && response.data.token) {
//           localStorage.setItem('authToken', response.data.token);
//           localStorage.setItem('loginTimestamp', new Date().getTime().toString());
//           notification.success({
//             message: 'Login Successful',
//             description: 'Welcome back!',
//           });
//           navigate(from, { replace: true }); // Redirect to the previous page
//         }
//       } else {
       
//         const userData = JSON.parse(localStorage.getItem('userData'));
//         console.log("LoginPage",userData)
//         if (userData?.email === values.email && userData?.password === values.password) {
//           notification.success({
//             message: 'Login Successful',
//             description: 'Welcome back!',
//           });
//           localStorage.setItem('loginTimestamp', new Date().getTime().toString());
//           navigate(from, { replace: true }); // Redirect to the previous page
//         } else {
//           notification.error({
//             message: 'Login Failed',
//             description: 'Invalid credentials or no data in local storage.',
//           });
//         }
//       }
//     } catch (error) {
//       notification.error({
//         message: 'Login Failed',
//         description: getErrorMessage(error),
//       });
//     } 
//       setLoading(false);
    
//   };

//   const handleSignUpRedirect = () => {
//     navigate('/signup');
//   };

//   return (
//     <div className="flex justify-between items-center h-screen flex-col lg:flex-row">
//       <div className="flex justify-center items-center w-full lg:w-1/2 h-full rounded-tl-half rounded-br-full bg-teal-500 lg:block hidden">
//         <div className="absolute top-[130px] left-[10px] text-5xl font-bold text-center" style={{ color: '#500073' }}>
//           Let's Get Started
//         </div>
//         <div className="absolute bottom-20 left-40">
//           <img
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh78toDnghPRGnB0AqtxPCmp0Ito0k0_TjtA&s"
//             alt="Profile"
//             className="rounded-full w-50 h-50 object-cover border-4 border-white"
//           />
//         </div>
//       </div>

//       <div className="max-w-2xl border-4 mt-2 border-black-500 bg-white p-8 rounded shadow-md w-full lg:w-full">
//         <div className="mb-4 text-end">
//           <span>Use API</span>
//           <Switch checked={useApi} onChange={handleToggleChange} />
//         </div>

//         <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

//         <Form layout="vertical" onFinish={onFinish} className="space-y-4">
//           <Form.Item
//             label="Email"
//             name="email"
//             rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
//           >
//             <Input className="w-full" />
//           </Form.Item>

//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[{ required: true, message: 'Please input your password!' }]}
//           >
//             <Input.Password className="w-full" />
//           </Form.Item>

//           <Form.Item name="remember" valuePropName="checked">
//             <Checkbox>Remember me</Checkbox>
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>

//         <div className="mt-4 text-center">
//           <Text>
//             Don't have an account?{' '}
//             <a onClick={handleSignUpRedirect} className="text-blue-500 cursor-pointer">
//               Sign Up
//             </a>
//           </Text>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;




import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, notification, Typography, Switch } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { getErrorMessage } from '../../helper/ErrorHelper';
import { useAuth } from '../../components/AuthContext/AuthContext'; 
import axios from 'axios';

const { Text } = Typography;

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [useApi, setUseApi] = useState(true);
  const navigate = useNavigate();
  const location = useLocation(); // Access location object
  const from = location.state?.from || '/'; // Default to home if no state
  const { saveAuthToken } = useAuth(); 
  
  useEffect(() => {
    const loginTimestamp = localStorage.getItem('loginTimestamp');
    const authToken = localStorage.getItem('authToken');

    if (authToken && loginTimestamp && Date.now() - loginTimestamp < 24 * 60 * 60 * 1000) {
      navigate('/profile'); 
    }
  }, [navigate]);

  const handleToggleChange = (checked) => {
    setUseApi(checked);
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const userData = JSON.parse(localStorage.getItem("userData")); // Get data from local storage
  
      if (userData?.email === values.email && userData?.password === values.password) {
        saveAuthToken(values.email); // Update AuthContext with the username
        notification.success({
          message: "Login Successful",
          description: "Welcome back!",
        });
        navigate(from, { replace: true }); // Redirect to the intended page
      } else {
        notification.error({
          message: "Login Failed",
          description: "Invalid credentials or no data in local storage.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Login Failed",
        description: getErrorMessage(error),
      });
    } finally {
      setLoading(false);
    }
  };
  

  const handleSignUpRedirect = () => {
    navigate('/signup');
  };

  return (
    <div className="flex justify-between items-center h-screen flex-col lg:flex-row">
      <div className="flex justify-center items-center w-full lg:w-1/2 h-full rounded-tl-half rounded-br-full bg-teal-500 lg:block hidden">
        <div className="absolute top-[130px] left-[10px] text-5xl font-bold text-center" style={{ color: '#500073' }}>
          Let's Get Started
        </div>
        <div className="absolute bottom-20 left-40">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh78toDnghPRGnB0AqtxPCmp0Ito0k0_TjtA&s"
            alt="Profile"
            className="rounded-full w-50 h-50 object-cover border-4 border-white"
          />
        </div>
      </div>

      <div className="max-w-2xl border-4 mt-2 border-black-500 bg-white p-8 rounded shadow-md w-full lg:w-full">
        <div className="mb-4 text-end">
          <span>Use API</span>
          <Switch checked={useApi} onChange={handleToggleChange} />
        </div>

        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <Form layout="vertical" onFinish={onFinish} className="space-y-4">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Please enter a valid email!' }]}
          >
            <Input className="w-full" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password className="w-full" />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-4 text-center">
          <Text>
            Don't have an account?{' '}
            <a onClick={handleSignUpRedirect} className="text-blue-500 cursor-pointer">
              Sign Up
            </a>
          </Text>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;