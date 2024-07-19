
import { useFormik } from "formik"
import axios from "axios"
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner'
import { authContext } from "../context/authContext"




export default function Login() {


  const { setToken } = useContext(authContext)
  
  let user = {
    email: "",
    password: "",
  }

  const navigateUser = useNavigate()
  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  async function loginToAccount(values) {
    setIsLoading(true)
    setErrorMsg(null)
    setSuccessMsg(null)


    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token)
        setToken(data.token)
        setSuccessMsg("Logged in successfully.")
        setTimeout(() => {
          navigateUser("/products")
        }, 1000);
      }
    } catch (error) {
      setErrorMsg(error.response.data.message + ".")
    }
    setIsLoading(false)
  }

  const formikObj = useFormik({

    initialValues: user,


    onSubmit: loginToAccount,


    validate: function (values) {

      setErrorMsg(null)


      const errors = {};


      if (values.email.includes("@") === false && values.email.includes(".") === false) {
        errors.email = "Enter a valid email.";
      }
      if (values.password.length < 6 || values.password.length > 12) {
        errors.password = "Password must be at least 6 characters.";
      }


      return errors;
    }
  })





  return <>
    <section className="container m-auto">
      <div className='m-auto w-75'>
        <h1 className='mt-5'>Login</h1>
      </div>
      <form className='w-50 m-auto mt-4' onSubmit={formikObj.handleSubmit}>
        <div className="form-floating mb-3">
          <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} type="email" className="form-control" name="email" id="email" placeholder="Email" />
          <label className='text-muted fw-semibold' htmlFor="email">Email</label>
          {formikObj.errors.email && formikObj.touched.email ? <div className='alert bg-danger-subtle mt-1 p-2 fw-bold text-danger'>{formikObj.errors.email}</div> : ""}
        </div>
        <div className="form-floating mb-3">
          <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} type="password" className="form-control" name="password" id="password" placeholder="Password" />
          <label className='text-muted fw-semibold' htmlFor="password">Password</label>
          {formikObj.errors.password && formikObj.touched.password ? <div className='alert bg-danger-subtle mt-1 p-2 fw-bold text-danger'>{formikObj.errors.password}</div> : ""}
        </div>
        <div className='d-flex justify-content-between pt-1'>
          <Link to={"/forgotpassword"} style={{ cursor: "pointer" }} className="fw-semibold text-success ms-2">Forgot password?</Link>

          <button type="submit" disabled={formikObj.isValid === false || formikObj.dirty === false} className='btn btn-success px-4 ms-auto'>
            {isLoading ? <ColorRing
              visible={true}
              height="25"
              width="55"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            /> : "Login"}
          </button>
        </div>
        <div className="">
          {successMsg ? <p className='rounded rounded-3 bg-success-subtle p-2 px-3 my-2 fw-bold text-muted d-inline float-end '>{successMsg} <i className='ps-1 fa-solid fa-check-circle text-success'></i></p> : ""}
          {errorMsg ? <p className=' rounded rounded-3 bg-danger-subtle p-2 px-3 my-2 fw-bold text-danger d-inline float-end '>{errorMsg} <i className='ps-1 fa-solid fa-circle-xmark text-danger'></i></p> : ""}
        </div>
      </form>
    </section>
  </>
}
