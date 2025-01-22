// import React, { useState, useEffect } from "react";
// import { Dropdown, Menu, Drawer, message, Spin } from "antd";
// import { DownOutlined, SearchOutlined, UserOutlined, ShoppingCartOutlined, MenuOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from '../../components/AuthContext/AuthContext';
// import { useCart } from './CartContext';

// const Navbar = () => {
//     const [visible, setVisible] = useState(false);
//     const { cartCount } = useCart();
//     const navigate = useNavigate();
//     const { isAuthenticated, loading } = useAuth();
//     const [userName, setUserName] = useState('');

//     useEffect(() => {
//         const username = localStorage.getItem('firstName') || sessionStorage.getItem('firstName');
//         console.log("Auth state Changed:", isAuthenticated);
//         if (username) setUserName(username);
//     }, [isAuthenticated]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     const handleCartClick = () => {
//         if (!isAuthenticated) {
//             message.warning('Please log in to access the cart.');
//             navigate('/login');
//         } else {
//             navigate('/cart');
//         }
//     };

//     const handleProfileClick = () => {
//         if (isAuthenticated) {
//             navigate('/profile');
//         } else {
//             message.warning('Please log in to view your profile.');
//             navigate('/login');
//         }
//     };

//     const menu = (
//         <Menu>
           
//         </Menu>
//     );

//     const showDrawer = () => setVisible(true);
//     const closeDrawer = () => setVisible(false);

//     const NavigationLinks = ({ isDrawer = false }) => (
//         <>
//             <div className="flex items-center">
//                 <span className={`text-gray-800 font-medium ${isDrawer ? 'text-lg' : 'text-xl'}`}>Swiggy Corporate</span>
//             </div>
//             <div className="flex items-center">
//                 <SearchOutlined className={`text-gray-800 mr-2 ${isDrawer ? 'text-lg' : 'text-xl'}`} />
//                 <span className={`text-gray-800 font-medium ${isDrawer ? 'text-lg' : 'text-xl'}`}>Search</span>
//             </div>
//         </>
//     );
//     console.log("Navbar re-rendered. Authenticated:", isAuthenticated);

//     return (
//         <div className="bg-white shadow-md py-3 px-6">
//             <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4 md:space-x-12">
//                     <img
//                         src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk50Ut-wJKwbca3BTPssDUl_fqnsEE_D2tcw&s'
//                         alt="Swiggy Logo"
//                         className="w-16 h-16 rounded-xl"
//                     />
//                     <Dropdown overlay={menu} trigger={['click']}>
//                         <div className="flex items-center cursor-pointer">
//                             <span className="text-gray-600 font-extrabold">Other</span>
//                             <DownOutlined className="ml-4 text-orange-600 font-extrabold text-lg" />
//                         </div>
//                     </Dropdown>
//                 </div>

//                 <div className="hidden md:flex items-center space-x-8">
//                     <div className="flex items-center">
//                         <span className="text-gray-800 font-medium text-xl">Swiggy Corporate</span>
//                     </div>
//                     <div className="flex items-center">
//                         <SearchOutlined className="text-xl text-gray-800 mr-2" />
//                         <span className="text-gray-800 font-medium text-xl">Search</span>
//                     </div>
//                     <div className="flex items-center">
//                         <img
//                             src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOq9jCIZLTV9PhvgX_Y-oj6MUjba9Vm37q2g&s'
//                             alt="offer"
//                             className="w-6 h-6 mr-3 rounded-xl"
//                         />
//                         <span className="text-gray-800 font-medium text-xl">Offers</span>
//                         <span className="text-orange-400 ml-1 text-xs font-semibold">NEW</span>
//                     </div>
//                     <div className="flex items-center">
//                         <img
//                             src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQptfrI5OTbZx7VCYu9GdjBiC5GzdtdVsS5Vw&s'
//                             alt="offer"
//                             className="w-6 h-6 mr-3 rounded-xl"
//                         />
//                         <span className="text-gray-800 font-medium text-xl">Help</span>
//                     </div>

//                     {isAuthenticated ? (
//                         <div className="flex items-center">
//                             <UserOutlined className="text-gray-800 text-lg mr-2" />
//                             <span className="text-gray-800 font-medium text-xl">{userName}</span>
//                             <button
//                                 className="text-gray-800 font-medium text-xl ml-4"
//                                 onClick={handleProfileClick}
//                             >
//                                 Profile
//                             </button>
//                         </div>
//                     ) : (
//                         <div className="flex items-center" onClick={() => navigate('/login')}>
//                             <UserOutlined className="text-gray-800 text-lg mr-2" />
//                             <button className="text-gray-800 font-medium text-xl">Sign In</button>
//                         </div>
//                     )}

