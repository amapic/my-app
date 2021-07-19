import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DataProvider,RegionSelectedProvider,VaccinSelectedProvider,RangeProvider } from './context/DataContext';

ReactDOM.render(
  

  <RegionSelectedProvider>
    <VaccinSelectedProvider>
    <DataProvider>
      
    <App />
    
    </DataProvider>
    </VaccinSelectedProvider>
    </RegionSelectedProvider>

  ,
  
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
