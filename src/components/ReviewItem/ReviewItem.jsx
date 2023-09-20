import './ReviewItem.css';
const ReviewItem = (props) => {
    const { name, quantity, img, key , price} = props.product;
    return (
        <div className="review-item">
            <div>
                <img src={img} alt="" />
            </div>
            <div className='product-name'>
                <h4>{name}</h4>
                <p>Quantity: {quantity}</p>
                <p><small>${price}</small></p>
                <br />
                <button className="cart-button" 
                onClick={()=>props.removeProductHandle(key)}
                >Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;