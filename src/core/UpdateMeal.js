import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { Link } from "react-router-dom";
import Home from '../core/Home';
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";
import { updateProduct, getProduct } from "./helper/coreapicalls";

const UpdateMeal = () => {

  // const { user: { username, email, _id } } = isAutheticated(); //Destructuring from Localstorage

  let { mealId } = useParams();

  const [redirect, setRedirect] = useState(false);

  const [product, setProduct] = useState({});
  const [values, setValues] = useState({ foodname: '', description: '', calorie : '', error: "", success: false });
  const { foodname, description, calorie, error, success } = values;
  const handleChange = name => event => setValues({ ...values, error: false, [name]: event.target.value });


  	const loadProduct = () => {
	    getProduct(mealId).then(data => {
	      	if (data && data.error) {
	      		alert('Unaple to fetch data')
	      	} else {
		        setValues({...values, foodname: data.foodname, description: data.description, calorie : data.calorie});
		        setProduct(data);
	      	}
    	});
  	};

  	useEffect(() => {
    	loadProduct();
  	}, []);

    // const getARedirect = redirect => {
    //   if ( redirect ) {
    //     return <Redirect to={"/admin/users"} />;
    //   }
    // }

  	const onSubmit = event => {
  	  event.preventDefault();
  	  setValues({ ...values, error: false });
  	  updateProduct({ foodname, description, calorie, _id : mealId })
  	    .then(data => {
  	      if (data.error) {
  	        setValues({ ...values, error: data.error, success: false });
  	      } else {
            // if(isAutheticated().user.role === 1){
            //   setRedirect(true);
            // }
  	        setValues({ ...values, foodname: "", description: "", calorie: 0, error: "", success: true});
  	      }
  	    })
  	    .catch(console.log("Error in updating info"));
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
	            User meal Updated Successfully. Please
	            <Link to="/user/dashboard"> Dashboard</Link>
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
    <Base title="Update Meal page" description="Please add your today's meal!!!">
    	{successMessage()}
    	{errorMessage()}
    	{signUpForm()}
    </Base>
  );
};

export default UpdateMeal;


 