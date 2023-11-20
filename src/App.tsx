import { useEffect, useState } from 'react';
import './App.css'
import { CurrencyConversionResponse, CurrencyResponse } from './types/currency';
import { CurrencySelector } from './component/CurrencySelector';
import { CircularProgress } from '@mui/material';
import { apikey } from './apikey';

function App() {
  const [baseCurrency, setBaseCurrency] = useState('USD')
  const [amount, setAmount] = useState(1)
  const [targetCurrency, setTargetCurrency] = useState('GBP')
  const [currencies, setCurrencies] = useState<string[]>([])
  const [isLoading, setLoading] = useState(false)
  const [conversionRate, setConversionRate] = useState<number | undefined>()
  const [conversionResult, setConversionResult] = useState<number | undefined>()


  const getExchangeRate = async () => {
    try {
      setLoading(true)
      setTimeout(async () => {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apikey}/pair/${baseCurrency}/${targetCurrency}/${amount}`)
        const data: CurrencyConversionResponse = await response.json();

        setConversionRate(data.conversion_rate)
        setConversionResult(data.conversion_result)

        setLoading(false)
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoading(false)
    }

  }
  const fetchCurrencies = async () => {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${apikey}/latest/USD`)
      const data: CurrencyResponse = await response.json();
      const currencies = Object.keys(data.conversion_rates)
      setCurrencies(currencies)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    fetchCurrencies()

  }, [])
  return (
    <div className="App">

      <div className="currency-card">
        <form onSubmit={(e) => {
          e.preventDefault()

          getExchangeRate()
        }}>
          <div className="inputs">
            <div className="input">
              Amount
              <input type="number" placeholder='Amount' value={amount}
                onChange={(e) => {
                  setAmount(parseInt(e.target.value))
                  setLoading(true)
                }}
              />
            </div>

            <div className="input">
              From
              <CurrencySelector currency={baseCurrency}
                currencies={currencies} onChange={(e) => setBaseCurrency(e)
                } />
            </div>

            <div className="input">
              To
              <CurrencySelector currency={targetCurrency}
                currencies={currencies} onChange={(e) => setTargetCurrency(e)
                } />

            </div>
          </div>

          {isLoading ? <div className="loader"><CircularProgress /></div> : <div className="results">
            <div>Conversion rate: <strong>{conversionRate}</strong></div>
            <div>{amount} <strong>{baseCurrency}</strong> = {conversionResult} <strong>{targetCurrency}</strong></div>
          </div>}
          <div className="button">

            <button>Convert</button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default App
