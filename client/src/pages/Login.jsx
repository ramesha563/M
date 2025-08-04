import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi"; // 
import { FaEnvelope, FaLock,  } from 'react-icons/fa';
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5050/api/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      window.dispatchEvent(new Event("userChanged"));

      toast.success("Login successful!");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="auth-container">
         <form onSubmit={handleLogin} className="login-form">
      <img src="/login.gif" alt="login Animation" className="login-gif" />


<div className="input-group">
        <FaEnvelope className="icon" />
 
  <input
    type="email"
    name="email"
    placeholder="Email"
    required
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</div>

<div className="input-group password-wrapper">
  {/* <i className="icon">{showPassword ? <FiEyeOff /> : <FiEye />}</i> */}
            <FaLock className="icon" />
  <input
    type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    required
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <span className="toggle-eye" onClick={() => setShowPassword(!showPassword)}>
    {showPassword ? <FiEyeOff /> : <FiEye />}
  </span>
</div>

        {/* 🔗 Forgot Password */}
        <div className="forgot-link">
          <Link to="/forgot-password">Forgot your password?</Link>
        </div>

        <button type="submit">Login</button>
        
      {/* 🔗 Signup */}
      <p className="signup-text">
        Don’t have an account?{" "}
        <Link to="/signup" className="signup-link">
          Sign up
        </Link>
      </p>

      </form>

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}

export default Login;
