import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./services/FirebaseConfig";
import LoginPage from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

const App = () => {
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
