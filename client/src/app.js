import React from "react";
import "./app.css";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Main from './components/Main'

const app = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Main />}/>
        </Routes>
    </BrowserRouter>
  );
};

export default app;
