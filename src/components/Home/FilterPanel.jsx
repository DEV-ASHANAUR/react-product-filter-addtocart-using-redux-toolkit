import React from 'react'
import CheckboxArea from '../common/CheckboxArea';
import FilterButton from '../common/FilterButton'
import PriceSlider from './../common/PriceSlider';
import {categoryList,ratingList} from '../../constants/index';

const FilterPanel = ({handleCategory,selectedCategory,handleRating,selectedRating,selectedPrice,changePrice,cuisines,handleCheck,reset}) => {

  return (
    <div>
      <div className='filter-heading'>
        <h4 className='filter-title'>Filter</h4>
        <h4 className='reset' onClick={reset}>Reset All</h4>
      </div>
      
      <div className='category-button'>
        <p className='filter-wise-title'>Category</p>
        <FilterButton option={categoryList} handleValue={handleCategory} selectedValue={selectedCategory} />
      </div>

      <div className='check-box-area'>
        <p className='filter-wise-title'>cuisines</p>

        {
          cuisines.map((item,index)=>(
            <CheckboxArea key={index} cuisine={item} handleCheck={handleCheck} />
          ))
        }
        
      </div>

      <div>
        <p className='filter-wise-title' style={{textAlign:'center'}}>Price Range</p>
        <PriceSlider value={selectedPrice} changePrice={changePrice} />
      </div>

      <div className='category-button'>
        <p className='filter-wise-title'>Rating</p>

        <FilterButton option={ratingList} handleValue={handleRating} selectedValue={selectedRating} />

      </div>

    </div>
  )
}

export default FilterPanel