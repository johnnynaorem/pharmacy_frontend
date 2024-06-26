import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet'
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet='utf-8' />
        <meta name='description' content={description} />
        <meta name='keywords' content={keywords} />
        <meta name='author' content={author} />
        <title>{title}</title>
      </Helmet>
      <Header/>
        <main>
          <Toaster />
          {children}
        </main>
      <Footer />
    </>
  )
}

Layout.defaultProps = {
  title: "Pharmacy app",
  description: "mern stack project",
  keywords: "mern, react, node, mongodb",
  author: "JMG"
}

export default Layout
