import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

function LoginPage() {
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login info:', form);
    // TODO
  };

  return (
    <div className="form-container">
      <h1 style={{ textAlign: "center" }}>Welcome Back to RunLink!</h1>
      <p style={{ marginBottom: "20px" }}>Log in to find your next running partner.</p>
      
      {/* Login Form */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          name="Email"
          placeholder="Email"
          value={form.username}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit" style={{ width: "100%" }}>Login</button>
      </form>

      <hr style={{ margin: "30px 0" }} />

      {/* New to RunLink Section */}
      <h2 style={{ textAlign: "center" }}>New to RunLink?</h2>
      <p>Create an account to start finding running friends today!</p>
      <Link to="/register" style={{ textDecoration: "none" }}>
        <button style={{ width: "100%", marginTop: "10px" }}>Sign Up</button>
      </Link>
    </div>
  );
}

export default LoginPage;
