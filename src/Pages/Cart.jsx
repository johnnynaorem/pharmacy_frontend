import React, { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import pic from './Image/product_image.svg'
import up from './Image/up.svg'
import down from './Image/down.svg'
import delete_btn from './Image/delete_btn.svg'
import { Link, useNavigate } from 'react-router-dom'
import arrow from './Image/arrow.svg'
import { useCart } from '../context/cart'
import toast from 'react-hot-toast'
import { useAuth } from '../context/auth'
const Cart = () => {
  const [cart, setCart] = useCart()
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate()

  
  const removeHandler = (id) => {
    let data = [...cart];
    const index = data.findIndex(item => item._id === id);
    console.log(index)
    data.splice(index, 1);
    setCart(data)
    localStorage.setItem('cart', JSON.stringify(data))
    toast.success('Item removed Successfully')
  }
  // Function to update the quantity of an item in the cart
  const updateQuantity = (id, newQuantity) => {
    const updatedCart = cart.map(item => {
      if (item._id === id && newQuantity>=1) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  

  return (
    <Layout title={`cart-page - AdomGi-Hidak`}>
      <div className="container mb-5" style={{width: '90%'}}>
        <div className="row">
            <div className="top">
              <Link to="/">{"<"}Shopping Continue</Link>
              <hr />
            </div>
        </div>
        <div className="row text-center">
            <div className="middle">
              <h2>Shopping Cart</h2>
              <h5 className="text-center mt-3">
              {cart.length!=0 ? `You Have ${cart.length} items in your cart ${
                auth?.token ? "" : "Plese Login to Checkout"
              }` : "Your Cart Is Empty Please Add Some Products" }
            </h5>
            </div>
        </div>
        <div className="bottom d-flex gap-3 mx-auto" style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        {cart?.map((item, i) => {
            return (
              <div className='bottom-container my-3' style={{width:"90%", position:'relative', backgroundColor: '#FFFFFF', padding: '40px 30px', border: '1px solid red', borderRadius: '20px', color: '#184363'}}>
              <img src={`https://pharmacy-backend-pi.vercel.app/api/v1/product/product-image/${item._id}`} alt="" width={100} style={{position:'absolute', top: '10px', left: '-20px', borderRadius: '20px', border: '1px solid green', height: '80%', objectFit: 'contain', background: '#FFFFFF'}}/>
              <div className="item d-flex" style={{marginLeft:"50px", flexWrap: 'wrap',justifyContent: 'space-between', alignItems:'center'}}>
                <h6 style={{marginLeft: '40px', flex: '2'}}>{item.name}</h6>
                <div className='d-flex gap-2' style={{justifyItems: 'center', alignItems: 'center', flex: '1'}}>
                  <button className='item-quantity' style={{border: 'none', padding: '10px 20px'}}>{item.quantity}</button>
                  <div className='d-flex item-quantity-up-down-btn gap-1' style={{flexDirection: 'column', cursor: 'pointer', flex: '1'}}>
                    <img src={up} alt="" width={25} onClick={() => updateQuantity(item._id, item.quantity + 1)}/>
                    <img src={down} alt="" width={25} onClick={() => updateQuantity(item._id, item.quantity - 1)}/>
                  </div>
                </div>
                <div className="btn-container" style={{flex: '1'}}>
                  <button className='item-price' style={{border: 'none', padding: '10px 20px', fontWeight: 'bold'}}>₹ {item.price*item.quantity}</button>
                </div>
                <img src={delete_btn} alt="" width={30} style={{cursor: 'pointer'}} onClick={removeHandler}/>
              </div>
            </div>
            )})}
            
            {/* <div className='bottom-container my-3' style={{width:"90%", position:'relative', backgroundColor: '#FFFFFF', padding: '40px 30px', border: '1px solid #d5d2d2', borderRadius: '20px', color: '#184363'}}>
              <img src={pic} alt="" width={100} style={{position:'absolute', top: '10px', left: '-20px', borderRadius: '20px'}}/>
              <div className="item d-flex" style={{marginLeft:"50px", flexWrap: 'wrap',justifyContent: 'space-between', alignItems:'center'}}>
                <h6 style={{marginLeft: '40px'}}>Antibiotics</h6>
                <div className='d-flex gap-2' style={{justifyItems: 'center', alignItems: 'center'}}>
                  <button className='item-quantity' style={{border: 'none', padding: '10px 20px'}}>1</button>
                  <div className='d-flex item-quantity-up-down-btn gap-1' style={{flexDirection: 'column', cursor: 'pointer'}}>
                    <img src={up} alt="" width={25}/>
                    <img src={down} alt="" width={25}/>
                  </div>
                </div>
                <button className='item-price' style={{border: 'none', padding: '10px 20px', fontWeight: 'bold'}}>$250</button>
                <img src={delete_btn} alt="" width={30} style={{cursor: 'pointer'}}/>
              </div>
            </div>
            <div className='bottom-container my-3' style={{width:"90%", position:'relative', backgroundColor: '#FFFFFF', padding: '40px 30px', border: '1px solid #d5d2d2', borderRadius: '20px', color: '#184363'}}>
              <img src={pic} alt="" width={100} style={{position:'absolute', top: '10px', left: '-20px', borderRadius: '20px'}}/>
              <div className="item d-flex" style={{marginLeft:"50px", flexWrap: 'wrap',justifyContent: 'space-between', alignItems:'center'}}>
                <h6 style={{marginLeft: '40px'}}>Antibiotics</h6>
                <div className='d-flex gap-2' style={{justifyItems: 'center', alignItems: 'center'}}>
                  <button className='item-quantity' style={{border: 'none', padding: '10px 20px'}}>1</button>
                  <div className='d-flex item-quantity-up-down-btn gap-1' style={{flexDirection: 'column', cursor: 'pointer'}}>
                    <img src={up} alt="" width={25}/>
                    <img src={down} alt="" width={25}/>
                  </div>
                </div>
                <button className='item-price' style={{border: 'none', padding: '10px 20px', fontWeight: 'bold'}}>$250</button>
                <img src={delete_btn} alt="" width={30} style={{cursor: 'pointer'}}/>
              </div>
            </div> */}
        </div>
        <div className="my-5 btn-container d-flex" style={{justifyContent: 'flex-end', width:"90%"}}>
          <>
          {auth.token? <button  style={{width: "40%", border: 'none', backgroundColor: '#4DE1C1', padding: '10px 100px', color: '#FEFCFC', fontWeight: '600', borderRadius: '10px'}} onClick={()=> navigate('/checkout')}>Checkout <img src={arrow} alt="" /></button>
          : <button  style={{width: "40%", border: 'none', backgroundColor: '#4DE1C1', padding: '10px 100px', color: '#FEFCFC', fontWeight: '600', borderRadius: '10px'}} onClick={()=> navigate('/login')}>Login <img src={arrow} alt="" /></button> }
          </>
        </div>
      </div>
    </Layout>
  )
}

export default Cart
