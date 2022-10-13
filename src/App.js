import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MovieDetail from "./components/MovieDetail/MovieDetail";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import {Routes, Route} from "react-router-dom";
import './App.scss';
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="movie/:imdbID" element={<MovieDetail />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;


// API- 4990f525