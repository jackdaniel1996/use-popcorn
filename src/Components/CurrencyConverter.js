// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function CurrencyConverter() {
    const [amount, setAmount] = useState(0);
    const [from, setFrom] = useState("EUR");
    const [to, setTo] = useState("USD");
    const [convertedCur, setConvertedCur] = useState(0);
    const [isLoading, setIsloading] = useState(false);

    useEffect(
        function () {
            async function convertCurrency() {
                setIsloading(true);
                const res = await fetch(
                    `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
                );
                const data = await res.json();
                setConvertedCur(data.rates[to]);
                setIsloading(false);
            }
            if (from === to) return setConvertedCur(amount);
            convertCurrency();
        },
        [amount, from, to]
    );

    return (
        <div>
            <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                disabled={isLoading}
            />
            <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                disabled={isLoading}
            >
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <span>to</span>
            <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                disabled={isLoading}
            >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <p>
                {convertedCur} {to}
            </p>
        </div>
    );
}
