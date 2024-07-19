
import { useFormik } from "formik"
import axios from "axios"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner'




export default function ForgotPassword() {



let user = {
    email: "" 
}

const navigateUser = useNavigate()
const [successMsg, setSuccessMsg] = useState(null)
const [errorMsg, setErrorMsg] = useState(null)
const [isLoading, setIsLoading] = useState(false)

async function getForgettenPasswords(values) {
    setIsLoading(true)
    setErrorMsg(null)
    setSuccessMsg(null)


    try {
    const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
    if (data.statusMsg === "success") {
        setSuccessMsg(data.message + ".")
        setTimeout(() => {
          navigateUser("/verifycode")
        }, 1000);
    }
    } catch (error) {
    setErrorMsg("There is no user registered with this email address.")
    }
    setIsLoading(false)
}

const formikObj = useFormik({

    initialValues: user,


    onSubmit: getForgettenPasswords,


    validate: function (values) {

    setErrorMsg(null)


    const errors = {};


    if (values.email.includes("@") === false && values.email.includes(".") === false) {
        errors.email = "Enter a valid email.";
    }


    return errors;
    }})




return <>
    <section className="container m-auto">
    <div className='m-auto w-75'>
        <h1 className='mt-5'>Please enter you e-mail.</h1>
    </div>
    <form className='w-50 m-auto mt-4' onSubmit={formikObj.handleSubmit}>
        <div className="form-floating mb-3">
        <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} type="email" className="form-control" name="email" id="email" placeholder="Email" />
        <label className='text-muted fw-semibold' htmlFor="email">Email</label>
        {formikObj.errors.email && formikObj.touched.email ? <div className='alert bg-danger-subtle mt-1 p-2 fw-bold text-danger'>{formikObj.errors.email}</div> : ""}
        </div>
        <div className='d-flex justify-content-between align-items-center pt-1'>
        {successMsg ? <p className='rounded rounded-3 bg-success-subtle p-2 px-3 fw-bold text-muted d-inline float-end '>{successMsg} <i className='ps-1 fa-solid fa-check-circle text-success'></i></p> : ""}
        {errorMsg ? <p className=' rounded rounded-3 bg-danger-subtle p-2 px-3  fw-bold text-danger d-inline float-end '>{errorMsg} <i className='ps-1 fa-solid fa-circle-xmark text-danger'></i></p> : ""}
        <button type="submit" disabled={formikObj.isValid === false || formikObj.dirty === false} className='btn btn-success px-4 ms-auto'>
            {isLoading ? <ColorRing
            visible={true}
            height="25"
            width="55"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            /> : "Verify"}
        </button>
        </div>
        
    </form>
    </section>
</>
}

