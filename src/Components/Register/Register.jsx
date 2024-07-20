import React, { useState } from 'react'
import { useFormik } from "formik"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { ColorRing } from  'react-loader-spinner'
import { Helmet } from 'react-helmet';





export default function Register() {

  let user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: ""
  }

  const [successMsg, setSuccessMsg] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const navigateUser = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  async function registerNewUser(values) {
    console.log("sending to backend");


    setIsLoading(true)
    setErrorMsg(null)
    setSuccessMsg(null)


    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)

      if (data.message === "success") {
        setSuccessMsg("Account Created Successfully")
        setTimeout(() => {
          navigateUser("/login")
        }, 2500);
      }

    } catch (error) {
      setErrorMsg(error.response.data.message)
    }

    setIsLoading(false)
  }

  const formikObj = useFormik({

    initialValues: user,

    
    onSubmit: registerNewUser,


    validate: function (values) {
      setErrorMsg(null)
      const errors = {};

      if (values.name.length < 4) {
        errors.name = "Name must be more than 4 characters.";
      }
      if (values.email.includes("@") === false && values.email.includes(".") === false) {
        errors.email = "Enter a valid email.";
      }
      if (values.password.length < 6 || values.password.length > 12) {
        errors.password = "Password must be at least 6 characters.";
      }
      if (values.password !== values.rePassword) {
        errors.rePassword = "Password is not matching.";
      }
      if (!values.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
        errors.phone = "Enter a valid mobile number.";
      }

      return errors;
    }
  })





  return <>
   <Helmet>
      <title>Register</title>
    </Helmet>

    <section className="container m-auto">
      <div className='m-auto w-75'>
        <h1 className='mt-5'>Register Now</h1>
      </div>
      <form className='w-50 m-auto mt-4' onSubmit={formikObj.handleSubmit}>
        <div className="form-floating mb-3">
          <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.name} type="text" className="form-control" name="name" id="name" placeholder="Name" />
          <label className='text-muted fw-semibold' htmlFor="name">Name</label>
          {formikObj.errors.name && formikObj.touched.name ? <div className='alert bg-danger-subtle mt-1 p-2 fw-bold text-danger'>{formikObj.errors.name}</div> : ""}
        </div>
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
        <div className="form-floating mb-3">
          <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.rePassword} type="password" className="form-control" name="rePassword" id="rePassword" placeholder="rePassword" />
          <label className='text-muted fw-semibold' htmlFor="rePassword">rePassword</label>
          {formikObj.errors.rePassword && formikObj.touched.rePassword ? <div className='alert bg-danger-subtle mt-1 p-2 fw-bold text-danger'>{formikObj.errors.rePassword}</div> : ""}

        </div>
        <div className="form-floating mb-3">
          <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.phone} type="tel" className="form-control" name="phone" id="phone" placeholder="Phone" />
          <label className='text-muted fw-semibold' htmlFor="phone">Phone</label>
          {formikObj.errors.phone && formikObj.touched.phone ? <div className='alert bg-danger-subtle mt-1 p-2 fw-bold text-danger'>{formikObj.errors.phone}</div> : ""}
        </div>
        <div className='d-flex justify-content-between align-items-center pt-1'>
          {successMsg ? <p className='alert alert-success p-2 px-3 fw-bold text-muted'>{successMsg} <i className='fa-solid fa-check-circle text-success'></i></p> : ""}
          {errorMsg ? <p className='alert alert-danger p-2 px-3 fw-bold text-danger'>{errorMsg}</p> : ""}
          <button type="submit" disabled={formikObj.isValid === false || formikObj.dirty === false} className='btn btn-success px-4 ms-auto'>

            {isLoading ? <ColorRing
              visible={true}
              height="25"
              width="55"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            /> : "Register" }
            

          </button>
        </div>
      </form>
    </section>
  </>
}
