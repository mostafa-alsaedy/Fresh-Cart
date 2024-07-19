import React from 'react'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from './Components/Layout/Layout.jsx'
import Products from './Components/Products/Products'
import Login from './Components/Login/Login'
import Brands from './Components/Brands/Brands.jsx'
import Categories from './Components/Categories/Categories'
import Register from './Components/Register/Register'
import NotFound from './Components/NotFound/NotFound'
import { AuthProvider } from './Components/context/authContext'
import ProtectedRoute from './Components/ProtectedRoutes/ProtectedRoute'
import { QueryClient, QueryClientProvider } from "react-query"
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CartContextProvider from './Components/context/cartContext'
import { Toaster } from 'react-hot-toast';
import Cart from './Components/Carts/Cart'
import Checkout from './Components/Checkout/Checkout'
import PurchaseSuccess from './Components/PurchasedSuccess/PurchaseSuccess'
import WishList from './Components/Wishlist/WishList'
import { WishListContextProvider } from './Components/context/wishListContext'
import ForgotPassword from './Components/ForgotPassword/ForgotPassword'
import ChangePassword from './Components/ForgotPassword/ChangePassword'
import VerifyCode from './Components/ForgotPassword/VerifyCode'
import AllOrders from './Components/allOrders/AllOrders.jsx'



const myRouter = createBrowserRouter([{
    path: '/', element: <Layout />, children: [
      {
        index: true, element:
          <ProtectedRoute> <Products /> </ProtectedRoute>
      },
      {
        path: "products", element:
          <ProtectedRoute> <Products /> </ProtectedRoute>
      },
      {
        path: "login", element: <Login />
      },
      {
        path: "register", element: <Register />
      },
      {
        path: "forgotpassword", element: <ForgotPassword />
      },
      {
        path: "changepassword", element: <ChangePassword />
      },
      {
        path: "verifycode", element: <VerifyCode />
      },
      {
        path: "brands", element: <ProtectedRoute> <Brands /> </ProtectedRoute>
      },
      {
        path: "productdetails/:id", element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute>
      },
      {
        path: "categories", element: <ProtectedRoute> <Categories /> </ProtectedRoute>
      },
      {
        path: "cart", element: <ProtectedRoute> <Cart /> </ProtectedRoute>
      },
      {
        path: "allorders", element: <ProtectedRoute> <AllOrders /> </ProtectedRoute>
      },
      {
        path: "wishlist", element: <ProtectedRoute> <WishList /> </ProtectedRoute>
      },
      {
        path: "checkout", element: <ProtectedRoute> <Checkout /> </ProtectedRoute>
      },
      {
        path: "purchasesuccess", element: <ProtectedRoute> <PurchaseSuccess /> </ProtectedRoute>
      },
      { path: "*", element: <NotFound /> }
    ]

  }])

let clientQuery = new QueryClient()

export default function App() {


  return <>
    <WishListContextProvider>
      <CartContextProvider>
        <QueryClientProvider client={clientQuery}>
          <AuthProvider>
            <RouterProvider router={myRouter} />
          </AuthProvider>
        </QueryClientProvider>
      </CartContextProvider>
    </WishListContextProvider>
    <Toaster />
  </>
}
