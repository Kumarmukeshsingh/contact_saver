import React, { useState } from "react";
import "../components/AddNew.css";
import { useNavigate } from "react-router-dom";

function EditContact() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      // const url = "http://localhost:5000/api/contact/create";
      const url = "http://localhost:5000/api/contact/update/${id}";
      const token = localStorage.getItem("token");
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const result = await res.json();
      console.log(result);
      setInput({ name: "", email: "", phone: "" });
      if (result.message) {
        setTimeout(() => {
          navigate("/allcontact");
        }, 1000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="container">
        <div className="">
          <h1>Edit Contact : </h1>
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="">name : </label>
            <input
              type="text"
              onChange={handleInput}
              name="name"
              value={input.name}
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
            <label htmlFor="">phone No : </label>
            <input
              type="number"
              name="phone"
              onChange={handleInput}
              value={input.password}
              autoComplete="false"
            />
          </div>
          <button type="submit">EDIT</button>
          <p></p>
        </form>
      </div>
    </>
  );
}

export default EditContact;
