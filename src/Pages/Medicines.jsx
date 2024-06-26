import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import toast from "react-hot-toast";
import axios from "axios";
import like from './Image/like.svg'
import view from './Image/view.svg'
import new_rating from '../components/Product/BestSellingProduct/new_rating.svg'
import {Checkbox} from 'antd'
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";
import { useCart } from '../context/cart';
import { useSearch } from '../context/search';
import { Rate } from 'antd';  

const Medicines = (props) => {
  const [cart, setCart] = useCart()
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);  
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [total, setTotal] = useState(0)
  const [nextPage, setNextPage] = useState(1)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useSearch();
  

  //get Total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "https://pharmacy-backend-pi.vercel.app/api/v1/product/product-count"
      );
      setTotal(data.total);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  };

  //get products List
  const getProductsList = async () => {
    try {
      props.setProgress(10)
      setLoading(true)
      const { data } = await axios.get(
        `https://pharmacy-backend-pi.vercel.app/api/v1/product/product-list/${nextPage}`
      );
      props.setProgress(30)
      setLoading(false)
      props.setProgress(80)
      setProducts(data.products);
      props.setProgress(100)
    } catch (error) {
      setLoading(false)
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  };

   //get products
   const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://pharmacy-backend-pi.vercel.app/api/v1/product/get-products"
      );
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  };
  useEffect(() => {
    if(!checked.length) getProductsList();
    // if(!checked.length) getAllProducts();
  }, []);

  useEffect(() => {
    if(checked.length) filterProduct();
  }, [checked]);

  //get Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://pharmacy-backend-pi.vercel.app/api/v1/category/get-category"
      );
      setCategories(data.category);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal()
  }, []);

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if(value){
      all.push(id)
    }else {
      all = all.filter(i => i !== id)
    }
    setChecked(all)
    if(all.length===0){
      setPage(1)
      getProductsList()
    } 
  }

  //get Filtered products
  const filterProduct = async () => {
    try {
      props.setProgress(10)
      const {data} = await axios.post('https://pharmacy-backend-pi.vercel.app/api/v1/product/filter', {checked});
      props.setProgress(30)
      setProducts(data.product)
      props.setProgress(80)
      props.setProgress(100)
      } catch (error) {
      console.log(error)
      toast.error('Something went wrong in filter product')
    }
  }

  //load more
  const loadMore = async () => {
    try {
      props.setProgress(10)
      setLoading(true)
      const {data} = await axios.get(`https://pharmacy-backend-pi.vercel.app/api/v1/product/product-list/${page+1}`);
      props.setProgress(30)
      setLoading(false)
      props.setProgress(80)
      setProducts([...products, ...data?.products])
      setPage(page + 1)
      props.setProgress(100)
      } catch (error) {
      setLoading(false)
      console.log(error)
      toast.error('Something went wrong in filter product')
    }
  }
    // useEffect(() => {
    //   if(page === 1) return;
    //   // loadMore()
    // }, [page])
  
  const handleAddToCart = (product) => {
    window.scrollTo(0,0)
    const existingItemIndex = cart.findIndex((item) => item._id === product._id);
    if (existingItemIndex !== -1) {
      // Item already exists in the cart, update its quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast.success("Item quantity updated in Cart");
      console.log(updatedCart)
    } else {
      // Item doesn't exist in the cart, add it
      setCart([...cart, { ...product, quantity: 1 }]);
      localStorage.setItem('cart', JSON.stringify([...cart, { ...product, quantity: 1 }]));
      toast.success("Item Added to Cart");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.get(`https://pharmacy-backend-pi.vercel.app/api/v1/product/product-search/${values.keyword}`)
      setValues({...values, results: data});
      // navigate('/search')
    } catch (error) { 
      console.log(error)
    }
  }
  return (
    <Layout>
      <div className="container-fluid" style={{marginBottom: '150px'}}>
        <div className="row mt-3">
          <div className="col-md-3">
            <h4 className="text-center">Filter By Category</h4>
            <div className="d-flex flex-column mt-4">
              {categories.map(c => (
                <Checkbox className='ms-5 mb-3' key={c._id} onChange={(e) => {handleFilter(e.target.checked, c._id)}}>
                  {c.name}
                </Checkbox>
              ))}
            </div>
          </div>
          <div className="col-md-9">
              <h1 className="text-center mt-3">All Products</h1>
              <div className="input-container my-3">
                <form onSubmit={handleSubmit}>
                  <input type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e)=> setValues({...values, keyword: e.target.value})}  style={{marginRight: '20px', padding: '5px 10px', borderRadius: '10px'}}/> 
                </form>
            </div>
            
            <InfiniteScroll
              dataLength={products.length}
              next={loadMore}
              hasMore={!checked.length?products.length !== total:''}
              // hasMore={products.length !== total}
              loader={<p>Loading...</p>}
        >
            <div className="d-flex flex-wrap gap-3">
              {values.keyword === '' && products?.map((p,i) => (
                    <div className="col-md-4 col-lg-3" style={{cursor:'pointer'}}>
                    <div className="card cart-container" key={i} style={{ height: '350px', border: '1px solid red', overflow:'hidden'}}>
                      <div className="imageContainer" style={{height: '70%', position:'relative'}}>
                        <img src={`https://pharmacy-backend-pi.vercel.app/api/v1/product/product-image/${p._id}`} className="card-img-top" alt="..." style={{height: "100%", objectFit:'cover'}}/>
                        <div className='d-flex' style={{flexDirection: 'column', position:'absolute', top: '0px', right: '5px'}}>
                          <img src={like} alt="" width={"25px"}/>
                          <img className='view-img' src={view} alt="" width={"25px"} onClick={()=> {navigate(`/product/${p.slug}`); window.scrollTo(0,0)}}/>
                        </div>
                      </div>
                      <div className="card-body" style={{position: 'relative'}}>
                      <h6 className="card-title" style={{fontSize:'15px', fontWeight:'bold'}}>{p.name.substring(0,30)}...</h6>
                        <p className="card-text" style={{fontSize:'14px', color:'red', fontWeight:'bold'}}>₹ {p.price}</p>
                        <Rate disabled defaultValue={4.5} />
                        {/* <img src={new_rating} alt="" /> */}
                        {/* {p.quantity>0?<p className="card-text">Stock: {p.quantity}</p>:<p className="card-text" style={{color: 'red'}}>Out of stock</p>}
                        <button className="btn btn-primary ms-1" onClick={()=> {navigate(`/product/${p.slug}`); window.scrollTo(0,0)}}>More Details</button>
                        <button className="btn btn-secondary ms-1" onClick={() => handleAddToCart(p)}>Add to Cart</button> */}
                      </div>
                      <div className='addCartBtn' style={{width:'100%'}}>
                        <button  className="btn btn-secondary" style={{width:'100%'}} onClick={() => handleAddToCart(p)}>Add to Cart</button>
                      </div>  
                    </div>
                  </div>
              ))}
              {values.keyword !=='' && values.results?.map((p,i) => (
                    <div className="col-md-4 col-lg-3" style={{cursor:'pointer'}}>
                    <div className="card cart-container" key={i} style={{ height: '350px', border: '1px solid red', overflow:'hidden'}}>
                      <div className="imageContainer" style={{height: '70%', position:'relative'}}>
                        <img src={`https://pharmacy-backend-pi.vercel.app/api/v1/product/product-image/${p._id}`} className="card-img-top" alt="..." style={{height: "100%", objectFit:'cover'}}/>
                        <div className='d-flex' style={{flexDirection: 'column', position:'absolute', top: '0px', right: '5px'}}>
                          <img src={like} alt="" width={"25px"}/>
                          <img className='view-img' src={view} alt="" width={"25px"} onClick={()=> {navigate(`/product/${p.slug}`); window.scrollTo(0,0)}}/>
                        </div>
                      </div>
                      <div className="card-body" style={{position: 'relative'}}>
                      <h6 className="card-title" style={{fontSize:'15px', fontWeight:'bold'}}>{p.name.substring(0,30)}...</h6>
                        <p className="card-text" style={{fontSize:'14px', color:'red', fontWeight:'bold'}}>₹ {p.price}</p>
                        <img src={new_rating} alt="" />
                        {/* {p.quantity>0?<p className="card-text">Stock: {p.quantity}</p>:<p className="card-text" style={{color: 'red'}}>Out of stock</p>}
                        <button className="btn btn-primary ms-1" onClick={()=> {navigate(`/product/${p.slug}`); window.scrollTo(0,0)}}>More Details</button>
                        <button className="btn btn-secondary ms-1" onClick={() => handleAddToCart(p)}>Add to Cart</button> */}
                      </div>
                      <div className='addCartBtn' style={{width:'100%'}}>
                        <button  className="btn btn-secondary" style={{width:'100%'}} onClick={() => handleAddToCart(p)}>Add to Cart</button>
                      </div>  
                    </div>
                  </div>
              ))}
            </div>
            </InfiniteScroll>
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button className="btn btn-warning" onClick={(e) => {
                // e.preventDefault();
                setPage(page+1)
              }}>
                {loading? "Loading...": "Load More"}
              </button>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Medicines
