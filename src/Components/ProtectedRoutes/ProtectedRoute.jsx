import React, { useContext } from 'react'
import { authContext } from '../context/authContext'
import { Navigate } from 'react-router-dom'
import { cartContext } from '../context/cartContext'

export default function ProtectedRoute({ children }) {

  // const { token } = useContext(authContext)
  
  const token = localStorage.getItem("userToken")


  if (token === null) {
    return <>
      <Navigate to={"/login"} />
    </>
  } 


  return <>


    {children}

  </>
}
