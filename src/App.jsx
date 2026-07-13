import { BrowserRouter,Routes, Route } from "react-router-dom";
import { useState } from "react";

import Footer from './components/footer'
import Header from './components/header'
import Bookmark from './components/bookmark_main'
import LoginForm from "./components/logInForm";

function App() {
  
  const token = localStorage.getItem("accessToken");

  return (
    <>
      <Header/>
      
        <Routes>
          <Route path="/" element={<Bookmark />} />
          <Route path="/login" element={<LoginForm  />} />
        </Routes>

      <Footer />
    </>
  )
}

export default App;
