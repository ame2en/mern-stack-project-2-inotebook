import React, { useState } from "react";
import { useNavigate} from 'react-router-dom';



const Login = (props) => {

    let navigate=useNavigate();
    const [user,setuser] = useState({email:"",password:""});

    const onChange = (e)=>{
        setuser({...user,[e.target.name]:e.target.value});
    }


    const handlesubmit = async (e)=>{

        e.preventDefault();

        const url = "http://localhost:5000/api/auth/login";


        const response = await fetch(url,{
            method:"POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({email:user.email,password:user.password})
        })

        const json = await response.json();

        if(json.success){
          // save the authtoken and redirect to the home page
          localStorage.setItem("auth-token",json.authtoken);
          navigate("/");
          props.showAlert("Login Sucessfull","success");
        }
        
        else{
          props.showAlert("Invalid Credentails","danger");
        }


    }
  return (
    <div className="container">
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
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
            id="password"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" >
          Submit
        </button>
      </form>
    </div>
  );
};

export { Login };
