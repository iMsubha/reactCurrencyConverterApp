import React from 'react'

export default function ConverterRow(props) {
    const{
        currencyOptions,
        selectedCurrency,
        onChangeHandle,
        onChangeAmount,
        amount
    } = props
    return (
        <div>
            <input type="number" className="input" placeholder="Enter Your Currency" value={amount} onChange={onChangeAmount}/> 
            <select value={selectedCurrency} onChange={onChangeHandle}>
                {currencyOptions.map(option => (
                <option key={option} value={option}>${option}</option>
                ))}
            </select>
        </div>
    )
}
