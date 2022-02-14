import {BehaviorSubject } from 'rxjs';

export const planete_cliquee = new BehaviorSubject("KOI-351")
export const liste_planete = new BehaviorSubject(null)
export const liste_planete_old = new BehaviorSubject([{
    "id": 877,
    "name": "HD 219134 b",
    "mass": 0.01343,
    "orbital_period": 3.093292,
    "discovered": 2015,
    "radius": 0.134,
    "semi_major_axis": 0.037,
    "star_distance": 6.55,
    "temp": 4699,
    "method": "Primary Transit",
    "star_name": "HD 219134",
    "createdAt": "2021-12-21T16:30:06.954Z",
    "updatedAt": "2021-12-21T16:30:06.954Z"
},{
    "id": 878,
    "name": "HD 219134 c",
    "mass": 0.01246,
    "orbital_period": 6.765159,
    "discovered": 2015,
    "radius": 0.12624,
    "semi_major_axis": 0.062,
    "star_distance": 6.55,
    "temp": 4699,
    "method": "Radial Velocity",
    "star_name": "HD 219134",
    "createdAt": "2021-12-21T16:30:06.954Z",
    "updatedAt": "2021-12-21T16:30:06.954Z"
}])