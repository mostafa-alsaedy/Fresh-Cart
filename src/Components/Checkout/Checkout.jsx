import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { cartContext } from '../context/cartContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';



export default function Checkout() {

    const navigateUser = useNavigate()
    const [isLoading, setIsLoading] = useState(null)
    const { cartId, setCartProducts, setNumOfCartItems, setTotalCartPrice } = useContext(cartContext)

    async function requestCheckout(values) {
        setIsLoading(true)
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, values, {
                headers: { token: localStorage.getItem("userToken") }
            })

            if (data.status === "success") {
                toast.success("Proceeding to Checkout..")
                setCartProducts([])
                setNumOfCartItems(0)
                setTotalCartPrice(0)
                setIsLoading(false)
                setTimeout(() => {
                    navigateUser("/purchasesuccess")
                }, 2500);
            }

        } catch (error) {

        }

    }


    async function requestOnlinePayment(values) {
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, values,
                {
                    headers: { token: localStorage.getItem("userToken") },
                    params: { url: "https://freshcart-main.vercel.app" }
                }
            )
            window.open(data.session.url, "_blank")
            console.log(data);
        } catch (error) {

        }


    }
    const formikObjOnline = useFormik({

        initialValues: {
            city: "",
            phone: "",
            details: ""
        },

        onSubmit: requestOnlinePayment,


        validate: function (values) {

            const errors = {};

            if (values.city.length < 3) {
                errors.city = "City name must be at least 3 characters.";
            }
            if (!values.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
                errors.phone = "Enter a valid mobile number.";
            }
            if (values.details.length === 0) {
                errors.details = "Please enter your details.";
            }


            return errors;
        }
    });


    const formikObj = useFormik({

        initialValues: {
            city: "",
            phone: "",
            details: ""
        },

        onSubmit: requestOnlinePayment,


        validate: function (values) {

            const errors = {};

            if (values.city.length < 3) {
                errors.city = "City name must be at least 3 characters.";
            }
            if (!values.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
                errors.phone = "Enter a valid mobile number.";
            }
            if (values.details.length === 0) {
                errors.details = "Please enter your details.";
            }


            return errors;
        }
    });

    return <>
        <section>
            <div className="container">
                <h1 className='text-center fw-bolder text-primary my-5 fst-italic'>Checkout</h1>
                <form className='w-75 m-auto pt-2' onSubmit={formikObj.handleSubmit}>
                    <div className="form-floating my-4">
                        <input type="text" onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.city} className="form-control" id='city' placeholder="City" />
                        <label htmlFor="city" className='text-muted fw-semibold' >City</label>
                        {formikObj.errors.city && formikObj.touched.city ? <div className='alert bg-danger-subtle mt-2 p-2 fw-bold text-danger'>{formikObj.errors.city}</div> : ""}
                    </div>
                    <div className="form-floating my-4">
                        <input type="tel" onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.phone} className="form-control" id='phone' placeholder="Phone" />
                        <label htmlFor="phone" className='text-muted fw-semibold'>Phone</label>
                        {formikObj.errors.phone && formikObj.touched.phone ? <div className='alert bg-danger-subtle mt-2 p-2 fw-bold text-danger'>{formikObj.errors.phone}</div> : ""}
                    </div>
                    <div className="form-floating my-4">
                        <input type="textarea" onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.details} className="form-control" id='details' placeholder="Details" />
                        <label htmlFor="details" className='text-muted fw-semibold'>Details</label>
                        {formikObj.errors.details && formikObj.touched.details ? <div className='alert bg-danger-subtle mt-2 p-2 fw-bold text-danger'>{formikObj.errors.details}</div> : ""}
                    </div>
                    {isLoading ? <div className='d-flex justify-content-center align-items-center'>
                        <Oval
                            height={50}
                            width={100}
                            color="#FFC107"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel='oval-loading'
                            secondaryColor="#FFC107"
                            strokeWidth={5}
                            strokeWidthSecondary={5}
                        />
                    </div> : <button type='submit' disabled={formikObj.isValid === false || formikObj.dirty === false} className='btn btn-warning float-start fs-5 px-5 fw-semibold'>Request Checkout (Cash)</button>
                    }
                    {isLoading ? <div className='d-flex justify-content-center align-items-center'>
                        <Oval
                            height={50}
                            width={100}
                            color="#FFC107"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                            ariaLabel='oval-loading'
                            secondaryColor="#FFC107"
                            strokeWidth={5}
                            strokeWidthSecondary={5}
                        />
                    </div> : <button type='submit' disabled={formikObjOnline.isValid === false || formikObjOnline.dirty === false} className='btn btn-warning float-end fs-5 px-5 fw-semibold'>Request Checkout (Online Payment)</button>
                    }
                </form>
            </div>
        </section>

    </>
}
