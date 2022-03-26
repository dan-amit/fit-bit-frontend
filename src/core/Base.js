import React from 'react'
import Menu from './Menu'
import { FaTwitter } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa'
import { FaMailBulk } from 'react-icons/fa'
import './style/Footer.css'

const Footer = () => {
  return (
    <div style={{ width: '100%' }}>
      <div className='footer_section layout_padding'>
        <div className='container'>
          <div className='footer_menu'>
            <ul>
              <li style={{ listStyleType: 'none' }}>
                <FaTwitter />
                <span style={{ marginLeft: '10px' }}>Twitter</span>
              </li>
              <li style={{ listStyleType: 'none' }}>
                <FaFacebook />
                <span style={{ marginLeft: '10px' }}>Facebook</span>
              </li>
              <li style={{ listStyleType: 'none' }}>
                <FaMailBulk />
                <span style={{ marginLeft: '10px' }}>Mail</span>
              </li>
              <li style={{ listStyleType: 'none' }}>
                <FaInstagram />
                <span style={{ marginLeft: '10px' }}>Instagram</span>
              </li>
              <li style={{ listStyleType: 'none' }}>
                <FaYoutube />
                <span style={{ marginLeft: '10px' }}>Youtube</span>
              </li>
            </ul>
          </div>
          <div className='location_main'>
            Help Line Number : <a>+1 1800 1200 1200</a>
          </div>
        </div>
      </div>

      <div class='copyright_section'>
        <div class='container'>
          <p class='copyright_text'>
            © {new Date().getFullYear()} All Rights Reserved. Design by
            <a href='https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=new'>
              {' '}
              @ Scared to Compile
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
const des =
  'A Fitbit can help you approximate how many calories you burn during any given exercise and can create a snapshot of your overall daily and weekly expenditure.Fitbit dashboard is especially well-suited for weight loss efforts. Its clean, simple interface allows you to input and evaluate health data from a computer or your smartphone. Customizable tiles can help you understand and manage your energy balance. The dashboard can also help you manage your macronutrient balance, track your sleep, set mindfulness goals, and watch daily activity metrics—all factors that are linked to healthy weight loss.'

const Base = ({ id, className = 'bg-dark text-white p-4', children }) => (
  <div>
    <Menu id={id} />
    <div className='container-xs'>
      <div style={{ width: '100%', height: '130px', position: 'relative' }}>
        <img
          src={'https://caloriecontrol.org/wp-content/uploads/side1.jpg'}
          width={'100%'}
          height={'100%'}
        />
        <div
          style={{
            color: '#fff',
            position: 'absolute',
            top: '80px',
            left: '30px'
          }}
        >
          <h4>Food Calorie Calculator</h4>
        </div>
      </div>
      <div className={className} style={{ marginTop: '30px' }}>
        {children}
      </div>
      <Footer />
    </div>
  </div>
)

export default Base
