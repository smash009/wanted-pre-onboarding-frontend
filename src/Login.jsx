import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const API_URI = process.env.REACT_APP_API_URI;
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("TOKEN");

  useEffect(() => {
    if (accessToken) {
      navigate(`/todo`);
    }
  }, []);

  const [inputValue, setInputValue] = useState({ email: "", password: "" });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const isEmailValid =
    inputValue.email.includes("@") && inputValue.email.includes(".");

  const isPasswordValid = inputValue.password.length >= 9;

  const isButtonActive = !(isEmailValid && isPasswordValid);

  const handleSignin = (e) => {
    e.preventDefault();

    fetch(`${API_URI}auth/signin/`, {
      method: "post",
      headers: { "content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        email: inputValue.email,
        password: inputValue.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 404) {
          alert("회원 가입을 해주세요.");
        } else if (data.statusCode === 401) {
          alert("비밀번호를 확인해 해주세요.");
        }

        if (data.access_token) {
          localStorage.setItem("TOKEN", data.access_token);
          navigate(`/todo`);
        }
      });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    fetch(`${API_URI}auth/signup/`, {
      method: "post",
      headers: { "content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        email: inputValue.email,
        password: inputValue.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 400) {
          alert("회원 가입된 이메일 입니다.");
        }
      });
  };

  return (
    <>
      <LoginSection>
        <LoginBox>
          <Title>로그인 / 회원가입</Title>
          <LoginFormWrap>
            <LoginForm>
              <EmailInput
                type="text"
                name="email"
                placeholder="E-Mail"
                onChange={handleInput}
              />
              <PasswordInput
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleInput}
              />
              <ButtonWrap>
                <SigninButton disabled={isButtonActive} onClick={handleSignin}>
                  로그인
                </SigninButton>
                <SignupButton disabled={isButtonActive} onClick={handleSignup}>
                  회원가입
                </SignupButton>
              </ButtonWrap>
            </LoginForm>
          </LoginFormWrap>
        </LoginBox>
      </LoginSection>
    </>
  );
};

const LoginSection = styled.section`
  width: 100%;
`;

const LoginBox = styled.div`
  width: 600px;
  margin: 400px auto;
  border: 1px solid #bbb;
  border-radius: 5px;
  background-color: #fafafa;
`;

const Title = styled.h1`
  width: 600px;
  margin: 100px auto 50px;
  font-size: 41px;
  text-align: center;
`;

const LoginFormWrap = styled.form`
  width: 500px;
  margin: 80px auto;
  box-sizing: border-box;
`;

const LoginForm = styled.form`
  width: 500px;
`;

const EmailInput = styled.input`
  display: block;
  width: 344px;
  margin: 10px auto 30px;
  padding: 0px 20px;
  font-size: 17px;
  border: 1px solid #333;
  border-radius: 3px;
  box-sizing: border-box;
  line-height: 2.6;
`;

const PasswordInput = styled.input`
  display: block;
  width: 344px;
  margin: 30px auto 20px;
  padding: 0px 20px;
  font-size: 17px;
  border: 1px solid #333;
  border-radius: 3px;
  box-sizing: border-box;
  line-height: 2.6;
`;

const ButtonWrap = styled.div`
  margin: 0 auto;
  text-align: center;
`;

const SigninButton = styled.button`
  width: 32%;
  margin: 10px;
  padding: 16px 20px;
  font-size: 19px;
  font-weight: bold;
  color: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
  background-color: ${(props) => (props.disabled ? "#aaa" : "#0ea915")};
  cursor: ${(props) => (props.disabled ? "drfault" : "pointer")};
  transition: 0.3s;
`;

const SignupButton = styled.button`
  width: 32%;
  margin: 10px;
  padding: 16px 20px;
  font-size: 19px;
  font-weight: bold;
  color: #fff;
  border: 1px solid #ddd;
  border-radius: 3px;
  background-color: #aaa;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background-color: #0ea915;
    transition: 0.3s;
  }
`;

export default Login;
