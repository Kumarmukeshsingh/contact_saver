import React, { use, useState } from "react";
import "../components/Signup.css";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    const copyInput = { ...input };
    copyInput[name] = value;
    setInput(copyInput);
    // setInput({ ...input, [e.target.name]: e.target.value });
    setError(false);
    setIsEmpty(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      const res = await fetch(
        "https://contact-saver-mu.vercel.app/api/user/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        }
      );
      if (res.ok) {
        navigate("/");
      }
      console.log(res);
      if (!res.ok) {
        setError(true);
      }
      if (!input.email || !input.password || !input.username) {
        setIsEmpty(true);
      }

      // setInput({
      //   username: "",
      //   email: "",
      //   password: "",
      // });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="">
          <h1>Register user for the contact save </h1>
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="">username</label>
            <input
              type="text"
              onChange={handleInput}
              name="username"
              value={input.username}
            />
          </div>
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
              type="text"
              name="password"
              onChange={handleInput}
              value={input.password}
              autoComplete="false"
            />
          </div>
          {isEmpty ? (
            isEmpty ? (
              <p className="Error"> all field are reqired.</p>
            ) : (
              ""
            )
          ) : error ? (
            <p className="Error"> user alreday exist </p>
          ) : (
            ""
          )}

          <button type="submit">Sign Up</button>
          <p>
            if you already register
            <Link to="/">
              <span> Login </span>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Signup;
