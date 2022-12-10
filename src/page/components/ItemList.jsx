import React from "react";
import styled from "styled-components";

const ItemList = ({
  todoList,
  handleCheckedList,
  toggleUpdateInputBox,
  handleUpdateInput,
  updateTodo,
  cancelUpdateTodo,
  deleteTodo,
}) => {
  return (
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
                  textDecoration: list.isCompleted ? "line-through" : "none",
                  color: list.isCompleted ? "#afafaf" : "#000",
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
              style={{
                display: list.modify ? "inline-block" : "none",
              }}
            >
              <UpdateInput
                Value={list.todo}
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
  );
};

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

export default ItemList;
