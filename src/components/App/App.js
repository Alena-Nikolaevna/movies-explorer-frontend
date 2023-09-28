import React from 'react';
import './App.css';

//import Header from "../Header/Header";
//import Footer from "../Footer/Footer";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
// import Navigation from "../Navigation/Navigation";
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";

import { Routes, Route } from "react-router-dom";
import Navigation from '../Navigation/Navigation';

function App() {
  return (
    <div className="page">

    
      <Routes>

        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="*" element={<PageNotFound />} />

        <Route path="/nav" element={<Navigation />} />

      </Routes>
  
    </div>
  );
}

export default App;