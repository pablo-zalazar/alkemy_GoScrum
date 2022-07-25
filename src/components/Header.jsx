import React from "react";
import "../styles/header.css";
import { useNavigate, Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { logRoles } from "@testing-library/react";

function Header() {
  const navigate = useNavigate();

  const { tasks } = useSelector((state) => state.tasksReducer);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login", { replace: true });
  };

  const loged = () => {
    return localStorage.getItem("token");
  };

  return (
    <>
      {loged() ? (
        <header>
          <Link to="/">
            <img src="/img/goscrum.png" alt="logo" />
          </Link>
          <div className="wrapper_right_header">
            <button
              className="donar"
              onClick={() => navigate("/donate", { replace: true })}
            >
              Donar
            </button>
            <p className="black">areas creadas: {tasks?.length}</p>
            <p className="black">{localStorage.getItem("userName")}</p>
            <button className="exit" onClick={handleLogout}>
              X
            </button>
          </div>
        </header>
      ) : (
        <header>
          <Link to="/login">
            <img src="/img/goscrum.png" alt="logo" />
          </Link>
        </header>
      )}
    </>
  );
}

export default Header;
