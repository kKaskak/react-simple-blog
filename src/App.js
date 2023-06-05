import React, { useState, useEffect } from "react";
import "./App.css";
import { Navbar } from "./components/export";
import { Blog, Contact, Header, FullArticle } from "./containers/export";
import { Route, Routes } from "react-router-dom";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const checkDocumentLoaded = () => {
      setIsLoaded(true);
    };
    if (document.readyState === "complete") {
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
        <Route path="/" element={<Header />} />
        <Route path="/blog/:slug" element={<FullArticle />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
