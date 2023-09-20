import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './fakeData/Home/Home';
import Inventory from './components/Inventory/Inventory';
import Review from './components/Review/Review';
import Footer from './components/Footer/Footer';
import NoteFound from './components/NoteFound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext, useState } from 'react';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
// import PrivateRoute from './components/PrivateRoute/PrivateRoute';


export const UserContext = createContext();
function App(props) {
    const [loggedInUser, setLoggedInUser] = useState({});
    return (
      <>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <h3>Email:{loggedInUser.email}</h3>
        
        <BrowserRouter>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/shop" element={<Shop/>}/>
            <Route path="/review" element={<Review/>}/>
            <Route path="/inventory" element={<Inventory/>}/>
            <Route path="/login" element={<Login/>}/>
            {/* <Route path="/shipment" element={<PrivateRoute><Shipment/></PrivateRoute>}/>  */}
            <Route element={<PrivateRoute/>}>
                <Route path='/shipment' element={<Shipment/>}/>
            </Route>
            <Route exact path='/*' element={<NoteFound/>}/>
            <Route path='/dp/:productKey' element={<ProductDetails/>}/>
            <Route path='/cart' element={<Cart/>}/> 

          </Routes>
        </BrowserRouter>
        <Footer/>
        
        </UserContext.Provider>
      </>
    )
  }

export default App;
