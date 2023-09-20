import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

import './Product.css'

const Product = ({product, handleAddProduct}) => {
    // const {product, handleAddProduct} = props;
    const { name, img, seller, price, stock, key } = product;
    return (
        <div className='product'>
            <div className='image'>
                <img src={img} alt="" />
            </div>
            <div>
                <h4 className='product-name'><Link to={'/dp/'+key}>{name}</Link></h4>
                <div className='price-btn'>
                    <p><small>by: {seller}</small></p>
                    <p><strong>${price}</strong></p>
                    <p><small>Only {stock} left in stock - Order soon</small></p>
                    
                 {/* { props.showAddToCart && <button className='cart-button' onClick={() => handleAddProduct(product)}>
                             <FontAwesomeIcon icon={faCartShopping} />add to cart</button>} */}
                    <button className='cart-button' onClick={() => handleAddProduct(product)}> 
                             <FontAwesomeIcon icon={faCartShopping} />add to cart</button>
                </div>
            </div>

        </div>
    );
};

export default Product;