import React, { useContext } from 'react'
import { wishListContext } from '../context/wishListContext'
import { Oval } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { cartContext } from '../context/cartContext'




export default function WishList() {

    const { addProductsToCart } = useContext(cartContext)

    const { wishListProducts, numOfWishListedItems, removeProduct } = useContext(wishListContext)


    async function removeWishProduct(id) {
        const data = await removeProduct(id)

        if (data.status === "success") {
        }
    }

    async function addProduct(id) {
        const data = await addProductsToCart(id)
        removeWishProduct(id)
        if (data.status === "success") {
            toast.success(data.message, {
                duration: 5000,
                position: 'bottom-right',
                className: "bg-dark text-white"
            })
        }
    }

    if (wishListProducts === null) {
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

    if (wishListProducts.length === 0) {
        return <>
            <div style={{ height: "75vh" }} className=' d-flex justify-content-center align-items-center text-center '>
                <div>
                    <i style={{ width: "100px", height: "100px", display: "flex", justifyContent: 'center', alignItems: "center", fontSize: "50px", borderRadius: "50%" }} className='mb-4 m-auto bg-dark bg-opacity-10 fa-solid fa-heart main-color'></i>
                    <h2>Your WishList is empty!</h2>
                    <br />
                    <h3>Browse our products and discover our best deals!</h3>
                    <Link to={"/products"}><button className='btn btn-success p-3 mt-4 fw-bold text-black fs-5 shadow-lg shadow'>START SHOPPING</button></Link>
                </div>
            </div>
        </>
    }


    async function removeWishListProduct(id) {
        const data = await removeProduct(id)

        if (data.status === "success") {
            toast.success("Product Removed Successfully.")
        }
    }



    return <>
        <div className="container bg-dark bg-opacity-10 mt-5 rounded rounded-1 px-4 ">
            <h2 className='pt-5 py-4 fw-bold'>My WishList</h2>
            <h5 className='pb-2'>Total Items: <span className='main-color'>{numOfWishListedItems}.</span> </h5>
            {wishListProducts.map(function (product, idx) {
                return <div key={idx} className="row py-3 border-bottom border-2">
                    <div className="col-md-2">
                        <img src={product.imageCover} className="w-100" alt="" />
                    </div>
                    <div className="col-md-10">
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='w-75'>
                                <h5 className='pb-2 mt-2'>{product.title}</h5>
                                <p className='py-3 fw-semibold main-color'>Price: {product.price} EGP.</p>
                                <button onClick={function() {
                                    removeWishListProduct(product._id)
                                    removeWishProduct(product._id)
                                }} className='fw-semibold btn btn-danger text-black mt-4'><i className='fa-solid fa-trash-can pe-1'></i>Remove</button>
                            </div>
                            <div>
                                <button onClick={() => addProduct(product._id)}  className='btn btn-warning px-4 py-3 fw-semibold fs-6'>Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>


    </>
}
