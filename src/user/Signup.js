import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({ username: "", firstname: "", lastname: "", phone : "", email: "", password: "", calories_per_day: 0, error: "", success: false });

  const { username, firstname, lastname, phone, email, password, calories_per_day, error, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ username, firstname, lastname, phone, email, password, calories_per_day })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            username: "",
            firstname: "",
            lastname: "",
            phone : "",
            email: "",
            password: "",
            calories_per_day: 0,
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in signup"));
    
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Username</label>
              <input
                className="form-control"
                onChange={handleChange("username")}
                type="text"
                value={username}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Firstname</label>
              <input
                className="form-control"
                onChange={handleChange("firstname")}
                type="text"
                value={firstname}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Lastname</label>
              <input
                className="form-control"
                onChange={handleChange("lastname")}
                type="text"
                value={lastname}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Phone</label>
              <input
                className="form-control"
                onChange={handleChange("phone")}
                type="tel"
                value={phone}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Calorie Limit</label>
              <input
                className="form-control"
                onChange={handleChange("calories_per_day")}
                type="Number"
                value={calories_per_day}
              />
            </div>

            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created successfully. Please
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign up page" description="A page for user to sign up!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default Signup;
