import React from "react";
import "../styles/header.css";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

function Header() {
  const navigate = useNavigate();

  const { tasks } = useSelector((state) => state.tasksReducer);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login", { replace: true });
  };
  return (
    <header>
      <img src="/img/goscrum.png" alt="logo" />
      <div className="wrapper_right_header">
        <div>
          <button onClick={() => navigate("/donate", { replace: true })}>
            Donar
          </button>
        </div>
        <div className="black">areas creadas: {tasks?.length}</div>
        <div className="lack">{localStorage.getItem("userName")}</div>
        <div onClick={handleLogout}>X</div>
      </div>
    </header>
  );
}

export default Header;
