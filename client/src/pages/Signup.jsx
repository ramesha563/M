import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';


import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaLock, FaImage } from 'react-icons/fa';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // 👁️ Toggle state

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    number: '',
    age: '',
    image: null
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('password', form.password);
    formData.append('number', form.number);
    formData.append('age', form.age);
    if (form.image) formData.append('image', form.image); // ✅ Only if selected

    try {
      const res = await axios.post('http://localhost:5050/api/auth/register', formData);

      toast.success("Signup successful!", { position: 'top-center' });

      setForm({
        name: '',
        email: '',
        password: '',
        number: '',
        age: '',
        image: null
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      window.dispatchEvent(new Event("userChanged"));

      setTimeout(() => {
        navigate("/profile");
      }, 2000);

    } catch (err) {
      toast.error("Signup failed! " + (err.response?.data?.message || err.message), {
        position: 'top-center'
      });
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="signup-form">
          <img src="/sign-up.gif" alt="Signup Animation" className="signup-gif" />


       <div className="input-group">
          <FaUser className="icon" />
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        </div>

        <div className="input-group">
          <FaEnvelope className="icon" />
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        </div>

        <div className="input-group password-wrapper">
          <FaLock className="icon" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <span className="toggle-eye" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>



{/* 
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <span className="toggle-eye" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div> */}

        <div className="input-group">
          <FaPhone className="icon" />
          <input type="text" name="number" value={form.number} onChange={handleChange} placeholder="Phone Number" required />
        </div>

        <div className="input-group">
          <FaBirthdayCake className="icon" />
          <input type="number" name="age" value={form.age} onChange={handleChange} placeholder="Age" required />
        </div>

        <div className="input-group">
      
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
        </div>

        <button type="submit">Sign Up</button>

          {/* 🔗 Slogin */}
      <p className="login-text">
         Already have an account?{" "}
        <Link to="/login" className="login-link">
          Login
        </Link>
      </p>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Signup;
