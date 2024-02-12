import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import FormLogin from "../component/FormLogin";
import Swal from 'sweetalert2';
import config from "../config";

const handleKeyPress = (e, handleLogin, userData) => {
  if (e.key === 'Enter') {
    handleLogin(userData);
  }
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (userData) => {
    try {
      const response = await fetch(`${config.apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setLoggedIn(true);
        navigate("/Input"); 
        Swal.fire({
          title: 'Login Successful!',
          text: 'You have successfully logged in.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        setError(data.message || 'Login failed');
        Swal.fire({
          title: 'Login Failed!',
          text: data.message || 'Login failed',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Error during login. Please try again.');
      Swal.fire({
        title: 'Error!',
        text: 'Error during login. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedIn(false);
    navigate("/", { replace: true }); // Redirect to the login page and replace the current history entry
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Container className="mt-5">
      <h1 className="text-center display-4">
        <strong>Welcome Admin!</strong>
      </h1>
      {loggedIn ? (
        <>
          <p className="text-center lead">You are already logged in.</p>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <p className="text-center lead">
            To ensure your identity, please fill out the following form:
          </p>
          <hr className="featurette-divider" />
          <FormLogin handleLogin={handleLogin} handleKeyPress={(e) => handleKeyPress(e, handleLogin, userData)} />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </>
      )}
    </Container>
  );
};

export default LoginPage;
