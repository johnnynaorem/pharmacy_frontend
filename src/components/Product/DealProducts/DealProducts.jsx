import React from 'react'
import p1 from './p1.svg'
import p2 from './p2.svg'
// import './BestSellingProducts.css'
const DealProducts = () => {
  return (
    <div className='container-fluid mb-4 mt-4'>
      <h4 className='text-center'>Deal Of The Week</h4>
      <div className="card-container d-flex gap-3" style={{justifyContent:'center'}}>
        <div className="d-flex" style={{width: "600px", height: "250px", border: "none", alignItems: 'center', border: '1px solid #EAEAEA', borderRadius: '10px'}}>
          <div className="img-div" style={{width:'50%', height: "100%"}}>
            <img src={p1} alt="" width={"100%"} height={"100%"} style={{objectFit:'cover'}}/>
          </div>
          <div className="details p-3" style={{paddingRight: '0'}}>
            <h5>Vitamin C 500mg Sugarless</h5>
            <p>₹16.00 - ₹35.00</p>
            <ul>
              <li>3 cleaning programs</li>
              <li>Digital display</li>
              <li>Memory for 1 user</li>
            </ul>
            <button className='mt-3' style={{width:'100%', background:'#EDF4F6', border: 'none', borderRadius: '30px', padding:'8px 10px'}}>Add to card</button>
          </div>
        </div>
        <div className="d-flex" style={{width: "600px", height: "250px", border: "none", alignItems: 'center', border: '1px solid #EAEAEA', borderRadius: '10px'}}>
          <div className="img-div" style={{width:'50%', height: "100%"}}>
            <img src={p2} alt="" width={"100%"} height={"100%"} style={{objectFit:'cover'}}/>
          </div>
          <div className="details p-3" style={{paddingRight: '0'}}>
            <h5>Vitamin C 500mg Sugarless</h5>
            <p>₹16.00 - ₹35.00</p>
            <ul>
              <li>3 cleaning programs</li>
              <li>Digital display</li>
              <li>Memory for 1 user</li>
            </ul>
            <button className='mt-3' style={{width:'100%', background:'#EDF4F6', border: 'none', borderRadius: '30px', padding:'8px 10px'}}>Add to card</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DealProducts

