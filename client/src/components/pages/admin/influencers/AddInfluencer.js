import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./AddInfluencer.css";
import Select from 'react-select';

const AddInfluencer = () => {

    const [influencername, setinfluencername] = useState("");
    const [email, setEmail] = useState("");
    const [images, setImages] = useState("")
    const [gender,setGender]= useState("");
    const [searchCountry, setCountry] = useState("");
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
    // const token= "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTk3NzRkODIxNGZhNTJiMDMwYTIxZiIsImlhdCI6MTY0MzEwODU1NiwiZXhwIjoxNjQzMTE0NTU2fQ.ssm6LNiL4z0jHbh2eOp7tg6EyeR2KxE5gSMVL2aayLU";
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
          const res = await axios.post('http://localhost:5001/api/admin/upload-influencer', formData, {
              headers: {'content-type': 'multipart/form-data', Authorization: token}
          })
          console.log(res.data.data.URL)
          setLoading(false)
         
          setImages(res.data.data.URL)

      } catch (err) {
          alert(err.response.data.msg)
      }
  }

  // const handleDestroy = async () => {
  //     try {
  //         if(!isAdmin) return alert("You're not an admin")
  //         setLoading(true)
  //         await axios.post('/api/destroy', {public_id: images.public_id}, {
  //             headers: {Authorization: token}
  //         })
  //         setLoading(false)
  //         setImages(false)
  //     } catch (err) {
  //         alert(err.response.data.msg)
  //     }
  // }
    const addInfluencerHandler = async (e) => {
    e.preventDefault();
    
    // const token= "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTk3NzRkODIxNGZhNTJiMDMwYTIxZiIsImlhdCI6MTY0MzEwODU1NiwiZXhwIjoxNjQzMTE0NTU2fQ.ssm6LNiL4z0jHbh2eOp7tg6EyeR2KxE5gSMVL2aayLU";
    const config = {
     
      headers: {
        'authorization': token,
        'Content-Type': 'application/json'
        },
    };

    

    try {
      const { data } = await axios.post(
        "/api/admin/add-influencer",
        {
          influencername,
          email,
          "password" : "",
          "gender":gender.value,
          "country":searchCountry.value,
          images
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
    }
  };
  return <div className="register-screen">
    <div className="upload">
                <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                {
                    loading ? <div id="file_img">Loading....</div>

                    :<div id="file_img" style={styleUpload}>
                        <img src={images ? images : ''} alt=""/>
                        <span>X</span>
                    </div>
                }
                
            </div>
  <form onSubmit={addInfluencerHandler} className="register-screen__form">
    <h3 className="register-screen__title">Add Influencer</h3>
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
      <Select options={genderoption}  onChange={setGender} defaultValue={{ label: 'All', value: '' }} />
    </div>
    
    <div className='col'>
        <label className='form-label'>Select country</label>
        <Select  options={countries}  onChange={setCountry} defaultValue={{ label: 'All', value: '' }}  />
    </div>
    <button type="submit" className="btn btn-primary">
      Add Influencer
    </button>
  </form>
</div>;
};

export default AddInfluencer;
