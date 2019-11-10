const weatherMapKey = 'c11fb4df334457589dd537b8b1dd9cbd',
forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast?',
weatherUrl  = 'http://api.openweathermap.org/data/2.5/weather?',
areaUrl     = 'http://api.openweathermap.org/data/2.5/find?'

var request = new XMLHttpRequest()
var xhr     = new XMLHttpRequest()
function ready(callback){
    // in case the document is already rendered
    if (document.readyState!='loading') callback();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') callback();
    });
}
// execute on ready
ready(function(){
    document.getElementById("submitweather").addEventListener('click',function ()
    {
     getWeatherData();
     getForecastData();
    });
});
// execute different functions based on elements
/*
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("submitweather").addEventListener('click',function ()
    {
     getWeatherData();
    }); 
});*/

function getWeatherData(){
    cityName = getCityData();
    weatherUrlFinal = weatherUrl + "appid=" + weatherMapKey + "&q=" + cityName +"&units=metric";
    request.open('GET', weatherUrlFinal, true)
    request.onload = function() {
        var data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
            answer = createData(data);
            fetchweatherData(answer[0], answer[1], answer[2], answer[3], answer[4], answer[5], answer[6]);
        } else {
          console.log('error')
        } 
      }
    request.send();

}
//forecast data
function getForecastData(){
    cityName = getCityData();
    forecastUrlFinal = forecastUrl + "appid=" + weatherMapKey + "&q=" + cityName +"&units=metric";
    xhr.open('GET', forecastUrlFinal, true)
    xhr.onload = function() {
        var data_forecast = JSON.parse(this.response)
        if (xhr.status >= 200 && xhr.status < 400) {
            fetchforecastData(data_forecast);
        } else {
          console.log('error')
        } 
      }
    xhr.send();

}
//city data function
function getCityData(){
    var cityVal = document.getElementById("city").value
    if (cityVal && cityVal !='') {
        return(cityVal);
    }else{alert('Enter a valid city Name')}
}
//get weather json objects
function createData(result){
    weathertype = result.weather[0].main;
    countrytype = result.sys.country;
    weatherdesc = result.weather[0].description;
    temp        = result.main.temp;
    tempmin     = result.main.temp_min;
    tempmax     = result.main.temp_max;
    windspeed   = result.wind.speed;
    winddeg     = result.wind.deg;
    icontype    = result.weather[0].icon ;
    cloudcover  = result.clouds.all;
    latd        = result.coord.lat;
    longt       = result.coord.lon;
    return[weatherdesc, temp, tempmin, tempmax, windspeed, icontype, cloudcover, latd, longt]
}
// fetching the data to make changes in the elements
function fetchweatherData (weatherdesc, temp, tempmin, tempmax, windspeed, icontype, cloudcover) {
    if(document.getElementById('details').style.display=='none')
       {
           document.getElementById('details').style.display='block';  
       }
    iconurl  = "http://openweathermap.org/img/w/"+icontype+".png";
    document.getElementById('my_image').src=iconurl;
    document.getElementById('mintemp').innerHTML= (Math.round(tempmin * 10) / 10 )+'°C';
    document.getElementById('maxtemp').innerHTMl =(Math.round(tempmax * 10) / 10) +'°C';
    document.getElementById('cloud').innerHTML = cloudcover+' %';
    document.getElementById('windspeed').innerHTML = (Math.round(windspeed*3600/1000 *10)/10 )+ ' km/h';
    document.getElementById('weatherdesc').innerHTML = weatherdesc;
    document.getElementById('Temperaturereading').innerHTML = (Math.round(temp * 10) / 10 )+'°C';
    //var res = createChangeElement(result);
    if (tempmin>35){
        document.getElementById('tempbox').style.backgroundColor = "#ff6961";  
        
    }else if(tempmin>30 & tempmin<35){
        document.getElementById('tempbox').style.backgroundColor= "#FF6347";
    }
    else if(tempmin<30 & tempmin>15){
        document.getElementById('tempbox').style.backgroundColor ="#66cc91";
    }
    else if(tempmin<15 & tempmin>5){
        document.getElementById('tempbox').style.backgroundColor = "#B0D1FF";
    }
    else {
        document.getElementById('tempbox').style.backgroundColor= "#F8F8FF";
    }
    
}
//forecast data fetch
function fetchforecastData (forecast) {
    let html = '',
    cityName = forecast.city.name,
    country = forecast.city.country
    html += '<h3> Weather Forecast for '+ cityName+',' + country + '</h3>'
    forecast.list.forEach(function(forecastEntry){
        html += '<p>' + forecastEntry.dt_txt + ': ' + forecastEntry.main.temp + '</p>'
    })
    document.getElementById('log').innerHTMl = html
    console.log(document.getElementById('log'))
    if(document.getElementById('log').style.display=='none')
    {
       
        document.getElementById('log').style.display='block';  
    }
}
