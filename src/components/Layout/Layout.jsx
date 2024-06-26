import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Toaster } from 'react-hot-toast';
const Layout = ({children}) => {
  return (
    <>
      <Header/>
        <main>
          <Toaster />
          {children}
        </main>
      <Footer />
    </>
  )
}

export default Layout
