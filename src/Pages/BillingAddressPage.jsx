import React, { useRef } from "react";
import Layout from "../components/Layout/Layout";
import "./styles/BillingAddressPage.css";
import bank from "./Image/bank.svg";
import { useEffect, useState } from 'react'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import toast from 'react-hot-toast'
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
const BillingAddressPage = () => {
  const navigate = useNavigate()


  const [cart, setCart] = useCart()
  const [billingAddress, setBillingAddress] = useState({name: '', street: "", apartment: "", town: "", phone: "", email: "" })
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false)
  const [isCart, setIsCart] = useState(true)

  const getTotalAmount = () => {
    let total = 0;
    cart.map(a => {
      total += a.price * a.quantity;
    })
    return total;
  }

  const handleRadioChange = (e) => {
    if(e.target.value === "cod"){
      setIsCart(false)
    }else{
      setIsCart(true)
    }
  }

  //get payment gateway token
  const getToken = async () => {
    try {
      setLoading(true)
      const {data} = await axios.get("https://pharmacy-backend-pi.vercel.app/api/v1/product/braintree/token");
      setClientToken(data?.clientToken)
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOnChange = (e) => {
    setBillingAddress({
      ...billingAddress, [e.target.name]: e.target.value
    })
  }

  const handlePlaceOrder = (e) => {
    console.log(e)
  }
  
  useEffect(() => {
    getToken()
  }, [])

  console.log(cart)
  return (
    <Layout>
      <div className="container" style={{ width: "75%" , marginBottom: '250px', marginTop: '120px'}}>
        <h2 style={{marginBottom: '50px'}}>Billing Details</h2>
        <div className="row">
          <div className="col-md-6">
            <div className="formContainer" style={{ width: "80%" }}>
              <form onSubmit={handlePlaceOrder}>
                <div
                  className="nameInput d-flex gap-2 mb-4"
                  style={{ flexDirection: "column" }}
                >
                  <label htmlFor="name" style={{ color: "gray" }}>
                    Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    style={{ backgroundColor: "#F5F5F5", padding: "10px" }}
                    required
                    onChange={handleOnChange}
                  />
                </div>
                {/* <div
                  className="companyNameInput d-flex gap-2 mb-4"
                  style={{ flexDirection: "column" }}
                >
                  <label htmlFor="companyName" style={{ color: "gray" }}>
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    style={{ backgroundColor: "#F5F5F5", padding: "10px" }}
                    required
                    onChange={handleOnChange}
                  />
                </div> */}
                <div
                  className="streetAddressInput d-flex gap-2 mb-4"
                  style={{ flexDirection: "column" }}
                >
                  <label htmlFor="streetAddress" style={{ color: "gray" }}>
                    Street Address*
                  </label>
                  <input
                    type="text"
                    id="streetAddress"
                    name="street"
                    style={{ backgroundColor: "#F5F5F5", padding: "10px" }}
                    required
                    onChange={handleOnChange}
                  />
                </div>
                <div
                  className="optionalInput d-flex gap-2 mb-4"
                  style={{ flexDirection: "column" }}
                >
                  <label htmlFor="optional" style={{ color: "gray" }}>
                    Apartment, floor, etc. (optional)
                  </label>
                  <input
                    type="text"
                    id="optional"
                    name="apartment"
                    style={{ backgroundColor: "#F5F5F5", padding: "10px" }}
                    required
                    onChange={handleOnChange}
                  />
                </div>
                <div
                  className="townInput d-flex gap-2 mb-4"
                  style={{ flexDirection: "column" }}
                >
                  <label htmlFor="town" style={{ color: "gray" }}>
                    Town/City*
                  </label>
                  <input
                    type="text"
                    id="town"
                    name="town"
                    style={{ backgroundColor: "#F5F5F5", padding: "10px" }}
                    required
                    onChange={handleOnChange}
                  />
                </div>
                <div
                  className="phoneInput d-flex gap-2 mb-4"
                  style={{ flexDirection: "column" }}
                >
                  <label htmlFor="phone" style={{ color: "gray" }}>
                    Phone Number*
                  </label>
                  <input
                    type="phone"
                    id="phone"
                    name="phone"
                    style={{ backgroundColor: "#F5F5F5", padding: "10px" }}
                    required
                    onChange={handleOnChange}
                  />
                </div>
                <div
                  className="emailInput d-flex gap-2 mb-4"
                  style={{ flexDirection: "column" }}
                >
                  <label htmlFor="email" style={{ color: "gray" }}>
                    Email Address*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    style={{ backgroundColor: "#F5F5F5", padding: "10px" }}
                    required
                    onChange={handleOnChange}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <div className="cartTotalContainer">
              <h3 className="cartTotalTitle my-5">Cart Total</h3>
              <div
                className="subtotal d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <p>Subtotal</p>
                <p>₹ {getTotalAmount()}</p>
              </div>
              <hr />
              <div
                className="shippingFee d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <p>Shipping Fee</p>
                <p>Free</p>
              </div>
              <hr />
              <div
                className="total d-flex mb-5"
                style={{ justifyContent: "space-between" }}
              >
                <p>Total</p>
                <p>₹  {getTotalAmount()}</p>
              </div>
            </div>
            <div className="paymentMethod mb-5">
              <div className="form-check d-flex mb-3" style={{justifyContent: 'space-between'}}>
                <div className="form">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="card"
                    id="card1"
                    value= "card"
                    defaultChecked
                    onChange={handleRadioChange}
                  />
                  <label className="form-check-label" htmlFor="card1">
                    Card
                  </label>
                </div>
                <img src={bank} alt="" />
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="card"
                  id="card2"
                  value= "cod"
                  onChange={handleRadioChange}
                />
                <label className="form-check-label" htmlFor="card2">
                  Cash on Delivery
                </label>
              </div>
            </div>
            {isCart && clientToken && (
              <>
                <DropIn
                  options={{ authorization: clientToken, paypal: { flow: 'vault' } }}
                  onInstance={(instance) => setInstance(instance)}
                  enableBillingAddress={true}
                />
              </>
            )}
            
            <button style={{border: 'none', backgroundColor: "#DB4444", color: 'white', padding: '15px 30px', borderRadius: '10px'}} 
            onClick={async () => {
                  try {
                    setLoading(true)
                    const {nonce} = await instance.requestPaymentMethod();
                    const {data} = await axios.post('https://pharmacy-backend-pi.vercel.app/api/v1/product/braintree/payment', {
                      nonce, cart, billingAddress
                    })
                    setLoading(false)
                    localStorage.removeItem('cart')
                    setCart([])
                    setBillingAddress({name: '', street: "", apartment: "", town: "", phone: "", email: "" })
                    navigate('/dashboard/user/orders');
                    toast.success('Payment Completed Successfully')
                  } catch (error) {
                    toast.error("Plz select one payment method")
                    console.log(error)
                    setLoading(false)
                  }
                }}
              >
                { loading ? "Processing ...": 'Place Order' }</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BillingAddressPage;
