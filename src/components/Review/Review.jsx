import { useEffect, useState } from 'react';
import './Review.css';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImg from '../../images/giphy.gif';
import { useNavigate } from 'react-router-dom';
const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderdPlaced] = useState(false);
    const navigate = useNavigate();
    const handleProceedCheckout = () =>{
        navigate('/shipment');
        // setCart([]);
        // setOrderdPlaced(true);
        // processOrder();
    }
    const removeProductHandle = (productKey) => {
            const newCart = cart.filter(pd => pd.key !== productKey);
            setCart(newCart);
            removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, []);
    let thankyou;
     if (orderPlaced){
     thankyou = <img src={happyImg} alt="" />}
    return (
        <div className="review">
            <div className='product-container'>
            
            {
                cart.map((pd, index) => <ReviewItem product={pd} removeProductHandle={removeProductHandle} key={index}></ReviewItem>)
            }
            { thankyou }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className='cart-button'>Proceed Checkout</button>
                </Cart>
            </div>
            
        </div>
    );
};

export default Review;