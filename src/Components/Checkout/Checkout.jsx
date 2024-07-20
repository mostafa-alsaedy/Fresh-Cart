import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { cartContext } from '../context/cartContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';




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


    const validate = values => {
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
    };


    const formik = useFormik({
        initialValues: {
            city: "",
            phone: "",
            details: ""
        },
        validate,
        onSubmit: values => {
            if (values.paymentType === 'cash') {
                requestCheckout(values);
            } else if (values.paymentType === 'online') {
                requestOnlinePayment(values);
            }
        }
    });

    const handleCashCheckout = () => {
        formik.setFieldValue('paymentType', 'cash');
        formik.handleSubmit();
    };

    const handleOnlineCheckout = () => {
        formik.setFieldValue('paymentType', 'online');
        formik.handleSubmit();
    };

    return (
        <section>
            <div className="container">
                <h1 className="text-center fw-bolder text-primary my-5 fst-italic">Checkout</h1>
                <form className="w-75 m-auto pt-2" onSubmit={formik.handleSubmit}>
                    <div className="form-floating my-4">
                        <input type="text" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.city} className="form-control" id="city" placeholder="City" />
                        <label htmlFor="city" className="text-muted fw-semibold">City</label>
                        {formik.errors.city && formik.touched.city ? <div className="alert bg-danger-subtle mt-2 p-2 fw-bold text-danger">{formik.errors.city}</div> : ""}
                    </div>
                    <div className="form-floating my-4">
                        <input type="tel" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className="form-control" id="phone" placeholder="Phone" />
                        <label htmlFor="phone" className="text-muted fw-semibold">Phone</label>
                        {formik.errors.phone && formik.touched.phone ? <div className="alert bg-danger-subtle mt-2 p-2 fw-bold text-danger">{formik.errors.phone}</div> : ""}
                    </div>
                    <div className="form-floating my-4">
                        <input type="textarea" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.details} className="form-control" id="details" placeholder="Details" />
                        <label htmlFor="details" className="text-muted fw-semibold">Details</label>
                        {formik.errors.details && formik.touched.details ? <div className="alert bg-danger-subtle mt-2 p-2 fw-bold text-danger">{formik.errors.details}</div> : ""}
                    </div>
                    {isLoading ? (
                        <div className="d-flex justify-content-center align-items-center">
                            <Oval height={50} width={100} color="#FFC107" visible={true} ariaLabel="oval-loading" secondaryColor="#FFC107" strokeWidth={5} strokeWidthSecondary={5} />
                        </div>
                    ) : (
                        <>
                            <button type="button" onClick={handleCashCheckout} disabled={!(formik.isValid && formik.dirty)} className="btn btn-warning float-start fs-5 px-5 fw-semibold">Request Checkout (Cash)</button>
                            <button type="button" onClick={handleOnlineCheckout} disabled={!(formik.isValid && formik.dirty)} className="btn btn-warning float-end fs-5 px-5 fw-semibold">Request Checkout (Online Payment)</button>
                        </>
                    )}
                </form>
            </div>
        </section>
    );
}
