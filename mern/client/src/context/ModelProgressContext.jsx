import { createContext} from 'react'
import { useState,useEffect } from 'react';
import { useContext } from 'react';

export const ModelProgressContext = createContext()

export const ModelProgressContextProvider = ({ children }) => {
    // Initialize the authentication state with a reducer
    const [trainingUpdates, setTrainingUpdates] = useLocalStorage("trainingUpdate",[]);
    const [chartData, setChartData] = useLocalStorage("chartData",[]);
    const [resultData, setResultData] = useLocalStorage("resultData",[]);
    const [loading, setLoading] = useLocalStorage("loading",true); 
    const [ModelID, setModelID] = useLocalStorage("modelId");
    
    const context={trainingUpdates, setTrainingUpdates, chartData, setChartData, resultData
        , setResultData, loading, setLoading, ModelID, setModelID }
    // Provide the authentication state and dispatcher to child components
    return (
      <ModelProgressContext.Provider value={context}>
        {children}
      </ModelProgressContext.Provider>
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