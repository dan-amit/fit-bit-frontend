import React, { useState, useEffect } from 'react'
import '../styles.css'
import { API } from '../backend'
import Base from './Base'
import moment from 'moment'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import Card from './Card'
import { getProducts } from './helper/coreapicalls'
import ProgressBar from './ProgressBar'
import Filter from './Filter'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { isAutheticated } from '../auth/helper'
import { getAllProducts } from './helper/coreapicalls'
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart'
    }
  }
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}
const PerformanceModal = ({ open, handleClose }) => {
  const { user } = isAutheticated()
  const [labels, setLabels] = useState({})
  useEffect(() => {
    loader()
  }, [])

  const loader = async () => {
    const groupByDate = {}
    const res = await getAllProducts(user.username)

    res.forEach((item) => {
      const key = moment(res[0].createdAt).format('YYYY-MM-DD')
      if (!groupByDate[key]) {
        groupByDate[key] = item.calorie
      } else {
        groupByDate[key] += item.calorie
      }
    })
    console.log(groupByDate, 'is group')
    setLabels(groupByDate)
  }

  //console.log('x axis ', Object.keys(labels))
  const yaxis = Object.keys(labels).map((item) => Number(labels[item]))
  //console.log(yaxis)
  const DATA = {
    labels: Object.entries(labels),
    //labels: [234, 456, 3456, 3, 456, 34, 234],
    datasets: [
      {
        label: 'Dataset 1',
        data: yaxis,
        //data: [234, 456, 3456, 3, 456, 34, 234].map((item) => item * 10),

        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)'
      }
    ]
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Your Diet
          </Typography>
          <Line options={options} data={DATA} />
        </Box>
      </Modal>
    </div>
  )
}
export default function Home({ username, id }) {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)
  const [reload, setReload] = useState(false)
  const [filter, setFilter] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    getProducts(username, filter).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        //console.log(data)
        setProducts(data)
      }
    })
  }, [reload, filter])

  return (
    <>
      {products.length == 0 ? (
        <h1>
          <center>Add Some Meals</center>
        </h1>
      ) : (
        <div className='jumbotron'>
          <h1 className='text-center'>Calorie Intake</h1>
          <ProgressBar reload={reload} setReload={setReload} />
        </div>
      )}

      {products.length == 0 ? (
        <h1></h1>
      ) : (
        <div>
          <div>
            <PerformanceModal open={open} handleClose={() => setOpen(false)} />
            <button
              className='btn btn-primary'
              style={{ borderRadius: '5px' }}
              onClick={() => setOpen(true)}
            >
              Performance
            </button>
          </div>
          <Filter filter={filter} setFilter={setFilter} />
        </div>
      )}

      <div className='row text-center'>
        {products.map((product, index) => {
          return (
            <div key={index} className='col-4 mb-4'>
              <Card
                key={index}
                product={product}
                id={id}
                reload={reload}
                setReload={setReload}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}
