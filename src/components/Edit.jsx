import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { MDBInput } from 'mdb-react-ui-kit'
import { useNavigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap'

function Edit() {
  
  const base_url='http://localhost:8000/update-an-employee'
  const[employeeDetail,setEmployeeDetail]=useState({

  })
  const[showAlert,setShowAlert]=useState(false)
  const navigate=useNavigate()

  const {id}=useParams()

  const getData=async()=>{

    const {data} =await axios.get(`http://localhost:8000/get-an-employee/${id}`)
    console.log(data.employee);
    setEmployeeDetail(data.employee)

    

  }

  useEffect(()=>{
    getData()

  },[])

  const handleInput=(e)=>{
    const {name,value}=e.target
    if(name=='name'){
      setEmployeeDetail({...employeeDetail,name:value})
    }else if(name=='id'){
      setEmployeeDetail({...employeeDetail,id:value})
    }else if(name=='designation'){
      setEmployeeDetail({...employeeDetail,designation:value})
    }else if(name=='salary'){
      setEmployeeDetail({...employeeDetail,salary:value})
    }
    else if(name==='age'){
      setEmployeeDetail({...employeeDetail,age:value})
    }

  }

  console.log(employeeDetail);

 
    const hideAndShowAlert=(callback)=>{
      setShowAlert(true)
      setTimeout(()=>{
        setShowAlert(false)
        callback()

      },2000)

    }
  
  const editEmployee=async(e)=>{
    e.preventDefault()
    const{id,name,age,salary,designation}=employeeDetail

    const body={
      id,name,age,salary,designation
    }
    console.log(body);
    const result= await axios.post(`${base_url}/${id}`,body)
   
    console.log(result);

    hideAndShowAlert(()=>navigate('/'))

  }

    

  


  return (
    <div style={{minHeight:'70vh',width:'100vw'}} className=" container d-flex flex-column align-items-center bg-light">
    <h2 className='fw-bold my-3'>Edit Employee</h2>
  
   <form className='p-5   rounded shadow 'style={{width:'600px' }} action="
   ">
     {
        showAlert &&  <Alert key='success' variant='success'>
      Employee Updated !!!
      </Alert>
      }
    
     <MDBInput value={employeeDetail.id} name='id' onChange={handleInput} className='mb-2 bg-light  ' label='Id' id='formControlLg' type='text' size='lg' />
      <br />
    <MDBInput value={employeeDetail.name} onChange={handleInput} name='name' className='mb-2 bg-light ' label='Name' id='formControlLg' type='text' size='lg' />
    <br />
    <MDBInput value={employeeDetail.age} onChange={handleInput} name='age' className='mb-2 bg-light ' label='Age' id='formControlLg' type='text' size='lg' />
    <br />
    <MDBInput value={employeeDetail.designation} onChange={handleInput} name='designation' className='mb-2 bg-light ' label='Designation' id='formControlLg' type='text' size='lg' />
    <br />
    <MDBInput value={employeeDetail.salary} onChange={handleInput} name='salary' className='mb-2 bg-light ' label='Salary' id='formControlLg' type='text' size='lg' />

    <div className='d-flex justify-content-center'>
    <button onClick={(e)=>editEmployee(e)} className='p-2 rounded d-flex justify-content-between align-items-center gap-2 bg-primary text-light border-0 my-2'>
    Update <i className="fa-solid fa-pen"></i>

    </button>
   </div>
   </form>


    
  </div>
  )
}

export default Edit
