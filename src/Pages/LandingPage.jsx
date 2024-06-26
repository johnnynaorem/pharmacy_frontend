import React from 'react'
import Layout from '../components/Layout/Layout'
import Product from '../components/Product/Product'
import BestSellingProducts from '../components/Product/BestSellingProduct/BestSellingProducts'
import DealProducts from '../components/Product/DealProducts/DealProducts'
import SpecialOffers from '../components/Product/SpecialOffers/SpecialOffers'
import NewProducts from '../components/Product/NewProducts/NewProducts'
import image from '../components/Header/image.jpg'
import main from '../components/Product/NewProducts/Main.svg'

const LandingPage = () => {
  return (
    <Layout>
      <div style={{background: "#EDF4F6"}}>
          <div className="search-part d-flex mx-auto" style={{width:"80%",height: "80px", alignItems: 'center', justifyContent: 'space-around'}}>
            <div>
              <p style={{margin: '0', background: "#FFFFFF", padding: "10px 20px", borderRadius: '15px', color: "#184363"}}>All Category</p>
            </div>
            <div style={{width: "80%", display: 'flex'}}>
              <input type="text" name="" id="" placeholder='Search Product' style={{width: "100%", borderRadius: '15px', border: "none"}}/>
              <div className='d-flex' style={{alignItems:"center", marginLeft: '-15px', background:"orange", width:"50px", height: '40px',  borderTopRightRadius: '15px', borderBottomRightRadius: '12px'}}>
              <svg style={{width:'90%', height: "50%"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">{/*!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}<path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" /></svg>

              </div>
            </div>
          </div>
        </div>
      <div>
          <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={image} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={main} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={image} className="d-block w-100" alt="..." />
              </div>
            </div>
          </div>
        </div>
        <Product />
        <BestSellingProducts />
        <DealProducts />
        <SpecialOffers />
        <NewProducts />
    </Layout>
  )
}

export default LandingPage
