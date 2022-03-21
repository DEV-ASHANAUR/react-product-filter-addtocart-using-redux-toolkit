import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import { useDispatch } from 'react-redux';
import {addToCart} from '../../store/Feature/Cart/CartSlice';

const ListItem = ({ item }) => {
    const { coverSrc, title, price, deliveryFee, serviceTime, rating } = item;
    //   console.log(item);
    const dispatch = useDispatch();

    return (
        <div className="col">
            <div className="card border-none">
                <div className="img-wrapper">
                    <img src={coverSrc} className="img-fluid" alt="..." />
                </div>
                <div className="card-body">
                    <div className='d-flex align-items-center justify-content-between'>
                        <h5 className="card-title">{title}</h5>
                        <h5 style={{ color: 'goldenrod' }}><StarIcon />{rating}</h5>
                    </div>
                    <div className='d-flex align-items-center justify-content-between'>
                        <p className="card-text"><b>{serviceTime}</b> Delivery Fee:<b>${deliveryFee}</b></p>
                        <h6><b>${price}</b></h6>
                    </div>
                    <button className='order-btn' onClick={()=>dispatch(addToCart(item))}>Order Now</button>
                </div>
            </div>
        </div>
    )
}

export default ListItem