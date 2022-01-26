// import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import './Influencers.css';
import Select from 'react-select';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


const Influencers = () => {
    const navigate = useNavigate()
    
    const [influencers, setinfluencers] = useState([]);
    const [errors, setError]= useState("");
    const [success, setSuccess] = useState("");
    const [setOptionValues,setGender]= useState("")
    const [searchTerm, setSearchTerm] = useState("")
    const [searchCountry, setCountry] = useState("")
    const country = [
        { value: '', label: 'All' },
        { value: 'UAE', label: 'UAE' },
        { value: 'USA', label: 'USA' },
        { value: 'AUSTRALIA', label: 'AUSTRALIA' },
        { value: 'INDIA', label: 'INDIA' }
      ]
    const gender = [
        { value: '', label: 'All' },
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
    ]
   
    useEffect( async() =>{
        
        const config= {
            header: {
                "Content-type": "application/json"
            }
        }
        
        
        try {
            const res = await axios.get(`/influencers`, config);
            console.log("response",res.data.data)
            
            setinfluencers(res.data.data);
            
            searchTerm ='';
            setOptionValues.value = '';
            searchCountry.value = '';
        // setResult(res.data.result)
        
        } catch (error) {
            setError(error.message);
            console.log(errors);
        }
        
    },[]);
// delete influencer
const submit = async(id) => {

    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this .',
      buttons: [
        {
          label: 'Yes',
          onClick: () => removeItem(id)
        },
        {
          label: 'No',
          onClick: () => alert('User not deleted')
        }
      ]
    });
}
const removeItem = async (id) =>{
    let user_id = id;
    const token= "Bearer "+localStorage.getItem("authToken");
    // const token= "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTk3NzRkODIxNGZhNTJiMDMwYTIxZiIsImlhdCI6MTY0MzEwNTU4MCwiZXhwIjoxNjQzMTExNTgwfQ.54Gd5qEBmb54uuZuZDbZhI6UZ4xlaYj6dqiNoeuMn1E";
    const config = {
    
    headers: {
        'authorization': token,
        'Content-Type': 'application/json'
        },
    };
        try {
            const { data } = await axios.get(
                "/api/admin/delete-influencer/"+user_id,
                config
            );
            console.log(data)
            // delete image
            
                
                    
                    
                    const del=await axios.post('/api/admin/destroyImage', {'images':data.influencer.images}, {
                    headers: {
                        'authorization': token,
                        'Content-Type': 'application/json'
                        }
                    })
                    console.log(del.data);
                    
                
            
            setSuccess(data.success);
            const res = await axios.get(`/influencers`, {header: {
                
                'Content-Type': 'application/json'
                }});
            
            setinfluencers(res.data.data);
            console.log(data.success);
            } catch (error) {
            setError(error.response.data.message);
            setTimeout(() => {
                setError("");
            }, 5000);
                if (error.response.status==401) {
                    localStorage.setItem("authToken", '');
                    navigate("/login");
                }
            }
    };
  
    
  return <div>
      
      <div className='row'>
            <div className='col-md-12'>
                <form className='row'>
                    <div className="col">
                        <label className="form-label">Search</label>
                        <input type="text" className="form-control"  placeholder='Search By Name' onChange={(event)=>{
                            setSearchTerm(event.target.value);
                        }} />
                    </div>
                    <div className='col'>
                        <label className='form-label'>Select country</label>
                        <Select  options={country}  onChange={setCountry} defaultValue={{ label: 'All', value: '' }}  />
                    </div>
                    <div className='col'>
                        <label className='form-label'>Select gender</label>
                        <Select options={gender}  onChange={setGender} defaultValue={{ label: 'All', value: '' }} />
                    </div>
                </form>
            </div>
        </div>
        <div className='row'>
            <div className='col-md-12'>
                <ul >
                    <li><Link to="/addInfluencer">Add Influencer</Link></li>
                </ul>
            </div>
        </div>
      <div className="influencers">
         
      {
                
                influencers.filter(
                    (influencer)=>{
                        if(searchTerm == ""){
                            return influencer
                        }else if (influencer.influencername.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return influencer
                        }                        
                    }
                ).filter(
                    (influencer)=>{
                        if(setOptionValues.value == ''){
                            return influencer
                        }else if (influencer.gender.toLowerCase() === setOptionValues.value?.toLowerCase()){
                            return influencer
                        }
                    }
                ).filter(
                    (influencer)=>{
                        if(searchCountry.value == ''){
                            return influencer
                        }else if (influencer.country.toLowerCase() === searchCountry.value?.toLowerCase()){
                            return influencer  
                            
                        }
                    }
                ).map(influencer => {
                    return (
                        
                        <div key={influencer._id} influencer={influencer.influencername} className="product_card">
                            <img src={influencer.images} alt="" />
                            <div className="product_box">
                               <h2 title={influencer.influencername}>{influencer.influencername}</h2>
                                <span>{influencer.email}</span>
                                <p>{influencer.country}</p>
                                <p>{influencer.instaUrl}</p>
                                <p>{influencer.fbUrl}</p>
                                <p>{influencer.gender}</p>
                                <ul className='action-btn'>
                                <li><Link to={"/edit-influencer/"+influencer._id}>Edit</Link></li>
                                    {/* <li><button onClick={() => removeItem(influencer._id)} name={influencer._id}>Delete</button></li> */}
                                    <li><button onClick={() => submit(influencer._id)} name={influencer._id}>Delete</button></li>
                                </ul>
                             </div>
                         </div>
                      );
                      
                 })
      }
      </div>

  </div>;
};

export default Influencers;
