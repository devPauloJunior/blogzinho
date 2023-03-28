// MEUS CSS
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'

// MEUS CONTEXTOS
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";


// hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./hooks/useAuthentication";

// MEUS IMPORTS
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Footer from "./components/Footer";
import CreatePost from "./pages/CreatePost/CreatePost";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";

// context
import { AuthProvider } from "./context/AuthContext";
import NavBar from "./components/NavBar";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();
  console.log(auth)
  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={ <Register /> } />
              <Route path="/post/create" element={ <CreatePost /> } />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
