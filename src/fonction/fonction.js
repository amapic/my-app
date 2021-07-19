function createData(time, amount,amount2) {
    return {
        time,
        amount,
        amount2
    };
}

export function setDataLim(data){
console.log(data);
   console.log(data.jour);
    console.log(data.timestamp);

}

export async function getdata(url) {
    const response = await fetch(url)
    const responseData = await response.json()
    console.log(response)
    console.log(responseData)
    if (response.ok) {
        console.log("ok");
        var data = [];
    var arrayTime = [];
    var arrayAmount = [];
        
        for (let key in responseData.datetime){
            let value = responseData.datetime[key];
            arrayTime.push(value);
        }
        for (let key in responseData.n_cum_dose1){
            let value = responseData.n_cum_dose1[key];
            arrayAmount.push(value);
        }
         arrayAmount.forEach((x, i) => data.push(createData(arrayTime[i].toString(), i,i/2)));
         var ff=data.slice(1,10);
         return ff
    } else {
        alert(JSON.stringify(responseData))
        return {responseData, loading: false}
    }
}