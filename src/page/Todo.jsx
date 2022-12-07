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
      <div>
        <div>
          <h1>Todo List</h1>
        </div>
        <form>
          <input placeholder="할일 입력" />
          <button type="submit">입력</button>
        </form>
        <div>
          <ul>
            {RECOMMEND_LIST.map((list) => (
              <li key={list.id}>
                <div>
                  <input type="checkbox" checked={list.isCompleted} />
                </div>
                <div>
                  <span>{list.todo}</span>
                </div>
                <div>delete</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Todos;

const RECOMMEND_LIST = [
  {
    id: 1,
    todo: "todo2",
    isCompleted: false,
    userId: 1,
  },
  {
    id: 2,
    todo: "todo3",
    isCompleted: false,
    userId: 1,
  },
];
