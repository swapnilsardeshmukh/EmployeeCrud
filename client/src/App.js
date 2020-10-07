import React,{useState,useEffect} from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Dropdown from "./dropdown";
import axios from 'axios';
import './App.css';

function App() {

  const [post, setPost] = useState({
    Cname: "",
    Cdesc: "",
    Cno: "",
    Cemail: "",
    Clogo: "",
    Cstate: "",
    Ccity: "",   
  });

  const [dposts,setDPosts] =useState([]);

  useEffect(() => {
		axios.get("http://localhost:8080/api")
			.then( res => setDPosts(res.data) // new
			)
	},[])


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

  function handleChange1(event) {
   console.log(event.target.CState);
   console.log(event.target.Ccity);
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

    console.log(payload);

    axios({
      url: 'http://localhost:8080/api/save',
      method:'POST',
      data :payload
    })
    .then(() => {
      console.log("Inserted Sucessfully");
    })
    .catch(() => {
      console.log("Something went Wrong");
    })
  }

//////////////////////////////////Project Display Start Here//////////////////////////////
  return (
    <div>
    <Header />

{/* ///////////////////////////////////////Display Here /////////////////////////////////////////////  */}
    <hr/>
 <div >
        <table class="table">
        <thead className="thead-dark">
          <tr>
      <th >#</th>
      <th >Company Name</th>
      <th >Desc</th>
      <th >Contact</th>
      <th >Email</th>
      <th >Logo</th>
      <th >State</th>
      <th >City</th>
    </tr>
    
  </thead>
  {dposts.map((dposts) => (

  <tbody>
      <tr>
      <td>#</td>
      <td>{dposts.Cname}</td>
      <td>{dposts.Cdesc}</td>
      <td>{dposts.Cno}</td>
      <td>{dposts.Cemail}</td>
      <td><img className="img-thumbnail img-fluid" width="100" height="100" src={dposts.Clogo} alt="thumbnail" /></td>
      <td>{dposts.CState}</td>
      <td>{dposts.Ccity}</td>
      </tr>
      </tbody>
      ))}
</table>
          </div>

{/* ///////////////Add form Here/////////////////// */}


          <form onSubmit={handleClick}>
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
<input type="text"
name="Cno"
value={post.Cno}
onChange={handleChange}
placeholder="Mobile No here"
/>
</div>
<label for="">Email</label>
<div className="form-group  ">

<input type="email"
name="Cemail"
value={post.email}
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

<Dropdown  />

<button class="btn btn-primary">Submit</button>
</div>

</div>
</div>
</form>

<Footer/>
          </div>
    )
}



export default App;
