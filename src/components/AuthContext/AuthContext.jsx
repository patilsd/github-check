// import React, { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const useLocalStorage = import.meta.env.VITE_USE_LOCAL_STORAGE === "true";

//   useEffect(() => {
//     const checkAuthentication = () => {
//       const timestamp = useLocalStorage
//         ? localStorage.getItem("loginTimestamp")
//         : sessionStorage.getItem("loginTimestamp");

//       if (timestamp && Date.now() - parseInt(timestamp, 10) < 24 * 60 * 60 * 1000) {
//         setIsAuthenticated(true);
//       } else {
//         setIsAuthenticated(false);
//       }

//       setLoading(false); // Ensure loading is set to false once check completes
//     };

//     checkAuthentication();
//   }, [useLocalStorage]);

//   const saveAuthToken = (userName) => {
//     const timestamp = Date.now();
//     if (useLocalStorage) {
//       localStorage.setItem("loginTimestamp", timestamp);
//       localStorage.setItem("firstName", userName);
//     } else {
//       sessionStorage.setItem("loginTimestamp", timestamp);
//       sessionStorage.setItem("firstName", userName);
//     }
//     setIsAuthenticated(true);
//   };

//   const removeAuthToken = () => {
//     if (useLocalStorage) {
//       localStorage.removeItem("loginTimestamp");
//       localStorage.removeItem("firstName");
//     } else {
//       sessionStorage.removeItem("loginTimestamp");
//       sessionStorage.removeItem("firstName");
//     }
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, loading, saveAuthToken, removeAuthToken }}>
//       {!loading ? children : <div>Loading...</div>} {/* Avoid rendering children until loading is false */}
//     </AuthContext.Provider>
//   );
// };




import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // const useLocalStorage = import.meta.env.VITE_USE_LOCAL_STORAGE === "true";
  useEffect(() => {
    const checkAuthentication = () => {
      const timestamp = localStorage.getItem("loginTimestamp");
      const firstName = localStorage.getItem("firstName");

      if (timestamp && firstName && Date.now() - parseInt(timestamp, 10) < 24 * 60 * 60 * 1000) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }

      setLoading(false); // Ensure loading is set to false once check completes
    };

    checkAuthentication();
  }, []);


  const saveAuthToken = (userName) => {
    const timestamp = Date.now();
    localStorage.setItem("loginTimestamp", timestamp);
    localStorage.setItem("firstName", userName);
    setIsAuthenticated(true);
  };

  const removeAuthToken = () => {
    localStorage.removeItem("loginTimestamp");
    localStorage.removeItem("firstName");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, saveAuthToken, removeAuthToken }}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};