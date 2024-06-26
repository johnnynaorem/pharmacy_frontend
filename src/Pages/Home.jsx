import React from 'react'
import Header from '../components/Header/Header'
import Product from '../components/Product/Product'
import BestSellingProducts from '../components/Product/BestSellingProduct/BestSellingProducts'
import DealProducts from '../components/Product/DealProducts/DealProducts'
import SpecialOffers from '../components/Product/SpecialOffers/SpecialOffers'
import NewProducts from '../components/Product/NewProducts/NewProducts'
import Footer from '../components/Footer/Footer'
import LoginSignUp from '../components/LoginSignUp/LoginSignUp'
import Layout from '../components/Layout/Layout'
import LandingPage from './LandingPage'

const Home = () => {
  return (
    <>
      {/* <Header/>
      <Product />
      <BestSellingProducts />
      <DealProducts />
      <SpecialOffers />
      <NewProducts />
      <Footer /> */}
      {/* <LoginSignUp /> */}
      <LandingPage />
    </>
  )
}

export default Home
