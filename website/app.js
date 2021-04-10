/* Global Variables */
//window.addEventListener("DOMContentLoaded", function(event) {   

    // Create a new date instance dynamically with JS
    let d = new Date();
    let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

    //my api key for openweatherapi
    const apikey='67b02d488eb01f72648a43f2458f089b';

    //selecting button from the html
    const button=document.querySelectorAll("#generate");

    //fire click event for getting the tempruture
    button[0].addEventListener("click",process);

    //function fetching the temp from the remote api
    async function getWeatherData(){
        try{
            const zipCode = document.getElementById("zip").value;
            if(zipCode == '' || zipCode == undefined){
                alert("Pleas enter zipcode first");
                return;
            }
            const url=`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apikey}&units=metric`;
            const response= await fetch(url);
            const data=  await response.json();
            return data.main.temp;
        }catch(err){
            console.log(err);
        }
    }

    function updateHTML(resData){
        document.getElementById("date").innerHTML='Date is :'+resData.date;
        document.getElementById("temp").innerHTML='Temp is :'+resData.temp;
        document.getElementById("content").innerHTML='Date is :'+resData.feelings;
    }
    function process(){
        getWeatherData().then(temp=>{
            const feelings = document.getElementById("feelings").value;
            fetch('/addWeather',{
                method:"POST",
                credntials: "same-origin",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    date : newDate,
                    temp : temp,
                    feelings:feelings
                })
            });
            const res=  fetch("/getWeather",{method: "GET",credntials: "same-origin"});
            const resData =  res;
            return resData;

        }).then(resData => {
            updateHTML(resData);
        }).catch(error=>console.log(error));
    }      