import React, { useState } from "react";
import {Link} from "react-router-dom";
import { useFirebase } from "../Context/firebase";
import Brightness2Icon from '@mui/icons-material/Brightness2';
import Brightness5Icon from '@mui/icons-material/Brightness4';
const Navbar = () => {
  const firebaseCon=useFirebase();
  let[mode,setMode]=useState('light');
  let[show,setshow]=useState(false);
  let mainelement=document.querySelector('html');
  mainelement.setAttribute('data-bs-theme', mode);


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container ">
          <Link className="navbar-brand fw-bold" to="/">
            Blog<span className="text-warning">Oasis</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="google.comnavbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={()=>setshow(!show)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${show?"show":" "}`} 
           >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-2">
              <li className="nav-item px-1">
                <Link className="nav-link " to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item px-1">
                <Link className="nav-link" to="/about">
                 About
                </Link>
              </li>
              <li className="nav-item dropdown px-1">
                <Link
                  className="nav-link dropdown-toggle"
                  to="google.com"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/myprofile">
                      MyProfile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/createblog">
                     Create Blog
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/contact">
                     Contact Us
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li className="px-4" onClick={()=>firebaseCon.logOut()} style={{cursor:"pointer"}}>
                    Log Out
                  </li>
                </ul>
              </li>
              
              
            </ul>
              <button style={{border:'none',borderRadius:'20px'}} onClick={()=>{if(mode==='light')setMode('dark');else setMode('light')}}>{mode==='light'?<Brightness2Icon/>:<Brightness5Icon/>}</button>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
