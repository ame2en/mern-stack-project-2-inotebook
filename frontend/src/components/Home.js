import React from "react";
import Notes from "./Notes";


const Home = (props) => {

 

  return (
    <div>
      <div className="container">
        <Notes showAlert = {props.showAlert}/>
      </div>
    </div>
  );
};

export default Home;
