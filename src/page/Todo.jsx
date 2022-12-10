import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TodoInputWrap from "./components/TodoInputWrap";
import ItemList from "./components/ItemList";
import styled from "styled-components";
// import { ImPlus } from "react-icons/im";

const Todos = () => {
  const API_URI = process.env.REACT_APP_API_URI;
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("TOKEN");
  const [todoInputContent, setTodoInputContent] = useState("");
  const [todoUpdateContent, setTodoUpdateContent] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    if (accessToken) {
      navigate(`/todo`);
      fetchingApi();
    } else {
      navigate(`/`);
    }
  }, []);

  const fetchingApi = () => {
    fetch(`${API_URI}todos`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setTodoList([...data].map((list) => ({ ...list, modify: false })));
      });
  };

  const handleInput = (e) => {
    setTodoInputContent(e.target.value);
  };

  const handleUpdateInput = (e) => {
    setTodoUpdateContent(e.target.value);
  };

  const createTodo = (e) => {
    e.preventDefault();

    if (todoInputContent.length > 0) {
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
          fetchingApi();
        });
    } else {
      alert("한글자 이상 입력해주세요.");
    }

    setTodoInputContent("");
  };

  const handleCheckedList = (e) => {
    setTodoList((todos) =>
      todos.map((todo) =>
        todo.id === e.target.dataset.index * 1 && e.target.checked
          ? { ...todo, isCompleted: true }
          : todo.id === e.target.dataset.index * 1 && !e.target.checked
          ? { ...todo, isCompleted: false }
          : { ...todo }
      )
    );
  };

  const deleteTodo = (e) => {
    let id = e.target.dataset.index;

    fetch(`${API_URI}todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then()
      .then((data) => {
        fetchingApi();
      });
  };

  const updateTodo = (e) => {
    e.preventDefault();

    let id = e.target.dataset.index;

    if (todoUpdateContent.length > 0) {
      fetch(`${API_URI}todos/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todo: todoUpdateContent,
          isCompleted: false,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          fetchingApi();
        });
    } else {
      alert("한글자 이상 입력해 주세요.");
    }
  };

  const toggleUpdateInputBox = (e) => {
    setTodoList((todos) =>
      todos.map((todo) => (todo.id === e.id ? { ...todo, modify: true } : todo))
    );
  };

  const cancelUpdateTodo = (e) => {
    setTodoList((todos) =>
      todos.map((todo) =>
        todo.id === e.id ? { ...todo, modify: false } : todo
      )
    );
    setTodoUpdateContent(todoList.todo);
    fetchingApi();
  };

  return (
    <>
      <div>
        <Titlewrap>
          <Title>To Do List</Title>
        </Titlewrap>
        <TodoInputWrap
          setTodoInputContent={setTodoInputContent}
          todoInputContent={todoInputContent}
          handleInput={handleInput}
          createTodo={createTodo}
        />
        <ItemList
          todoList={todoList}
          handleCheckedList={handleCheckedList}
          toggleUpdateInputBox={toggleUpdateInputBox}
          handleUpdateInput={handleUpdateInput}
          setTodoUpdateContent={setTodoUpdateContent}
          updateTodo={updateTodo}
          cancelUpdateTodo={cancelUpdateTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </>
  );
};

const Titlewrap = styled.div`
  width: 500px;
  margin: 0 auto;
`;

const Title = styled.h1`
  margin: 100px auto 70px;
  font-size: 51px;
  text-align: center;
`;

export default Todos;
