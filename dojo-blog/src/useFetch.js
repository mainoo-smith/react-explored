import { useState, useEffect } from "react";

const useFetch = (url) => {

const [data, setData] = useState(null);
const [isPending, setIsPending] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    const abortControl = new AbortController();

    fetch(url, {signal: abortControl.signal})
    .then(response => {
        if(!response.ok){
            throw Error("resource not found");
        }
        return response.json();
    })
    .then(data => {
        setData(data);
        setIsPending(false);
        setError(null);
    })
    .catch(err => {
        if (err.name === "AbortError"){
            console.log("fetch aborted");
        }else {
            setIsPending(false);
            setError(err.message);
        }
        
    });
return () => abortControl.abort();

}, [url]);

return {data, isPending, error}
}

export default useFetch;

