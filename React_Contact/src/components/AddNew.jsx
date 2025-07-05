import React, { useState } from 'react'
import "../components/AddNew.css"

function AddNew() {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
    setInput({
      username: "",
      email: "",
      password: "",
    });
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
              type="password"
              name="password"
              onChange={handleInput}
              value={input.password}
              autoComplete="false"
            />
          </div>
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

export default AddNew
