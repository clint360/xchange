import './App.css';
import { useEffect, useState } from 'react'
import LandingPage from './Landing/LandingPage';
import MainPage from './UserApp/MainPage';
import { Provider } from './Hooks/Context';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from 'axios';
import logo from './Assets/logo192.svg'

const bgColor = ['#000040', '#152850']



function App() {
  const  [ username, setUserName ] = useState("John Doe");
  const [ currentCurrency, setCurrentCurrency] = useState({});
  const [convertTo, setConvertTo] = useState({});
  const [amount, setAmount] = useState(0);
  const [ apiResponse, setApiResponse ] = useState({});
  const [ allCurrencies, setAllCurrencies ] = useState([])
  const [ myCurrencies, setMyCurrencies ] = useState([ {name: "USD", logo: 'https://www.freevector.com/uploads/vector/preview/6105/FreeVector-Dollar-Sign.jpg', sign: 'USD', balance: 0, background: bgColor[1], value: 1}]);
  const [ aChange, setAChange ] = useState('');
  const options = {
    method: 'GET',
    url: 'https://api.fastforex.io/fetch-all',
    params: {from: 'USD', api_key: '84931f9e1a-6da017d925-ry1gve'},
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

      index = index + 1; 
      arr.push({ name: key, logo: 'https://www.clipartmax.com/png/middle/5-57512_money-bag-blue-black-and-white-money-clipart.png', sign: key, balance: 0, background: bgColor[index%bgColor.length], index, value: (1/apiResponse[key])})
    } 
    } 
    setAllCurrencies(arr)


  }, [apiResponse])

  
  useEffect(()=> {

  },[])

  return (
    <Provider value={{username, aChange, setAChange , amount, setAmount, setUserName, myCurrencies, setMyCurrencies, currentCurrency, setCurrentCurrency, convertTo, setConvertTo, allCurrencies}}>
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<LandingPage />}/>
     <Route path='/app' element={<MainPage />}  />
    </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
