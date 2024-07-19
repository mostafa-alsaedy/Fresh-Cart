import axios from 'axios'
import React from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useQuery } from 'react-query'


export default function Brands() {

  async function getBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  }

  const { data, isLoading } = useQuery("brandsSection", getBrands)

  console.log(data);


  if (isLoading) {
    return <>
      <div className='vh-100 d-flex justify-content-center align-items-center'>
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#4fa94d"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    </>
  }




  return <>
    <section>
      <div className="container my-5">
        <div className="row gy-5">
          {data?.data.data.map(function (brand, index) {
            return <div key={index} className="col-md-3">
              <div className="card categoryDiv">
                <img src={brand.image} className="card-img-top w-75 m-auto" alt="..." />
                <div className="card-body d-flex justify-content-center align-items-center border-top border-1">
                  <p className="card-text fw-semibold">{brand.name}</p>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </section>



  </>
}
