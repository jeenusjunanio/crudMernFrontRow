import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams  } from "react-router-dom";
import "./AddInfluencer.css";
import Select from 'react-select';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const EditInfluencer = () => {
    const { id } = useParams();
    const [influencername, setinfluencername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [images, setImages] = useState("")
    const [gender,setGender]= useState("");
    const [searchCountry, setCountry] = useState("");
    const [instaUrl, setinstaUrl] = useState("");
    const [fbUrl, setfbUrl] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const genderoption = [
        { value: '', label: 'All' },
        { value: 'male', label: 'Male' },
        { value: 'female', label: 'Female' }
    ]
    const countries = [
        { value: '', label: 'All' },
        { value: 'UAE', label: 'UAE' },
        { value: 'USA', label: 'USA' },
        { value: 'AUSTRALIA', label: 'AUSTRALIA' },
        { value: 'INDIA', label: 'INDIA' }
      ]
    const styleUpload = {
        display: images ? "block" : "none"
    }
    const token= "Bearer "+localStorage.getItem("authToken");
    const handleUpload = async e =>{
        e.preventDefault()
        try {
           
            const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")
  
            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")
  
            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")
  
            let formData = new FormData()
            formData.append('avatar', file)
  
            setLoading(true)
            const res = await axios.post('/api/admin/upload-influencer', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
            console.log(res.data.data.URL)
            setLoading(false)
           
            setImages(res.data.data.URL)
  
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    // delete image
    const handleDestroy = async () => {
      try {
          
          setLoading(false)
          const del=await axios.post('/api/admin/destroyImage', {images}, {
            headers: {
                'authorization': token,
                'Content-Type': 'application/json'
                }
          })
          console.log(del.data.message);
          setLoading(false)
          setImages("")
      } catch (err) {
        setLoading(false)
        console.log(err.response.data.message)
      }
    }
      const UpdateIfluencerHandler= async(e)=>{
        e.preventDefault();
        const token= "Bearer "+localStorage.getItem("authToken");
        const config = {
     
            headers: {
              'authorization': token,
              'Content-Type': 'application/json'
              },
        };
        try {
            const { data } = await axios.put(
                "/api/admin/update-influencer/"+id,
                {
                  influencername,
                  email,
                  password, 
                  "gender":gender.value,
                  "country":searchCountry.value,
                  images,
                  instaUrl,
                  fbUrl
                },
                config
            );
            setSuccess("User Added Successfully");
            setTimeout(() => {
            setSuccess("");
            }, 5000);
            navigate("/influencers");
        } catch (error) {
            if (error.response.status==401) {
                localStorage.setItem("authToken", '');
                navigate("/login");
            }
            setError(error.response.data.message);
            setTimeout(() => {
                setError("");
            }, 5000);
            console.log(error.response);
        }
      }
      useEffect( async() =>{
        
        const config= {
            headers: {
                'authorization': token,
                'Content-Type': 'application/json'
            },
        }
        console.log(id);
        
        try {
            const res = await axios.get("/api/admin/edit-influencer/"+id, config);
            console.log("response",res.data.influencer)
            const influencer= res.data.influencer;
            if(!influencer){
                setError("No Influencer found!");
                setTimeout(() => {
                    setError("");
                }, 5000);
            }
            setinfluencername(influencer.influencername);
            setEmail(influencer.email);
            setGender({ value: influencer.gender, label: influencer.gender });
            setCountry({ value: influencer.country, label:influencer.country});
            
            setPassword(influencer.password);
            setinstaUrl(influencer.instaUrl);
            setfbUrl(influencer.fbUrl);
            setLoading(false);
            setImages(influencer.images);
        } catch (error) {
            console.log(error.response);
            if (error.response.status==401) {
                localStorage.setItem("authToken", '');
                navigate("/login");
            }
            setError(error.response.data.message);
            setTimeout(() => {
                setError("");
            }, 5000);
            
        }
        
    },[]);
  return <div className="register-screen">
  <div className="upload">
              <input type="file" name="file" id="file_up" onChange={handleUpload}/>
              {
                  loading ? <div id="file_img">Loading....</div>

                  :<div id="file_img" style={styleUpload}>
                      <img src={images ? images : ''} alt=""/>
                      <span onClick={handleDestroy}>X</span>
                  </div>
              }
              
          </div>
            <form onSubmit={UpdateIfluencerHandler} className="register-screen__form">
            <h3 className="register-screen__title">Edit Influencer</h3>
            {error && <span className="error-message">{error}</span>}
            {success && <span className="success-message">{success}</span>}
            <div className="form-group">
                <label htmlFor="influencername">Influencer name:</label>
                <input
                type="text"
                required
                id="influencername"
                placeholder="Enter influencername"
                value={influencername}
                onChange={(e) => setinfluencername(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                type="email"
                required
                id="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            
            <div className="form-group">
                <label htmlFor="email">Gender:</label>
                <Select options={genderoption}  onChange={setGender} defaultValue={gender} />
            </div>
            
            <div className='col'>
                <label className='form-label'>Select country</label>
                <Select  options={countries}  onChange={setCountry} defaultValue={searchCountry}  />
            </div>
            <button type="submit" className="btn btn-primary">
                Update Influencer
            </button>
            </form>
        </div>;
};

export default EditInfluencer;
