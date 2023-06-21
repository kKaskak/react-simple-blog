import React, { useState, useEffect } from "react";
import "./App.css";
import { Navbar } from "./components/export";
import { Contact, Blog, Header, FullArticle } from "./containers/export";
import { Route, Routes } from "react-router-dom";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkWindowLoaded = () => {
      setIsLoaded(true);
    };
    window.addEventListener("load", checkWindowLoaded);

    return () => {
      window.removeEventListener("load", checkWindowLoaded);
    };
  }, []);

  return (
    <div className={`App ${isLoaded ? "loaded" : ""}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<FullArticle />} />
      </Routes>
    </div>
  );
}

export default App;
