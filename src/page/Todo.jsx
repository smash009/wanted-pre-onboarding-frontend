import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ImPlus } from "react-icons/im";

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
          : { ...todo, isCompleted: false }
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
        <Form>
          <TodoInput
            value={todoInputContent}
            placeholder="할 일을 입력하세요."
            onChange={handleInput}
          />
          <TodoInputButton type="submit" onClick={createTodo}>
            <ImPlus />
          </TodoInputButton>
        </Form>
        <ItemListWrap>
          <ItemUl>
            {todoList?.map((list) => (
              <ItemLi data-index={list.id} key={list.id}>
                <CheckBoxWrap>
                  <input
                    data-index={list.id}
                    type="checkbox"
                    onChange={handleCheckedList}
                  />
                </CheckBoxWrap>
                <TodoListItem
                  data-index={list.id}
                  todoList={todoList}
                  style={{ display: list.modify ? "none" : "inline-block" }}
                >
                  <Task
                    style={{
                      textDecoration: list.isCompleted
                        ? "line-through"
                        : "none",
                    }}
                  >
                    {list.todo}
                  </Task>
                  <UpdateButton
                    data-index={list.id}
                    onClick={() => {
                      toggleUpdateInputBox(list);
                    }}
                  >
                    수정
                  </UpdateButton>
                </TodoListItem>
                <UpdateInputBox
                  data-index={list.id}
                  style={{ display: list.modify ? "inline-block" : "none" }}
                >
                  <UpdateInput
                    defaultValue={list.todo}
                    onChange={handleUpdateInput}
                  />
                  <SubmitButton data-index={list.id} onClick={updateTodo}>
                    완료
                  </SubmitButton>
                  <CancelButton data-index={list.id} onClick={cancelUpdateTodo}>
                    취소
                  </CancelButton>
                </UpdateInputBox>
                <DeleteButton data-index={list.id} onClick={deleteTodo}>
                  삭제
                </DeleteButton>
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
  margin: 100px auto 70px;
  font-size: 51px;
  text-align: center;
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
  padding: 10.5px 10px;
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
  box-sizing: border-box;
`;

const ItemLi = styled.li`
  width: 100%;
  padding: 10px;
  list-style: none;
  border: 1px solid #eee;
  background-color: #fefefe;
  box-sizing: border-box;

  &:last-child {
    margin-bottom: 20px;
  }
`;

const CheckBoxWrap = styled.div`
  display: inline-block;
  width: 21px;
  height: 20px;
`;

const Task = styled.span`
  display: inline-block;
  width: 340px;
  padding: 0 10px;
  font-size: 17px;
  line-height: 2.4;
  background-color: #fefefe;
`;

const UpdateButton = styled.span`
  display: inline-block;
  padding: 10px;
  box-sizing: border-box;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  all: unset;
  text-align: center;
  box-sizing: border-box;
  padding: 10px;
  cursor: pointer;
`;

const TodoListItem = styled.div`
  display: inline-block;
`;

const UpdateInputBox = styled.div`
  display: none;
  width: 407.5px;
  padding: 0px;
  line-height: 1.15;
  box-sizing: border-box;
`;

const UpdateInput = styled.input`
  display: inline-block;
  width: 307px;
  margin-right: 5px;
  padding: 0 10px;
  font-size: 17px;
  line-height: 2.4;
  border: 0;
  box-sizing: border-box;
  background-color: #eaeaea;
`;

const SubmitButton = styled.button`
  all: unset;
  text-align: center;
  box-sizing: border-box;
  padding: 10px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  all: unset;
  text-align: center;
  box-sizing: border-box;
  padding: 10px;
  cursor: pointer;
`;

export default Todos;
