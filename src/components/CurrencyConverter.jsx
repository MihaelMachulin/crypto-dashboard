import { useState } from 'react'
import axios from "axios";
import ExchangeRate from "./ExchangeRate";

const CurrencyConverter = () => {
    const currencies = ['BTC', 'ETH', 'USD', 'HRP', 'LTC', 'ADA']
    const [chosenPrimaryCurrency, SetChosenPrimaryCurrency] = useState('BTC')
    const [chosenSecondaryCurrency, SetChosenSecondaryCurrency] = useState('BTC')
    const [amount, setAmount] = useState(1)
    const [exchangeData, setExchangeData] = useState({
        primaryCurrency: 'BTC',
        secondaryCurrency: 'BTC',
        exchangeRate: 0
    })
    const [result, setResult] = useState(0)

    const convert = () => {
        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {from_currency: chosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency},
            headers: {
                'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com',
                'X-RapidAPI-Key': import.meta.env.VITE_APP_RAPID_API_KEY
            }
        };

        axios.request(options).then(response => {
            setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)
            setExchangeData({
                primaryCurrency: chosenPrimaryCurrency,
                secondaryCurrency: chosenSecondaryCurrency,
                exchangeRate: response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']
            })
        }).catch(error => {
            console.error(error);
        });
    }

    return (<div className="currency-converter">
            <h2>CurrencyConverter</h2>

            <div className="input-box">
                <table>
                    <tbody>
                    <tr>
                        <td>Primary Currency:</td>
                        <td>
                            <input
                                type="number"
                                name="currency-amount-1"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                            />
                        </td>
                        <td>
                            <select
                                value={chosenPrimaryCurrency}
                                name="currencu-option-1"
                                className="currency-options"
                                onChange={e => SetChosenPrimaryCurrency(e.target.value)}
                            >
                                {currencies.map((currency, _index) =>
                                    (<option key={_index}>{currency}</option>))}
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <td>Secondary Currency:</td>
                        <td>
                            <input
                                value={result}
                                type="number"
                                name="currency-amount-2"
                                disabled={true}

                            />
                        </td>
                        <td>
                            <select
                                value={chosenSecondaryCurrency}
                                name="currency-option-2"
                                className="currency-options"
                                onChange={e => SetChosenSecondaryCurrency(e.target.value)}
                            >
                                {currencies.map((currency, _index) =>
                                    (<option key={_index}>{currency}</option>))}
                            </select>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <button id="convert-button" onClick={convert}>Convert</button>


            </div>
            <ExchangeRate exchangeData={exchangeData} />
        </div>)
}

export default CurrencyConverter