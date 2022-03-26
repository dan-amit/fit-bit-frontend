import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { removeItemFromCart } from "./helper/cartHelper";
import { API } from "../backend";


const Card = ({product, id, removeFromCart = false, setReload = f => f, reload = undefined}) => {

  const [redirectUpdate, setRedirectUpdate] = useState(false);

  const updateBtn = () => {
    return (
      <button 
        className="btn btn-success btn-sm rounded-2" 
        type="button" 
        data-toggle="tooltip" 
        data-placement="top" 
        title="Edit"
        onClick={handleUpdate}
      >
        <i className="fa fa-edit"> Update</i>
      </button>
    )
  }

  const handleUpdate = () => {
    setRedirectUpdate(true);
  }

  const getARedirect = redirect => {
    if (redirectUpdate) {
      return <Redirect to={"/meal/update/" + product._id} />;
    }
  }

  const deleteBtn = () => {
    return (
      <button 
        className="btn btn-danger btn-sm rounded-2" 
        type="button" 
        data-toggle="tooltip" 
        data-placement="top" 
        title="Delete"
        onClick={handleDelete}
      >
        <i className="fa fa-trash"> Delete</i>
      </button>
    )
  }

  const handleDelete = () => {
    return fetch(`${API}/meal/${product._id}/${id}`, { method: "DELETE" })
        .then(response => {
          setReload(!reload);
          return response.json();
        })
        .catch(err => console.log(err));

    setReload(!reload);
  }


  return (
    <div className="col-md-12">
      <div className="card text-white bg-dark border border-info ">
        <div className="card-header lead"><h2>{product.foodname}</h2></div>
        <div className="card-body">
          {getARedirect(redirectUpdate)}
          <ImageHelper foodname={product.foodname} />

          <p className="lead bg-success font-weight-normal text-wrap">
            {product.description}
          </p>

          <div className="d-flex justify-content-around">
            <h5>Clories : </h5>
            <h5>{product.calorie}</h5>
          </div>

          <div className="card-header d-flex justify-content-around">
            {updateBtn()}
            {deleteBtn()}
          </div>

        </div>
      </div>
    </div>
  );

};

export default Card;




















    // <!--Grid column-->
    // <div class="col-lg-4 col-md-6 mb-md-0 mb-4">
    //   <!--Card-->
    //   <div class="card testimonial-card">
    //     <!--Background color-->
    //     <div class="card-up blue-gradient">
    //     </div>
    //     <!--Avatar-->
    //     <div class="avatar mx-auto white">
    //       <img src="https://mdbootstrap.com/img/Photos/Avatars/img%20(20).jpg" class="rounded-circle img-fluid">
    //     </div>
    //     <div class="card-body">
    //       <!--Name-->
    //       <h4 class="font-weight-bold mb-4">Anna Aston</h4>
    //       <div class="d-flex justify-content-around">
    //         <h5>Phone  </h5>
    //         <h5>202020220</h5>
    //       </div>
    //       <div class="d-flex justify-content-around">
    //         <h5>Email  </h5>
    //         <h5>demo@gmail.com</h5>
    //       </div>
    //       <div class="d-flex justify-content-around">
    //         <h5>Clories  </h5>
    //         <h5>200</h5>
    //       </div>
    //       <hr>
    //       <!--Quotation-->
    //       <div class="card-header d-flex justify-content-around">
    //         <button class="btn btn-danger btn-sm rounded-2" type="button" data-toggle="tooltip" data-placement="top" title="Delete"onClick={handleDelete}>
    //           <i class="fa fa-trash"> Delete</i>
    //         </button>
    //         <button class="btn btn-danger btn-sm rounded-2" type="button" data-toggle="tooltip" data-placement="top" title="Delete"onClick={handleDelete}>
    //           <i class="fa fa-trash"> Delete</i>
    //         </button>
    //         <button class="btn btn-danger btn-sm rounded-2" type="button" data-toggle="tooltip" data-placement="top" title="Delete"onClick={handleDelete}>
    //           <i class="fa fa-trash"> Delete</i>
    //         </button>
            
    //       </div>
    //     </div>
    //   </div>
    //   <!--Card-->
    // </div>
    // <!--Grid column-->