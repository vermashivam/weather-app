// Import stylesheets
import './style.css';
const renderOnPage = weather => {
  var mainBody = document.querySelector("#main");;
  mainBody.innerHTML = "";

  const maindivLeft = document.createElement("div");

  var divLeft = document.createElement("div");
  divLeft.setAttribute("class" , "subDiv");
  const location = document.createElement("p");
  const region = document.createElement("p");
  const lat_lon = document.createElement("p");
  const localTime = document.createElement("p");
  location.innerHTML = " Location : " + weather.location.name + " ";
  region.innerHTML = " Region : " + weather.location.region + ' , ' + weather.location.country + " ";
  lat_lon.innerHTML = " Latitude : " + weather.location.lat + " Longitude : " + weather.location.lon + " ";
  localTime.innerHTML = " Time : " +dateChange (weather.location.localtime )+ " ";
  const pCurrent = document.createElement("p");
  const tempC = document.createElement("p");
  const tempF = document.createElement("p");
  const feelC = document.createElement("span");
  const feelF = document.createElement("span");
  const text = document.createElement("p");
  const humdity = document.createElement("p");
  const icon = document.createElement("img");
  tempC.innerHTML = " Temp in C : " +weather.current.temp_c;
  tempF.innerHTML = " Temp in F : " +weather.current.temp_f;
  feelC.innerHTML = " , Feels like " +weather.current.feelslike_c;
  feelF.innerHTML = " , Feels like " +weather.current.feelslike_f;
  text.innerHTML = " It's " + weather.current.condition.text + " today. Enjoy! ";
  humdity.innerHTML = " Humidity : " + weather.current.humidity;
  icon.setAttribute("src", weather.current.condition.icon);
  divLeft.append(icon);
  divLeft.append(text);
  divLeft.append(tempC);
  tempC.append(feelC);
  divLeft.append(tempF);
  tempF.append(feelF);
  divLeft.append(humdity);
  divLeft.append(location);
  divLeft.append(region);
  divLeft.append(lat_lon);
  divLeft.append(localTime);
  maindivLeft.append(divLeft);  
  
  const maindivRight = document.createElement("div");
  const pForcast = document.createElement("div");
  let forecasts = weather.forecast.forecastday ;
  forecasts.forEach( eachDay => {

      var mainDiv = document.createElement("div");
      mainDiv.setAttribute("class" , "mainDiv");
      var div1 = document.createElement("div");
      var div2 = document.createElement("div");
      var pTime = document.createElement("p");
      var tempC = document.createElement("p");
      var tempF = document.createElement("p");
      var text = document.createElement("p");
      var icon = document.createElement("img");
      var humdity = document.createElement("p");
      humdity.innerHTML = " Humidity : " + eachDay.day.avghumidity;
      pTime.innerHTML = " Date : " + dateChange (  eachDay.date );
      tempC.innerHTML = " Max Temp in C : " + eachDay.day.maxtemp_c + " , Min Temp in C : " + eachDay.day.mintemp_c;
      tempF.innerHTML = " Max Temp in F : " + eachDay.day.maxtemp_f + " , Min Temp in F : " + eachDay.day.mintemp_f;
      text.innerHTML = " It's " + eachDay.day.condition.text + ". Enjoy! ";
      icon.setAttribute("src", eachDay.day.condition.icon);
      pTime.setAttribute("class","eachPara");
      div2.append(pTime);
      div1.append(icon);
      div1.append(text);
      div2.append(tempC);
      div2.append(tempF);
      div2.append(humdity);
      mainDiv.append(div1);
      mainDiv.append(div2);
      pForcast.append(mainDiv);
      
    
  });
  maindivRight.append(pForcast);

  mainBody.append(maindivLeft);
  mainBody.append(maindivRight);
  mainBody.setAttribute("class","main");
}

const sorryPage = (status) => {
  var mainBody = document.querySelector("#main");;
  mainBody.innerHTML = "";
  window.alert("An Error Occured ! Status = "+ status + " . Try Again");
}

var sorryFun = (status) => {
  var mainBody = document.querySelector("#main");;
  mainBody.innerHTML = "";

  var maindiv = document.createElement("div");
  maindiv.setAttribute("class" , "mainDivUpper");
  var sorryImg = document.createElement("h1");
  sorryImg.setAttribute("class","warning");
  sorryImg.innerHTML = " :( <br> An Error Occured ! <br> Status Code : " + status;
  maindiv.append(sorryImg);

  mainBody.append(maindiv);
}

var insertCity = () => {
  var mainBody = document.querySelector("#main");;
  mainBody.innerHTML = "";

  var maindiv = document.createElement("div");
  maindiv.setAttribute("class" , "mainDivUpper");
  var sorryImg = document.createElement("p");
  sorryImg.setAttribute("class","warning")
  sorryImg.innerHTML = " Please enter city name ";
  maindiv.append(sorryImg);

  mainBody.append(maindiv);
}
const getWeather = (city,days) => {
    const xhttp  = new XMLHttpRequest();
    xhttp.onreadystatechange = response => {
      var data = response.target;
      console.log("in fun" + data.readyState + " "+data.status);
      if(data.readyState == 4 && data.status == 200){
        const weather = JSON.parse(data.responseText);
        console.log(weather);
        renderOnPage(weather);
      }
      else if(data.readyState == 4 && data.status != 200){
        sorryFun(data.status);
      }
    };

    xhttp.open("GET","https://api.weatherapi.com/v1/forecast.json?key=de137b56027c421794c142234200610&q="+city+"&days="+days);
    xhttp.send();
}

var dateChange = (dateFormat) =>{
  var day = dateFormat[8]+dateFormat[9];
  console.log(dateFormat[8]);
  console.log(dateFormat[8]+dateFormat[9]);
  var month = dateFormat[5] + dateFormat[6];
  var year = dateFormat[0] + dateFormat[1] + dateFormat[2] + dateFormat[3];
  var end = "";
  if(dateFormat.length > 10)
    end = dateFormat.substring(10,dateFormat.length );
  return day + "-" + month + "-" + year + end;
}
var searchButton = document.querySelector(".userInput");
searchButton.onclick = () => {
  var city = document.querySelector("input").value;
  var days = 3;//default
  if(city == ""){
      insertCity();
  }
  else
    getWeather(city,days);
};

var enterKey = document.querySelector("body");
enterKey.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   document.querySelector(".userInput").click();
  }
});