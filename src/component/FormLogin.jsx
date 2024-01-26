
import React, { useState } from "react";

const FormLogin = ({ handleLogin }) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = () => {
    if (user.username === "" || user.password === "") {
      setError("Username dan Password Tidak Boleh Kosong!");
      return;
    }

    // Pass the user data to the parent component for handling the login
    handleLogin(user);
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        placeholder="Username"
        onChange={(e) => handleChange("username", e.target.value)}
      />
      <input
        placeholder="Password"
        type={showPassword ? "text" : "password"}
        onChange={(e) => handleChange("password", e.target.value)}
      />
      <label>
        Show Password
        <input
          type="checkbox"
          checked={showPassword}
          onChange={handleTogglePassword}
        />
      </label>
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
};

export default FormLogin;
