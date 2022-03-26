import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { API } from '../backend'
import { getProducts } from './helper/coreapicalls'
import { isAutheticated } from '../auth/helper/index'

const UserCard = ({ singleUser, setReload = (f) => f, reload = undefined }) => {
  const [redirectUpdate, setRedirectUpdate] = useState(false)
  const [redirectAllMeal, setRedirectAllMeal] = useState(false)

  const {
    user: { username, email, _id },
    token
  } = isAutheticated() //Destructuring from Localstorage

  const updateBtn = () => {
    return (
      <button
        className='btn btn-danger btn-sm rounded-2'
        type='button'
        data-toggle='tooltip'
        data-placement='top'
        title='Update'
        onClick={handleUpdate}
      >
        <i className='fa fa-edit'> Update</i>
      </button>
    )
  }

  const handleUpdate = () => {
    setRedirectUpdate(true)
  }

  const deleteBtn = () => {
    return (
      <button
        className='btn btn-danger btn-sm rounded-2'
        type='button'
        data-toggle='tooltip'
        data-placement='top'
        title='Delete'
        onClick={handleDeleteUser}
      >
        <i className='fa fa-trash'> Delete</i>
      </button>
    )
  }

  const handleDeleteUser = () => {
    console.log('handleDeleteUser')
    fetch(`${API}/admin/${singleUser.username}/${_id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        setReload(!reload)
        return response.json()
      })
      .catch((err) => console.log(err))

    setReload(!reload)
  }

  const handleAllMealBtn = () => {
    setRedirectAllMeal(true)
  }

  const getARedirect = (redirect) => {
    if (redirectAllMeal) {
      return (
        <Redirect
          to={
            '/admin/user/allmeal/' + singleUser.username + '/' + singleUser._id
          }
        />
      )
    }
    if (redirectUpdate) {
      // return <Redirect to={"/user/update"} state={ id : singleUser._id} />;
      return (
        <Redirect
          to={{ pathname: '/user/update', state: { id: singleUser._id } }}
        />
      )
    }
  }

  const index = Math.floor(Math.random() * 11) + 1
  const link = `https://mdbootstrap.com/img/Photos/Avatars/img%20(${index}).jpg`

  return (
    <div className='card testimonial-card' style={{ color: 'black' }}>
      <div className='card-up blue-gradient'></div>

      <div className='avatar mx-auto white'>
        <img src={link} className='rounded-circle img-fluid' />
      </div>

      <div className='card-body'>
        <h4 className='font-weight-bold mb-4'>
          {singleUser.firstname + ' ' + singleUser.lastname}
        </h4>

        <div className='d-flex justify-content-around'>
          <h5>Phone </h5> <h5>{singleUser.phone}</h5>
        </div>
        <div className='d-flex justify-content-around'>
          <h5>Email </h5> <h5>{singleUser.email}</h5>
        </div>
        <div className='d-flex justify-content-around'>
          <h5>Clories </h5> <h5>{singleUser.calories_per_day}</h5>
        </div>
        <hr />

        <div className='card-header d-flex justify-content-around'>
          {getARedirect(redirectAllMeal)}
          {updateBtn()}
          <button
            className='btn btn-danger btn-sm rounded-2'
            type='button'
            data-toggle='tooltip'
            data-placement='top'
            title='All meals'
            onClick={handleAllMealBtn}
          >
            <i className='fa fa-list'> All Meals</i>
          </button>
          {deleteBtn()}
        </div>
      </div>
    </div>
  )
}

export default UserCard
