import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { authContext } from '../context/authContext'
import { cartContext } from '../context/cartContext'
import mainLogo from "../Assets/imgs/freshcart-logo.svg"
import { wishListContext } from '../context/wishListContext'


export default function Navbar() {

  const { numOfCartItems } = useContext(cartContext)
  const {numOfWishListedItems} = useContext(wishListContext)
  const { token, setToken } = useContext(authContext)

  const navFunction = useNavigate()

  function logOut() {
    console.log("logout");
    localStorage.removeItem("userToken")
    setToken(null)
    navFunction("/login")
  }

  // if (token === null) {
  //   document.getElementById("shoppingCartIcon").classList.add("")
  // }

  return <>
    <nav className=" sticky-top navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <NavLink className="navbar-brand fw-bolder fst-italic fs-4 me-3" to="/products"> <img src={mainLogo} alt="" /></NavLink>
        <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav me-auto mt-2 pt-2 mt-lg-0 fw-semibold">
            {token ? <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products" aria-current="page">Products</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/categories">Categories</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/brands">Brands</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link position-relative" to="/cart">Cart
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link position-relative" to="/wishlist">WishList <i className='text-success fa-regular fa-heart'></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link position-relative" to="/allorders">All Orders
                </NavLink>
              </li>
            </> : ""}
          </ul>
          <ul className='navbar-nav ms-auto mt-2 mt-lg-0'>
            <div style={{ cursor: "pointer" }} className='d-flex me-5'>
              {token ? <div>
                <NavLink className="nav-link position-relative me-3" to="/cart"><i className='fa-solid fa-cart-shopping fs-5'></i>
                  <span className="position-absolute top-25 start-75 translate-middle badge rounded-pill bg-success">
                    {numOfCartItems}
                  </span>
                </NavLink>
              </div> : ""}
              {token ? <div>
                <NavLink className="nav-link position-relative me-3" to="/cart"><i className='fa-solid fa-heart fs-5 text-danger'></i>
                  <span className="position-absolute top-25 start-75 translate-middle badge rounded-pill bg-secondary">
                    {numOfWishListedItems}
                  </span>
                </NavLink>
              </div> : ""}
              <div className='socialMediaIcons d-flex justify-content-center align-items-center'>
                <li className='fa-brands fa-facebook-f me-3'></li>
              </div>
              <div className='socialMediaIcons d-flex justify-content-center align-items-center'>
                <li className='fa-brands fa-instagram me-3'></li>
              </div>
              <div className='socialMediaIcons d-flex justify-content-center align-items-center'>
                <li className='fa-brands fa-twitter me-3'></li>
              </div>
            </div>
            {token ? <>
              <li className="nav-item">
                <span onClick={logOut} style={{ cursor: "pointer" }} className="nav-link fw-semibold" to="/login" >Logout</span>
              </li>
            </> : <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li>
            </>}
          </ul>
        </div>
      </div>
    </nav>


  </>
}
