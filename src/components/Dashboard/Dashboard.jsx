  import React from "react";
  import Navbar from "./Navbar";
  import UserMenu from "./UserMenu";
  import { useAuth } from "../../context/auth";
  import Layout from "../Layout/Layout";
  import './Order.css'

  const Dashboard = () => {
    const [auth] = useAuth();
    console.log(auth);
    return (
      <Layout>
        <div className="container" style={{marginBottom: '130px'}}>
          <div className="row">
            <div className="col-md-4">
              <UserMenu />
            </div>
            <div className="col-md-8">
              <div className="d-flex my-4" style={{justifyContent: 'space-between', alignItems:'center'}}>
                <div
                  className="title d-flex"
                  style={{ alignItems: "center" }}
                >
                  <svg
                    class="user-profile-icon MuiSvgIcon-root MuiSvgIcon-colorPrimary MuiSvgIcon-fontSizeMedium css-1x7pdt3"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    data-testid="PersonIcon"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4m0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4"></path>
                  </svg>
                  <h1 style={{ fontSize: "25px", fontWeight: "700" }}>
                    My Profile
                  </h1>
                </div>
                <div className="profile-edit-btn py-2 px-3">Edit Profile</div>
              </div>
              <div
                className=" my-3 p-3 shadow"
                style={{
                  justifyContent: "space-between",
                  // width: "100%",
                  background: "#F6F9FC",
                  borderRadius: "10px",
                  alignItems: 'center',
                }}
              >
                <div className="d-flex mb-3" style={{flex: '1', justifyContent: 'center'}}>
                  <img className='itemImg' src={`https://pharmacy-backend-pi.vercel.app/api/v1/auth/user-image/${auth.user.id}`} alt="image" style={{borderRadius: '50%', height: '80px', width: '80px', objectFit: 'cover'}}/>
                </div>
                <div className="d-flex user-details" style={{ flexWrap: 'wrap', flex: '2', justifyContent: 'space-evenly'}}>
                  <div>
                    <p>Name: <span className="user-details-value ms-2">{auth.user.name}</span></p>
                    <p>Email: <span className="user-details-value">{auth.user.email}</span></p>
                  </div>
                  <div>
                    <p>Address: <span className="user-details-value ms-2">{auth.user.address}</span></p>
                    <p>Phone: <span className="user-details-value ms-2">{auth.user.phone}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  };

  export default Dashboard;
