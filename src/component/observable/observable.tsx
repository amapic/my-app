import {BehaviorSubject } from 'rxjs';

export const subjectvac = new BehaviorSubject<string>("0")
export const subjectrange = new BehaviorSubject<[number,number]>([0,0])
export const subjectregion = new BehaviorSubject<[number]>([11])
export const subjectregionswitch = new BehaviorSubject<[number]>([11])
export const subjectmapfr = new BehaviorSubject<[number] | null>(null)
export const subjectregioncolor = new BehaviorSubject<[string] | null>(null)

const subscription = subjectrange.subscribe(v=>console.log(v,"subjectrange"))
const subscription2 = subjectregion.subscribe(v=>console.log(v,"subjectregion"))
const subscription3 = subjectvac.subscribe(v=>console.log(v,"subjectvac"))
const subscription4 = subjectmapfr.subscribe(v=>console.log(v,"subjectmapfr"))
const subscription5 = subjectregioncolor.subscribe(v=>console.log(v,"subjectregioncolor"))


 
 
 
 
 
 
 
 

 
 
 
 
 



 
 
 
 
 
 

 

 
 
 
 
 
 
 

 

 
    
  
 
 
 
 
 
 
 
 
 
 
 