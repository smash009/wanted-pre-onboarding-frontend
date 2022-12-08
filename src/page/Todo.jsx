import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Todos = () => {
  const API_URI = process.env.REACT_APP_API_URI;
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("TOKEN");

  // let myHeaders = new Headers();
  // myHeaders.append("Authorization", `Bearer ${accessToken}`);

  const [todoInputContent, setTodoInputContent] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    if (accessToken) {
      navigate(`/todo`);
    } else {
      navigate(`/`);
    }

    fetch(`${API_URI}todos`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTodoList(data);
      });
  }, []);

  const handleInput = (e) => {
    setTodoInputContent(e.target.value);
    // console.log(todoContent);
  };

  const createTodo = (e) => {
    e.preventDefault();

    fetch(`${API_URI}todos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        todo: todoInputContent,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  const deleteTodo = (e) => {
    e.preventDefault();

    let id = e.target.dataset.index;
    console.log(id);

    fetch(`${API_URI}todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  return (
    <>
      <div>
        <div>
          <h1>Todo List</h1>
        </div>
        <form>
          <input placeholder="할일 입력" onChange={handleInput} />
          <button type="submit" onClick={createTodo}>
            입력
          </button>
        </form>
        <div>
          <ul>
            {todoList?.map((list) => (
              <li key={list.id}>
                <div>
                  <input type="checkbox" />
                </div>
                <div>
                  <span>{list.todo}</span>
                </div>
                <div>
                  <button
                    type="submit"
                    data-index={list.id}
                    onClick={deleteTodo}
                  >
                    삭제
                  </button>
                </div>
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
    todo: "todo1",
    isCompleted: true,
    userId: 1,
  },
  {
    id: 2,
    todo: "todo2",
    isCompleted: false,
    userId: 1,
  },
  {
    id: 3,
    todo: "todo3",
    isCompleted: false,
    userId: 1,
  },
  {
    id: 4,
    todo: "todo4",
    isCompleted: false,
    userId: 1,
  },
];
