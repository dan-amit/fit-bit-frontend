import React, { useEffect } from 'react'

import Home from '../core/Home'
import Base from '../core/Base'
import { isAutheticated, SaveCalorieLimit } from '../auth/helper/index'
import { useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

const CalorieModal = ({ open, calorieLimit, handleCalorie, handleChange }) => {
  return (
    <div>
      <Modal
        open={open}
        //onClose={() => }}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Enter your Today's calorie Limit
          </Typography>
          <div class='input-group' style={{ paddingTop: '40px' }}>
            <input
              type='number'
              value={calorieLimit}
              onChange={handleChange}
              class='form-control'
              min={0}
            />
            <div class='input-group-append'>
              <span class='input-group-text'>Calorie</span>
            </div>
          </div>
          <div style={{ textAlign: 'center', paddingTop: '40px' }}>
            <button
              type='button'
              className='btn btn-primary'
              style={{ width: '50%', height: '40px' }}
              onClick={handleCalorie}
            >
              Save
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

const DashBoard = () => {
  const { user } = isAutheticated()
  console.log(user, 'was user')
  const { username, email, _id, calories_per_day, calorie_time } = user //Destructuring from Localstorage
  const [open, setOpen] = useState(false)
  //const { user } = isAutheticated()
  const [calorieLimit, setCalorieLimit] = useState(0)
  const getCurrentLimit = () => {
    console.log(calories_per_day, 'is ', calorie_time)
    if (!calorie_time || !calories_per_day) {
      console.log('inside')
      return true
    }
    console.log(Date.now() - new Date(calorie_time), 'kjfrhk')
    let expire =
      Math.abs(Date.now() - new Date(calorie_time)) > 24 * 60 * 60 * 1000
    return expire
  }
  useEffect(() => {
    const data = getCurrentLimit()
    setOpen(data)
  }, [])

  const handleCalorie = async () => {
    if (!calorieLimit || calorieLimit < 0) {
      return
    }
    console.log('saving')
    const data = await SaveCalorieLimit(calorieLimit, user)
    console.log(data)
    //console.log(data, 'is new data')
    if (typeof window !== undefined) {
      const old = JSON.parse(window.localStorage.getItem('jwt'))
      old.user = data.user
      window.localStorage.setItem('jwt', JSON.stringify(old))
    }

    setCalorieLimit(0)
    setOpen(false)
  }

  return (
    <>
      <CalorieModal
        calorieLimit={calorieLimit}
        handleChange={(e) => setCalorieLimit(e.target.value)}
        open={open}
        handleCalorie={handleCalorie}
      />

      <Base
        username={username}
        title='Welcome to User area'
        description='Manage all of your meals here'
        className='container bg-white p-4'
      >
        <Home username={username} id={_id} />
      </Base>
    </>
  )
}

export default DashBoard
