import React from 'react'
import Layout from '../Layout/Layout'
import { useNavigate } from "react-router-dom";
const PageNotFound = () => {
  const navigate = useNavigate()
  return (
    <Layout >
      <div className="container d-flex" style={{height: '50vh', alignItems:'center', justifyContent:'center'}}>
        <div className="contain d-flex" style={{flexDirection:'column', alignItems:'center'}}>
          <h1 className='mb-4' style={{fontSize: '90px'}}>404 Not Found</h1>
          <p className='mb-5'>Your visited page not found. You may go home page.</p>
          <button className='btn px-5 py-3 mt-3' style={{background:'#DB4444', color: 'white', fontWeight: '500'}} onClick={()=> navigate('/')}>Back to Home Page</button>
        </div>
      </div>
    </Layout>
  )
}

export default PageNotFound