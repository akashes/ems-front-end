import React, { useEffect, useState } from "react";
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {Row,Col} from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import './admin.css'


function Admin() {
  const base_url='http://localhost:8000/get-all-employees'

  const[employees,setEmployees]=useState([])
  const [deletes,setDeletes]=useState(false)
  const[showAlert,setShowAlert]=useState(false)
  const navigate =useNavigate()


  const fetchData=async()=>{
    const {data} = await axios.get(`${base_url}`)
    console.log(data.employees);

    setEmployees(data.employees)

  

  }
  const setHideAndShowAlert=()=>{
    setShowAlert(true)
    setTimeout(()=>{
      setShowAlert(false)

    },2000)
  }

  const handleDelete=async(id)=>{
    console.log(id);
  
     const result =axios.delete(`http://localhost:8000/delete-an-employee/${id}`)
     console.log(result);

     setDeletes(!deletes)
     setHideAndShowAlert()


  }

  useEffect(()=>{
    fetchData()

  },[deletes])
  return (
    <div style={{minHeight:'70vh'}}>
      <h1 className="text-center text-primary m-4">
        Employee Management System
      </h1>
      <div className="container" style={{position:'relative',width:'100vw'}}>
        <p style={{textAlign:'justify'}}>
          Employee management is a practice that helps a manager improve
          employee productivity and satisfaction to help an organisation reach
          its goals. Human resources (HR) professionals often use an employee
          management system (EMS), including recruitment, offboarding and
          performance management. Using a dedicated EMS can help an HR manager
          streamline the hiring process and improve workplace efficiency. In
          this article, we discuss what an employee management systems is,
          outline its benefits and types and list some examples of employee
          management software tools.
        </p>

      </div>
    
    
   <div className="container">
    <Row className="my-5">
        <Col sm={12} md={9} lg={9} xl={9}>

        <MDBTable className="emp-table" align='middle'>
     { employees.length>0 && <MDBTableHead>
        <tr>
          <th className="fw-bold" scope='col'>ID</th>
          <th  className="fw-bold"scope='col'>Name</th>
          <th className="fw-bold" scope='col'>Age</th>
          <th className="fw-bold" scope='col'>Designation</th>
          <th className="fw-bold" scope='col'>Salary</th>
          <th className="text-center fw-bold" scope='col'>Actions</th>
        </tr>
      </MDBTableHead>}
      <MDBTableBody>


        {
          employees && 
          employees.map((employee)=>{
            return(
              <tr className='table-row'>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.age}</td>
                <td>
                <MDBBadge  className=" desig d-flex justify-content-center align-items-center p-2 w-50" color='success' pill>
                {employee.designation}

            </MDBBadge >
                  </td>
                <td>{employee.salary}</td>
                <td>
                <div className="d-flex justify-content-between align-items-center">
                  <i onClick={()=>navigate(`/view/${employee.id}`)} className="fa-solid fa-eye text-green"></i>
                <i onClick={()=>navigate(`/edit/${employee.id}`)} className="fa-solid fa-pen text-primary "></i>
                <i name='delete' onClick={()=>handleDelete(employee.id)} className="fa-solid fa-trash text-danger"></i>
            </div>
                </td>
              </tr>
            )
          }) 
        }
       
      </MDBTableBody>
    </MDBTable>
    {
        showAlert &&  <Alert key='danger' variant='danger'>
      Employee Deleted !!!
      </Alert>
      }</Col>
    {
      employees.length==0 &&  <p className="text-center text-danger fs-2 fw-bold">Loading...</p>
    }
        <Col className="d-flex justify-content-center align-items-center " sm={12} md={3} lg={3} xl={3}>
{  employees.length >0 &&       <a onClick={()=>navigate('/add')} className=" btn btn-primary m-5 px-5 py-3   " >Add</a>
}</Col>
    </Row>

    
   </div>
    </div>
  );
}

export default Admin;
