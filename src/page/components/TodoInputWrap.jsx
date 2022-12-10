import React from "react";
import styled from "styled-components";
import { ImPlus } from "react-icons/im";

const TodoInputWrap = ({ todoInputContent, handleInput, createTodo }) => {
  return (
    <TodoInputForm>
      <TodoInput
        value={todoInputContent}
        placeholder="할 일을 입력하세요."
        onChange={handleInput}
      />
      <TodoInputButton type="submit" onClick={createTodo}>
        <ImPlus />
      </TodoInputButton>
    </TodoInputForm>
  );
};

const TodoInputForm = styled.form`
  width: 500px;
  margin: 20px auto 0;
  padding: 20px 10px;
  border: 1px solid #aaa;
  border-bottom: 0;
  background-color: #eee;
`;

const TodoInput = styled.input`
  width: calc(100% - 40px);
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

export default TodoInputWrap;
