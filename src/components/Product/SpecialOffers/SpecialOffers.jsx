import React from 'react'
import p1 from './p1.svg'
import p2 from './p2.svg'
const SpecialOffers = () => {
  return (
    <div>
      <div className='container-fluid mb-4 mt-4' style={{maxWidth: '90%'}}>
        <h4 className='text-center'>Special offers</h4>
        <div className="card-container d-flex px-5" style={{gap: '20px'}}>
          <img src={p1} alt="" width={"50%"} height={"100%"}/>
          <img src={p2} alt="" width={"50%"} height={"100%"}/>
        </div>
      </div>
    </div>
  )
}

export default SpecialOffers
