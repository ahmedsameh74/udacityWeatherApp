// variables
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const zip = document.getElementById('zip');
const userFeeling = document.getElementById('feelings');
const date = document.getElementById('date');
const content = document.getElementById('content');
const temp = document.getElementById('temp');
const cityName = document.getElementById('city');
const baseUrl = `http://api.openweathermap.org/data/2.5/weather?zip=`;
const apiKey = "&appid=15a17c0aa9e530761dd41d878dc06325&units=metric";
const btn = document.getElementById('generate');


// get info from the api side based on the user zip
const getInfo = async () => {
    const res = await fetch(baseUrl+zip.value+apiKey)
    try {
        const data = await res.json();
        // console.log(data);
        return data;
        
    } catch(error){
        console.log("error", error);
    }
}

//post the data on localserver
const postData = async (url = '', data = {})=> {
    const response = await fetch(url, {
        method:"POST",
        credentials: "same-origin",
        headers:{
            "Content-Type": "application/json",
        },body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    }catch(error){
        console.log("error", error);
    }
}


//update user interface with the new data
const showUi = async () => {
    const newInfo = await fetch("/getData");
    try{
        const retrievedData = await newInfo.json();
        date.innerHTML = "Date: "+retrievedData.date;
        temp.innerHTML ="Temperture(C): "+retrievedData.temp;
        content.innerHTML = "Feeling: "+retrievedData.content;
        cityName.innerHTML = "city : "+retrievedData.city;
        
    } catch(error){
        console.log("error", error);
    }
}

// event on click to update the interFace
btn.addEventListener("click", (e)=> {
    e.preventDefault();
    getInfo().then(function(data){
        postData("/postData",{temperature: data.main.temp, content: userFeeling.value, date: newDate, city: data.name})
        // console.log("hellos");
    }).then(showUi())
})
