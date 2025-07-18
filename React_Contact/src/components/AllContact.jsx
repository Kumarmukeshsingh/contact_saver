import React, { useState, useEffect } from "react";
import "../components/AllContact.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function AllContact() {
  const [loginUser, setLoginUser] = useState("");
  const [contact, setContact] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // console.log(token);
 

  useEffect(() => {
    setLoginUser(localStorage.getItem("loginUser"));
  }, []);

  const fetchcontact = async () => {
    // console.log(localStorage.getItem("token"));
    try {
      const url = "https://contact-saver-mu.vercel.app/api/contact";
      // const headers = {
      //   headers: {
      //     " Authorization": localStorage.getItem("token"),
      //     "Content-Type": "application/json",
      //   },
      // };
      const token = localStorage.getItem("token");

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setContact(data);
    } catch (error) {
      console.log(error.message);
      // console.log(error);
    }
  };

  // console.log(contact);
  useEffect(() => {
    fetchcontact();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginUser");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  const handleDeleteContact = async (e) => {
    const id = e.target.id;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `https://contact-saver-mu.vercel.app/api/contact/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      console.log(result);
      setContact(contact.filter((item) => item._id != id));
    } catch (error) {
      console.log(error.message);
    }
  };

  const expireToken = () => {
    const decode = jwtDecode(token);
    const now = Date.now() / 1000; // current time in second;
    if (decode.exp < now) {
      localStorage.removeItem(token);
    }
    console.log(decode);
  };
  setTimeout(() => {
    handleLogout();
  }, 10 * 10000);
  expireToken();

  return (
    <>
      <div className="">
        {/* <button onClick={fetchcontact}>data</button> */}
        <div className="header">
          <ul className="nav-item">
            <div>
              <p>welcome : {loginUser}</p>
            </div>
            <div>all contact </div>
            <Link to="/addnewcontact">
              <div>Add New Contact</div>
            </Link>
            <div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </ul>
        </div>
        <div className="all-contact">
          {contact.map((i) => {
            return (
              <div className="card" key={i._id}>
                <div className=" contact-item" key={i._id}>
                  <li className="">name : {i.name} </li>
                  <li className="">email : {i.email}</li>
                  <li className="">phone No :{i.phone}</li>
                </div>
                <div className="btn">
                  <button>
                    <Link to="/edit" state={i}>
                      <p>EDIT</p>
                    </Link>
                  </button>
                  <button>
                    <p onClick={handleDeleteContact} id={i._id}>
                      X
                    </p>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AllContact;
