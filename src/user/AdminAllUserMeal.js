import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getAllProducts } from "../core/helper/coreapicalls";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";
import Card from "../core/Card";
import ProgressBar from '../core/ProgressBar'


const AdminAllUserMeal = () => {

  	let { username, userId } = useParams();

  	const adminUsername = isAutheticated().user.username;

  	const [meals, setMeals] = useState([]);
  	const [error, setError] = useState(false);
  	const [reload, setReload] = useState(false);

  	const loadAllProduct = () => {
  	  getAllProducts(username).then(data => {
  	    if (data.error) {
  	      setError(data.error);
  	    } else {
  	      setMeals(data);
  	    }
  	  });
  	};

  	useEffect(() => {
  	  loadAllProduct();
  	}, [reload]);


  	return (
  		<Base username={adminUsername}  title="Welcome to User area" description="Manage all of your products here" className="container bg-success p-4">

        {meals.length == 0 ? 
          <h3>Add Some meals</h3> 
          : 
          <div className="jumbotron">
            <h1 className="text-center">Calorie Intake</h1>
            <ProgressBar reload={reload} setReload={setReload} userId={userId} />
          </div>
        }

        

  		  <div className="row text-center">
  		      {meals.map((product, index) => {
  		        return (
  		          <div key={index} className="col-4 mb-4">
  		            <Card 
  		              key={index}
  		              product={product} 
  		              id={userId}
  		              reload={reload}
  		              setReload={setReload}
  		            />
  		          </div>
  		        );
  		      })}
  		  </div>
  		</Base>
  	);
}


export default AdminAllUserMeal;
