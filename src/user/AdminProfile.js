import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import { getUserInfo } from "./helper";


const AdminDashBoard = () => {

  const { user: { username, email, _id } } = isAutheticated(); //Destructuring from Localstorage

  const [userInfo, setUserInfo] = useState({});
  const [reload, setReload] = useState(false);


  useEffect(() => {
    loadUserInfo()
  },[])

  const loadUserInfo = () => {
    getUserInfo(_id).then(data => {
      if (data.error) {
        alert('Error!! In fetching the data');
      } else {
        setUserInfo(data);
        console.log(data)
      }
    });
  };


  const adminLeftSide = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">User Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to='/user/update' className="nav-link text-success">
              Update Profile
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/users/" className="nav-link text-success">
              List All User
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/user/dashboard" className="nav-link text-success">
              Update Meal
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/user/dashboard" className="nav-link text-success">
              Delete Meal
            </Link>
          </li>
        </ul>
      </div>
    );
  };


  const adminRightSide = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Username:</span> {userInfo.username}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Name :</span> {userInfo.firstname + " " + userInfo.lastname}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Email:</span> {userInfo.email}
          </li>
          <li className="list-group-item">
            <span className="badge badge-success mr-2">Calorie:</span> {userInfo.calories_per_day}
          </li>

          <li className="list-group-item">
            <span className="badge badge-danger">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      id={_id}
      title="Welcome to Admin area"
      description="Manage all of your account here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-3">{adminLeftSide()}</div>
        <div className="col-9">{adminRightSide()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
