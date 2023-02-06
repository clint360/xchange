import React, { useContext, useState, useEffect, useRef } from 'react';
import './Coverter.css';
import logo from '../Assets/image.svg';
import { MainContext } from '../Hooks/Context';
import Select from 'react-select';

function Converter({ closer, currency, converter, convertStatus, maxbalance }) {
  const { convertTo, setConvertTo, myCurrencies, amount, setAmount } = useContext(MainContext);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const inputRef = useRef(null);


  useEffect(() => {
    for (let i = 0; i < myCurrencies.length; i++) {
      options[i] = { value: myCurrencies[i].name, label: myCurrencies[i].name }
      }
    setOptions(options);
    console.log(options)
  }, [myCurrencies])

  const setToConvertCurrency = (selectedOption) => {
    let convertTo = {name: selectedOption.value, amount: amount };
    setConvertTo(convertTo)
  }

  const handleInputChange = () => {
    setAmount(inputRef.current.value);
  }

  return (
    <div className='converterwindow'>
      <div className='closebutton' onClick={() => { closer() }}><i class="fa-solid fa-x"></i></div>
      <div className='logosection'>
        <img src={logo} alt='' />
      </div>
      <div className='conversions'>
        <span>Convert </span>
        <input type='number' ref={inputRef} onChange={handleInputChange} max={maxbalance}/>{currency}
        <br />
        <div className='m-2'>
          <span>To</span>
          <Select 
            defaultValue={selectedOption}
            options={options}
            onChange={setToConvertCurrency}
            />
            <br />
          <button className='confirm' onClick={()=>{converter(); inputRef.current.value = ''; setSelectedOption(null) }}>CONFIRM</button> {convertStatus}
        </div>
      </div>
    </div>
  )
}

export default Converter
