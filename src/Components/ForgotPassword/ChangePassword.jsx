
import { useFormik } from "formik"
import axios from "axios"
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner'
import { authContext } from '../context/authContext'




export default function ChangePassword() {


    const { setToken } = useContext(authContext)

    let user = {
        email: "",
        newPassword: "",
    }

    const navigateUser = useNavigate()
    const [successMsg, setSuccessMsg] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    async function resetPassword(values) {
        setIsLoading(true)
        setErrorMsg(null)
        setSuccessMsg(null)


        try {
            const { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
                localStorage.setItem("userToken", data.token)
                setToken(data.token)
                setSuccessMsg("Password changed successfully.")
                setTimeout(() => {
                    navigateUser("/products")
                }, 1000);
        } catch (error) {
            setErrorMsg(error.response.data.message + ".")
        }
        setIsLoading(false)
    }

    const formikObj = useFormik({

        initialValues: user,


        onSubmit: resetPassword,


        validate: function (values) {

            setErrorMsg(null)


            const errors = {};


            if (values.email.includes("@") === false && values.email.includes(".") === false) {
                errors.email = "Enter a valid email.";
            }
            if (values.newPassword.length < 6 || values.newPassword.length > 12) {
                errors.newPassword = "Password must be at least 6 characters.";
            }


            return errors;
        }
    })





    return <>
        <section className="container m-auto">
            <div className='m-auto w-75'>
                <h3 className='mt-5'>Reset Password</h3>
            </div>
            <form className='w-50 m-auto mt-4' onSubmit={formikObj.handleSubmit}>
                <div className="form-floating mb-3">
                    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.email} type="email" className="form-control" name="email" id="email" placeholder="Email" />
                    <label className='text-muted fw-semibold' htmlFor="email">Email</label>
                    {formikObj.errors.email && formikObj.touched.email ? <div className='alert bg-danger-subtle mt-1 p-2 fw-bold text-danger'>{formikObj.errors.email}</div> : ""}
                </div>
                <div className="form-floating mb-3">
                    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.newPassword} type="password" className="form-control" name="newPassword" id="newPassword" placeholder="newPassword" />
                    <label className='text-muted fw-semibold' htmlFor="newPassword">New Password</label>
                    {formikObj.errors.newPassword && formikObj.touched.newPassword ? <div className='alert bg-danger-subtle mt-1 p-2 fw-bold text-danger'>{formikObj.errors.newPassword}</div> : ""}
                </div>
                <div className='d-flex justify-content-between align-items-center pt-1'>
                    {successMsg ? <p className='rounded rounded-3 bg-success-subtle p-2 px-3 fw-bold text-muted d-inline float-end '>{successMsg} <i className='ps-1 fa-solid fa-check-circle text-success'></i></p> : ""}
                    {errorMsg ? <p className=' rounded rounded-3 bg-danger-subtle p-2 px-3 fw-bold text-danger d-inline float-end '>{errorMsg} <i className='ps-1 fa-solid fa-circle-xmark text-danger'></i></p> : ""}
                    <button type="submit" disabled={formikObj.isValid === false || formikObj.dirty === false} className='btn btn-success px-4 ms-auto'>
                        {isLoading ? <ColorRing
                            visible={true}
                            height="25"
                            width="55"
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        /> : "Confirm"}
                    </button>
                </div>
            </form>
        </section>
    </>
}

