import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/main.css';

function RegisterPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    console.log('Register info:', form);
    
    navigate('/profile', { state: form });

  };

  return (
    <div className="form-container">
      <div style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#0066ff", fontSize: "14px" }}>
          Back to Login
        </Link>
      </div>

      <h1 style={{ textAlign: "center" }}>Create Your Account</h1>
      <p style={{ textAlign: "center", marginBottom: "20px" }}>
        Join RunLink and find your next running buddy!
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {/* Name Fields */}
        <input
          name="firstName"
          placeholder="First Name"
          value={form.firstName}
          onChange={handleChange}
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={form.lastName}
          onChange={handleChange}
        />

        {/* Contact Info */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />

        {/* Password Fields */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        {/* Register Button */}
        <button type="submit" style={{ width: "100%", marginTop: "20px" }}>Register</button>
      </form>

      <hr style={{ margin: "30px 0" }} />

      <Link to="/" style={{ textDecoration: "none" }}>
        <button style={{ width: "100%" }}>Back to Login</button>
      </Link>
    </div>
  );
}

export default RegisterPage;
