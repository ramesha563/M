
// import { useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ResetPassword = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();

//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleReset = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//       const res = await axios.post(`http://localhost:5050/api/auth/reset-password/${token}`, { password });
//       setMessage(res.data.message || "Password reset successful!");

//       // ✅ Clear the inputs
//       setPassword('');
//       setConfirmPassword('');

//       // ✅ Redirect to login after 2 seconds
//       setTimeout(() => {
//         navigate('/login');
//       }, 2000);
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Reset failed or token expired.');
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Reset Password</h2>
//       <form onSubmit={handleReset}>
//         <input
//           type="password"
//           placeholder="New Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Reset</button>
//       </form>

//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default ResetPassword;


import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { FaLock } from 'react-icons/fa';
import './Login.css'; // Reuse same CSS

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5050/api/auth/reset-password/${token}`, { password });
      setMessage(res.data.message || "Password reset successful!");

      setPassword('');
      setConfirmPassword('');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Reset failed or token expired.');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleReset} className="login-form">
        <img src="/reset.gif" alt="Reset Password" className="login-gif" />

        <div className="input-group password-wrapper">
          <FaLock className="icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="toggle-eye" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        <div className="input-group password-wrapper">
          <FaLock className="icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span className="toggle-eye" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>

        <button type="submit">Reset</button>

        {message && <p style={{ textAlign: 'center', color: '#0a1a2d', marginTop: '10px' }}>{message}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
