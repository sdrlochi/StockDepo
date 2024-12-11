import "./Register.css";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const Register = ({ onShowRegister }) => {
  const initialData = {
    name: "",
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
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  const validate = (values) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const errors = {};

    if (!values.name) {
      errors.name = "Name is required";
    }

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

  const handleRegister = async (e) => {
    e.preventDefault();
    const errors = validate(data);
    console.log("Validation errors:", errors);
    setDataErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        console.log("Registering user with data:", data);
        let res = await fetch("http://127.0.0.1:9000/api/v1/auth/register", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        let jsonData = await res.json();
        console.log("Response from server:", jsonData);

        if (res.ok) {
          setLoggedIn(true);
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("token", jsonData.token);
          localStorage.setItem("username", jsonData.username);
          alert("User is created");
          navigate("/dashboard");
        } else {
          alert(jsonData.status);
          navigate("*");
        }
      } catch (err) {
        console.log("Error registering user:", err);
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
        <form className="register-form">
       
          <h1>Register</h1>
          <label htmlFor="name">
            <input
              className="input-register"
              type="name"
              name="name"
              placeholder="Full name"
              value={data.name}
              onChange={handleChange}
            />
          </label>
          {dataErrors?.name && <p>{dataErrors.name}</p>}
          <br />
          <label htmlFor="email">
            <input
              className="input-register"
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
            />
          </label>
          {dataErrors?.email && <p>{dataErrors.email}</p>}
          <br />
          <label htmlFor="password">
            <input
              className="input-register"
              type="password"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
            />
          </label>
          {dataErrors?.password && <p>{dataErrors.password}</p>}
          <br />
          <button
            className="btn-register"
            type="submit"
            onClick={handleRegister}
          >
            Register
          </button>
          <h3>
            Already have an account?{" "}
            <a href="/" onClick={onShowRegister}>
              <strong>Login</strong>
            </a>
          </h3>
        </form>
      )}
    </div>
  );
};
