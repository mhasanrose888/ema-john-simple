import logo from '../../images/logo.png'
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from 'react';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../App';

const Header = () => {
    const [cart, setCart] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, [])

    return (
        <div className='header'>
            <img src={logo} alt="" />
            <nav>
                
                <NavLink className='home' to="/">Home</NavLink>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/review">Order Review</NavLink>
                <NavLink to="/inventory">Manage Inventory</NavLink>
                <NavLink className='cart-logo' to="/review"><FontAwesomeIcon icon={faCartShopping} />{cart.length}</NavLink>
                <input className='search' placeholder='Search' />
                <NavLink to="/search"><button className='search-btn'><FontAwesomeIcon icon={faMagnifyingGlass} /></button></NavLink>
                <NavLink to="/login"><button className='login-btn'>Login</button></NavLink>
                
            </nav>
            
        </div>

    );
};

export default Header;