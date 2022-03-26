import { API } from "../../backend";

export const getProducts = (username, filter) => {
	console.log(username, filter, "ALlPRODUCT********************************")
  return fetch(
  	`${API}/meals/?username=${username}&filter=${filter}`, { method: "GET"})
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getAllProducts = (username) => {
  return fetch(
  	`${API}/meals/?username=${username}`, { method: "GET"})
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const getProduct = (mealId) => {
  return fetch(`${API}/meal/${mealId}`, { method: "GET" })
    .then(response => {
     	return response.json();
    })
    .catch(err => console.log(err));
};



export const addProduct = (data) => {
	const id = data._id;
	let mydata = {};
	mydata.meal = data;

	delete mydata.meal._id;

	console.log(id)
	console.log("Add addProduct", mydata)


	return fetch(`${API}/meal/${id}`, {
	  method: "POST",
	  headers: {
	    Accept: "application/json",
	    "Content-Type": "application/json"
	  },
	  body: JSON.stringify(mydata)
	})
	  .then(response => {
	    return response.json();
	  })
	  .catch(err => console.log(err));
}

export const updateProduct = (data) => {

	console.log(data)
	return fetch(`${API}/meal`, {
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


export const getUserLimit = id => {
	console.log("User limit ", id);
	return fetch(`${API}/user/checklimit/${id}`, {method : "GET"})
		.then(res => {
			if(res.status >= 400 && res.status <500 ){
				console.log("No limit")
			}
			console.log("getUserLimit", res)
			return res.json();
		})
		.catch(err => console.log(err))
}


// For Admin
