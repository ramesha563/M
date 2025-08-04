

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaUser, FaIdBadge, FaCog } from "react-icons/fa";
// import "./Profile.css";

// const Profile = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [updated, setUpdated] = useState({ name: "", email: "", number: "", age: "", image: null });
//   const [activeTab, setActiveTab] = useState("dashboard");
//   const [isEditing, setIsEditing] = useState(false);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get("http://localhost:5050/api/auth/profile", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setUser(res.data);
//         localStorage.setItem("user", JSON.stringify(res.data));
//         setUpdated({
//           name: res.data.name || "",
//           email: res.data.email || "",
//           number: res.data.number || "",
//           age: res.data.age?.toString() || "",
//           image: null,
//         });
//       } catch (err) {
//         console.error("Fetch error:", err);
//         alert("Please login again.");
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     if (e.target.name === "image") {
//       setUpdated({ ...updated, image: e.target.files[0] });
//     } else {
//       setUpdated({ ...updated, [e.target.name]: e.target.value });
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", updated.name);
//     formData.append("email", updated.email);
//     formData.append("number", updated.number);
//     formData.append("age", updated.age);
//     if (updated.image) {
//       formData.append("image", updated.image);
//     }
//     try {
//       const res = await axios.put("http://localhost:5050/api/auth/update", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Profile updated!");
//       setUser(res.data);
//       localStorage.setItem("user", JSON.stringify(res.data));
//       window.dispatchEvent(new Event("userChanged"));
//       setIsEditing(false);
//     } catch (err) {
//       console.error("Update error:", err);
//       alert("Update failed.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   if (!user) return <p>Loading profile...</p>;

//   return (
//     <div className="profile-dashboard">
//       <div className="sidebar">
//       <ul>
//         <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
//   <FaUser />
//   <span>Dashboard</span>
// </li>
// <li className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>
//   <FaIdBadge />
//   <span>Profile</span>
// </li>
// <li className={activeTab === "settings" ? "active" : ""} onClick={() => setActiveTab("settings")}>
//   <FaCog />
//   <span>Settings</span>
// </li>

//       </ul>
//       </div>

//       <div className="main-content">
//         {activeTab === "dashboard" && <h2>Welcome, {user.name}!</h2>}

//         {activeTab === "profile" && (
//           <div className="profile-card">
//             <img
//               src={
//                 user.image?.startsWith("http")
//                   ? user.image
//                   : `http://localhost:5050/${user.image}`
//               }
//               alt="Profile"
//             />

//             {!isEditing ? (
//               <>
//                 <p><strong>Name:</strong> {user.name}</p>
//                 <p><strong>Email:</strong> {user.email}</p>
//                 <p><strong>Number:</strong> {user.number}</p>
//                 <p><strong>Age:</strong> {user.age}</p>
//                 <button className="edit-btn" onClick={() => setIsEditing(true)}>
//                   Edit
//                 </button>
//               </>
//             ) : (
//               <>
//                 <h3>Edit Profile</h3>
//                 <form onSubmit={handleUpdate} encType="multipart/form-data">
//                   <input
//                     type="text"
//                     name="name"
//                     value={updated.name}
//                     onChange={handleChange}
//                     placeholder="Name"
//                   />
//                   <input
//                     type="email"
//                     name="email"
//                     value={updated.email}
//                     onChange={handleChange}
//                     placeholder="Email"
//                   />
//                   <input
//                     type="text"
//                     name="number"
//                     value={updated.number}
//                     onChange={handleChange}
//                     placeholder="Phone Number"
//                   />
//                   <input
//                     type="number"
//                     name="age"
//                     value={updated.age}
//                     onChange={handleChange}
//                     placeholder="Age"
//                   />
//                   <input
//                     type="file"
//                     name="image"
//                     accept="image/*"
//                     onChange={handleChange}
//                   />
//                   <button type="submit">Save</button>
//                 </form>
//               </>
//             )}

//             <button className="logout-btn" onClick={handleLogout}>
//               Logout
//             </button>
//           </div>
//         )}

//         {activeTab === "settings" && (
//           <div className="profile-card">
//             <h3>Settings</h3>
//             <p>Theme: Light/Dark (Coming soon...)</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaIdBadge, FaCog } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [updated, setUpdated] = useState({ name: "", email: "", number: "", age: "", image: null });
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        setUpdated({
          name: res.data.name || "",
          email: res.data.email || "",
          number: res.data.number || "",
          age: res.data.age?.toString() || "",
          image: null,
        });
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("Please login again.");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setUpdated({ ...updated, image: e.target.files[0] });
    } else {
      setUpdated({ ...updated, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", updated.name);
    formData.append("email", updated.email);
    formData.append("number", updated.number);
    formData.append("age", updated.age);
    if (updated.image) {
      formData.append("image", updated.image);
    }
    try {
      const res = await axios.put("http://localhost:5050/api/auth/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Profile updated!");
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
      window.dispatchEvent(new Event("userChanged"));
      setIsEditing(false);
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Update failed.");
    }
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   navigate("/login");
  // };
  const handleLogout = () => {
  const confirmed = window.confirm("Are you sure you want to logout?");
  if (!confirmed) return;

  localStorage.removeItem('token');
  localStorage.removeItem('user');
 

  toast.success("Logout successful!");
  setTimeout(() => {
    navigate('/login');
  }, 1900); // 👈 Give toast time to appear
};


  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="profile-dashboard">
      <ToastContainer position="top-right" autoClose={1000} />

      <div className="sidebar">
        <ul>
          <li className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
            <FaUser />
            <span>Dashboard</span>
          </li>
          <li className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>
            <FaIdBadge />
            <span>Profile</span>
          </li>
          <li className={activeTab === "settings" ? "active" : ""} onClick={() => setActiveTab("settings")}>
            <FaCog />
            <span>Settings</span>
          </li>
        </ul>
      </div>

      <div className="main-content">
        {activeTab === "dashboard" && <h2>Welcome, {user.name}!</h2>}

        {activeTab === "profile" && (
          <div className="profile-card">
            <img
              src={
                user.image?.startsWith("http")
                  ? user.image
                  : `http://localhost:5050/${user.image}`
              }
              alt="Profile"
            />

            {!isEditing ? (
              <>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Number:</strong> {user.number}</p>
                <p><strong>Age:</strong> {user.age}</p>
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  Edit
                </button>
              </>
            ) : (
              <>
                <h3>Edit Profile</h3>
                <form onSubmit={handleUpdate} encType="multipart/form-data">
                  <input
                    type="text"
                    name="name"
                    value={updated.name}
                    onChange={handleChange}
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    name="email"
                    value={updated.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    name="number"
                    value={updated.number}
                    onChange={handleChange}
                    placeholder="Phone Number"
                  />
                  <input
                    type="number"
                    name="age"
                    value={updated.age}
                    onChange={handleChange}
                    placeholder="Age"
                  />
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                  />
                  <button type="submit">Save</button>
                </form>
              </>
            )}

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="profile-card">
            <h3>Settings</h3>
            <p>Theme: Light/Dark (Coming soon...)</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
