import { createContext} from 'react'
import { useState,useEffect } from 'react';

export const ModelPredictionContext = createContext()

export const ModelPredictionContextProvider = ({ children }) => {

    const [predictUpdates, setPredictUpdates] = useLocalStorage("preUpdates",[]);
    const [headers, setHeaders] = useLocalStorage("preheader",[]);
    const [rows, setRows] = useLocalStorage("prerow",[]);
    const [preResultText, setPreResultText] = useLocalStorage("preResult","");
    const [loading, setLoading] = useLocalStorage("preloading",true);
    const [chartData, setChartData] = useLocalStorage("prechart",null);
    const [Error,setError]=useLocalStorage("preError",false);
    
    const context={predictUpdates, setPredictUpdates, headers, setHeaders,rows, setRows,
      preResultText, setPreResultText,chartData, setChartData, loading, setLoading, Error,setError }

    return (
      <ModelPredictionContext.Provider value={context}>
        {children}
      </ModelPredictionContext.Provider>
    )
  }

function useLocalStorage(key,initvalue=null){
    const [value,setValue]=useState(()=>{
      try{
        const data=window.localStorage.getItem(key);
        return data ? JSON.parse(data) : initvalue;
      }catch{
        return initvalue;
      }
    })
    useEffect(()=>{
      window.localStorage.setItem(key,JSON.stringify(value))
    },[value,setValue])
    return [value,setValue]
}