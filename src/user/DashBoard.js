import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

import Home from '../core/Home'
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";

const DashBoard = () => {

  const { user: { username, email, _id } } = isAutheticated(); //Destructuring from Localstorage

  return (
    <Base 
    	username={username}  
    	title="Welcome to User area" 
    	description="Manage all of your meals here" 
    	className="container bg-success p-4"
    >
      	<Home username={username} id={_id} />
    </Base>
  );
};

export default DashBoard;
