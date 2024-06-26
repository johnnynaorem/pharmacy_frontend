import React, { useState } from 'react'
import './LoginSignUp.css'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import img from '../../Pages/Image/user.svg'
const LoginSignUp = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [auth, setAuth] = useAuth()
  const [login, setLogin] = useState(true);
  const [user, setUser] = useState()
  const [image , setImage] = useState('')
  const [credentials, setCredentials] = useState({name: '', email: '', address: '', phone: '', password: ""});
  const [loginCredentials, setLoginCredentials] = useState({ email: "", password: ""});

  const handleOnChange = (e) => {
    setLoginCredentials({...loginCredentials, [e.target.name]: e.target.value})
  }

  const handleOnChangeReg = (event) => {
    setCredentials({...credentials, [event.target.name]: event.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("https://pharmacy-backend-pi.vercel.app/api/v1/auth/login",{ email: loginCredentials.email, password: loginCredentials.password });
      if(response && response.data.success){
        toast.success(response.data && response.data.message);
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token
        })
        localStorage.setItem('auth', JSON.stringify(response.data))
        navigate( location.state || '/')
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }
  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      const userData = new FormData()
      userData.append("name", credentials.name)
      userData.append("email", credentials.email)
      userData.append("password", credentials.password)
      userData.append("address", credentials.address)
      userData.append("image", image)
      userData.append("phone", credentials.phone)
      const {data} = await axios.post("https://pharmacy-backend-pi.vercel.app/api/v1/auth/register", userData)
      console.log(data)
      if(data?.success){
        toast.success(data?.message)
        window.location.reload()
      }else{
        toast.error(data.message)
      } 
    } catch (error) {
      console.log(error);
      toast.error('Something Went Wrong')
    }
  }

  return (
    <>
      {login? <div className="container" style={{"width":"330px","padding":"2rem 1rem", border:"1px solid red", "margin":"50px auto","backgroundColor":"#fff","borderRadius":"10px","textAlign":"center","boxShadow":"0 20px 35px rgba(0, 0, 0, 0.1)"}}>
        <h1 style={{"fontSize":"2rem","color":"#07001f","marginBottom":"1.2rem"}}>Login</h1>
        <form action>
          <input style={{"width":"92%","outline":"none","border":"1px solid #fff","padding":"12px 20px","marginBottom":"10px","borderRadius":"20px","background":"#e4e4e4"}} type="text" name='email'  placeholder="username" required onChange={(e) => handleOnChange(e)}/>
          <input style={{"width":"92%","outline":"none","border":"1px solid #fff","padding":"12px 20px","marginBottom":"10px","borderRadius":"20px","background":"#e4e4e4"}} type="password" name='password'  placeholder="password" required onChange={(e) => handleOnChange(e)}/>
          <div className="signupInnerContainer">
            <a >Forgot password?</a>
          </div>
        <button style={{"fontSize":"1rem","marginTop":"1.8rem","padding":"10px 0","borderRadius":"20px","outline":"none","width":"90%","color":"#fff","cursor":"pointer","background":"rgb(17, 107, 143)"}} onClick={(e) => handleSubmit(e)}>Login</button><br />
        </form>
        Not a member?
        <span onClick={()=> setLogin(false)} style={{cursor: 'pointer', color: 'red', textDecoration: 'underline'}}>Sign Up here</span>
      </div> : <div className="container" style={{"width":"430px","padding":"2rem 1rem",border:"1px solid red","margin":"50px auto","backgroundColor":"#fff","borderRadius":"10px","textAlign":"center","boxShadow":"0 20px 35px rgba(0, 0, 0, 0.1)"}}>
        <h1 style={{"fontSize":"2rem","color":"#07001f","marginBottom":"1.2rem"}}>Sign Up</h1>
        <form >
          <input style={{"width":"92%","outline":"none","border":"1px solid #fff","padding":"12px 20px","marginBottom":"10px","borderRadius":"20px","background":"#e4e4e4"}} type="text" name='name' id placeholder="name" onChange={handleOnChangeReg}/>
          <input style={{"width":"92%","outline":"none","border":"1px solid #fff","padding":"12px 20px","marginBottom":"10px","borderRadius":"20px","background":"#e4e4e4"}} type="email" name='email' id placeholder="email" onChange={handleOnChangeReg}/>
          <input style={{"width":"92%","outline":"none","border":"1px solid #fff","padding":"12px 20px","marginBottom":"10px","borderRadius":"20px","background":"#e4e4e4"}} type="text" name='address' id placeholder="address" onChange={handleOnChangeReg}/>
          <input style={{"width":"92%","outline":"none","border":"1px solid #fff","padding":"12px 20px","marginBottom":"10px","borderRadius":"20px","background":"#e4e4e4"}} type="number" name='phone' id placeholder="phone" onChange={handleOnChangeReg}/>
          <input style={{"width":"92%","outline":"none","border":"1px solid #fff","padding":"12px 20px","marginBottom":"10px","borderRadius":"20px","background":"#e4e4e4"}} type="password" name='password' id placeholder="password"onChange={handleOnChangeReg} />
          <label htmlFor>Upload your photo here <input style={{"width":"92%","outline":"none","border":"1px solid #fff","padding":"12px 20px","marginBottom":"10px","borderRadius":"20px","background":"#e4e4e4"}} type="file" name id onChange={(e) => setImage(e.target.files[0])}/></label>
        </form>
          <div className="imgContainer d-flex mx-auto" style={{borderRadius: '50%', width:"60px", height: '60px', border: '1px solid red', cursor: 'pointer', justifyContent:'center', alignItems: 'center'}}>
              {image? (<img src={URL.createObjectURL(image)} alt="" style={{borderRadius: '50%', width: '100px', height: '100%', objectFit: 'cover'}}/>)
              : <img src={img} alt="" style={{borderRadius: '50%', width: '100%', height: '100%', objectFit: 'contain'}}/>
              }
          </div>
        <div className="innercontainer" style={{"margin":"0.2rem"}}>
          <input style={{"height":"1rem","width":"1rem","verticalAlign":"middle","cursor":"pointer"}} type="checkbox" name id="checkbox" />
          <label htmlFor="checkbox">I agree to these <a href="#" style={{"fontSize":"0.7rem"}}>Terms &amp; conditions</a></label>
        </div>
        <button style={{"fontSize":"1rem","marginTop":"1.8rem","padding":"10px 0","borderRadius":"20px","outline":"none","width":"90%","color":"#fff","cursor":"pointer","background":"rgb(17, 107, 143)"}} onClick={handleSignUp}>Sign Up</button>
        Already a member? <a onClick={()=> setLogin(true)} style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline'}}>Login In here</a>
      </div>
      }
    </>
  )
}

export default LoginSignUp
