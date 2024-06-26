import React, { useEffect, useState } from 'react';
import pic from '../BestSellingProduct/cart.svg'
import main from './Main.svg'
import list from './list.svg'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useCart } from '../../../context/cart'
import { useNavigate } from 'react-router-dom'
const NewProducts = () => {
  const navigate = useNavigate()
  const [cart, setCart] = useCart()
  const [products, setProducts] = useState([])
  const [product, setProduct] = useState([])
  const getNewProducts = async () => {
    try {
      const { data } = await axios.get(
        `https://pharmacy-backend-pi.vercel.app/api/v1/product/product-list/${1}`
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  }
  const getNewProduct = async () => {
    try {
      const { data } = await axios.get(
        `https://pharmacy-backend-pi.vercel.app/api/v1/product/product-list/${2}`
      );
      setProduct(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  }

  const handleAddToCart = (product) => {
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
  };

  useEffect(() => {
    getNewProducts()
    getNewProduct()
  }, [])
  
  return (
    <>
      <div className='container-fluid mb-4 mt-4' style={{maxWidth: '90%'}}>
        <h4 className='ms-5 text-center'>New Products</h4>
        <div className="card-container d-flex gap-3" style={{justifyContent:'center', flexWrap: 'wrap'}}>
          
          {products.length && products.map((p,i) => (
          <div className="card p-3" key={i} style={{width: '230px', height:"", border: "1px solid #88ebff"}}>
            <div style={{width: '100%', height: "60%", overflow:'hidden'}}>
              <img className='pName' src={`https://pharmacy-backend-pi.vercel.app/api/v1/product/product-image/${p._id}`} alt="" width={"100%"} height={"100%"} style={{objectFit:'cover'}} onClick={()=> {navigate(`/product/${p.slug}`); window.scrollTo(0,0)}}/>
            </div>
            <div className="details mt-2">
              <p style={{fontWeight: '400', color:'#15A9E3', fontSize: '11px'}}>{p.category.name}</p>
              <p style={{fontWeight: '600', color:'#184363'}}>{p.name.substring(0,30)}...</p>
              <p className='mt-3' style={{fontWeight: '600', color:'#184363'}}>₹ {p.price}</p>
              <button className='mt-3 add-btn' style={{width:'100%', border: 'none', borderRadius: '30px', padding:'8px 10px', fontSize: '12px'}} onClick={() => handleAddToCart(p)}><img src={pic} alt=''/> Add to card</button>
            </div>
          </div>
          ))}
          {product.length && product.map((p,i) => (
            <div className="card p-3" key={i} style={{width: '230px', height:"", border: "1px solid #88ebff"}}>
            <div style={{width: '100%', height: "60%", overflow:'hidden'}}>
              <img className='pName' src={`https://pharmacy-backend-pi.vercel.app/api/v1/product/product-image/${p._id}`} alt="" width={"100%"} height={"100%"} style={{objectFit:'cover'}} onClick={()=> {navigate(`/product/${p.slug}`); window.scrollTo(0,0)}}/>
            </div>
            <div className="details mt-2">
              <p style={{fontWeight: '400', color:'#15A9E3', fontSize: '11px'}}>{p.category.name}</p>
              <p style={{fontWeight: '600', color:'#184363'}}>{p.name.substring(0,30)}...</p>
              <p className='mt-3' style={{fontWeight: '600', color:'#184363'}}>₹ {p.price}</p>
              <button className='mt-3 add-btn' style={{width:'100%', border: 'none', borderRadius: '30px', padding:'8px 10px', fontSize: '12px'}} onClick={() => handleAddToCart(p)}><img src={pic} alt=''/> Add to card</button>
            </div>
          </div>
          ))}
          {/* <div className="card" style={{width: '240px', height: "380px", border: "none"}}>
            <div style={{width: '100%', height: "60%"}}>
              <img src={p2} alt="" width={"100%"} height={"100%"} style={{objectFit:'cover'}}/>
            </div>
            <div className="details mt-2">
              <p>Protein</p>
              <p>Nutren Diabetes Vanilla</p>
              <p className='mt-3'>$34.50</p>
              <button className='mt-3' style={{width:'100%', background:'#EDF4F6', border: 'none', borderRadius: '30px', padding:'8px 10px'}}>Add to card</button>
            </div>
          </div>
          <div className="card" style={{width: '240px', height: "380px", border: "none"}}>
            <div style={{width: '100%', height: "60%"}}>
              <img src={p3} alt="" width={"100%"} height={"100%"} style={{objectFit:'cover'}}/>
            </div>
            <div className="details mt-2">
              <p>Protein</p>
              <p>Nutren Diabetes Vanilla</p>
              <p className='mt-3'>$34.50</p>
              <button className='mt-3' style={{width:'100%', background:'#EDF4F6', border: 'none', borderRadius: '30px', padding:'8px 10px'}}>Add to card</button>
            </div>
          </div>
          <div className="card" style={{width: '240px', height: "380px", border: "none"}}>
            <div style={{width: '100%', height: "60%"}}>
              <img src={p4} alt="" width={"100%"} height={"100%"} style={{objectFit:'cover'}}/>
            </div>
            <div className="details mt-2">
              <p>Protein</p>
              <p>Nutren Diabetes Vanilla</p>
              <p className='mt-3'>$34.50</p>
              <button className='mt-3' style={{width:'100%', background:'#EDF4F6', border: 'none', borderRadius: '30px', padding:'8px 10px'}}>Add to card</button>
            </div>
          </div>
          <div className="card" style={{width: '240px', height: "380px", border: "none"}}>
            <div style={{width: '100%', height: "60%"}}>
              <img src={p5} alt="" width={"100%"} height={"100%"} style={{objectFit:'cover'}}/>
            </div>
            <div className="details mt-2">
              <p>Protein</p>
              <p>Nutren Diabetes Vanilla</p>
              <p className='mt-3'>$34.50</p>
              <button className='mt-3' style={{width:'100%', background:'#EDF4F6', border: 'none', borderRadius: '30px', padding:'8px 10px'}}>Add to card</button>
            </div>
          </div>
          <div className="card" style={{width: '240px', height: "380px", border: "none"}}>
              <div style={{width: '100%', height: "60%"}}>
                <img src={p1} alt="" width={"100%"} height={"100%"} style={{objectFit:'cover'}}/>
              </div>
              <div className="details mt-2">
                <p>Protein</p>
                <p>Nutren Diabetes Vanilla</p>
                <p className='mt-3'>$34.50</p>
                <button className='mt-3' style={{width:'100%', background:'#EDF4F6', border: 'none', borderRadius: '30px', padding:'8px 10px'}}>Add to card</button>
              </div>
          </div>
          <div className="card" style={{width: '240px', height: "380px", border: "none"}}>
              <div style={{width: '100%', height: "60%"}}>
                <img src={p2} alt="" width={"100%"} height={"100%"} style={{objectFit:'cover'}}/>
              </div>
              <div className="details mt-2">
                <p>Protein</p>
                <p>Nutren Diabetes Vanilla</p>
                <p className='mt-3'>$34.50</p>
                <button className='mt-3' style={{width:'100%', background:'#EDF4F6', border: 'none', borderRadius: '30px', padding:'8px 10px'}}>Add to card</button>
              </div>
          </div>
          <div className="card" style={{width: '240px', height: "380px", border: "none"}}>
              <div style={{width: '100%', height: "60%"}}>
                <img src={p3} alt="" width={"100%"} height={"100%"} style={{objectFit:'cover'}}/>
              </div>
              <div className="details mt-2">
                <p>Protein</p>
                <p>Nutren Diabetes Vanilla</p>
                <p className='mt-3'>$34.50</p>
                <button className='mt-3' style={{width:'100%', background:'#EDF4F6', border: 'none', borderRadius: '30px', padding:'8px 10px'}}>Add to card</button>
              </div>
          </div>
          <div className="card" style={{width: '240px', height: "380px", border: "none"}}>
              <div style={{width: '100%', height: "60%"}}>
                <img src={p4} alt="" width={"100%"} height={"100%"} style={{objectFit:'cover'}}/>
              </div>
              <div className="details mt-2">
                <p>Protein</p>
                <p>Nutren Diabetes Vanilla</p>
                <p className='mt-3'>$34.50</p>
                <button className='mt-3' style={{width:'100%', background:'#EDF4F6', border: 'none', borderRadius: '30px', padding:'8px 10px'}}>Add to card</button>
              </div>
          </div>
          <div className="card" style={{width: '240px', height: "380px", border: "none"}}>
              <div style={{width: '100%', height: "60%"}}>
                <img src={p5} alt="" width={"100%"} height={"100%"} style={{objectFit:'cover'}}/>
              </div>
              <div className="details mt-2">
                <p>Protein</p>
                <p>Nutren Diabetes Vanilla</p>
                <p className='mt-3'>$34.50</p>
                <button className='mt-3' style={{width:'100%', background:'#EDF4F6', border: 'none', borderRadius: '30px', padding:'8px 10px'}}>Add to card</button>
              </div>
          </div> */}
        </div>
      </div>
      <div className='d-flex mx-auto' style={{width:'85%', justifyContent: 'center', marginBottom: '-80px'}}>
        <img src={main} alt="" width={"95%"}/>
      </div>
      <h4 className='text-center'>More to Love</h4>
      <div className='d-flex mx-auto' style={{width:'85%', justifyContent: 'center', marginBottom: '50px'}}>
        <img src={list} alt="" width={"95%"}/>
      </div>
    </>
  )
}

export default NewProducts
