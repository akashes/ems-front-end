import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './view.css'
import { useNavigate } from 'react-router-dom'

import employeeImg from '../assets/employe.png'
import { Col, Row } from 'react-bootstrap';

function View() {
  const[empDetails,setEmployeeDetails]=useState()
  const {id}=useParams()
  const base_url='http://localhost:8000/get-an-employee'
  const navigate=useNavigate()

  const getData=async()=>{

    const {data} =await axios.get(`${base_url}/${id}`)
    console.log(data.employee);
    setEmployeeDetails(data.employee)

    

  }

  useEffect(()=>{
    getData()

  },[])
  return (
   <>
    <div style={{minHeight:'70vh',width:'100vw'}} className="container d-flex justify-content-center align-items-center   ">
      <Row className=' row p-5 border border-secondary  rounded shadow-lg ' style={{height:`100%`}} >
        <Col className='d-flex justify-content-center align-items-center'>
        <img width={400} height={400}  src={employeeImg} alt="" />
        </Col>
        <Col style={{height:`100%`}} className='d-flex justify-content-center align-items-center' >
        {
        
          empDetails ?
          <div  className="card p-5 m-5 shadow rounded">
             <h2 className='text-center text-uppercase fw-bold'>{empDetails.name}</h2>
             <p className='text-center fw-bold text-warning'>Age : {empDetails.age}</p>
             <p className='text-center fw-bold text-warning'>Salary : {empDetails.salary}</p>
             <button className='btn btn-outline-success p-1 pb-3 rounded text-center fw-bold fs-3'>{empDetails.designation}</button>
          </div>
         
          :<p>loading</p>

        }
        </Col>
      </Row>
      
       
    </div>
    <p className='text-center my-3 '>
    <span style={{cursor:'pointer'}} onClick={()=>(navigate('/'))} className='home-nav fw-bold fs-4' >
      Back to Home
    </span>
    </p>
   </>
   
  )
}

export default View
