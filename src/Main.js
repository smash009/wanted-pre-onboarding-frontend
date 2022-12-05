import React, { useState } from "react";
import styled from "styled-components";

const Main = () => {
  const [inputValue, setInputValue] = useState({ email: "", password: "" });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    // console.log(inputValue.email);
  };

  return (
    <>
      <div>
        <div>
          <h1>로그인 / 회원가입</h1>
          <form>
            <input
              type="text"
              name="email"
              placeholder="E-Mail"
              onChange={handleInput}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleInput}
            />
            <button>제출</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Main;
