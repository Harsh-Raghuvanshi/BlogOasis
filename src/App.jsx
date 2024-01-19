import React from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Error from "./Components/Error";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Createblog from "./Components/Createblog";
import Update from "./Components/Update";
import { Route, Routes } from "react-router-dom";
import Otherprofile from "./Components/Otherprofile"
import MyProfile from "./Components/Myprofile";
import AllBlogs from "./Components/AllBlogs";
const App=()=>{
    return(
        <>
        <Navbar />
        <Routes>
            <Route exact path="/" Component={()=><Home/>}></Route>
            <Route exact path="/about" Component={()=><About/>}></Route>
            <Route exact path="/contact" Component={()=><Contact/>}></Route>
            <Route exact path="/signup" Component={()=><Signup/>}></Route>
            <Route exact path="/signin" Component={()=><Signin/>}></Route>
            <Route exact path="/myprofile" Component={()=><MyProfile/>}></Route>
            <Route exact path="/createblog" Component={()=><Createblog task='Create'/>}></Route>
            <Route exact path="/update/:_id" Component={()=><Update/>}></Route>
            <Route exact path="/allblogs" Component={()=><AllBlogs/>}></Route>
            <Route exact path="/profile/:uniquename" Component={()=><Otherprofile/>}></Route>
            <Route exact path="*" Component={()=><Error/>}></Route>        
        </Routes>
        <Footer/>    
        </>
    )
}
export default App;