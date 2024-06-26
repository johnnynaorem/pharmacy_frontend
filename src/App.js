import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Details from './Pages/Details';
import PageNotFound from './components/PageNotFound/pageNotFound';
import AboutUs from './Pages/AboutUs';
import Cart from './Pages/Cart';
import BillingAddressPage from './Pages/BillingAddressPage';
import Medicines from './Pages/Medicines';
import { useState } from 'react';
import LoadingBar from 'react-top-loading-bar'
import LoginSignUp from './components/LoginSignUp/LoginSignUp';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './components/Routes/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import Order from './components/Dashboard/Order';
import OrderDetails from './components/Dashboard/OrderDetails';
import NewPrescription from './components/Prescription/image/NewPrescription';
function App() {
  const [progress, setProgress] = useState(0)
  return (
    <>
    <Toaster />
      <LoadingBar 
            color='#f11946'
            progress={progress}/>
        <div className='container-fluid'>
          <Routes>
          <Route path='/dashboard' element={<PrivateRoute />}>
            <Route path='user' element={<Dashboard />}></Route>
            {/* <Route path='user/profile' element={<Profile />}></Route> */}
            <Route path='user/orders' element={<Order />}></Route>
            <Route path='user/orders/:id' element={<OrderDetails />}></Route>
            <Route path='uploadPrescription' element={<NewPrescription />}></Route>
          </Route>
            <Route path='/' element={<Home setProgress={setProgress}/>} />
            <Route path='/*' element={<PageNotFound />} />
            {/* <Route path='/details' element={<Details />} /> */}
            <Route path='/product/:slug' element={<Details />}></Route>
            <Route path='/aboutus' element={<AboutUs />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<BillingAddressPage />} />
            <Route path='/medicines' element={<Medicines setProgress={setProgress}/>} />
            <Route path='/login' element={<LoginSignUp />} />
          </Routes>
        </div>
    </>
  );
}

export default App;
