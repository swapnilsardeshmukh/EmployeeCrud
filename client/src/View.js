import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Header from "./Header";
import Footer from "./Footer";


function View(props) {
   const _id = props.match.params._id;
      
   const [post,setPost] =useState({
    _id:"",
    Cname: "",
    Cdesc: "",
    Cno: "",
    Cemail: "",
    Clogo: "",
    CState: "Maharashtra",
    Ccity: "No City Selected"
  });

   useEffect(() => {
   axios.get("http://localhost:8080/api/single/" + _id)
    .then( res => {
        console.log("res.data",res.data);
        setPost(res.data);
    })// new
  },{})

    function handleChange(event) {
      const { name, value } = event.target;
  
      setPost((prevValue) => {
        return {
          ...prevValue,
          [name]: value
        };
      });
      event.preventDefault();
    }

    // function handleClick(event) {

    //   const payload={
    //     Cname:post.Cname,
    //     Cdesc:post.Cdesc,
    //     Cno:post.Cno,
    //     Cemail:post.Cemail,
    //     Clogo:post.Clogo,
    //     CState:post.CState,
    //     Ccity:post.Ccity,
  
    //   }
    //   axios({
    //     url: 'http://localhost:8080/api/update',
    //     method:'PUT',
    //     data :payload
    //   })
    //   .then(() => {
    //     console.log("Inserted Sucessfully");
    //     window.location="/"
    //   })
    //   .catch(() => {
    //     console.log("Something went Wrong");
    //   })
    // }
    return (
      <div>   
        <Header/>
  

<div className=" form-group">
    <div class="ddata">
    <h1 class="chead">{post.Cname} </h1>
<img  src={post.Clogo} alt="no image to display"></img>
<p> {post.Cdesc} </p>
<h5>Contact : {post.Cno} </h5>
<h6>Email : {post.Cemail} </h6>
<h5> Address :</h5> 
<h6>State : {post.Ctate} </h6>  
<h6>City : {post.Ccity} </h6>  
    </div>



</div>


<Footer/>
      </div>
    );
  }

  export default View;