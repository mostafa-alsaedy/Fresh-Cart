import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Oval, TailSpin } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { cartContext } from '../context/cartContext'
import toast from 'react-hot-toast'

export default function ProductDetails() {

    const [addCartLoading, setAddCartLoading] = useState(null)

    const { addProductsToCart } = useContext(cartContext)

    async function addProduct(id) {
        setAddCartLoading(true)
        const data = await addProductsToCart(id);
        console.log(data);
        if (data.status === "success") {
            toast.success(data.message, {
                duration: 5000,
                position: 'bottom-right',
                className: "bg-dark text-white"
            })
        }
        setAddCartLoading(false)
    }

    const { id } = useParams()

    function getProductDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }

    const { data, isLoading } = useQuery("productDetails", getProductDetails)



    if (isLoading) {
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


    return <>
        <section className='mt-5'>
            <div className="container pt-5 ">
                <div className="row">
                    <div className="col-md-3">
                        <img src={data?.data.data.imageCover} className='w-100' alt="" />
                    </div>
                    <div className="col-md-9 mt-5">
                        <div className=''>
                            <h4>{data?.data.data.title}</h4>
                            <h5 className='text-muted pt-3'>{data?.data.data.description}</h5>
                            <p className='fw-semibold pt-3'>{data?.data.data.category.name}</p>
                            <div className='fw-semibold d-flex justify-content-between align-items-center'>
                                <p>{data?.data.data.price} EGP</p>
                                <p><i className="fa-solid fa-star text-warning"></i> {data?.data.data.ratingsAverage}</p>
                            </div>
                            {addCartLoading ? <>
                                <div className="d-flex justify-content-center align-items-center mt-4">
                                    <TailSpin
                                        height="40"
                                        width="40"
                                        color="#4fa94d"
                                        ariaLabel="tail-spin-loading"
                                        radius="1"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                    />
                                </div>
                            </> : <button onClick={() => addProduct(data.data.data.id)} className='btn btn-success w-100 mt-4'> <i className='fa-solid fa-plus me-2'></i>Add to cart</button>
                            }
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </>
}
