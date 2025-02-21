import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
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
      const response = await axios.post("/api/auth/register", formData);
      alert("Registration successful!");
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Registration failed:",
          error.response?.data || error.message
        );
      } else {
        console.error("Registration failed:", error);
      }
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-5 bg-light w-50">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
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
            Register
          </button>
        </form>
        <div className="mt-3 text-center">
          <p className="mb-0">Already have an account?</p>
          <Link to="/Login" className="text-primary">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
