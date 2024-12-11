import "./Login.css";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const Login = ({ onShowRegister }) => {
  const initialData = {
    email: "",
    password: "",
  };

  const [data, setData] = useState(initialData);
  const [loggedIn, setLoggedIn] = useState(false);
  const [dataErrors, setDataErrors] = useState({});
  const [username, setUsername] = useState("");
  const [decodedToken, setDecodedToken] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const validate = (values) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const errors = {};
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 8) {
      errors.password = "Password should be at least 8 characters";
    }
    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = validate(data);
    setDataErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        let res = await fetch("http://127.0.0.1:9000/api/v1/auth/login", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        let jsonData = await res.json();

        if (res.ok) {
          setLoggedIn(true);
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("token", jsonData.token);
          localStorage.setItem("username", jsonData.username);
          alert(`Welcome, ${jsonData.username}!`);
          navigate("/dashboard");
        } else {
          alert(jsonData.status);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    const username = localStorage.getItem("username");
    if (username) {
      setUsername(username);
    }

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }

    setLoggedIn(isLoggedIn);
  }, []);

  return (
    <div>
      
      {Object.keys(dataErrors).length === 0 && loggedIn ? (
        <Navigate to="/dashboard" />
      ) : (
        <form className="login-form">
     
          <h1>Login</h1>
          <label>
            <input
              className="input-login"
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
            />
          </label>
          {dataErrors?.email && <p>{dataErrors.email}</p>}
          <br />
          <label>
            <input
              className="input-login"
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
            />
          </label>
          {dataErrors?.password && <p>{dataErrors.password}</p>}
          <br />
          <button className="btn-login" type="submit" onClick={handleLogin}>
            Login
          </button>
          <h3>
            Don't have an account?{" "}
            <a href="#" onClick={onShowRegister}>
              <strong>Register</strong>
            </a>
          </h3>
        </form>
      )}
    </div>
  );
};
