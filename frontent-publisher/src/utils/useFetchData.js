import { useEffect, useState } from "react";

export function useFetchData(url,authorized, dependency){
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchData =async ()=>{
            try{
            const headers = {
                'Content-Type':'application/json',
            };
            const token = localStorage.getItem('authorToken');
            if(token && authorized){
                headers['Authorization']=`Bearer ${token}`;
            }
            const response = await fetch(url,
                {
                    method:'GET',
                    headers:headers,
                    mode:'cors',
                }
            );

            if(!response.ok){
                throw new Error('Error while fetching data');
            }
            const res = await response.json();
            setData(res);
        }catch(err){
            setError(err);
        }
        setLoading(false);
        };
        fetchData();
        },
        [url,dependency]
    );

    return {loading, data, error};
}