//                     <div onClick={handleCartClick} className="flex items-center cursor-pointer">
//                         <ShoppingCartOutlined className="text-gray-800 text-lg mr-2 text-xl" />
//                         <span className="text-gray-800 font-medium text-xl">Cart</span>
//                         <span className="ml-1 text-gray-800">({cartCount})</span>
//                     </div>
//                 </div>

//                 <div className="md:hidden flex items-center">
//                     <MenuOutlined onClick={showDrawer} className="text-gray-800 text-2xl" />
//                 </div>
//             </div>

//             <Drawer
//                 title="Navigation"
//                 placement="right"
//                 onClose={closeDrawer}
//                 visible={visible}
//                 width={250}
//             >
//                 <div className="flex flex-col space-y-4">
//                     <div className="flex items-center">
//                         <span className="text-gray-800 font-medium text-lg">Swiggy Corporate</span>
//                     </div>
//                     <div className="flex items-center">
//                         <SearchOutlined className="text-xl text-gray-800 mr-2" />
//                         <span className="text-gray-800 font-medium text-lg">Search</span>
//                     </div>
//                     <div className="flex items-center">
//                         <img
//                             src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOq9jCIZLTV9PhvgX_Y-oj6MUjba9Vm37q2g&s'
//                             alt="offer"
//                             className="w-6 h-6 mr-3 rounded-xl"
//                         />
//                         <span className="text-gray-800 font-medium text-lg">Offers</span>
//                     </div>
//                     <div className="flex items-center">
//                         <img
//                             src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQptfrI5OTbZx7VCYu9GdjBiC5GzdtdVsS5Vw&s'
//                             alt="offer"
//                             className="w-6 h-6 mr-3 rounded-xl"
//                         />
//                         <span className="text-gray-800 font-medium text-lg">Help</span>
//                     </div>

//                     {isAuthenticated ? (
//                         <div className="flex items-center">
//                             <UserOutlined className="text-gray-800 text-lg mr-2" />
//                             <span className="text-gray-800 font-medium text-lg">{userName}</span>
//                             <button
//                                 className="text-gray-800 font-medium text-lg ml-4"
//                                 onClick={handleProfileClick}
//                             >
//                                 Profile
//                             </button>
//                         </div>
//                     ) : (
//                         <div className="flex items-center" onClick={() => navigate('/login')}>
//                             <UserOutlined className="text-gray-800 text-lg mr-2" />
//                             <button className="text-gray-800 font-medium text-lg">Sign In</button>
//                         </div>
//                     )}

//                     <div onClick={handleCartClick} className="flex items-center cursor-pointer">
//                         <ShoppingCartOutlined className="text-gray-800 text-lg mr-2 text-xl" />
//                         <span className="text-gray-800 font-medium text-xl">Cart</span>
//                         <span className="ml-1 text-gray-800">({cartCount})</span>
//                     </div>
//                 </div>
//             </Drawer>
//         </div>
//     );
// };

// export default Navbar;


