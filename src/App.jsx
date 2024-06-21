import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Navigate } from "react-router-dom";


import "./App.css";
import Home from "./Pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Characters from "./Pages/Characters";
import Favorites from "./Pages/Favorites";
import Comics from "./Pages/Comics";
import Character from "./Pages/Character";
import Favorite from "./Pages/Favorite";
import Comic from "./Pages/Comic";
import Modal from "./components/Modal";
import { useState } from "react";

const url = import.meta.env.VITE_APP_BACK_URL

function App() {
  const [modalVisibility, setmodalVisibility] = useState({login:false, signup:false});
  
  return (
    <Router>
      <Header modalVisibility={modalVisibility} setModalVisibility={setmodalVisibility}/>
      <Routes>
        <Route path="/" element={<Home url={url}/>}></Route>
        <Route path="/characters" element={<Characters url={url}/>}></Route>
        <Route path="/characters/:id" element={<Character url={url}/>}></Route>

        <Route path="/favorites" element={<Favorites url={url}/>}></Route>
        <Route path="/favorites/:id" element={<Favorite url={url}/>}></Route>

        <Route path="/comics" element={<Comics url={url}/>}></Route>
        <Route path="/comics/:id" element={<Comic url={url}/>}></Route>
        <Route path="*" element={<Navigate to="/"/>}></Route>



      </Routes>
      <Footer />
      <Modal type="login" url={url} modalVisibility={modalVisibility} setmodalVisibility={setmodalVisibility} />
      <Modal type="signup" url={url} modalVisibility={modalVisibility} setmodalVisibility={setmodalVisibility} />

    </Router>
  );
}

export default App;
