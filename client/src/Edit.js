import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Header from "./Header";
import Footer from "./Footer";
import Dropdown from "./dropdown";

function Edit(props) {
   const eml = props.match.params.email;
      
   const [post,setPost] =useState({
});

   useEffect(() => {
   axios.get("http://localhost:8080/api/company/" + eml)
    .then( res => {
        console.log("res.data",res.data[0]);
        setPost(res.data[0]);
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

    function handleClick(event) {

      const payload={
        Cname:post.Cname,
        Cdesc:post.Cdesc,
        Cno:post.Cno,
        Cemail:post.Cemail,
        Clogo:post.Clogo,
        CState:post.CState,
        Ccity:post.Ccity,
  
      }
      axios({
        url: 'http://localhost:8080/api/update',
        method:'PUT',
        data :payload
      })
      .then(() => {
        console.log("Inserted Sucessfully");
        window.location="/"
      })
      .catch(() => {
        console.log("Something went Wrong");
      })
    }
    return (
      <div>   
        <Header/>
  
     <div class="card">
  <div class="card-body">
<div>
<label for="Cname">Company Name</label>
<div className=" form-group">
<input type="text"
name="Cname"
value={post.Cname}
onChange={handleChange}
placeholder="Name here"
/>
</div>
<label for="Cdesc">Company Description</label>
<div className="form-group  ">

<textarea name="Cdesc" cols="23" rows="2" value={post.Cdesc}  onChange={handleChange} placeholder="Description here"></textarea>
</div>
<label for="">Mobile No</label>
<div className="form-group  ">
  <input type="text" name="Cno" value={post.Cno} onChange={handleChange} placeholder="Mobile No here"/>
</div>
<label for="">Email</label>
<div className="form-group  ">

<input type="email"
name="Cemail"
value={post.Cemail}
onChange={handleChange}
placeholder="Email here"
/>
</div>
<label for="">Logo</label>
<div className="form-group  ">

<input type="text"
name="Clogo"
value={post.Clogo}
onChange={handleChange}
placeholder="Logo Url here"
/>
</div>

<div onChange={handleChange} className="form-group  ">

<label for="">State</label>
<input type="text" value={post.CState} onChange={handleChange} readonly/>
<label for="">  City</label>
 <input type="text" value={post.Ccity} onChange={handleChange} readonly/>
  <br/> Change Location : <br/>
<Dropdown onChange={handleChange} required/>
</div>


<button class="btn btn-primary" onClick={handleClick} >Submit</button>
</div>

</div>
</div>


<Footer/>
      </div>
    );
  }

  export default Edit;