import React, { useEffect, useState } from 'react'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { Oval } from 'react-loader-spinner'
import { Helmet } from 'react-helmet';


export default function AllOrders() {

    const [userOrdersDetails, setUserOrdersDetails] = useState(null)

    useEffect(() => {
        let userInfo = jwtDecode(localStorage.getItem("userToken"));
        getUserOrders(userInfo.id)
    }, [])


    if (userOrdersDetails === null) {
        return <>
            <div className='vh-100 d-flex justify-content-center align-items-center'>
                <Oval
                    height={50}
                    width={100}
                    color="#4fa94d"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    ariaLabel='oval-loading'
                    secondaryColor="#4fa94d"
                    strokeWidth={5}
                    strokeWidthSecondary={5}
                />
            </div>
        </>
    }

    async function getUserOrders(id) {
        const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
        console.log(data);
        setUserOrdersDetails(data)
    }


    return (
        <>
            <Helmet>
                <title>All Orders</title>
            </Helmet>

            <section>
                <div className="container bg-dark bg-opacity-10 mt-5 rounded rounded-1 px-4 ">
                    <header className='d-flex justify-content-between align-items-center '>
                        <div>
                            <h2 className='pt-5 py-4 fw-bold'>Orders History</h2>
                        </div>
                    </header>
                    {userOrdersDetails.map(function (order, id) {
                        return <div key={id} className="row py-5 border-top border-3 border-black">
                            <div className="col-md-12">
                                <div>
                                    <h5 className='pb-2 fw-bold'>Order ID: <span className='main-color'>#{order.id}</span> </h5>
                                    <h5 className='pb-2 fw-bold'>Payment Method: <span className='main-color text-capitalize'>{order.paymentMethodType} </span> </h5>
                                    <h5 className='pb-2 fw-bold'>Order Place Date: <span className='main-color'>{order.createdAt.split("").slice(0, 10)}.</span> </h5>
                                    <h5 className='pb-2 fw-bold'>Total Order Price: <span className='main-color'>{order.totalOrderPrice} EGP.</span> </h5>
                                </div>
                            </div>
                            <h5 className='py-2 text-center fw-bold'>Order List</h5>
                            {order.cartItems.map(function (product, id) {
                                return <div key={id} className="row">
                                    <div className='d-flex mt-3 rounded-3'>
                                        <div className="col-md-2 border-end border-1 border-dark-subtle">
                                            <img src={product.product.imageCover} className="p-3 w-100 rounded-3" alt="" />
                                        </div>
                                        <div className="col-md-10">
                                            <div className='ms-4 d-flex justify-content-between align-items-center h-100'>
                                                <div className=''>
                                                    <h5 className='mt-2'>{product.product.title}</h5>
                                                    <p className='pt-2 fw-semibold main-color'>Price: {product.price} EGP.</p>
                                                </div>
                                                <div>
                                                    <p className='fw-bold fs-6 px-3 py-1 bg-dark-subtle'>Qty: <span className=' text-success'> {product.count} </span></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div >
                    })}
                </div>
            </section>
        </>
    )
}
