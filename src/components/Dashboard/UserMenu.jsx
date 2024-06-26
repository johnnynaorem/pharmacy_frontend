import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const UserMenu = () => {
  const navigate = useNavigate()
  const goToDashboard = () => {
    navigate('/dashboard/user')
  }
  return (
    <div className='text-center'>
      <div className="list-group mt-3 p-4">
        <h4 onClick={goToDashboard} style={{cursor: 'pointer'}}>Dashboard</h4>
        <Link to="/dashboard/user" className="list-group-item list-group-item-action">Profile</Link>
        <Link to="/dashboard/user/orders" className="list-group-item list-group-item-action">Orders</Link>
      </div>
    </div>
  )
}

export default UserMenu
