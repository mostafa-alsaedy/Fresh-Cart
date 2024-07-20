import axios from 'axios'
import { React, useContext, useEffect, useState } from 'react'
import { Oval } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import HomeSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { cartContext } from '../context/cartContext';
import toast from 'react-hot-toast';
import { wishListContext } from '../context/wishListContext';
import { Helmet } from 'react-helmet';


export default function Products({ product }) {

  let [wishProduct, setWishProduct] = useState([]);
  const { addProductsToWishList, removeProduct, wishColor } = useContext(wishListContext)
  const { addProductsToCart } = useContext(cartContext);
  const [searchList, setSearchList] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  let [iconWishColor, setIconWishColor] = useState(false);

  console.log(product);

  async function addProduct(id) {
    const data = await addProductsToCart(id)
    if (data.status === "success") {
      toast.success(data.message, {
        duration: 5000,
        position: 'bottom-right',
        className: "bg-dark text-white"
      })
    }
  }




  // function toggleHeart(id) {
  //   $(`i[data-id="${id}"]`).toggleClass("text-danger")
  // }


  async function addWishList(id) {
    const data = await addProductsToWishList(id)
    console.log(data);
    setWishProduct(data?.data?.data);
    if (data.status === "success") {
      toast(data.message, {
        icon: '❤️',
        duration: 5000,
        position: 'bottom-right',
        className: "bg-dark text-white"
      })
    }
    // toggleHeart(id)
  }

  async function removeWishProduct(id) {
    const data = await removeProduct(id)
    console.log(data);
    if (data.status === "success") {
      toast(data.message, {
        icon: '❤️',
        duration: 5000,
        position: 'bottom-right',
        className: "bg-dark text-white"
      })
    }
  }

  function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products")
  }

  const { isLoading, data } = useQuery("allProducts", getAllProducts)





  useEffect(() => {
    setSearchList(data?.data.data.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase())))
  }, [searchTerm])


  useEffect(() => {
    setSearchList(data?.data.data)
  }, [data])


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
    <Helmet>
      <title>Products</title>
    </Helmet>

    <div className="container mt-5 pb-5">
      <div className="row g-0 mb-5">
        <div className="col-sm-9">
          <HomeSlider />
        </div>
        <div className="col-sm-3">
          <img style={{ width: "100%", height: "200px" }} src={require("../Assets/imgs/homeslider-img-4.jpg")} alt="" />
          <img style={{ width: "100%", height: "200px" }} src={require("../Assets/imgs/homeslider-img-5.jpg")} alt="" />
        </div>
      </div>
      <div className='mb-5 pb-5'><CategorySlider /></div>
      <input onChange={(e) => setSearchTerm(e.target.value)} type="text" id='searchBar' name='searchBar' className='form-control fw-bold w-75 m-auto mt-5' placeholder='Search by product' />
      <div style={{ width: "90%" }} className="row gy-4 mt-4 m-auto">
        {searchList?.map(function (product, idx) {
          return <div key={idx} className="col-md-3">
            <div className='productDiv productBox p-3 m-auto rounded rounded-2'>
              <Link to={`/productdetails/${product.id}`}>
                <img src={product.imageCover} className="w-100 py-3" alt="" />
                <h6 style={{ fontSize: "14px" }} className='main-color'>{product.category.name}</h6>
                <h5>{product.title.split(" ").slice(0, 3).join(" ")}</h5>
                <div className='d-flex justify-content-between align-items-center'>
                  <p>{product.price} EGP</p>
                  <p><span><i className='fa fa-star text-warning pe-1'></i></span>{product.ratingsAverage}</p>
                </div>
              </Link>
              <div className=' addCart d-flex flex-column justify-content-between align-items-center gap-2'>
                <div>
                  <button onClick={() => addProduct(product.id)} style={{ width: "200px" }} className='btn btn-success text-center me-2 flex-grow-1'>
                    <i className='fa-solid fa-plus-square mx-2'></i>Add to Cart
                  </button>
                </div>
                <div>
                  <button onClick={() => addWishList(product.id)} style={{ width: "200px" }} className='btn btn-danger text-center me-2 flex-grow-1'>
                    <i className='fa-solid fa-heart  mx-2'></i>Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        })}
      </div>
    </div>

  </>
}




