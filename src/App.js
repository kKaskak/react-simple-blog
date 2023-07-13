import React, { useState, useEffect } from "react";
import "./App.css";
import { Navbar } from "./components/export";
import { Contact, Blog, Header, FullArticle } from "./containers/export";
import { Route, Routes } from "react-router-dom";

function App() {
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsFullyLoaded(true);
    }, 300);
  }, []);
  if (!isFullyLoaded) {
    return <div></div>;
  }
  return (
    <div className={`App ${isFullyLoaded ? "loaded" : ""}`}>
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
