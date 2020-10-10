import React,{useState,useEffect} from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Dropdown from "./dropdown";
import axios from 'axios';
import './App.css';
import FlashMessage from "react-flash-message";
import PaginationPage from "./PaginationPage";
import { Table } from 'reactstrap';

function App() 
{
  const [post, setPost] = useState({
    _id:"",
    Cname: "",
    Cdesc: "",
    Cno: "",
    Cemail: "",
    Clogo: "",
    CState: "Maharashtra",
    Ccity: "No City Selected"
  });

  const [dposts,setDPosts] =useState([]);
  const [dusers,setUsers]=useState([]); 
  const[currentPage,setCurrentPage]=useState(1); 
  const[totalUsers,setTotalusers]=useState(0); 


  function nextpage(pageNumber){
    setCurrentPage(pageNumber);
    setUsers([]);
    getUsers(pageNumber);
  }

  function getUsers (currentPage) {
    console.log("users",dposts);
   axios.post('http://localhost:8080/api/page',{
    page:currentPage
   })
     .then((response) => {
       console.log(response.data)
      setUsers(response.data);
      console.log(response.data);
    }, (error) => {
      console.log(error);
    });
  }
 
  function setTotal (){
		axios.get("http://localhost:8080/api/1")
      .then( res =>{
        console.log(res.data);
         setTotalusers(res.data) // new
      }
			)
  }
  useEffect(() => {
    getUsers(currentPage);
    setTotal();
  },[])

  let numberOfPages = 0;
  console.log(totalUsers);
    if (totalUsers % 8 === 0)
      {
        numberOfPages = Math.floor(totalUsers / 8);
      console.log(numberOfPages);}
    else
      numberOfPages = Math.floor(totalUsers / 8) + 1;


    const [status, setStatus] = useState(false);



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

  function handleClick(event) {
    event.preventDefault();
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
      url: 'http://localhost:8080/api/save',
      method:'POST',
      data :payload
    })
    .then(() => {
     console.log("Inserted Sucessfully");
     setStatus(true);
    })
    .catch(() => {
      console.log("Something went Wrong");
    })
  }

  /*reload**/
  function refreshPage(){
    window.location.reload();
                                      }



/*Edit**/
  function idDelete(eml) {
  console.log("email:",eml);

  const load={
    Cemail:eml
  }
 

  axios({
    url: 'http://localhost:8080/api/Removedata',
    method:'POST',
    data :load
  })
  .then(() => {
    window.location.reload(false);
    
    console.log("Deleted Sucessfully");
  })
  .catch(() => {
    console.log("Something went Wrong");
  })
        }
  /**************Delete*****************/
  function onEdit(eml) {
    window.location ="/edit/" + eml;
    }
/********ViewByID */
function onView(id) {
  window.location ="/view/" + id;
  }

  /***Display Here***/
  return (
    <div>
      <div>
           {
            status && (
              <div class="alert alert-danger" role="alert">
                <FlashMessage duration={5000}>
                  <strong>Warning : Reload Page to get Updated Data!</strong>
                    <button class="btn btn-danger" type="submit"  onClick={refreshPage}>Refresh Button</button>
                </FlashMessage>
              </div>
                     )
            }
      </div>
        <Header />
        <div id="container">
            <div id="first">
              <form onSubmit={handleClick}>  
                <label for="Cname">Company Name</label>
                <div className=" form-group">
                    <input type="text" name="Cname" value={post.Cname} onChange={handleChange} placeholder="Name here"/>
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
                  <div className="form-group">
                  <input type="email" name="Cemail" value={post.email} onChange={handleChange} placeholder="Email here"/>
                </div>
                
                <label for="">Logo</label>
                <div className="form-group  ">
                  <input type="text" name="Clogo" value={post.Clogo} onChange={handleChange} placeholder="Logo Url here"/>
                </div>

                <div onChange={handleChange} className="form-group  ">
                  <Dropdown onChange={handleChange} required/>
                </div>
                      <button class="btn btn-primary">Submit</button>
            </form>
            </div>
            
            <div id="second">
            <Table responsive>
                    <thead >
                        <tr>
                          <th >#</th>
                          <th >Company Name</th>
                          <th >Desc</th>
                          <th >Contact</th>
                          <th >Email</th>
                          <th >Logo</th>
                          <th >State</th>
                          <th >City</th>
                          <th>View</th>
                          <th >Edit</th>
                          <th >Delete</th>
                      </tr>
                    </thead>
                    {dusers.map((users,index) => (
                  <tbody>
                      <tr>
                          <td key={index} id={index}>{index + 1}</td>
                          <td>{users.Cname}</td>
                          <td>{users.Cdesc}</td>
                          <td>{users.Cno}</td>
                          <td>{users.Cemail}</td>
                          <td><img width="50px" height="50px" src={users.Clogo} alt="thumbnail" /></td>
                          <td>{users.CState}</td>
                          <td>{users.Ccity}</td>
                          <td>
                            <button type="button" class="btn btn-info" onClick={() => onView(users._id)}>View</button>
                          </td>
                          <td>
                            <button type="button" class="btn btn-warning" onClick={() => onEdit(users.Cemail)}>Edit</button>
                          </td>
                          <td>
                              <button type="button" class="btn btn-danger" onClick={() => idDelete(users.Cemail)} >Delete</button>
                        </td>
                      </tr>
                </tbody>
                ))}
                <div>
                <div class="page">
                    {totalUsers > 8 &&
                  <PaginationPage
                  pages={numberOfPages}
                  nextPage={nextpage}
                  currentPage={currentPage}
                  >
                  </PaginationPage>
                  }
                </div >
                </div>
              </Table>
              
            </div>
           
            <Footer/>
        </div>
    </div>
    )
}
export default App;
