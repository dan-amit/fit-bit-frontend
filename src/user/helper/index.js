import { API } from "../../backend";

export const getUserInfo = id => {
	console.log("ID is " + id)
	console.log("getUserInfo")
  return fetch(`${API}/user/details/${id}`, { method: "GET" })
    .then(response => {
    	console.log("Userinfo res.. : ", response)
     	return response.json();
    })
    .catch(err => console.log(err));
};

export const getUserList = (id, token) => {
	console.log("Inside getuserInfo ")
	return fetch(`${API}/admin/users/${id}`,
		{
			method: "GET",
			headers: {
			  Accept: "application/json",
			  "Content-Type": "application/json",
			  Authorization: `Bearer ${token}`
			}
		})
		.then(response => {
			return response.json();
		})
		.catch(err => console.log("Error !! Can't fetch all the users"))
}

export const updateUser = data => {
	delete data.error;
	delete data.success;

	console.log(data);
	return fetch(`${API}/user/update/${data._id}`, 
		{
		  	method: "put",
		  	headers: {
		    	Accept: "application/json",
		    	"Content-Type": "application/json"
		  	},
		  	body: JSON.stringify(data)
		})
	  .then(response => {
	  	console.log("Hello", response)
	    return response.json();
	  })
	  .catch(err => console.log(err));
}