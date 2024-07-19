import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useQuery } from 'react-query';
import { ThreeDots } from 'react-loader-spinner';



export default function CategorySlider() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 5,
        arrows: false,
        autoplaySpeed: 5000,
        autoplay: true
    }

    function getAllCategories() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }

    const { data, isLoading } = useQuery("categorySlider", getAllCategories, {
        refetchOnMount: false
    })



    if (isLoading) {
        return <>
            <div className='d-flex justify-content-center'>
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
        <div>
            <Slider {...settings}>
                {data?.data.data.map(function (category, index) {
                    return <div key={index}>
                        <img style={{ width: "100%", height: "200px" }} src={category.image} alt="" />
                        <h6 className='text-center my-3'>{category.name}</h6>
                    </div>
                })}
            </Slider>
        </div>

    </>
}
