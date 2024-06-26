import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout';
import image from '../components/Product/banner-image-21.png.svg'
import rating from './Image/ratings.svg'
import like from './Image/like.svg'
import view from './Image/view.svg'
import new_rating from '../components/Product/BestSellingProduct/new_rating.svg'
import love from './Image/love.svg'
import delivery from './Image/delivery.svg'
import alert from './Image/alert.svg'
import alternativeImg from './Image/alternative.svg'
import al from './Image/single_cart.svg' 
import './styles/details.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/cart';
import toast from "react-hot-toast";
import { Rate } from 'antd';
import { useAuth } from '../context/auth';

const Details = () => {
  const navigate = useNavigate()
  const [products, setProducts] = useState({})
    const [alternative, setAlternative] = useState([])
    const params = useParams()
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()
    const [prescription, setPrescription] = useState([])
  
  const alternativeProducts = async (pid, cid) => {
    const {data} = await axios.get(`https://pharmacy-backend-pi.vercel.app/api/v1/product/product-related/${pid}/${cid}`)
    setAlternative(data?.results)
  }
  const getProduct = async () => {
    const {data} = await axios.get(`https://pharmacy-backend-pi.vercel.app/api/v1/product/get-product/${params.slug}`)
    setProducts(data?.product);
    alternativeProducts(data?.product._id, data?.product.category._id);
  }

  

  const handleAddToCart = () => {
    const existingItemIndex = cart.findIndex((item) => item._id === products._id);
    if (existingItemIndex !== -1) {
      // Item already exists in the cart, update its quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast.success("Item quantity updated in Cart");
      console.log(updatedCart)
    } else {
      // Item doesn't exist in the cart, add it
      setCart([...cart, { ...products, quantity: 1 }]);
      localStorage.setItem('cart', JSON.stringify([...cart, { ...products, quantity: 1 }]));
      toast.success("Item Added to Cart");
    }
  }
  const handleAdd = (product) => {
    const existingItemIndex = cart.findIndex((item) => item._id === product._id);
    if (existingItemIndex !== -1) {
      // Item already exists in the cart, update its quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast.success("Item quantity updated in Cart");
      console.log(updatedCart)
    } else {
      // Item doesn't exist in the cart, add it
      setCart([...cart, { ...product, quantity: 1 }]);
      localStorage.setItem('cart', JSON.stringify([...cart, { ...product, quantity: 1 }]));
      toast.success("Item Added to Cart");
    }
  }

  const getPrescription = async () => {
    try {
      const { data } = await axios.get(
        `https://pharmacy-backend-pi.vercel.app/api/v1/auth/getPrescription/${auth.user.id}`);
      setPrescription(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async() => {
    if(auth.token){
      if(products.prescription && prescription.prescription === null){
        toast(() => (
          <span>
            Upload Here
            <button className='btn btn-primary ms-1' onClick={() => {
              localStorage.setItem('currentItem', JSON.stringify(params.slug))
              toast.dismiss()
              navigate('/dashboard/uploadPrescription')
              }}>
              Click
            </button>
          </span>
        ));
        toast.error("Please Upload Prescription to Continue")
      } else if(products.prescription && prescription.prescription.status === "Pending"){
        toast.success(`Your Prescription paper is ${prescription.prescription.status}`)
      }
       else if(products.prescription &&  prescription.prescription.status === 'Cancel'){
        toast(() => (
          <span>
            Upload Here
            <button className='btn btn-primary ms-1' onClick={() => {
              localStorage.setItem('currentItem', JSON.stringify(params.slug))
              toast.dismiss()
              navigate('/dashboard/uploadPrescription')
              }}>
              Click
            </button>
          </span>
        ));
        toast.error(`Your Prescription Paper is ${prescription.prescription.status} by our faculty due to validate failed. So, Please Upload Appropiate Medical Paper`)
      }
      else {
        handleAddToCart()
        navigate('/cart')
      }
    }else{
      navigate('/login')
    }
    
  }

  useEffect(() => {
    if (params?.slug) {
      getProduct();
      getPrescription(); 
    }
  }, [params.slug]);

  useEffect(() => {
    if (auth.user?.id) {
      getPrescription();
    }
  }, [auth.user]);

  return (
    <Layout>
      <div className="container" style={{marginBottom: '100px', marginTop: "150px"}}>
        <div className="row details">
          <div className="col-md-7 left d-flex" style={{alignItems:'center', justifyContent:'center', gap:'10px',backgroundColor: '#F5F5F5'}}>
            {products._id && <div className="left-image d-flex" style={{ flexDirection: "column", backgroundColor: '#F5F5F5'}}>
              <img className='my-2' src={`https://pharmacy-backend-pi.vercel.app/api/v1/product/product-image/${products._id}`} alt="" height={'110px'}/>
              <img className='my-2' src={`https://pharmacy-backend-pi.vercel.app/api/v1/product/product-image/${products._id}`} alt="" height={'110px'}/>
              <img className='my-2' src={`https://pharmacy-backend-pi.vercel.app/api/v1/product/product-image/${products._id}`}alt="" height={'110px'}/>
              <img className='my-2' src={`https://pharmacy-backend-pi.vercel.app/api/v1/product/product-image/${products._id}`}alt="" height={'110px'}/>
            </div>}
            <div className="middle d-flex" style={{justifyContent: 'center', flex:'1', backgroundColor: '#F5F5F5'}}>
              {products._id && <img src={`https://pharmacy-backend-pi.vercel.app/api/v1/product/product-image/${products._id}`} alt="" width={'90%'} height={'500px'} style={{objectFit: 'contain'}}/>}
            </div>
          </div>
          <div className="col-md-5 right" >
            <div className="right-top">
              <h4>{products.name}</h4>
              <Rate allowHalf defaultValue={3.5} />
              <h5><span style={{fontWeight: 'bold'}}>₹</span> {products.price}</h5>
              <p>{products.description}</p>
            </div>
            <hr />
            <div className="right-middle">

              {products.prescription && <div className="right-middle-top d-flex" style={{ alignItems:'center', fontSize: '14px'}}>
                <i class="fa-solid fa-triangle-exclamation fa-beat-fade me-3" style={{color: "#ff0000", fontSize: "30px"}}></i>
                <p>This medicine required <span style={{fontWeight: 'bold'}}>Pescription</span></p>
              </div>}
              <div className="right-middle-middle mt-5">
                {/* <h5 className='mb-4'>Quantity</h5> */}
                <div className="d-flex" style={{fontSize: '25px'}}>
                  {/* <button style={{padding: '0px 20px', border:'none', border: '1px solid black', backgroundColor: 'white', borderTopLeftRadius: '6px', borderBottomLeftRadius: '6px', borderRight: 'none'}}>-</button>
                  <button style={{padding: '0px 30px', border:'none',border: '1px solid black', backgroundColor: 'white'}}>2</button>
                  <button style={{padding: '0px 20px', border:'none',border: '1px solid #DB4444', backgroundColor: '#DB4444', borderTopRightRadius: '6px', borderBottomRightRadius: '6px', color: 'white'}}>+</button> */}
                  <button className='mx-3' style={{padding:'0px 50px', backgroundColor: '#DB4444', border:'none', color:'white', fontSize: '14px', fontWeight:'bold', borderRadius: '6px'}}onClick={handleAddToCart}>Add to Cart</button>
                  <button className='mx-3' style={{padding:'0px 50px', backgroundColor: '#DB4444', border:'none', color:'white', fontSize: '14px', fontWeight:'bold', borderRadius: '6px'}} onClick={()=> handleBuy()}>Buy Now</button>
                  <img src={love} alt="" />
                </div>
              </div>
            </div>
            <div className="right-bottom mt-4">
              <img src={delivery} alt="" />
            </div>
          </div>
        </div>
        <div className="row" style={{marginTop: '120px'}}>
          <div className="col d-flex" style={{flexDirection:'column'}}>
            <img src={alternativeImg} alt="" width={130}/>
            <div className="row mt-5">
            {alternative?.map((p,i) => (
                <div className="col-md-4 col-lg-3" style={{cursor:'pointer'}}>
                    <div className="card cart-container" key={i} style={{ height: '350px', border: '1px solid red', overflow:'hidden'}}>
                      <div className="imageContainer" style={{height: '70%', position:'relative'}}>
                        <img src={`https://pharmacy-backend-pi.vercel.app/api/v1/product/product-image/${p._id}`} className="card-img-top" alt="..." style={{height: "100%", objectFit:'cover'}}/>
                        <div className='d-flex' style={{flexDirection: 'column', position:'absolute', top: '0px', right: '5px'}}>
                          <img src={like} alt="" width={"25px"}/>
                          <img className='view-img' src={view} alt="" width={"25px"} onClick={()=> {navigate(`/product/${p.slug}`); window.scrollTo(0,0)}}/>
                        </div>
                      </div>
                      <div className="card-body" style={{position: 'relative'}}>
                      <h6 className="card-title" style={{fontSize:'15px', fontWeight:'bold'}}>{p.name.substring(0,30)}...</h6>
                        <p className="card-text" style={{fontSize:'14px', color:'red', fontWeight:'bold'}}>₹ {p.price}</p>
                        <Rate disabled defaultValue={4.5} />
                        {/* {p.quantity>0?<p className="card-text">Stock: {p.quantity}</p>:<p className="card-text" style={{color: 'red'}}>Out of stock</p>}
                        <button className="btn btn-primary ms-1" onClick={()=> {navigate(`/product/${p.slug}`); window.scrollTo(0,0)}}>More Details</button>
                        <button className="btn btn-secondary ms-1" onClick={() => handleAddToCart(p)}>Add to Cart</button> */}
                      </div>
                      <div className='addCartBtn' style={{width:'100%'}}>
                        <button  className="btn btn-secondary" style={{width:'100%'}} onClick={() => handleAdd(p)}>Add to Cart</button>
                      </div>  
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Details
