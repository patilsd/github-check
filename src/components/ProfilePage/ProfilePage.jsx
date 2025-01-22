
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext/AuthContext";

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { removeAuthToken } = useAuth();

  const [userData, setUserData] = useState(location.state?.userData || {});
  const [activeSection, setActiveSection] = useState("About");
  const [isEditing, setIsEditing] = useState({ About: false, Experience: false, Contact: false });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  

  useEffect(() => {
    // If no user data is found from location, try localStorage as a fallback
    if (!userData || Object.keys(userData).length === 0) {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      } else {
        navigate("/profile");
      }
    }
    console.log("User Data", userData)
  }, [userData, navigate]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleEditToggle = (section) => {
    setIsEditing((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleSaveClick = (section) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setIsEditing((prev) => ({ ...prev, [section]: false }));
  };

  const handleInputChange = (e, field, section, index = null) => {
    console.log("handleInputChange", e.target.value, field, section, index);

    if (section === "experience" && index !== null) {
      const updatedExperience = [...userData.experience];
      updatedExperience[index][field] = e.target.value;
      setUserData({ ...userData, experience: updatedExperience });
    } else if (field.startsWith("contactInfo.")) {
      const contactField = field.split(".")[1];
      setUserData({
        ...userData,
        contactInfo: { ...userData.contactInfo, [contactField]: e.target.value },
      });
    } else {
      setUserData({ ...userData, [field]: e.target.value });
    }
  };


  const handleLogout = () => {
   removeAuthToken();
    localStorage.removeItem('loginTimestamp');

    navigate('/');
  }



  const {
    firstName = "",
    lastName = "",
    email = "",
    gender = "",
    dateOfBirth = "",
    designation = "",
    experience = [{ companyName: "", companyAddress: "" }],
    contactInfo = { phone: "", address: "", website: "" },
  } = userData;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "rgb(17, 23, 39)" }}>
      <div className="flex flex-col ">
        <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Profile Page</h1>
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>

          <div className={`${isMenuOpen ? "block" : "hidden"
            } md:flex md:space-x-4 flex-col md:flex-row absolute md:static top-16 left-0 right-0 bg-blue-900 md:bg-transparent p-4 md:p-0`}
          >

            <button
              onClick={() => navigate('/')}
              className={`px-4 md:px-4 py-2 md:py-2 rounded ${activeSection === "Contact" ? "bg-blue-800" : ""}`}
            >
              Home
            </button>
            <button
              onClick={() => handleSectionChange("About")}
              className={`px-4 py-2 rounded ${activeSection === "About" ? "bg-blue-800" : ""
                }`}
            >
              About
            </button>
            <button
              onClick={() => handleSectionChange("Experience")}
              className={`px-4 md:px-4 py-2 md:py-2 rounded ${activeSection === "Experience" ? "bg-blue-800" : ""}`}
            >
              Experience
            </button>
            <button
              onClick={() => handleSectionChange("Contact")}
              className={`px-4 md:px-4 py-2 md:py-2 rounded ${activeSection === "Contact" ? "bg-blue-800" : ""}`}
            >
              Contact
            </button>
            <button
              className="px-4 md:px-4 py-2 md:py-2 rounded bg-red-500"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <div className="flex flex-col-reverse md:flex-row justify-center items-center  md:space-y-0 md:space-x-4 mt-6 p-4">
          {/* Left Section: Dynamic Content */}
          <div className="p-6 border-4 border-gray-700 mt-4 rounded-lg md:w-2/3 w-full bg-gray-800">
            {activeSection === "About" && (
              <div>
                <h2 className="text-4xl font-bold mb-6 text-yellow-400 flex justify-between items-center">
                  About Me
                  <button
                    className="text-xl text-blue-500 mr-10 hover:underline"
                    onClick={() => handleEditToggle("About")}
                  >
                    {isEditing.About ? "Save" : "Edit"}
                  </button>
                </h2>
                <div className="space-y-4">
                  <div className="flex">
                    <span className="font-semibold text-xl text-white w-40">Name:</span>
                    {isEditing.About ? (
                      <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => handleInputChange(e, "firstName", "About")}
                        className="text-xl text-gray-400 w-full p-2 rounded"
                      />
                    ) : (
                      <span className="text-xl text-gray-400">{`${firstName} ${lastName}`}</span>
                    )}
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-xl text-white w-40">Email:</span>
                    {isEditing.About ? (
                      <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => handleInputChange(e, "email", "About")}
                        className="text-xl text-gray-400 w-full p-2 rounded"
                      />
                    ) : (
                      <span className="text-xl text-gray-400">{email}</span>
                    )}
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-xl text-white w-40">Gender:</span>
                    {isEditing.About ? (
                      <input
                        type="text"
                        name="gender"
                        value={gender}
                        onChange={(e) => handleInputChange(e, "gender", "About")}
                        className="text-xl text-gray-400 w-full p-2 rounded"
                      />
                    ) : (
                      <span className="text-xl text-gray-400">{gender}</span>
                    )}
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-xl text-white w-40">Birth Date:</span>
                    {isEditing.About ? (
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={dateOfBirth}
                        onChange={(e) => handleInputChange(e, "dateOfBirth", "About")}
                        className="text-xl text-gray-400 w-full p-2 rounded"
                      />
                    ) : (
                      <span className="text-xl text-gray-400">{dateOfBirth}</span>
                    )}
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-xl text-white w-40">Designation:</span>
                    {isEditing.About ? (
                      <input
                        type="text"
                        name="designation"
                        value={designation}
                        onChange={(e) => handleInputChange(e, "designation", "About")}
                        className="text-xl text-gray-400 w-full p-2 rounded"
                      />
                    ) : (
                      <span className="text-xl text-gray-400">{designation}</span>
                    )}
                  </div>
                </div>
                {isEditing.About && (
                  <button onClick={() => handleSaveClick("About")} className="mt-4 px-4 py-2 bg-green-500 text-white rounded">
                    Save Changes
                  </button>
                )}
              </div>
            )}

            {activeSection === "Experience" && (
              <div>
                <h2 className="text-4xl font-bold mb-6 text-yellow-400 flex justify-between items-center">
                  Experience
                  <button
                    className="text-xl text-blue-500 hover:underline"
                    onClick={() => handleEditToggle("Experience")}
                  >
                    {isEditing.Experience ? "Save" : "Edit"}
                  </button>
                </h2>
                <ul className="space-y-4">
                  {userData.experience.map((exp, index) => (
                    <li
                      key={index}
                      className="p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700"
                    >
                      <div className="mb-2 flex">
                        <span className="font-semibold text-white w-40 text-xl">Company Name:</span>
                        {isEditing.Experience ? (
                          <input
                            type="text"
                            value={exp.companyName}
                            onChange={(e) => handleInputChange(e, "companyName", "experience", index)}
                            className="text-lg text-gray-900 p-2 rounded"
                          />
                        ) : (
                          <span className="text-gray-400 text-lg">{exp.companyName || "No Company name"}</span>
                        )}
                      </div>
                      <div className="flex">
                        <span className="font-semibold text-white w-40 text-xl">Address:</span>
                        {isEditing.Experience ? (
                          <input
                            type="text"
                            value={exp.companyAddress}
                            onChange={(e) => handleInputChange(e, "companyAddress", "experience", index)}
                            className="text-lg text-gray-900 p-2 rounded"
                          />
                        ) : (
                          <span className="text-gray-400 text-lg">{exp.companyAddress}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeSection === "Contact" && (
              <div>
                <h2 className="text-4xl font-bold mb-6 text-yellow-400 flex justify-between items-center">
                  Contact
                  <button
                    className="text-xl text-blue-500 hover:underline"
                    onClick={() => handleEditToggle("Contact")}
                  >
                    {isEditing.Contact ? "Save" : "Edit"}
                  </button>
                </h2>
                <div className="p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700 space-y-4">
                  <div className="flex">
                    <span className="font-semibold text-white text-xl w-40">Phone:</span>
                    {isEditing.Contact ? (
                      <input
                        type="text"
                        value={userData.contactInfo.phone}
                        onChange={(e) => handleInputChange(e, "contactInfo.phone", "Contact")}
                        className="text-lg text-gray-900 p-2 rounded"
                      />
                    ) : (
                      <span className="text-gray-400 text-lg">{contactInfo.phone}</span>
                    )}
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-white text-xl w-40">Address:</span>
                    {isEditing.Contact ? (
                      <input
                        type="text"
                        value={contactInfo.address}
                        onChange={(e) => handleInputChange(e, "contactInfo.address", "Contact")}
                        className="text-lg text-gray-900 p-2 rounded"
                      />
                    ) : (
                      <span className="text-gray-400 text-lg">{contactInfo.address}</span>
                    )}
                  </div>
                  <div className="flex">
                    <span className="font-semibold text-white text-xl w-40">Website:</span>
                    {isEditing.Contact ? (
                      <input
                        type="text"
                        value={contactInfo.website}
                        onChange={(e) => handleInputChange(e, "contactInfo.website", "Contact")}
                        className="text-lg text-gray-900 p-2 rounded"
                      />
                    ) : (
                      <a
                        href={contactInfo.website}
                        className="text-blue-500 underline text-lg"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {contactInfo.website}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}


          </div>

          {/* Right Section: Static User Image */}
          <div className="flex justify-center items-center w-full md:w-1/2 ">
            <img
              src='/images/profileimage.jpeg'
              alt="Profile"
              className="rounded-full w-48 h-48 md:h-72 md:w-72 object-cover border-4 border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>

  );
};

export default ProfilePage;