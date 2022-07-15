import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ login }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(() => ({ ...formData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(formData);
    if (res.success) {
      navigate("/", { replace: true });
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={formData.username}
          onChange={handleInputChange}
          id="username"
          name="username"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="text"
          value={formData.password}
          onChange={handleInputChange}
          id="password"
          name="password"
        />
      </div>
      <button>Login</button>
    </form>
  );
};

export default Login;
