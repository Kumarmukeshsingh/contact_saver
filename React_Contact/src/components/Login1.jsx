import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login1() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const res = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const result = await res.json();
      console.log(result);

      localStorage.setItem("token", result.accessToken);
      localStorage.setItem("loginUser", result.user.username);
      if (result.accessToken) {
        setTimeout(() => {
          navigate("/allcontact");
        }, 1000);
      }
    } catch (error) {
      console.log(" invalid user ");

      console.log(error);
    }

    // setInput({
    //   email: "",
    //   password: "",
    // });
  };

  return (
    <>
      <div className="container">
        <div className="">
          <h1>Login User </h1>
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">email</label>
            <input
              type="email"
              onChange={handleInput}
              name="email"
              value={input.email}
            />
          </div>
          <div>
            <label htmlFor="">password</label>
            <input
              type="password"
              name="password"
              onChange={handleInput}
              value={input.password}
              autoComplete="false"
            />
          </div>
          <button type="submit">Sign Up</button>
          <p>
            if you don't have accout
            <Link to="/signup">
              <span> Register </span>
            </Link>
            please!!!
          </p>
        </form>
      </div>
    </>
  );
}

export default Login1;
