import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/home";
import { useContext, useLayoutEffect, useState } from "react";
import { AuthContext } from "../AuthContext";

const Routers = () => {
  const [isAuth, setIsAuth] = useState(false);
  const { login } = useContext(AuthContext);

  useLayoutEffect(() => {
    const auth = () => {
      if (login) {
        return true;
      } else {
        return false;
      }
    };

    setIsAuth(auth);
  }, [login]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={isAuth ? <Home /> : "Sorry You Are Not Login"}
        />
      </Routes>
    </Router>
  );
};

export default Routers;
