import React from 'react'
import './Common.css';
const FilterButton = ({option,handleValue,selectedValue}) => {
    // console.log(option);
    // console.log(props);
    // console.log(selectedCategory);
    return (
        <div className='filter-button'>
            {option.map(({label,id,value})=>(
                <button key={id} onClick={()=>handleValue(value)} className={(value == selectedValue?'tag-btn btn-active':'tag-btn')}>{label}</button>
            ))}
        </div>
    )
}

export default FilterButton