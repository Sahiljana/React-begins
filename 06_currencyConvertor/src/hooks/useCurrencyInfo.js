// creating a custom hook

// custom hooks bhi dusre hooks jo already  h unhe use kar sakti h

import { useState, useEffect } from 'react';

function useCurrencyInfo(currency){

    const [data, setData] = useState({});
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
        .then((res) => res.json())
        .then((res) => setData(res[currency]))
    },[currency]);

    return data;
}

export default useCurrencyInfo;