import React, { useState, useEffect } from "react";
import "./App.css";
import { Navbar } from "./components/export";
import { Contact, Blog, Header, FullArticle } from "./containers/export";
import { Route, Routes } from "react-router-dom";

function App() {
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 400);
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        {!isLoading && (
          <>
            <Route path="/" element={<Header />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<FullArticle />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
