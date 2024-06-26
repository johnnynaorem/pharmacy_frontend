import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Layout from "../Layout/Layout";
import UserMenu from "./UserMenu";
import { ArrowRightOutlined } from '@ant-design/icons';

import './Order.css'
import { useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate()
  const [orders, setOrder] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrder = async () => {
    try {
      const { data } = await axios.get(
        "https://pharmacy-backend-pi.vercel.app/api/v1/auth/orders"
      );
      setOrder(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnClick = (e, id) => {
    e.preventDefault();
    navigate(`/dashboard/user/orders/${id}`)
  }

  useEffect(() => {
    if (auth?.token) getOrder();
  }, [auth?.token]);
  return (
    <Layout title={`${auth.user.name}-Order`}>
      <div className="container" style={{ marginBottom: "250px" }}>
        <div className="row">
          <div className="col-md-4">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <div className="title d-flex my-4" style={{alignItems:'center'}}>
                <svg class="bag-icon MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeMedium css-1x7pdt3" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ShoppingBagIcon"><path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-8 4c0 .55-.45 1-1 1s-1-.45-1-1V8h2zm2-6c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2m4 6c0 .55-.45 1-1 1s-1-.45-1-1V8h2z"></path></svg>
                <h1 style={{"fontSize":"25px","fontWeight":"700"}}>My Orders</h1>
              </div>
            {orders.map((o,i) => (
              <div className="d-flex my-3 p-3 shadow" style={{justifyContent:'space-between', width:'100%', background: '#F6F9FC', borderRadius: '10px'}}>
                <p style={{flex:'1'}}>#{o?.payment.transaction.id}</p>
                <div style={{flex:'1'}}>
                  <p style={{textAlign: 'center'}} className={`orderStatus ${o?.status.replace(/\s+/g, '')}`}>{o?.status}</p>
                </div>
                <p className="d-flex" style={{flex:'1', justifyContent:'center'}}>{o?.createdAt.slice(0, 10)}</p>
                <p className="d-flex" style={{flex:'1',justifyContent:'center'}}>₹ {o?.payment.transaction.amount}</p>
                <ArrowRightOutlined onClick={(e) => handleOnClick(e, o._id)}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
