import { Subject } from 'rxjs';

const subjectData = new Subject();
const subjectRange = new Subject();
const subjectVaccin = new Subject();
// chercheData("http://localhost:8052/detail2/" + regionSelected.regionSelectedlist.join('_') + "/" + vaccin.vaccinSelected).then((tt)=>setItems(tt))
const rr=function(d) {
    // console.log("t")
    return d
}

export const dataService = {
    setData: d => subjectData.next({ value: d }),
    clearData: () => subjectData.next(),
    getData: () => subjectData.asObservable()
};



export const RangeService = {
    setData: d => {var hh="t"
    subjectRange.next({ value: hh })},
    clearData: () => subjectRange.next(),
    getData: () => subjectRange.asObservable()
};

export const VaccinService = {

    setData: d =>{
        var l=RangeService.getData() + "yy"
        subjectVaccin.next({ value: l})
    } ,
    clearData: () => subjectVaccin.next(),
    getData: () => subjectVaccin.asObservable()
};

// export const VaccinSelectedProvider = ({children}) => {

//     const [vaccinSelected, setVaccinSelected] = useState(0);
    
  
//     return (
//       <VaccinSelectedContext.Provider
//         value={{
//           vaccinSelected,
//           setVaccinSelected,
//         }}
//       >
//       {children}
//       </VaccinSelectedContext.Provider>
//     );
//   };