import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/home";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import Chat from "../components/chatRoom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

const Routers = () => {
  const [isAuth, setIsAuth] = useState(false);
  const { login } = useContext(AuthContext);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        if (userId) {
          setUid(userId);
        }
      } else {
        // User is not logged in
        console.log("User is not logged in");
      }
    });
  }, []);

  useLayoutEffect(() => {
    const authFun = () => {
      if (login) {
        return true;
      } else {
        return false;
      }
    };

    setIsAuth(authFun);
  }, [login]);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? "You are already login please go to home page" : <Login />
          }
        />
        <Route
          path="/home"
          element={isAuth ? <Home /> : "Sorry You Are Not Login"}
        />
        <Route
          path="/chat"
          element={isAuth ? <Chat userId={uid} /> : "Sorry You Are Not Login"}
        />
      </Routes>
    </Router>
  );
};

export default Routers;
