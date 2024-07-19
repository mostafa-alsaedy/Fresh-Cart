import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const wishListContext = createContext()

export function WishListContextProvider({ children }) {

    const [wishListProducts, setWishListProducts] = useState([])
    const [numOfWishListedItems, setNumOfWishListedItems] = useState(0)

 

    async function addProductsToWishList(productId) {
        try {
            const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                "productId": productId
            }, {
                headers: { token: localStorage.getItem("userToken") }
            })

            getWishListedProducts();
            
            return data;

        } catch (error) {
            console.log("Error", error);
        }
    }

    async function getWishListedProducts() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: { token: localStorage.getItem("userToken") }
            })
            setWishListProducts(data?.data)
            setNumOfWishListedItems(data?.count)


            return data;

        } catch (error) {
            console.log("Error", error);
        }

    }

    async function removeProduct(productId) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
                headers: { token: localStorage.getItem("userToken") }
            })
            getWishListedProducts();



            return data;

        } catch (error) {
            console.log("Error", error);
        }
    }


    useEffect(function () {
        getWishListedProducts();
    }, [])

    return <>
        <wishListContext.Provider value={{
            addProductsToWishList,
            getWishListedProducts,
            removeProduct,
            wishListProducts,
            numOfWishListedItems
        }}>

            {children}

        </wishListContext.Provider>
    </>
}