import { useEffect, useState } from "react";

function useFetchData(url, dependency){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await fetch(url);
                const result = await response.json();
                if(!response.ok){
                    setError(result.error);
                }
                setData(result);
                
            }
            catch(err){
                setError(err);
            }
            finally{
                setLoading(false);
            }
        };
        fetchData();
    }, [url, dependency]);
    return {data, loading, error};
}

export default useFetchData;