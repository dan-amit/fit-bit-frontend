import React, { useState } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import Home from '../core/Home';
import { addProduct } from "./helper/coreapicalls";

const AddMeal = () => {

  const { user: { username, email, _id } } = isAutheticated(); //Destructuring from Localstorage


  const [values, setValues] = useState({ foodname: "", description: "", calorie : 0, error: "", success: false });

  const { foodname, description, calorie, error, success } = values;

  const handleChange = name => event => setValues({ ...values, error: false, [name]: event.target.value });

  const onSubmit = event => {
    console.log("onSubmit")
    event.preventDefault();
    setValues({ ...values, error: false });
    addProduct({ foodname, description, calorie, _id })
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({ ...values, foodname: "", description: "", calorie: 0, error: "", success: true});
        }
      })
      .catch(console.log("Error in adding meal"));
  };
  

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Foodname</label>
              <input
                className="form-control"
                onChange={handleChange("foodname")}
                type="text"
                value={foodname}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Description</label>
              <input
                className="form-control"
                onChange={handleChange("description")}
                type="email"
                value={description}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Calorie</label>
              <input
                onChange={handleChange("calorie")}
                className="form-control"
                type="Number"
                value={calorie}
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
            New meal added successfully. Please
            <Link to="/user/dashboard"> Dashboard </Link>
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
    <Base title="Add Meal page" description="Please add your today's meal!!!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
    </Base>
  );
};

export default AddMeal;


