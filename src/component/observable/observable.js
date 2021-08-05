import {BehaviorSubject } from 'rxjs';

export const subjectvac = new BehaviorSubject("0")
export const subjectrange = new BehaviorSubject(1)
export const subjectregion = new BehaviorSubject([11])
export const subjectregionswitch = new BehaviorSubject([11])

const subscription = subjectrange.subscribe(v=>console.log(v,"subjectrange"))
const subscription2 = subjectregion.subscribe(v=>console.log(v,"subjectregion"))
const subscription3 = subjectvac.subscribe(v=>console.log(v,"subjectvac"))


 
 
 
 
 
 
 
 

 
 
 
 
 



 
 
 
 
 
 

 

 
 
 
 
 
 
 

 

 
    
  
 
 
 
 
 
 
 
 
 
 
 