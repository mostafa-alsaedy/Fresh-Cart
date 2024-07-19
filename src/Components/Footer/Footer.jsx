import React from 'react'

export default function Footer() {
    return <>
        <footer style={{ marginTop: "100px" }} className='bg-dark bg-opacity-10'>
            <div style={{ width: "90%" }} className=' container-fluid mt-5 py-3'>
                <div>
                    <h3 className='py-2'>Get the FreshCart app</h3>
                    <h6 className='text-muted'>We will send you a link, open it on your phone to download the app</h6>
                </div>
                <div className="row gy-3 text-center d-flex align-items-center justify-content-center mt-4">
                    <div className="col-md-9">
                        <div className="form-floating ms-2">
                            <input type="email" className="form-control" id="floatingInput" placeholder="" />
                            <label htmlFor="floatingInput" className='fw-semibold text-muted'>Email address</label>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <button className='btn btn-success w-75 p-2'>Share App Link</button>
                    </div>
                </div>
                <div className='container d-flex align-items-center justify-content-center my-3 border-top border-bottom border-2 pt-2'>
                    <div>
                        <p className='fw-semibold fst-italic fs-5 text-muted'>Payment Partners<img src={require("../Assets/imgs/paymentPartners.png")} className='ms-4 w-25' alt="" /></p>
                    </div>
                    <div>
                        <p className='fw-semibold fst-italic fs-5 text-muted'>Get deliveries with FreshCart <img src={require("../Assets/imgs/appStores.png")} className='ms-4 w-25' alt="" /></p>
                    </div>
                </div>
            </div>
        </footer>
    </>
}
