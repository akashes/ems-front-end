import React,{useState} from 'react'
import { MDBInput } from 'mdb-react-ui-kit'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap'

function Add() {
  const[formDetails,setFormDetails]=useState({
    // id:'',
    // name:'',
    // age:'',
    // salary:'',
    // designation:''
  })
  const [showAlert,setShowAlert]=useState(false)
  const base_url='http://localhost:8000/add-an-employee'
  const navigate =useNavigate()
  const handleInput=(e)=>{
    const{name,value}=e.target
  
    if(name=='name'){
      setFormDetails({...formDetails,name:value})
    }else if (name=='id'){
      setFormDetails({...formDetails,id:value})
    }
    else if (name=='age'){
      setFormDetails({...formDetails,age:value})
    
  }else if (name=='designation'){
      setFormDetails({...formDetails,designation:value})
    }
    else if (name=='salary'){
      setFormDetails({...formDetails,salary:value})
    }

  }

  const showOrHideAlert=(callback)=>{
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
      callback()

      
    }, 2000);
    
  }
  const addEmployee=async(e)=>{
    e.preventDefault()

    const{id,name,age,salary,designation}=formDetails
    if(id && name && age && salary && designation){

    }
    const body={
      id,name,age,designation,salary
    }
    console.log(body);
    //api call to add employee details to mongodb
    const result = await axios.post(base_url,body).then((result)=>{
      showOrHideAlert(()=>navigate('/'))
      // navigate('/')
      
    }).catch((error)=>{
      console.log(error);
    alert('please enter a unique employee id');
    })
    console.log(result);
 


  }
  console.log(formDetails);
  return (
  <div style={{minHeight:'70vh',width:'100vw'}} className=" container d-flex flex-column align-items-center bg-light">
    <h2 className='my-3'>Add Employee</h2>
  
   <form className='p-5   rounded shadow 'style={{width:'600px' }} action="
   ">
      {
        showAlert &&  <Alert key='success' variant='success'>
      Employee Added !!!
      </Alert>
      }
     <MDBInput name='id' onChange={handleInput} className='mb-2 bg-light  ' label='Id' id='formControlLg' type='text' size='lg' />
      <br />
    <MDBInput onChange={handleInput} name='name' className='mb-2 bg-light ' label='Name' id='formControlLg' type='text' size='lg' />
    <br />
    <MDBInput onChange={handleInput} name='age' className='mb-2 bg-light ' label='Age' id='formControlLg' type='text' size='lg' />
    <br />
    <MDBInput onChange={handleInput} name='designation' className='mb-2 bg-light ' label='Designation' id='formControlLg' type='text' size='lg' />
    <br />
    <MDBInput onChange={handleInput} name='salary' className='mb-2 bg-light ' label='Salary' id='formControlLg' type='text' size='lg' />

    <div className='d-flex justify-content-center'>
    <button onClick={(e)=>addEmployee(e)} className='p-2 rounded d-flex justify-content-between align-items-center gap-2 bg-primary text-light border-0 my-2'>
    Add <i className="fa-solid fa-user-plus"></i>

    </button>
   </div>
   </form>


    
  </div>
  )
}

export default Add
