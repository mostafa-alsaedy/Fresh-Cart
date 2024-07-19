import React, { useContext } from 'react'
import { cartContext } from '../context/cartContext'
import { Oval } from 'react-loader-spinner'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'




export default function Cart() {

    const { cartProducts, totalCartPrice, numOfCartItems, deleteProduct, updateCartProduct, clearShoppingCart } = useContext(cartContext)

    console.log("ana aho" , cartProducts);

    if (cartProducts === null) {
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

    if (cartProducts.length === 0) {
        return <>
            <div style={{ height: "75vh" }} className=' d-flex justify-content-center align-items-center text-center '>
                <div>
                    <i style={{ width: "100px", height: "100px", display: "flex", justifyContent: 'center', alignItems: "center", fontSize: "50px", borderRadius: "50%" }} className='mb-4 m-auto bg-dark bg-opacity-10 fa-solid fa-cart-shopping main-color'></i>
                    <h2>Your cart is empty!</h2>
                    <br />
                    <h3>Browse our products and discover our best deals!</h3>
                    <Link to={"/products"}><button className='btn btn-success p-3 mt-4 fw-bold text-black fs-5 shadow-lg shadow'>START SHOPPING</button></Link>
                </div>
            </div>
        </>
    }

    async function deleteSpecificProduct(id) {
        const data = await deleteProduct(id)
        if (data.status === "success") {
            toast.success("Product Removed Successfully.")
        }
    }

    async function updateProduct(productId, count) {
        const data = await updateCartProduct(productId, count)

        if (data.status === "success") {
            toast.success("Item Count Updated Successfully.")
        }
    }

    async function clearCart() {
        const data = await clearShoppingCart()
        if (data.status === "success") {
            toast.success("Your cart has been cleared.")
        }
    }


    return <>
        <div className="container bg-dark bg-opacity-10 mt-5 rounded rounded-1 px-4 ">
            <header className='d-flex justify-content-between align-items-center'>
                <div>
                    <h2 className='pt-5 py-4 fw-bold'>Shopping Cart</h2>
                </div>
                <div>
                    <Link to={"/checkout"}><button className='btn btn-primary fw-semibold text-black p-3'>Proceed to Checkout ( <span className='text-warning'>Subtotal: {totalCartPrice} EGP.</span> )</button></Link>
                </div>
            </header>
            <div className='d-flex justify-content-between align-items-center'>
                <div>
                    <h5 className='pb-2'>Total Cart Price: <span className='main-color'>{totalCartPrice} EGP.</span> </h5>
                    <h5 className='pb-2'>Total Items: <span className='main-color'>{numOfCartItems}.</span> </h5>
                </div>
                <div>
                    <button onClick={clearCart} className='btn btn-warning fw-semibold mt-4' >Clear Cart</button>
                </div>
            </div>
            {cartProducts.map(function (product, index) {
                return <div key={index} className="row py-3 border-bottom border-2">
                    <div className="col-md-2">
                        <img src={product.product.imageCover} className="w-100" alt="" />
                    </div>
                    <div className="col-md-10">
                        <div className='d-flex justify-content-between align-items-center'>
                            <div className='w-75'>
                                <h5 className='pb-2 mt-2'>{product.product.title}</h5>
                                <p className='py-3 fw-semibold main-color'>Price: {product.price} EGP</p>
                                <button onClick={() => deleteSpecificProduct(product.product.id)} className='fw-semibold btn btn-danger text-black'><i className='fa-solid fa-trash-can pe-1'></i>Remove</button>
                            </div>
                            <div>
                                <button onClick={() => updateProduct(product.product.id, product.count + 1)} className='btn btn-outline-success py-2 px-2'><i style={{ fontSize: "13px" }} className='fa-solid fa-plus'></i></button>
                                <span className='fw-semibold px-2'>{product.count}</span>
                                <button onClick={() => updateProduct(product.product.id, product.count - 1)} className='btn btn-outline-success py-2 px-2'><i style={{ fontSize: "13px" }} className='fa-solid fa-minus'></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            })}
        </div>




    </>
}
