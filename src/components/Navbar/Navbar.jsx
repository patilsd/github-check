import { useAuth } from '../AuthContext/AuthContext'; 
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    localStorage.removeItem('authToken'); 
    navigate("/login"); 
  };

  return (
    <nav className="bg-blue-900 text-white p-4 flex items-center justify-between shadow-lg">
      <h1 className="text-2xl font-bold">My Application</h1>
      <div className="space-x-4">
        {isAuthenticated ? (
          <button
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 transition"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <>
            <button
              className="px-4 py-2 rounded bg-green-600 hover:bg-green-800 transition"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="px-4 py-2 rounded bg-green-600 hover:bg-green-800 transition"
              onClick={() => navigate("/")}
            >
              Signup
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
