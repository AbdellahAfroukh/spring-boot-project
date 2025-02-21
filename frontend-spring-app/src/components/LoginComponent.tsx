import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("api/auth/authenticate", formData);
      alert("Login successful!");
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Login failed:", error.response?.data || error.message);
      } else {
        console.error("Login failed:", error);
      }
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-5 bg-light w-40">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary mt-2">
            Login
          </button>
        </form>
        <div className="mt-3 text-center">
          <p className="mb-0">Don't have an account?</p>
          <Link to="/register" className="text-primary">
            Create new account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
