import { API } from "../../backend";

export const removeItemFromCart = productId => {
    return fetch(`${API}/meal/${productId}`, { method: "DELETE" })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};  

