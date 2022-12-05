import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Main = () => {
  const [inputValue, setInputValue] = useState({ email: "", password: "" });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    // console.log(inputValue.email);
  };

  const isEmailValid =
    inputValue.email.includes("@") && inputValue.email.includes(".");

  const isPasswordValid = inputValue.password.length >= 9;

  const isButtonActive = !(isEmailValid && isPasswordValid);

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
            <button disabled={isButtonActive}>제출</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Main;
