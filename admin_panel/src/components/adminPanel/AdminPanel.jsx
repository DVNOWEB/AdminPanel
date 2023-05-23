import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const adminPanel = ({isAdmin}) => {

  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAdmin) {
      navigate('/login-admin')
    }
  }, [user, navigate])

  return (
    <div className="login_sign_container">
      <div className="login_container">
        <h2>Welcome to Admin Panel</h2>
        <div className="info_login"></div>
        <hr />
      </div>
    </div>
  )
}

export default adminPanel