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
  const [todoUpdateContent, setTodoUpdateContent] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    if (accessToken) {
      navigate(`/todo`);
    } else {
      navigate(`/`);
    }

    // fetch(`${API_URI}todos`, {
    //   method: "GET",
    //   headers: { Authorization: `Bearer ${accessToken}` },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     //setTodoList(data);
    //     setTodoList([...data].map((list) => ({ ...list, modify: false })));
    //     console.log(todoList);
    //   });

    fetchingApi();
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
    // console.log(todoContent);
  };

  const handleUpdateInput = (e) => {
    setTodoUpdateContent(e.target.value);
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
        fetchingApi();
      });

    setTodoInputContent("");
  };

  const deleteTodo = (e) => {
    let id = e.target.dataset.index;
    console.log(id);

    fetch(`${API_URI}todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  };

  const updateTodo = (e) => {
    e.preventDefault();

    let id = e.target.dataset.index;
    console.log(id);

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
    });

    fetchingApi();
  };

  const toggleUpdateInputBox = (e) => {
    console.log("showUpdateInputBox", e);

    setTodoList((todos) =>
      todos.map((todo) => (todo.id === e.id ? { ...todo, modify: true } : todo))
    );
  };

  const cancelUpdateTodo = (e) => {
    console.log("cancelUpdateTodo", e);

    setTodoList((todos) =>
      todos.map((todo) =>
        todo.id === e.id ? { ...todo, modify: false } : todo
      )
    );
  };

  return (
    <>
      <div>
        <Titlewrap>
          <Title>Todo List</Title>
        </Titlewrap>
        <Form>
          <TodoInput
            value={todoInputContent}
            placeholder="할일 입력"
            onChange={handleInput}
          />
          <TodoInputButton type="submit" onClick={createTodo}>
            입력
          </TodoInputButton>
        </Form>
        <ItemListWrap>
          <ItemUl>
            {todoList?.map((list) => (
              <ItemLi data-index={list.id} key={list.id}>
                <div>
                  <input type="checkbox" />
                </div>
                <TodoListItem
                  data-index={list.id}
                  todoList={todoList}
                  style={{ display: list.modify ? "none" : "inline-block" }}
                >
                  <span>{list.todo}</span>
                  <span
                    data-index={list.id}
                    onClick={() => {
                      toggleUpdateInputBox(list);
                    }}
                  >
                    수정
                  </span>
                </TodoListItem>
                <UpdateInputBox
                  data-index={list.id}
                  style={{ display: list.modify ? "inline-block" : "none" }}
                >
                  <input
                    defaultValue={list.todo}
                    onChange={handleUpdateInput}
                  />
                  <button data-index={list.id} onClick={updateTodo}>
                    제출
                  </button>
                  <button data-index={list.id} onClick={cancelUpdateTodo}>
                    취소
                  </button>
                </UpdateInputBox>
                <div>
                  <button data-index={list.id} onClick={deleteTodo}>
                    삭제
                  </button>
                </div>
              </ItemLi>
            ))}
          </ItemUl>
        </ItemListWrap>
      </div>
    </>
  );
};

const Titlewrap = styled.div`
  width: 500px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin: 50px auto 30px;
`;

const Form = styled.form`
  width: 500px;
  margin: 20px auto 0;
  padding: 20px 10px;
  border: 1px solid #aaa;
  border-bottom: 0;
  background-color: #eee;
`;

const TodoInput = styled.input`
  width: calc(100% - 50px);
  margin: 0 auto;
  padding: 12px 10px 9.5px;
  font-size: 17px;
  line-height: 1;
  border: 1px solid #ddd;
  border-right: 0;
  box-sizing: border-box;
`;

const TodoInputButton = styled.button`
  all: unset;
  padding: 12px 10px;
  border: 1px solid #aaa;
  background-color: #2690f9;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
`;

const ItemListWrap = styled.div`
  width: 522px;
  margin: 0 auto;
  background-color: #eee;
`;

const ItemUl = styled.ul`
  margin: 0px auto 30px;
  padding: 0 10px;
  border: 1px solid #aaa;
  border-top: 0;
`;

const ItemLi = styled.li`
  list-style: none;
  border: 1px solid #eee;
  width: calc(100% - 20px);
  padding: 10px;
  background-color: #fefefe;
  &:last-child {
    margin-bottom: 20px;
  }
`;

const TodoListItem = styled.div`
  display: inline-block;
`;

const UpdateInputBox = styled.div`
  display: none;
`;

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
