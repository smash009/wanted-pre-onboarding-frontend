import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/todo" />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
