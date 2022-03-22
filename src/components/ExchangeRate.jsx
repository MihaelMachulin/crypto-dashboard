const ExchangeRate = ({exchangeData}) => {
    const {exchangeRate, primaryCurrency, secondaryCurrency} = exchangeData
    return (
        <div className="exchange-rate">
            <h3>Exchange Rate:</h3>
            <h1>{exchangeRate}</h1>
            <p>{primaryCurrency} to {secondaryCurrency}</p>
        </div>
    )
}

export default ExchangeRate