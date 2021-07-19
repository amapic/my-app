import React, { createContext, useState } from "react";

export const DataContext = createContext();
export const RangeContext = createContext();
export const RegionSelectedContext = createContext();
export const VaccinSelectedContext = createContext();

// This context provider is passed to any component requiring the context
export const DataProvider = ({children}) => {
  const [data, setData] = useState([]);
  const [empty, setEmpty] = useState(true);
  const [datalim, setDataLim] = useState([]);
  const [monthRange, setMonthRange] = useState([]);

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        empty,
        setEmpty,
        datalim, 
        setDataLim,
        monthRange,
        setMonthRange
      }}
    >
    {children}
    </DataContext.Provider>
  );
};

export const RangeProvider = ({children}) => {

  const [monthRange, setMonthRange] = useState([]);

  return (
    <RangeContext.Provider
      value={{
        monthRange,
        setMonthRange
      }}
    >
    {children}
    </RangeContext.Provider>
  );
};

export const RegionSelectedProvider = ({children}) => {

  const [regionSelectedlast, setRegionSelectedlast] = useState(0);
  const [regionSelectedlist, setRegionSelectedlist] = useState([1,2]);

  return (
    <RegionSelectedContext.Provider
      value={{
        regionSelectedlast,
        setRegionSelectedlast,
        regionSelectedlist,
        setRegionSelectedlist,
      }}
    >
    {children}
    </RegionSelectedContext.Provider>
  );
};

export const VaccinSelectedProvider = ({children}) => {

  const [vaccinSelected, setVaccinSelected] = useState(0);
  

  return (
    <VaccinSelectedContext.Provider
      value={{
        vaccinSelected,
        setVaccinSelected,
      }}
    >
    {children}
    </VaccinSelectedContext.Provider>
  );
};

