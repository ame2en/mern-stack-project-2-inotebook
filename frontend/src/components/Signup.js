import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();
  const [user,setUser] = useState({email:"",password:"",name:"",checkpass:""});

  const onChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value});
  }

  const handlesubmit = async (e)=>{
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/createuser"

    const response = await fetch(url,{
      method:"POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name:user.name,email:user.email,password:user.password})
    })
    const json = await response.json();

    if(json.success){

      localStorage.setItem("authtoken",json.authtoken);
      navigate("/login");
      props.showAlert("Account Created Successfully","success");
    }
    else{
      props.showAlert("Invalid details","danger");
    }


  }


  return (
    <div className="container">
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={user.name}
            className="form-control"
            id="name"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            aria-describedby="emailHelp"
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={user.password}
            id="password"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            name="checkpass"
            value={user.checkpass}
            id="checkpass"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export { Signup };
