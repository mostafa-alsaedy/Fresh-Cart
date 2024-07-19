import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import { useQuery } from 'react-query'


export default function Categories() {

  const [searchList, setSearchList] = useState([])
  const [searchTerm, setSearchTerm] = useState("")

  // console.log(searchTerm);



  async function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  }

  const { data, isLoading } = useQuery("categoriesSection", getCategories)


  useEffect(() => {
    setSearchList(data?.data.data.filter(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase())))
  }, [searchTerm])


  useEffect(function () {
    setSearchList(data?.data.data)
  }, [data])

 





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
      <div className="container w-75 my-4">
        <input onChange={(e) => setSearchTerm(e.target.value)} type="text" id='searchBar' name='searchBar' className=' form-control my-5' placeholder='Search by Category' />
        <div className="row gy-5">
          {searchList?.map(function (category, index) {
            return <div key={index} className="col-md-4">
              <div className='categoryDiv text-center rounded rounded-3 border border-1 border-black border-opacity-10'>
                <img src={category.image} style={{ height: "400px" }} className=' w-100 rounded-top rounded-top-2 img-fluid' alt="" />
                <div className='main-color border-top border-1 border-black border-opacity-10 d-flex justify-content-center align-items-center p-3'>
                  <h3 className=' fst-italic'>{category.name}</h3>
                </div>
              </div>
            </div>
          })}

        </div>
      </div>
    </section>



  </>
}
