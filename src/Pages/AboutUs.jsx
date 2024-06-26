import React from 'react'
import Layout from '../components/Layout/Layout'
import phone_logo from './Image/about-phone.svg'
import msg_logo from './Image/about-msg.svg'

const AboutUs = () => {
  return (
    <Layout title={"About Us"}>
      <div className="container" style={{width: '85%', marginTop: '150px', marginBottom: '150px'}}>
        <div className="row gap-3">
          <div className="col-md-12 col-lg-3 mx-auto" style={{background: '#FFFFFF', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
            <div className="left px-2 py-5">
              <div className="left-top d-flex" style={{alignItems: "center"}}>
                <img src={phone_logo} alt="" />
                <p style={{margin: '0'}}>Call To Us</p>
              </div>
              <p>We are available 24/7, 7 days a week.</p>
              <p>Phone: +911234456789 </p>
              <hr />
              <div className="left-bottom d-flex" style={{alignItems: "center"}}>
                <img src={msg_logo} alt="" />
                <p style={{margin: '0'}}>Write To Us</p>
              </div>
              <p>Fill out our form and we will contact you within 24 hours.</p>
              <p>Emails: customer@exclusive.com</p>
              <p>Emails: support@exclusive.com</p>
            </div>
          </div>
          <div className= "col-md-12 col-lg-8 mx-auto" style={{background: '#FFFFFF', boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
            <div className="right px-2 py-5">
              <div className="right-top d-flex gap-3" style={{ justifyContent:"space-around", flexWrap: 'wrap'}}>
                <input type="text" placeholder='Your Name*' style={{background: '#F5F5F5', padding: '5px 15px'}} required/>
                <input type="email" placeholder='Your Email*' style={{background: '#F5F5F5', padding: '5px 15px'}} required/>
                <input type="text" placeholder='Your Phone*' style={{background: '#F5F5F5', padding: '5px 15px'}} required/>
              </div>
              <div className="right-middle mt-3">
                <textarea rows={8} placeholder='Your Message' style={{background: '#F5F5F5', width:'100%', border: 'none', textIndent: '20px'}} required/>
              </div>
              <div className="right-bottom mt-3 d-flex" style={{justifyContent:'end'}}>
                <button className='px-5 py-2' style={{background: '#DB4444', border: "none", color: 'white', fontWeight: '500'}}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
        
    </Layout>
  )
}

export default AboutUs
