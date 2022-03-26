import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Base from './core/Base'
import Signup from "./user/Signup";
import Signin from "./user/Signin";

//Private Routes
import PrivateRoute from "./auth/helper/PrivateRoutes";
import DashBoard from "./user/DashBoard";
import UserProfile from "./user/UserProfile";
import AddMeal from "./core/AddMeal";
import UpdateMeal from "./core/UpdateMeal";
import UpdateProfile from './user/UpdateProfile'

//Admin Routes
import AdminRoute from "./auth/helper/AdminRoute";
import AdminProfile from './user/AdminProfile';
import UserList from './user/UserList';
import AdminAllUserMeal from './user/AdminAllUserMeal'




const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>

        //Auth
        <Route path="/" exact component={Base} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        
        //User Routes
        <PrivateRoute path="/user/dashboard" exact component={DashBoard} />
        <PrivateRoute path="/user/addmeal" exact component={AddMeal} />
        <PrivateRoute path="/user/profile" exact component={UserProfile} />
        <PrivateRoute path="/meal/update/:mealId" exact component={UpdateMeal} />
        <PrivateRoute path="/user/update" exact component={UpdateProfile} />

        //Admin Routes
        <AdminRoute path="/admin/profile" exact component={AdminProfile} />
        <AdminRoute path="/admin/users"   exact component={UserList} />
        <AdminRoute path="/admin/user/allmeal/:username/:userId"   exact component={AdminAllUserMeal} />

        
      </Switch>
    </BrowserRouter>
   )
}

export default Routes;