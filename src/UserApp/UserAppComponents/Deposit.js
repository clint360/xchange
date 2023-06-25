import React,{ useContext, useRef, useState, useEffect } from 'react'
import Select from 'react-select';
import logo from '../../Assets/logo192.svg'
import { MainContext } from "../../Hooks/Context";
import './Deposit.css'

function Deposit({ closer, currency, depositer, depositStatus, maxbalance }) {
    const { myCurrencies, setMyCurrencies, setAChange } = useContext(MainContext);
    const [ selectedOption, setSelectedOption ] = useState('');
    const inputRef = useRef(null);
    const [options, setOptions] = useState([]);
    useEffect(() => {
        for (let i = 0; i < myCurrencies.length; i++) {
          options[i] = { value: myCurrencies[i].name, label: myCurrencies[i].name }
          }
        setOptions(options);
        console.log(options)
      }, [myCurrencies])

      const set = (selected) => {
        setSelectedOption(selected.value)
      }

      const done = () => {
        for (let i = 0; i < myCurrencies.length; i++) {
         if (selectedOption === myCurrencies[i].name) {
            myCurrencies[i].balance += parseFloat(inputRef.current.value);
            setMyCurrencies(myCurrencies);
            console.log(myCurrencies);
            setAChange('changed')
         }
        } 
      }


    return (
        <div className='dwindow' >
          <div className='closebutton' onClick={() => { closer() }}><i class="fa-solid fa-x"></i></div>
          <div className='logosectiona'>
            <img draggable='false' src={logo} alt='' />
          </div>
          <div className='conversions'>
            <span>DEPOSIT </span>
            <input type='number' ref={inputRef} max={maxbalance} required/>{currency}
            <br />
            <div className='m-2'>
              <span>Into</span>
              <Select 
                defaultValue={options[0]}
                options={options}
                onChange={set}
                />
                <br />
              <button className='confirm' onClick={done}>DONE</button> {depositStatus}
            </div>
          </div>
        </div>
      )
}

export default Deposit