import React, { useState, useEffect } from "react";
import { Dropdown, Menu, Drawer, message, Spin } from "antd";
import { DownOutlined, SearchOutlined, UserOutlined, ShoppingCartOutlined, MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../components/AuthContext/AuthContext';
import { useCart } from './CartContext';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const { isAuthenticated, loading } = useAuth();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const username = localStorage.getItem('firstName') || sessionStorage.getItem('firstName');
        console.log("Auth state Changed:", isAuthenticated);
        if (username) setUserName(username);
    }, [isAuthenticated]);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleCartClick = () => {
        if (!isAuthenticated) {
            message.warning('Please log in to access the cart.');
            navigate('/login');
        } else {
            navigate('/cart');
        }
    };

    const handleProfileClick = () => {
        if (isAuthenticated) {
            navigate('/profile');
        } else {
            message.warning('Please log in to view your profile.');
            navigate('/login');
        }
    };

    const menu = (
        <Menu>
           
        </Menu>
    );

    const showDrawer = () => setVisible(true);
    const closeDrawer = () => setVisible(false);

    const NavigationLinks = ({ isDrawer = false }) => (
        <>
            <div className="flex items-center">
                <span className={`text-gray-800 font-medium ${isDrawer ? 'text-lg' : 'text-xl'}`}>Swiggy Corporate</span>
            </div>
            <div className="flex items-center">
                <SearchOutlined className={`text-gray-800 mr-2 ${isDrawer ? 'text-lg' : 'text-xl'}`} />
                <span className={`text-gray-800 font-medium ${isDrawer ? 'text-lg' : 'text-xl'}`}>Search</span>
            </div>
        </>
    );
    console.log("Navbar re-rendered. Authenticated:", isAuthenticated);

    return (
        <div className="bg-white shadow-md py-3 px-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 md:space-x-12">
                    <img
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk50Ut-wJKwbca3BTPssDUl_fqnsEE_D2tcw&s'
                        alt="Swiggy Logo"
                        className="w-16 h-16 rounded-xl"
                    />
                    <Dropdown overlay={menu} trigger={['click']}>
                        <div className="flex items-center cursor-pointer">
                            <span className="text-gray-600 font-extrabold">Other</span>
                            <DownOutlined className="ml-4 text-orange-600 font-extrabold text-lg" />
                        </div>
                    </Dropdown>
                </div>

                <div className="hidden md:flex items-center space-x-8">
                    <div className="flex items-center">
                        <span className="text-gray-800 font-medium text-xl">Swiggy Corporate</span>
                    </div>
                    <div className="flex items-center">
                        <SearchOutlined className="text-xl text-gray-800 mr-2" />
                        <span className="text-gray-800 font-medium text-xl">Search</span>
                    </div>
                    <div className="flex items-center">
                        <img
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOq9jCIZLTV9PhvgX_Y-oj6MUjba9Vm37q2g&s'
                            alt="offer"
                            className="w-6 h-6 mr-3 rounded-xl"
                        />
                        <span className="text-gray-800 font-medium text-xl">Offers</span>
                        <span className="text-orange-400 ml-1 text-xs font-semibold">NEW</span>
                    </div>
                    <div className="flex items-center">
                        <img
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQptfrI5OTbZx7VCYu9GdjBiC5GzdtdVsS5Vw&s'
                            alt="offer"
                            className="w-6 h-6 mr-3 rounded-xl"
                        />
                        <span className="text-gray-800 font-medium text-xl">Help</span>
                    </div>

                    {isAuthenticated ? (
                        <div className="flex items-center">
                            <UserOutlined className="text-gray-800 text-lg mr-2" />
                            {/* <span className="text-gray-800 font-medium text-xl">{userName}</span> */}
                            <button
                                className="text-gray-800 font-medium text-xl"
                                onClick={handleProfileClick}
                            >
                                Profile
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center" onClick={() => navigate('/login')}>
                            <UserOutlined className="text-gray-800 text-lg mr-2" />
                            <button className="text-gray-800 font-medium text-xl">Sign In</button>
                        </div>
                    )}

                    <div onClick={handleCartClick} className="flex items-center cursor-pointer">
                        <ShoppingCartOutlined className="text-gray-800 text-lg mr-2 text-xl" />
                        <span className="text-gray-800 font-medium text-xl">Cart</span>
                        <span className="ml-1 text-gray-800">({cartCount})</span>
                    </div>
                </div>

                <div className="md:hidden flex items-center">
                    <MenuOutlined onClick={showDrawer} className="text-gray-800 text-2xl" />
                </div>
            </div>

            <Drawer
                title="Navigation"
                placement="right"
                onClose={closeDrawer}
                visible={visible}
                width={250}
            >
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                        <span className="text-gray-800 font-medium text-lg">Swiggy Corporate</span>
                    </div>
                    <div className="flex items-center">
                        <SearchOutlined className="text-xl text-gray-800 mr-2" />
                        <span className="text-gray-800 font-medium text-lg">Search</span>
                    </div>
                    <div className="flex items-center">
                        <img
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOq9jCIZLTV9PhvgX_Y-oj6MUjba9Vm37q2g&s'
                            alt="offer"
                            className="w-6 h-6 mr-3 rounded-xl"
                        />
                        <span className="text-gray-800 font-medium text-lg">Offers</span>
                    </div>
                    <div className="flex items-center">
                        <img
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQptfrI5OTbZx7VCYu9GdjBiC5GzdtdVsS5Vw&s'
                            alt="offer"
                            className="w-6 h-6 mr-3 rounded-xl"
                        />
                        <span className="text-gray-800 font-medium text-lg">Help</span>
                    </div>

                    {isAuthenticated ? (
                        <div className="flex items-center">
                            <UserOutlined className="text-gray-800 text-lg mr-2" />
                            <span className="text-gray-800 font-medium text-lg">{userName}</span>
                            <button
                                className="text-gray-800 font-medium text-lg ml-4"
                                onClick={handleProfileClick}
                            >
                                Profile
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center" onClick={() => navigate('/login')}>
                            <UserOutlined className="text-gray-800 text-lg mr-2" />
                            <button className="text-gray-800 font-medium text-lg">Sign In</button>
                        </div>
                    )}

                    <div onClick={handleCartClick} className="flex items-center cursor-pointer">
                        <ShoppingCartOutlined className="text-gray-800 text-lg mr-2 text-xl" />
                        <span className="text-gray-800 font-medium text-xl">Cart</span>
                        <span className="ml-1 text-gray-800">({cartCount})</span>
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default Navbar;
