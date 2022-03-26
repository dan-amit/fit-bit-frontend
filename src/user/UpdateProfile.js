import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router'


import Base from "../core/Base";
import { isAutheticated } from "../auth/helper/index";
import { getUserInfo, updateUser} from './helper/index'
// import { updateProduct, getProduct } from "./helper/coreapicalls";

const UpdateProfile = (props) => {

  var _id;
  if(isAutheticated().user.role == 1) {
    _id = props.location.state == undefined ? isAutheticated().user._id : props.location.state.id 
  }else{
    _id = isAutheticated().user._id
  }
  // var _id = isAutheticated().user.role == 1 ? props.location.state.id == undefined ? isAutheticated().user._id : props.location.state.id : isAutheticated().user._id;

 	const history = useHistory()

 	const [userInfo, setUserInfo] = useState({});
  const [redirect, setRedirect] = useState(false);


  	const [values, setValues] = useState({ firstname: "", lastname: "", phone : "", email: "", calories_per_day: 0, error: "", success: false });

  	const handleChange = name => event => setValues({ ...values, error: false, [name]: event.target.value });

  	const { firstname, lastname, phone, email, calories_per_day, error, success } = values;

  	const loadUserInfo = () => {
  		getUserInfo(_id)
  			.then(data => {
  				if(data && data.error) alert('Unaple to fetch data')
  				else {
  					setValues({
  						...values,
  						firstname	: data.firstname,
  						lastname	: data.lastname,
  						phone		: data.phone,
  						email		: data.email, 
  						calories_per_day : data.calories_per_day
  					});
  					setUserInfo(data);
  				}
  				
  			})
  			.catch(console.log('Error in loding user info!!'))
  	}

  	useEffect(() => {
    	loadUserInfo();
  	}, []);

  	const getARedirect = redirect => {
	    if (redirect) {
        if(isAutheticated().user.role == 0){
          return <Redirect to="/user/profile" />;
        }

        if(isAutheticated().user.role == 1)
          return <Redirect to="/admin/profile" />;
      }
	}

  	const onSubmit = event => {
	  	event.preventDefault();
	  	setValues({ ...values, error: false });
	  	updateUser({...values, _id})
  	    .then(data => {
  	      if (data.error) {
  	        setValues({ ...values, error: data.error, success: false });
  	      } else {
  	        setRedirect(true);
  	        setValues({ ...values, firstname: "", lastname: "", phone: "", email: '', calories_per_day: '', error: "", success: true});
  	      }
  	    })
  	    .catch(console.log("Error in adding meal"));
  	};

  	const signUpForm = () => {
  	  return (
  	    <div className="row">
  	      <div className="col-md-6 offset-sm-3 text-left">
  	        <form>
  	        	{getARedirect(redirect)}
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
  	          User Updated successfully. Please
  	          <Link to="/user/dashboard">Dashboard</Link>
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
  	  <Base title="Update User page" description="Update your information!!!">
  	  	{successMessage()}
  	  	{errorMessage()}
  	  	{signUpForm()}
  	  </Base>
  	);

}

export default UpdateProfile;
