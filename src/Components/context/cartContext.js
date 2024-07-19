import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const cartContext = createContext();

export default function CartContextProvider({ children }) {

    const [cartProducts, setCartProducts] = useState([])
    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [cartId, setCartId] = useState(null)


    // function addProductsToCart(productId) {
    //     return axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
    //         "productId": productId
    //     },
    //         {
    //             headers: { token: localStorage.getItem("userToken") }
    //         })

    //         .then((res) => {
    //             getShoppingCart()
    //               return res
    //         }

    //         )
    //         .catch((error) => error)
    // }



    async function addProductsToCart(productId) {
        try {
            const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
                "productId": productId
            },
                {
                    headers: { token: localStorage.getItem("userToken") }
                })

            getShoppingCart();

            return data;

        } catch (error) {
            console.log("Error", error);
        }

    }


    async function getShoppingCart() {
        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: { token: localStorage.getItem("userToken") }
            });
            setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);
            setCartProducts(data.data.products);
            setCartId(data.data._id);


            return data;

        } catch (error) {
            console.log("error", error);
        }
    }


    async function deleteProduct(productId) {
        try {
            const { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                headers: { token: localStorage.getItem("userToken") }
            })


            setNumOfCartItems(data.numOfCartItems)
            setTotalCartPrice(data.data.totalCartPrice)
            setCartProducts(data.data.products)


            return data;



        } catch (error) {
            console.log("Error", error);
        }
    }


    async function updateCartProduct(productId, count) {
        try {

            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
                "count": count
            }, {
                headers: { token: localStorage.getItem("userToken") }
            })

            setCartProducts(data.data.products);
            setNumOfCartItems(data.numOfCartItems);
            setTotalCartPrice(data.data.totalCartPrice);

            return data;

        } catch (error) {
            console.log("Error", error);
        }
    }


    async function clearShoppingCart() {
        try {
            const { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: { token: localStorage.getItem("userToken") }
            });
            setNumOfCartItems(0);
            setTotalCartPrice(0);
            setCartProducts([]);


            return data;

        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(function () {
        getShoppingCart();
    }, [])


    return <cartContext.Provider value={{
        getShoppingCart,
        addProductsToCart,
        updateCartProduct,
        deleteProduct,
        clearShoppingCart,
        setCartProducts,
        setNumOfCartItems,
        setTotalCartPrice,
        numOfCartItems,
        totalCartPrice,
        cartProducts,
        cartId
    }}>

        {children}

    </cartContext.Provider>
}



