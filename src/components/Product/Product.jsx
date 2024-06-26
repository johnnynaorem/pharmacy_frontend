import React, { useEffect, useState } from 'react'
import './Product.css'
import productImage1 from './banner-image-23.png.svg'
import productImage2 from './banner-image-22.png.svg'
import productImage3 from './banner-image-21.png.svg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
const Product = () => {
  const [herbs, setHerbs] = useState([])
  const [vitamins, setVitamins] = useState([])
  const [baby, setbaby] = useState([])
  const navigate = useNavigate()
  const handleView = () => {
    navigate('/details')
  }
  const productsByHerb = async () => {
    try {
      const { data } = await axios.get(
        `https://pharmacy-backend-pi.vercel.app/api/v1/product/product-category/6648daa0628345afbb048190`
      );
      setHerbs(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  }
  const productsByVitamins = async () => {
    try {
      const { data } = await axios.get(
        `https://pharmacy-backend-pi.vercel.app/api/v1/product/product-category/6648daac628345afbb048195`
      );
      setVitamins(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  }
  const productsByBaby = async () => {
    try {
      const { data } = await axios.get(
        `https://pharmacy-backend-pi.vercel.app/api/v1/product/product-category/664a45478eefbd93e4c0109f`
      );
      setbaby(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  }

  useEffect(() => {
    productsByHerb()
    productsByVitamins()
    productsByBaby()
  }, [])
  
  return (
    <div className='container-fluid mb-4 mt-4'>
      <div className='row gap-2 justify-content-center' style={{ alignItems: "center" }}>
        <div className="col-md-2 d-flex align-items-center justify-content-center">
          <p style={{ margin: '0', color: "#184363", fontWeight: "bold" }}>Select a product</p>
        </div>
        <div className="col-md-2 d-flex align-items-center">
          <input type="text" className="form-control" style={{ borderRadius: '15px', background: "#EDF4F6", color: "#184363", fontWeight: "500" }} placeholder='Category' />
        </div>
        <div className="col-md-2 d-flex align-items-center">
          <input type="text" className="form-control" style={{ borderRadius: '15px', background: "#EDF4F6", color: "#184363", fontWeight: "500" }} placeholder='Brand' />
        </div>
        <div className="col-1 d-flex align-items-center justify-content-center">
          <p style={{ margin: '0' }}>OR</p>
        </div>
        <div className="col-md-2 d-flex align-items-center">
          <input type="text" className="form-control" style={{ borderRadius: '15px', background: "#EDF4F6", color: "#184363", fontWeight: "500" }} placeholder='Enter SKU' />
        </div>
        <div className="col-md-2 d-flex align-items-center">
          <button className='btn' style={{ background: '#F2971F', color: 'white', padding: "6px 51px", borderRadius: '15px', fontWeight: "500" }}>Shop Now</button>
        </div>
      </div>
      <div className="row gap-2" style={{justifyContent: "center", marginTop: "50px"}}>
        <div className="col-4 cart-div p-3" style={{ height: '300px', width: '400px'}}>
          <div className="card" style={{background: "transparent", border: "none"}}>
            <div className="card-body" style={{paddingRight: '0'}}>
              <h3 className="card-title" style={{margin: '0'}}>Vitamins</h3>
              <div className='d-flex' style={{alignItems: 'center'}}>
                <div className="vitamins-points" style={{flex: '1', alignSelf:"baseline"}}>
                  <ul>
                    {vitamins.length && vitamins.map(pop => (
                      <li className='my-2'>{pop.name}</li>
                    ))}
                    {/* <li className='my-2'>Antimalarial Drugs</li>
                    <li className='my-2'>Antipretics</li>
                    <li className='my-2'>Antibiotics</li> */}
                  </ul>
                </div>
                <div className="card-right" style={{ maxWidth: "170px", height: "180px"}}>
                  <img src={productImage1} alt="" width={"100%"} height={"100%"}/>
                </div>
              </div>
              <button className="btn" style={{color: "white", fontWeight:'500', marginTop:"-10px", background: "#F2971F", padding:"10px 20px", borderRadius: "30px"}} onClick={handleView}>View All &gt;</button>
            </div>
          </div>
        </div>
        <div className="col-4 cart-div p-3" style={{ height: '300px', width: '400px'}}>
          <div className="card" style={{background: "transparent", border: "none"}}>
            <div className="card-body" style={{paddingRight: '0'}}>
              <h3 className="card-title" style={{margin: '0'}}>Baby Accessories</h3>
              <div className='d-flex' style={{alignItems: 'center'}}>
                <div className="vitamins-points" style={{flex: '1', alignSelf:"baseline"}}>
                  <ul>
                  {baby.length && baby.map(pop => (
                      <li className='my-2'>{pop.name}</li>
                    ))}
                    {/* <li className='my-2'>Analgesics</li>
                    <li className='my-2'>Antimalarial Drugs</li>
                    <li className='my-2'>Antipretics</li>
                    <li className='my-2'>Antibiotics</li> */}
                  </ul>
                </div>
                <div className="card-right" style={{ maxWidth: "170px", height: "180px"}}>
                  <img src={productImage2} alt="" width={"100%"} height={"100%"}/>
                </div>
              </div>
              <a href="#" className="btn" style={{color: "white", fontWeight:'500', marginTop:"-10px", background: "#F2971F", padding:"10px 20px", borderRadius: "30px"}}>View All &gt;</a>
            </div>
          </div>
        </div>
        <div className="col-4 cart-div p-3" style={{ height: '300px', width: '400px'}}>
          <div className="card" style={{background: "transparent", border: "none"}}>
            <div className="card-body" style={{paddingRight: '0'}}>
              <h3 className="card-title" style={{margin: '0'}}>Herbs</h3>
              <div className='d-flex' style={{alignItems: 'center'}}>
                <div className="vitamins-points" style={{flex: '1', alignSelf:"baseline"}}>
                  <ul>
                  {herbs.length && herbs.map(pop => (
                      <li className='my-2'>{pop.name}</li>
                    ))}
                    {/* <li className='my-2'>Analgesics</li>
                    <li className='my-2'>Antimalarial Drugs</li>
                    <li className='my-2'>Antipretics</li>
                    <li className='my-2'>Antibiotics</li> */}
                  </ul>
                </div>
                <div className="card-right" style={{ maxWidth: "170px", height: "180px"}}>
                  <img src={productImage3} alt="" width={"100%"} height={"100%"}/>
                </div>
              </div>
              <a href="#" className="btn" style={{color: "white", fontWeight:'500', marginTop:"-10px", background: "#F2971F", padding:"10px 20px", borderRadius: "30px"}}>View All &gt;</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product

          