import adresse from './conf'
import fetch from "node-fetch";
import { liste_planete } from '../component_planet/observable/observable';
export var liste_nom_region: { [key: string]: string } = {}
liste_nom_region["1"] = "Guadeloupe"
liste_nom_region["2"] = "Martinique"
liste_nom_region["3"] = "Guyane"
liste_nom_region["4"] = "La Réunion"
liste_nom_region["11"] = "Ile-de-France"
liste_nom_region["24"] = "Centre-Val de Loire"
liste_nom_region["27"] = "Bourgogne-Franche-Comté"
liste_nom_region["28"] = "Normandie"
liste_nom_region["32"] = "Hauts-de-France"
liste_nom_region["44"] = "Grand Est"
liste_nom_region["52"] = "Pays de la Loire"
liste_nom_region["53"] = "Bretagne"
liste_nom_region["75"] = "Nouvelle-Aquitaine"
liste_nom_region["76"] = "Occitanie"
liste_nom_region["84"] = "Auvergne-Rhône-Alpes"
liste_nom_region["93"] = "Provence-Alpes-Côte d’Azur"
liste_nom_region["94"] = "Corse"


export var liste_id_region: { [key: string]: string } = {}
liste_id_region["Guadeloupe"] = "1"
liste_id_region["Martinique"] = "2"
liste_id_region["Guyane"] = "3"
liste_id_region["La Réunion"] = "4"
liste_id_region["Ile-de-France"] = "11"
liste_id_region["Centre-Val de Loire"] = "24"
liste_id_region["Bourgogne-Franche-Comté"] = "27"
liste_id_region["Normandie"] = "28"
liste_id_region["Hauts-de-France"] = "32"
liste_id_region["Grand Est"] = "44"
liste_id_region["Pays de la Loire"] = "52"
liste_id_region["Bretagne"] = "53"
liste_id_region["Nouvelle-Aquitaine"] = "75"
liste_id_region["Occitanie"] = "76"
liste_id_region["Auvergne-Rhône-Alpes"] = "84"
liste_id_region["Provence-Alpes-Côte d’Azur"] = "93"
liste_id_region["Corse"] = "94"


export function conversionkey(obj: { [key: string]: string }): { [key: string]: string } {
    var new_obj: { [key: string]: string } = {}
    const keys = Object.keys(obj);
    keys.map((object) => {
        new_obj[liste_nom_region[object.toString()]] = obj[object]
    })

    return new_obj
}

function createData(time: string, amount: number, third: number) {
    return {
        time,
        amount,
        third
    };
}


import { dataT } from '../types/interface'

export const chercheData = async (): Promise<dataT[]> => {

    const dataTempty = {} as dataT[]
    const response = await fetch(adresse + ":8080/api/planets");
    // const response = await fetch("http://68.183.74.150:8080/api/planets");
    const responseData = await response.json();
    return new Promise((successCallback, failureCallback) => {
        if (response.ok) {
            var data = [];
            var dictOfResponseData: any = {}
            var miniDict = {}
            for (const [key, value] of Object.entries(responseData)) {
                dictOfResponseData[key] = value
            }

            successCallback(dictOfResponseData)

        } else {
            alert(JSON.stringify(responseData))
            failureCallback(dataTempty)
        }
    })
}

export const get_login = async (): Promise<dataT[]> => {
    const dataTempty = {} as dataT[]
    // const response = await fetch(adresse + ":8080/get_login");
    let token=document.cookie
    let headers = {"Content-Type": "application/json; charset=UTF-8"};
    if (token) {
        // console.log("ttt");
      headers["Authorization"] = `Token ${token}`;
    }
    // const dataTempty = {} as dataT[]
    const response = await fetch("http://localhost:8080/get_login",{
     
        // Adding method type
        method: "POST",
         
        // Adding body or contents to send
        body: JSON.stringify({
            nom: "A",
            mdp: "mdp"
        }),
         
        // Adding headers to the request
        headers: headers
    })
    return new Promise((successCallback, failureCallback) => {
        if (response.ok) {
            // var data = [];
            // var dictOfResponseData: any = {}
            // var miniDict = {}
            // for (const [key, value] of Object.entries(responseData)) {
            //     dictOfResponseData[key] = value
            // }
            console.log(response);

            successCallback(response)

        } else {
            // alert(JSON.stringify(responseData))
            console.log("pas ok");
            failureCallback(dataTempty)
        }
    })

}

export const test = async (): Promise<dataT[]> => {
    // document.cookie = `token=${token}`
    // console.log(document.cookie);
    let token=document.cookie
    let headers = {"Content-Type": "application/json; charset=UTF-8"};
    if (token) {
        console.log("ttt");
      headers["Authorization"] = `Token ${token}`;
    }
    const dataTempty = {} as dataT[]
    const response = await fetch("http://localhost:8080/hhapi",{
     
        // Adding method type
        method: "POST",
         
        // Adding body or contents to send
        body: JSON.stringify({
            nom: "A",
            mdp: "mdp"
        }),
         
        // Adding headers to the request
        headers: headers
    })
    // const response = await fetch("http://68.183.74.150:8080/api/planets");
    // console.log(response);
    const responseData = await response.json();
    return new Promise((successCallback, failureCallback) => {
        if (response.ok) {
            var data = [];
            var dictOfResponseData: any = {}
            var miniDict = {}
            for (const [key, value] of Object.entries(responseData)) {
                dictOfResponseData[key] = value
            }
            // console.log(responseData);
            // console.log(document.cookie);
            document.cookie = `token=${dictOfResponseData['token']}`
            successCallback(dictOfResponseData['token'])

        } else {
            alert(JSON.stringify(responseData))
            console.log("fail",responseData)
            failureCallback(dataTempty)
        }
    })
}




export const liste_planete_par_systeme = async () => {

    let liste_planete_active: string[] = ["KOI-351", "TRAPPIST-1", "HD 219134"]
    let array_retour = {}
    const get_planete = (planete_active) => {
        return new Promise((resolve, reject) => {
            chercheData().then((data) => {
                data = Object.values(data);
                for (var i: any = data.length - 1; i >= 0; i--) {
                    if (data[i].star_name != planete_active) {
                        data.splice(i, 1);
                    }
                }
                function sortByKey(data2: any[], key: string) {
                    return data2.sort(function (a: any, b: any) {
                        var x = a[key]; var y = b[key];
                        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                    });
                }
                sortByKey(data, "semi_major_axis")
                resolve(array_retour[planete_active] = data)

            })
        })
    }
    Promise.all([get_planete(liste_planete_active[0]), get_planete(liste_planete_active[1]), get_planete(liste_planete_active[2])]).then(() => {
        liste_planete.next(array_retour)
    })

}

