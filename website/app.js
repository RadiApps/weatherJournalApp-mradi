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
            // get entered zipcode from ZipCode text element
            const zipCode = document.getElementById("zip").value;
            //check if the entered zipcode is not empty
            if(zipCode == '' || zipCode == undefined){
                alert("Pleas enter zipcode first");
                return;
            }
            // url for remote web api for getting temprature from openweathermap.org
            const url=`https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apikey}&units=metric`;
            const response= await fetch(url);
            //convert response to json
            const data=  await response.json();
            //return temprature
            return data.main.temp;
        }catch(err){
            console.log(err);
        }
    }
    // append all returned data to the UI elements
    function updateHTML(resData){
        document.getElementById("date").innerHTML='Date is :'+resData.date;
        document.getElementById("temp").innerHTML='Temp is :'+resData.temp;
        document.getElementById("content").innerHTML='Date is :'+resData.feelings;
    }

    // dealing with the client api
    function process(){
        //using promises for adding the returned data from remot api to server /addWeather method
        getWeatherData().then(async temp=>{
           //get the feeling value entered from ui element
           const feelings = document.getElementById("feelings").value;
           await fetch('/addWeather',{
                method:"POST",
                credntials: "same-origin",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    date : newDate,
                    temp : temp,
                    feelings:feelings
                })
            });
            // then getting the data again from projectData global variable using /getWeather
            const res= await fetch("/getWeather",{method: "GET",credntials: "same-origin"});
            // converting response to json
            const resData = await res.json();
            return resData;

        }).then(resData => {
            updateHTML(resData);
        }).catch(error=>console.log(error));
    }      