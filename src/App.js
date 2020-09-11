import React from 'react';
import './App.css';
import ConverterRow from './ConverterRow';
import {useEffect, useState} from 'react'
const BASE_URL ='https://api.exchangeratesapi.io/latest'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState() //Eur
  const [toCurrency, setToCurrency] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  const [amountInToCurrency, setAmountInToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  
  let fromAmount, toAmount
  if(amountInFromCurrency){
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  }else{
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    fetch(BASE_URL)
        .then(res => res.json())
        .then(data => {
          const firstCurrency = Object.keys(data.rates)[0]
          setCurrencyOptions([data.base, ...Object.keys(data.rates)]) 
          setFromCurrency(data.base)
          setToCurrency(firstCurrency)
          setExchangeRate(data.rates[firstCurrency])
        })
},[])
  
useEffect(()=>{
  if(fromCurrency != null && toCurrency != null){
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
         .then(res => res.json())
         .then(data => setExchangeRate(data.rates[toCurrency]))
   }
  },[fromCurrency,toCurrency])

   function handleFromAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
   }
   function handleToAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }
  return (
    <>
    <h1>Currency Converter</h1>
    <ConverterRow
      currencyOptions={currencyOptions}
      selectedCurrency={fromCurrency}
      onChangeHandle={e => setFromCurrency(e.target.value)}
      onChangeAmount= {handleFromAmountChange}
      amount ={fromAmount}
    />
    <div className="equals">=</div>
    <ConverterRow
      currencyOptions={currencyOptions}
      selectedCurrency={toCurrency}
      onChangeHandle={e => setToCurrency(e.target.value)}
      onChangeAmount= {handleToAmountChange}
      amount = {toAmount}
    />
    </>
  );
}

export default App;
