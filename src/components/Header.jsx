import React from "react";
import { MDBContainer, MDBNavbar, MDBNavbarBrand } from "mdb-react-ui-kit";
import image from '../assets/hr-icon-5.jpg'
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate()
  return (
    <div>
      <MDBNavbar className="p-3" light style={{backgroundColor:'lightSeaGreen'}}>
        <MDBContainer fluid>
          <MDBNavbarBrand onClick={()=>navigate('/')} href="#">
            <img 
              src={image}
              height="80px"
              alt=""
              loading="lazy"
            />
            <span className="ms-3 fw-bold">            WorkHub
</span>
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
}

export default Header;
