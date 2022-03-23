import React, { useState,useEffect } from 'react'
import './Style.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Modal,Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import BackspaceRoundedIcon from '@mui/icons-material/BackspaceRounded';
import {addToCart,removeCartItem,getTotals,dereaseCart,clearCart} from '../../store/Feature/Cart/CartSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
const SearchBar = ({ value, changeInput }) => {
  const dispatch = useDispatch();
  const [lgShow, setLgShow] = useState(false);
  const { cartItems,cartTotalQuantity,cartTotalAmount } = useSelector((state) => state.cart);
  let countCart = cartItems.length;

  useEffect(()=>{
    dispatch(getTotals());
  },[dispatch,cartItems]);

  return (
    <div className='search-container'>
      <div className="search-icon">
        <SearchIcon />
      </div>
      <div className="search-input">
        <input type="text" placeholder='wharf seafood' value={value} onChange={changeInput} />
      </div>

      <div>
        <span style={{ cursor: 'pointer' }} onClick={() => setLgShow(true)}><ShoppingCartOutlinedIcon /><sup><b>{countCart}</b></sup></span>

        {/* cart modal start */}
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              <div className='cart-head'>
                <h6>Cart Item</h6>
                <div>
                  <span onClick={()=>dispatch(clearCart())} className='remove-all'>Remove All</span>
                </div>
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="table-responsive">
              <table className='table text-center'>
              <thead>
                <tr>
                  <th>Thumbnail</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  cartItems.length > 0 ?
                  cartItems.map((cItem,index)=>(
                    <tr key={index}>
                      <td><img className='img-fluid img-thumbnail' src={cItem.coverSrc} style={{width:'60px',height:'60px'}} alt=".." /></td>
                      <td>{cItem.title}</td>
                      <td>${cItem.price*cItem.cartQuantity}</td>
                      <td>
                        <div className='quantityUpdateBtn'>
                          <button onClick={()=>dispatch(dereaseCart(cItem))} className='decrement'><RemoveIcon /></button>
                          <span>{cItem.cartQuantity}</span>
                          <button onClick={()=>dispatch(addToCart(cItem))} className='increment'><AddIcon /></button>
                        </div>
                      </td>
                      <td style={{color:'red',cursor: 'pointer'}}><BackspaceRoundedIcon onClick={()=>dispatch(removeCartItem(cItem))} /></td>
                    </tr>
                  ))
                  :(
                    <tr>
                      <td colSpan="5">Your Cart is Empty!</td>
                    </tr>
                  )
                }
            
              </tbody>
              </table>
              <div className='d-flex justify-content-between align-items-center py-3'>
                <div>
                  <Button variant="success" onClick={() => setLgShow(false)}>continue shopping</Button>
                </div>
                <div>
                  <h6 className='pb-3'>Cart SubTotal : ${cartTotalAmount}</h6>
                  <Button variant="warning">Checkout</Button>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        {/* cart modal start */}

      </div>
    </div>
  )
}

export default SearchBar