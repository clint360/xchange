import React, { useState, useContext, useEffect } from "react";
import { AnimatedOnScroll } from "react-animated-css-onscroll";
import "./MainPage.css";
import CurrencyCard from "./UserAppComponents/CurrencyCard";
import UserNav from "./UserAppComponents/UserNav";
import Footer from "../Components/Footer";
import { MainContext } from "../Hooks/Context";
import Converter from "../Components/Converter";
import Select from "react-select";
import Deposit from "./UserAppComponents/Deposit";

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
    aChange,
    setAChange
  } = useContext(MainContext);
  const [selectedCurrency] = useState("");
  const [userWalletData, setUserWalletData] = useState(myCurrencies);
  const [options, setOptions] = useState([]);
  const [convertStatus, setConvertStatus] = useState("");
  const [displayCurrency, setDisplayCurrency] = useState("USD");
  const [totalBalance, setTotalBalance] = useState(0);
  const [baseValue, setBaseValue] = useState(0);


  useEffect(() => {
    setUserWalletData(myCurrencies)
    for (let i = 0; i < allCurrencies.length; i++) {
      options.push({
        value: allCurrencies[i].name,
        label: allCurrencies[i].name,
      });
    }
    setOptions(options);
  }, [allCurrencies]);


  useEffect(() => {
    setTotalBalance(0);
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
    setAChange('changess');
  }, [myCurrencies, selectedCurrency, displayCurrency, setAChange, aChange, userWalletData, allCurrencies])

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
  const [openDeposit, setOpenDeposit] = useState("none");

  const closerFunction = () => {
    setOpenConverter("none");
    setOpenDeposit("none")
    setConvertStatus("");
    setConvertTo(null);
    setAChange('chansges');
  };

  const conv = {
    display: openConverter,
  };

  const openConverterWindow = () => {
    setOpenConverter("initial");
  };

  const openDepositWindow = () => {
    setOpenDeposit("initial");
  };

  const dep = {
    display: openDeposit,
  };

  const addToMyCurrencies = (selectedOption) => {
    setAChange('changes');
    let newCurrency = {};
    const a = [];
    for (let i = 0; i < myCurrencies.length; i++) {
      if (selectedOption.value === myCurrencies[i].name) {
        a.push("present");
      }
    }
    if (a[0] !== "present") {
      for (let i = 0; i < allCurrencies.length; i++) {
        if (selectedOption.value === allCurrencies[i].name) {
          newCurrency = allCurrencies[i];
          newCurrency.balance = 0;
        }
      }
      setMyCurrencies((prev) => [...prev, newCurrency]);
      setUserWalletData(myCurrencies);

    }
  };

  const currentCurrencyUpdate = (index) => {
    setCurrentCurrency(userWalletData[index]);
    setAChange('changes')
  };

  const changeDisplayCurrency = (displayOption) => {
    //first, Convert cseturrency to base value;
    setAChange('changes')

    for (let i = 0; i < allCurrencies.length; i++) {
      if (displayCurrency === allCurrencies[i].name) {

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
      <div className="depositwrapper" style={dep} >
        <Deposit
          closer={() => {
            closerFunction();
          }} />

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
              <button className='deposit-button' onClick={openDepositWindow}>DEPOSIT</button>
            </div>
            <section id='walletsection'>
              <h1 className='header'>MY CURRENCIES</h1>
              <br />
              <div className='wallets'>
                {
                  myCurrencies.map((item, index) => {
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

                          }}
                          index={index}
                        />
                      </>
                    );
                  })}
              </div>
              <section className='addcurrenciessection'>
                <span className='addc'>ADD CURRENCY</span>
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
                <img alt="" src='https://a.c-dn.net/c/content/dam/publicsites/igcom/uk/images/content-2-chart-images/most_trader_currencies%20002%20002%20(002).png' />
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
