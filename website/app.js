/* Global Variables */
//window.addEventListener("DOMContentLoaded", function(event) {   

    // Create a new date instance dynamically with JS
    let d = new Date();
    let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
    const apikey='67b02d488eb01f72648a43f2458f089b';

    const button=document.querySelectorAll("#generate");
    button[0].addEventListener("click",getWeatherData);

    async function getWeatherData(){
        try{
            const zipCode = document.getElementById("zip").value;
            const feelings = document.getElementById("feelings").value;

            debugger;
            if(zipCode == '' || zipCode == undefined){
                alert("Pleas enter zipcode first");
                return;
            }
            const url=`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apikey}&units=metric`;
            const response= await fetch(url);
            const data=  await response.json();
            
            await fetch('/addWeather',{
                method:"POST",
                credntials: "same-origin",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    date : newDate,
                    temp : data.main.temp,
                    feelings:feelings
                })
            })
            debugger;
            const res=await fetch("/getWeather",{method: "GET",credntials: "same-origin"});
            const resData =await res.json();
            
            updateHTML(resData);

        }catch(err){
            console.log(err);
        }
    }

    function updateHTML(resData){
        document.getElementById("date").innerHTML='Date is :'+resData.date;
        document.getElementById("temp").innerHTML='Temp is :'+resData.temp;
        document.getElementById("content").innerHTML='Date is :'+resData.feelings;
    }