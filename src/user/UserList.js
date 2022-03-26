import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Base from "../core/Base";
import UserCard from "../core/UserCard";

import { isAutheticated } from "../auth/helper/index";
import { getUserList } from './helper';

const UserList = () => {
  	const { user: { username, email, _id }, token } = isAutheticated(); //Destructuring from Localstorage

  	const [userList, setUserList] = useState([]);
  	const [reload, setReload] = useState(false);


	const loadUserList = () => {
		getUserList(_id, token)
			.then(data => {
				if(data && data.error) alert('Unaple to fetch data')
				else setUserList(data);
			})
			.catch(console.log('Error in loding user List!!'))
	}

	useEffect(() => {
  		loadUserList();
	}, [reload]);

	return (
	  	<Base title="All users" description="A complete list of all the users!!!">
	  		<div className="row text-center">
	  		    {userList.map( singleUser => {
	  		      	return (
		  		        <div key={singleUser.username} className="col-4 mb-4">
		  		          <UserCard 
		  		            singleUser={singleUser} 
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






export default UserList;