import React, { useState } from 'react'
import './Style.css'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
const SearchBar = ({ value, changeInput }) => {

  const [lgShow, setLgShow] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  let countCart = cartItems.length;

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
              Large Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="table-responsive">
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
                      <td>{cItem.price}</td>
                      <td>{cItem.cartQuantity}</td>
                      <td>remove</td>
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
            </div>
          </Modal.Body>
        </Modal>
        {/* cart modal start */}

      </div>
    </div>
  )
}

export default SearchBar