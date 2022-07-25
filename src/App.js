import "./App.css";
import Login from "./components/views/Login";
import Register from "./components/views/Register";
import Tasks from "./components/views/Tasks";
import Registered from "./components/views/Registered";
import { Donate } from "./components/views/Donate";
import Header from "./components/Header";

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Lazy import
/*
  en vez de cargarlo al cargar el componente, se carga cunado se lo solicita.
  Como esta carga no es inmediata se usa el componente Suspense para que rendecire algo hasta que cargue el componente
*/
import { lazy, Suspense } from "react";
const Error404 = lazy(() => import("./components/views/Error404"));

const RequireAuth = ({ children }) => {
  if (!localStorage.getItem("token"))
    return <Navigate to="/login" replace={true} />;
  return children;
};

const pageTransition = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

export const App = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <RequireAuth>
                  <Tasks />
                </RequireAuth>
              </motion.div>
            }
          />
          <Route
            path="/login"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Login />
              </motion.div>
            }
          />
          <Route
            path="/registro"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Register />
              </motion.div>
            }
          />
          <Route
            path="/donate"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Donate />
              </motion.div>
            }
          />
          <Route
            path="/registered/:teamID"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                <Registered />
              </motion.div>
            }
          />
          <Route
            path="*"
            element={
              <motion.div
                className="page"
                initial="out"
                animate="in"
                exit="out"
                variants={pageTransition}
              >
                {/* fallback es lo que muestra hasta cargar el componente */}
                <Suspense fallback={<>Cargando...</>}>
                  <Error404 />
                </Suspense>
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
};
