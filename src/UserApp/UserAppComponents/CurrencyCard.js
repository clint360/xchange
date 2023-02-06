import React from 'react'
import './CurrencyCard.css'

function CurrencyCard({name, logo, balance, background, sign, onClick}) {
const mainStyle = {
    background: background
} 

  return (
    <>
      <div className='currencycard' style={mainStyle}>
       <div className='currencylogo'>
        <img src={logo} alt='' />
       </div>
       <div className='currencydetails'>
        <h1 className='walletname'>{name}</h1>
        <div className='balance'>BALANCE: {balance.toLocaleString(undefined, {maximumFractionDigits: 3})} {sign}</div>
        <div className='convertbuttondiv'><button className='convertbutton' onClick={()=>onClick()}>CONVERT</button></div>
       </div>
      </div>
    </>
  )
}

export default CurrencyCard
