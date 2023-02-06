import React, { useState, useContext, useEffect } from "react";
import { AnimatedOnScroll } from "react-animated-css-onscroll";
import "./MainPage.css";
import CurrencyCard from "./UserAppComponents/CurrencyCard";
import UserNav from "./UserAppComponents/UserNav";
import Footer from "../Components/Footer";
import { MainContext } from "../Hooks/Context";
import Converter from "../Components/Converter";
import Select from "react-select";

function MainPage() {
  const {
    setConvertTo,
    convertTo,
    username,
    myCurrencies,
    setMyCurrencies,
    currentCurrency,
    setCurrentCurrency,
    allCurrencies,
  } = useContext(MainContext);
  const [selectedCurrency] = useState("");
  const [userWalletData, setUserWalletData] = useState(myCurrencies);
  const [options, setOptions] = useState([]);
  const [convertStatus, setConvertStatus] = useState("");
  const [displayCurrency, setDisplayCurrency] = useState("XAF");
  const [totalBalance, setTotalBalance] = useState(0);
  const [baseValue, setBaseValue] = useState(0);


  useEffect(() => {
    setUserWalletData(myCurrencies)
    console.log(allCurrencies);
    for (let i = 0; i < allCurrencies.length; i++) {
      options.push({
        value: allCurrencies[i].name,
        label: allCurrencies[i].name,
      });
    }
    setOptions(options);
    console.log(options);
  }, [allCurrencies]);

 
  useEffect(()=>{
    for (let i = 0; i < userWalletData.length; i++) {
        setTotalBalance(
          (prevbalance) =>
            prevbalance + userWalletData[i].balance * userWalletData[i].value
        );
      }
      for (let i = 0; i < allCurrencies.length; i++) {
        if (displayCurrency === allCurrencies[i].name) {
          setTotalBalance((prevbalance) => prevbalance / allCurrencies[i].value);
        }
      }
  },[])

  useEffect(() => {
    setUserWalletData(userWalletData);
  }, [myCurrencies, userWalletData]);

  const convert = () => {
    for (let i = 0; i < myCurrencies.length; i++) {
      if (convertTo.name === myCurrencies[i].name) {
        if (convertTo.amount > currentCurrency.balance) {
          setConvertStatus("❌Insufficient Funds");
        } else {
          currentCurrency.balance -= convertTo.amount;
          const base = convertTo.amount * currentCurrency.value;
          myCurrencies[i].balance =
            myCurrencies[i].balance + base / myCurrencies[i].value;
          setMyCurrencies(myCurrencies);
          setUserWalletData(myCurrencies);
          setConvertStatus("✅Success");
        }
      }
    }
  };

  const [openConverter, setOpenConverter] = useState("none");

  const closerFunction = () => {
    setOpenConverter("none");
    setConvertStatus("");
    setConvertTo(null);
  };

  const conv = {
    display: openConverter,
  };

  const openConverterWindow = () => {
    setOpenConverter("initial");
  };

  const addToMyCurrencies = (selectedOption) => {
    let newCurrency = {};
    const a = [];
    for (let i = 0; i < myCurrencies.length; i++) {
      if (selectedOption.value === myCurrencies[i].name) {
        a.push("present");
      }
    }
    console.log(a);
    if (a[0] !== "present") {
      for (let i = 0; i < allCurrencies.length; i++) {
        if (selectedOption.value === allCurrencies[i].name) {
          newCurrency = allCurrencies[i];
        }
      }
      setMyCurrencies((prev) => [...prev, newCurrency]);
      setUserWalletData(myCurrencies);
      console.log(myCurrencies);
    }
  };

  const currentCurrencyUpdate = (index) => {
    setCurrentCurrency(userWalletData[index]);
  };

  const changeDisplayCurrency = (displayOption) => {
    //first, Convert cseturrency to base value;
    console.log(displayCurrency);
    for (let i = 0; i < allCurrencies.length; i++) {
      if (displayCurrency === allCurrencies[i].name) {
        setBaseValue(totalBalance * allCurrencies[i].value);
        console.log(baseValue);
      }

      if (displayOption.value === allCurrencies[i].name) {
        setTotalBalance(baseValue / allCurrencies[i].value);
        setDisplayCurrency(allCurrencies[i].name);
      }
    }
  };

  return (
    <>
      <div className='converterwrapper' style={conv}>
        <Converter
          closer={() => {
            closerFunction();
          }}
          currency={currentCurrency.name}
          maxbalance={currentCurrency.balance}
          myCurrencies={myCurrencies}
          converter={convert}
          convertStatus={convertStatus}
        />
      </div>
      <div id='mainmain'>
        <div id='main'>
          <div className='nav'>
            <UserNav username={username} />
          </div>
          <div className='apparea'>
            <div className='topsection' id='home'>
              <AnimatedOnScroll
                animationIn='bounceIn'
                animationOut='slideInLeft'
              >
                {" "}
                <h1 className='totalbalance'>
                  TOTAL BALANCE:{" "}
                  {totalBalance.toLocaleString(undefined, {
                    maximumFractionDigits: 3,
                  })}{" "}
                  {displayCurrency}
                </h1>
              </AnimatedOnScroll>
              <div className='displayin'>
                <span>Display in:</span>
                <Select
                  options={options}
                  onChange={changeDisplayCurrency}
                  defaultValue={displayCurrency}
                />
              </div>
              <button className='deposit-button'>DEPOSIT</button>
            </div>
            <section id='walletsection'>
              <h1 className='header'>MY CURRENCIES</h1>
              <br />
              <div className='wallets'>
                {userWalletData.map((item, index) => {
                  return (
                    <>
                      <CurrencyCard
                        name={item.name}
                        background={item.background}
                        logo={item.logo}
                        sign={item.sign}
                        balance={item.balance}
                        onClick={() => {
                          openConverterWindow();
                          currentCurrencyUpdate(index);
                          console.log(currentCurrency);
                        }}
                        index={index}
                      />
                    </>
                  );
                })}
              </div>
              <section className='addcurrenciessection'>
                <span className='addc'>NEXT CURRENCY</span>
                <div>
                  <Select
                    defaultValue={selectedCurrency}
                    options={options}
                    onChange={addToMyCurrencies}
                  />
                </div>
              </section>
            </section>
          </div>
          <section id='market'>
            <AnimatedOnScroll
              animationIn='slideInRight'
              animationOut='slideInLeft'
            >
              {" "}
              <h1>TOP CURRENCIES IN THE MARKET</h1>
            </AnimatedOnScroll>
            <AnimatedOnScroll
              animationIn='bounceInLeft'
              animationOut='bounceInRight'
            >
              <div className='statsimage'>
                <img alt = "" src='https://a.c-dn.net/c/content/dam/publicsites/igcom/uk/images/content-2-chart-images/most_trader_currencies%20002%20002%20(002).png' />
              </div>
            </AnimatedOnScroll>
          </section>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default MainPage;
