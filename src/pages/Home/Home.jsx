import React, { useEffect, useState } from 'react'
import './Home.css'
import FilterPanel from '../../components/Home/FilterPanel';
import ProductList from '../../components/Home/ProductList';
import SearchBar from './../../components/Home/SearchBar';
import { dataList } from '../../constants/index';
import EmptyView from './../../components/common/EmptyView';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const [product, setProduct] = useState(dataList);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState([1000, 5000]);
  const [searchInput, setSearchInput] = useState('');
  const [cuisines, setCuisines] = useState([
    { id: 1, checked: false, label: 'American' },
    { id: 2, checked: false, label: 'Chinese' },
    { id: 3, checked: false, label: 'Italian' },
  ]);
  const [notFound, setNotFound] = useState(false);
  // console.log(selectedRating);
  // console.log(notFound)
  //set category
  const handleCategory = (value) => {
    setSelectedCategory(value);
  }
  //handleCheck
  const handleCheck = (id) => {
    let changeCuisines = cuisines;
    let updateCuisines = changeCuisines.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setCuisines(updateCuisines);
  }
  //set rating
  const handleRating = (value) => {
    setSelectedRating(value);
  }
  //price handle
  const handleChangePrice = (event, value) => {
    setSelectedPrice(value);
  }
  //reset filter
  const reset = () => {
    setSelectedCategory(null);
    setSelectedRating(null);
    setSelectedPrice([1000, 5000]);
    setCuisines([
      { id: 1, checked: false, label: 'American' },
      { id: 2, checked: false, label: 'Chinese' },
      { id: 3, checked: false, label: 'Italian' },
    ])
  }
  //apply filter
  const applyFilters = () => {
    let updateDataList = dataList;
    //filter by category
    if (selectedCategory) {
      updateDataList = updateDataList.filter((item) => item.category === selectedCategory);
    }

    //checkcuisines
    let checkedCuisines = cuisines.filter((item) => item.checked).map((item) => item.label.toLowerCase());

    if (checkedCuisines.length) {
      updateDataList = updateDataList.filter((item) => (checkedCuisines.includes(item.cuisine)));
    }

    //filter by rating
    if (selectedRating) {
      updateDataList = updateDataList.filter((item) => parseInt(item.rating) === parseInt(selectedRating));
    }

    //filter by price
    const minPrice = selectedPrice[0];
    const maxPrice = selectedPrice[1];
    updateDataList = updateDataList.filter((item) => item.price >= minPrice && item.price <= maxPrice);

    //filter by search
    if (searchInput) {
      updateDataList = updateDataList.filter((item) => item.title.toLowerCase().search(searchInput.toLowerCase().trim()) !== -1);
    }

    //set update product
    setProduct(updateDataList);
    !updateDataList.length ? setNotFound(true) : setNotFound(false);
  }

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedRating, selectedPrice, cuisines, searchInput]);

  return (
    <div className='home-container'>
      <SearchBar value={searchInput} changeInput={(e) => setSearchInput(e.target.value)} />
      <div className='home-wrapper'>
        <div className="sidebar">
          <FilterPanel selectedCategory={selectedCategory} handleCategory={handleCategory} handleRating={handleRating} selectedRating={selectedRating} changePrice={handleChangePrice} selectedPrice={selectedPrice} cuisines={cuisines} handleCheck={handleCheck} reset={reset} />
        </div>
        <div className="product">
          <ProductList list={product} />
          {
            notFound ? <EmptyView /> : <ProductList list={product} />
          }
          <ToastContainer />
        </div>
      </div>
    </div>
  )
}

export default Home