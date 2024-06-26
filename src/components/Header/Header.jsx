import React from 'react'
import './Header.css'
import logo from './Vector.svg'
import card from './cart.svg'
import love from './love.svg'
import reload from './refresh.svg'
import user from '../../Pages/Image/user.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/cart'
import { useAuth } from '../../context/auth'
const Header = () => {
  const [cart, setCart] = useCart()
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()
  return (
    <div>
      <header style={{marginBottom: '80px'}}>
        {/* <div className="container-fluid header-top d-flex" style={{justifyContent: "space-evenly"}}>
          <div className='header-top-left d-flex'>
            <img src="" alt="location" />
            <p>MTU Campus, Takyelpat</p>
          </div>
          <div className='header-top-middle d-flex'>
            <img src="" alt="phone" />
            <p>Sales & Services Support/999-456-6782</p>
          </div>
          <div className='header-top-right d-flex'>
            <p>EN</p>
            <p>$ INR</p>
            <img src="" alt="account" />
            <p>My Acoount</p>
          </div>
        </div> */}
        <div className="header-middle">
            <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
              <div className="container-fluid" style={{width: "80%"}}>
                <div className="navbar-left">
                  <img src={logo} alt="Logo" />
                  <Link className="navbar-brand" to="/">ADOMGI HIDAK</Link>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                  <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                    <li className="nav- mx-2">
                      <Link style={{color: "#184363"}} className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav- mx-2">
                      <Link style={{color: "#184363"}} className="nav-link" to="/medicines">Medicines</Link>
                    </li>
                    <li className="nav- mx-2">
                      <Link style={{color: "#184363"}} className="nav-link" to="/shopbycategory">Shop By Category</Link>
                    </li>
                    <li className="nav- mx-2">
                      <Link style={{color: "#184363"}} className="nav-link" to="/blog">Blog</Link>
                    </li>
                    <li className="nav- mx-2">
                      <Link style={{color: "#184363"}} className="nav-link" to="/shop">Shop</Link>
                    </li>
                    <li className="nav- mx-2">
                      <Link style={{color: "#184363"}} className="nav-link" to="/offers">Offers</Link>
                    </li>
                    <li className="nav- mx-2">
                      <Link style={{color: "#184363"}} className="nav-link" to="/features">Features</Link>
                    </li>
                  </ul>
                  <div className="header-middle-right d-flex">
                    <Link to="/cart" style={{position: 'relative'}}>
                      <img className='mx-2' src={card} alt="card"/>
                      {cart.length ? <p className='text-center' style={{width: '20px', height: '20px', position: 'absolute', color: 'white', top: '-5px', right: '0px', border: '1px solid red', borderRadius: '50%', backgroundColor: 'red'}}>{cart.length}</p>: ''}
                    </Link>
                    {auth.token? <>
                      <img  className="ms-3 nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" src={`https://pharmacy-backend-pi.vercel.app/api/v1/auth/user-image/${auth.user.id}`} style={{borderRadius: '50%', width:"40px", height: '40px', border: '1px solid red', cursor: 'pointer'}}/>
                      <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    </Link>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? 'admin': 'user'}`}>Dashboard</Link></li>
                      <li><Link className="dropdown-item" onClick={() => {
                        window.location.reload()
                        localStorage.removeItem('auth');
                      }}>Log Out</Link></li>
                    </ul>
                  </li></> : <Link to="/login" style={{position: 'relative'}}>
                      <img className='mx-2' src={user} alt="card" width={50}/>
                    </Link>  }
                  </div>
                </div>
              </div>
            </nav>
        </div>
      </header>
    </div>
  )
}

export default Header
