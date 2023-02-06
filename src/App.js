import './App.css';
import { useEffect, useState } from 'react'
import LandingPage from './Landing/LandingPage';
import MainPage from './UserApp/MainPage';
import { Provider } from './Hooks/Context';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from 'axios';
import logo from './Assets/logo192.svg'

const bgColor = ['#000040', '#152850', '#4358a2']



function App() {
  const  [ username, setUserName ] = useState("John Doe");
  const [ currentCurrency, setCurrentCurrency] = useState({});
  const [convertTo, setConvertTo] = useState({});
  const [amount, setAmount] = useState(0);
  const [ apiResponse, setApiResponse ] = useState({});
  const [ allCurrencies, setAllCurrencies ] = useState([])
  const [ dfrates, setDfRates ] = useState({})
  const options = {
    method: 'GET',
    url: 'https://api.fastforex.io/fetch-all',
    params: {from: 'XAF', api_key: 'beba455542-930bf2c945-rpl55n'},
    headers: {accept: 'application/json'}
  };
  
  useEffect(()=>{
  axios
  .request(options)
  .then(function (response) {
 setApiResponse(response.data.results)})
},[])

  useEffect(()=>{
    let index = 0;
    let arr = [];
    for (const key in apiResponse)  { 
      if (apiResponse.hasOwnProperty(key)) {
      console.log(`${index} - ${key}: ${(1/apiResponse[key])}`)
      index = index + 1; 
      arr.push({name: key, logo: logo, sign: key, balance: 0, background: bgColor[index%bgColor.length], index, value: (1/apiResponse[key])})
    } 
    } 
    setAllCurrencies(arr)
    console.log(allCurrencies) 

  },[apiResponse])

  const [ myCurrencies, setMyCurrencies ] = useState([{name: "XAF", logo: 'https://thumbs.dreamstime.com/b/cfa-franc-bceao-cfp-icon-beautiful-meticulously-designed-198352130.jpg', sign: 'XAF', balance: 10000, background: bgColor[2], value: 1},
  {name: "USD", logo: 'https://www.freevector.com/uploads/vector/preview/6105/FreeVector-Dollar-Sign.jpg', sign: 'USD', balance: 100, background: bgColor[1], value: 602.10},
  {name: "EUR", logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Euro_symbol.svg/584px-Euro_symbol.svg.png', sign: 'EUR', balance: 500, background: bgColor[0], value: 657.61}]);
 

  return (
    <Provider value={{username, amount, setAmount, setUserName, myCurrencies, setMyCurrencies, currentCurrency, setCurrentCurrency, convertTo, setConvertTo, allCurrencies}}>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<LandingPage />}/>
     <Route path='/app' element={<MainPage />} />
    </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
