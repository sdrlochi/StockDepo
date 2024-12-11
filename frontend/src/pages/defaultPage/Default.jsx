import "./Default.css";
import React, { useState } from "react";
import { Login } from "../../components/login/Login";
import { Register } from "../../components/register/Register";

export const Default = () => {
  const [showRegister, setShowRegister] = useState(false);

  const handleShow = () => {
    setShowRegister(true);
  };

  return (
    <>
      <div className="login-register">
        {showRegister ? <Register /> : <Login onShowRegister={handleShow} />}
      </div>
    </>
  );
};
