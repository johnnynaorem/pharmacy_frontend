import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Layout from "../Layout/Layout";
import UserMenu from "./UserMenu";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Steps } from "antd";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
  CarOutlined,
  DeliveredProcedureOutlined
} from "@ant-design/icons";

import "./Order.css";
import { useNavigate, useParams } from "react-router-dom";

const OrderDetails = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [orders, setOrder] = useState([]);
  const [orderDate, setOrderDate] = useState([]);
  const [shipping, setShipping] = useState()
  const [activeStatus, setActiveStatus] = useState()
  const [auth, setAuth] = useAuth();
  const getOrder = async () => {
    let token = localStorage.getItem('auth');
      if(token){
        token = JSON.parse(token)
      }
    const {data} = await axios.get(`https://pharmacy-backend-pi.vercel.app/api/v1/auth/order/${param.id}`)
    if(data){
      setOrder(data)
      setOrderDate(data.createdAt)
      setActiveStatus(data.status)
      setShipping(data.shippingAddress)
    }
  }

  const getTotal = () =>{
    let total = 0;
    if(orders){
      orders.products.map(p => {
        total += p.price * p.quantity
      })
      return total;
    }
  }

  useEffect(() => {
    if (auth?.token) getOrder();
  }, [auth?.token]);
  return (
    <Layout>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-4">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <div className="title d-flex my-4" style={{alignItems:'center'}}>
              <svg class="bag-icon MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeMedium css-1x7pdt3" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ShoppingBagIcon"><path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-8 4c0 .55-.45 1-1 1s-1-.45-1-1V8h2zm2-6c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2m4 6c0 .55-.45 1-1 1s-1-.45-1-1V8h2z"></path></svg>
              <h1 style={{"fontSize":"25px","fontWeight":"700"}}>My Orders</h1>
            </div>
            <div className="shadow p-5 mb-4" style={{ backgroundColor: '#fff', borderRadius: '10px'}}>
              <Steps
                items={[
                  {
                    status: activeStatus === "Processing" || activeStatus === 'Delivered' || activeStatus === 'Shipped'  ? "finish" : activeStatus === "Not Process" ? "process" : activeStatus,
                    icon:  activeStatus === "Processing" || activeStatus === 'Delivered' || activeStatus === 'Shipped' ? <SmileOutlined style={{ fontSize: '40px' }} /> : <LoadingOutlined style={{ fontSize: '40px' }} />,
                  },
                  {
                    status: activeStatus === "Shipped"? "process" : activeStatus === "Delivered" ? "finish" : "wait",
                    icon: <CarOutlined style={{ fontSize: '40px' }}/> 
                  },
                  {
                    status: activeStatus === "Delivered" ? "finish" : activeStatus === "Shipped" || activeStatus === "Not Process" || activeStatus === "Processing" ? "wait" : "finish",
                    icon: <SolutionOutlined style={{ fontSize: '40px' }}/>,
                  },
                ]}
                             
              />
            </div>
              <>
                <div className="orderDetails shadow" style={{borderRadius: '10px', overflow: 'hidden', backgroundColor: 'white'}}>
                  <div className="orderDetailsTop d-flex p-3" style={{justifyContent: 'space-between', backgroundColor: 'rgb(243, 245, 249)'}}>
                    <p>Order Id: <span className="order-Id-Value">{orders._id}</span> </p>
                    <p>Place on: <span className="place-on-value">{orderDate.slice(0,10)}</span></p>
                    <p>Status: <span className="place-on-value">{activeStatus}</span></p>
                  </div>
                  <div className="middle-bottom-container p-3">
              {orders.products && orders.products.map((p, i) => (
                    <div className="middle-bottom d-flex mt-3" style={{alignItems:'center', justifyContent:'space-between'}}>
                      <div className="mb-left d-flex gap-3" style={{alignItems:'center', justifyContent:'space-between'}}>
                        <div className="image">
                          <img src={`https://pharmacy-backend-pi.vercel.app/api/v1/product/product-image/${p._id}`} alt="" style={{"width":"60px","height":"60px","objectFit":"cover","borderRadius":"13px"}}/>
                        </div>
                        <div className="order-item">
                          <div className="item-title">{p.name}</div>
                          <div className="item-price d-flex">
                            <p className="me-2">₹ {p.price} X</p>
                            <p>{p.quantity}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mb-middle">
                        <p className="category-name">{p.category.name}</p>
                      </div>
                      <div className="mb-bottom">
                        <p className="review p-1">Write a Review</p>
                      </div>
                    </div>))}
                  </div>
                </div>
                <div className="bottom mt-4 d-flex gap-3" style={{justifyContent: 'space-between'}}>
              <div className="bottom-left p-4 shadow" style={{flex: '1', background: 'white', maxHeight: '120px', borderRadius: '10px'}}>
                <div className="bl-top shipping-address-container">
                  <h4 className="billing-title">Shipping Address</h4>
                  {shipping && <p className="billing-address-value">{shipping.apartment}, {shipping.town}</p>}
                </div>
              </div>
              <div className="bottom-right p-3 shadow" style={{flex: '1', background: 'white', borderRadius: '10px'}}>
                {orders.payment && <div className="billing-right-container">
                  <div className="br-top">
                    <div className="billing">
                      <h4 className='billing-title'>Total Summary</h4>
                      <div className="billing-subTotal">
                        <p>Subtotal</p>
                        <p className="billing-subtotal-value">₹ {getTotal()}</p>
                      </div>
                      <div className="billing-shipping-fee">
                        <p>Shipping fee</p>
                        <div className="billing-shipping-fee-value">
                          <p>₹0</p>
                        </div>
                      </div>
                      <div className="billing-discount">
                        <p>Discount(%)</p>
                        <div className="billing-discount-value">
                          <p>₹0</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className='hr'/>
                  <div className="br-bottom">
                    <div className="billing-total">
                      <p>Total</p>
                      <p className="billing-total-value">₹ {getTotal()}</p>
                    </div>
                    <p className='payment-method'>Paid by <span>{orders.payment.transaction.paymentInstrumentType}</span></p>
                  </div>
                </div>}
              </div>
                </div>
              </>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetails;
