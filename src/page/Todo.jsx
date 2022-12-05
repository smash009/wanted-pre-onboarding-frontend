import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Todos = () => {
  const API_URI = process.env.REACT_APP_API_URI;
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("TOKEN");

  useEffect(() => {
    if (accessToken) {
      navigate(`/todo`);
    } else {
      navigate(`/`);
    }
  }, []);

  return (
    <>
      <p>Todos</p>
    </>
  );
};

export default Todos;
