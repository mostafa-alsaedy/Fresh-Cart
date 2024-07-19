import React from 'react'
import { Link } from 'react-router-dom'


export default function PurchaseSuccess() {
    return <>
        <div style={{ height: "75vh" }} className=' d-flex justify-content-center align-items-center text-center '>
            <div>
                <i style={{ width: "100px", height: "100px", display: "flex", justifyContent: 'center', alignItems: "center", fontSize: "50px", borderRadius: "50%" }} className='mb-4 m-auto bg-dark bg-opacity-10 fa-solid fa-check main-color'></i>
                <h2 className=' text-uppercase'>Thank you for your purchase.</h2>
                <Link to={"/products"}><button className='btn btn-success p-3 mt-4 fw-bold text-black fs-5 shadow-lg shadow'>CONTINUE SHOPPING</button></Link>
            </div>
        </div>
    </>
}
