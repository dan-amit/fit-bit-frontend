import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { API } from "../backend";
import { isAutheticated } from "../auth/helper/index";
import { useParams } from "react-router";
import { getUserLimit } from "./helper/coreapicalls";


const ProgressBar = ({setReload = f => f, reload = undefined, userId = undefined } ) => {

  let { user: { _id, calories_per_day } } = isAutheticated(); //Destructuring from Localstorage


  if(window.location.pathname != '/user/dashboard' && isAutheticated().user.role == 1){
    _id = userId;
  }

  const [Limit, setLimit] = useState({});

  const loadLimit = () => {
    getUserLimit(_id).then(data => {
      if (data && data.error) {
        alert(data.error)
      } else {
        setLimit(data);
      }
    });
  };

  useEffect(() => {
    loadLimit();
  }, [reload]);

  return (


    <div className="">
      {Limit == undefined ? <h1>Add Some meals</h1>
        :
        <div className="col-md-12 ">
          <div className="progress" style={{border : "1px solid grey", height : '40px'}}>
              { 
                parseInt(Limit.isLimitCrossed)/parseInt(isAutheticated().user.role == 1 ? Limit.calories_per_day : calories_per_day) * 100 > 100
                ? 
                  <div 
                    className="progress-bar bg-danger" 
                    role="progressbar" 
                    aria-valuenow={ parseInt(Limit.isLimitCrossed)/(parseInt( isAutheticated().user.role == 1?Limit.calories_per_day : calories_per_day) ) * 100} 
                    aria-valuemin="0" 
                    aria-valuemax="100" 
                    style={{ width: `${ parseInt(Limit.isLimitCrossed)/(parseInt( isAutheticated().user.role == 1?Limit.calories_per_day : calories_per_day) ) * 100}%` }} 
                  >
                    { `${ (parseInt(Limit.isLimitCrossed)/(parseInt( isAutheticated().user.role == 1?Limit.calories_per_day : calories_per_day) ) * 100).toFixed(2)}%`}
                  </div>
                :
                <div 
                  className="progress-bar bg-success" 
                  role="progressbar" 
                  aria-valuenow={ parseInt(Limit.isLimitCrossed)/(parseInt( isAutheticated().user.role == 1?Limit.calories_per_day : calories_per_day) ) * 100} 
                  aria-valuemin="0" 
                  aria-valuemax="100" 
                  style={{ width: `${ parseInt(Limit.isLimitCrossed)/(parseInt( isAutheticated().user.role == 1?Limit.calories_per_day : calories_per_day) ) * 100}%` }} 
                >
                  { `${ (parseInt(Limit.isLimitCrossed)/(parseInt( isAutheticated().user.role == 1?Limit.calories_per_day : calories_per_day) ) * 100).toFixed(2)}%`}
                </div>
              }
              
            </div>
        </div>
      }
    </div>
  );

};

export default ProgressBar;


