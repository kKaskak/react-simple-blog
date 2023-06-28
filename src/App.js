import React, { useState, useEffect } from "react";
import "./App.css";
import { Navbar } from "./components/export";
import { Contact, Blog, Header, FullArticle } from "./containers/export";
import { Route, Routes } from "react-router-dom";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  useEffect(() => {
    const checkDocumentLoaded = () => {
      setIsLoaded(true);
      setTimeout(() => {
        setIsFullyLoaded(true);
      }, 200);
    };
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      checkDocumentLoaded();
    } else {
      document.addEventListener("DOMContentLoaded", checkDocumentLoaded);
    }
    return () => {
      document.removeEventListener("DOMContentLoaded", checkDocumentLoaded);
    };
  }, []);

  return (
    <div className={`App ${isLoaded ? "loaded" : ""}`}>
      <Navbar />
      <Routes>
        {isFullyLoaded && <Route path="/" element={<Header />} />}
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<FullArticle />} />
      </Routes>
    </div>
  );
}

export default App;
