// this file has the functions to retrive the api's and connect to the html file
const weatherMapKey = '',
forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast',
weatherUrl  = 'http://api.openweathermap.org/data/2.5/weather',
areaUrl     = 'http://api.openweathermap.org/data/2.5/find?'
// get the city data
const cityData = function(units) {
    let cityName = $('#city').val()
    if (cityName && cityName !=''){
        cityName = cityName.trim()
        initializeweatherData(weatherUrl, cityName, weatherMapKey, units)
        initializeForecastData(forecastUrl, cityName, weatherMapKey, units)
       }
    else {
        alert('Please enter a valid city name')
    }
}
// ready the get function once the user has submitted
$(document).ready(function(){
    $('#submitweather').click(function() {
        cityData('metric')        
    })
})
//intializine all the three functions
function initializeweatherData(url, cityName, appId, units){
    var request = $.ajax({
        url: url,
        dataType: "jsonp",
        data: {q: cityName, appid: appId, units: units},
        type: "GET",
        success: function(result){
            res = createData(result)
            fetchweatherData(res[0], res[1], res[2], res[3], res[4], res[5], res[6]);
           
        }
    }).fail(function(error){
        console.error(error)
        alert('Error sending request')
    })
}
function initializeForecastData (url, cityName, appId, units) {
    const request = $.ajax({
        url: url,
        dataType: "jsonp",
        data: {q: cityName, appid: appId, units: units},
        jsonpCallback: "fetchforecastData",
        type: "GET"
    }).fail(function(error){
        console.error(error)
        alert('Error sending request')
    })
    
}

// fetching the data to make changes in the elements
function fetchweatherData (weatherdesc, temp, tempmin, tempmax, windspeed, icontype, cloudcover) {
    $('#details').show("slow");
    iconurl     = "http://openweathermap.org/img/w/"+icontype+".png";
    $("#my_image").attr("src",iconurl);
    $('#mintemp').text(Math.round(tempmin * 10) / 10 +'°C');
    $('#maxtemp').text(Math.round(tempmax * 10) / 10 +'°C');
    $('#cloud').text(cloudcover+' %');
    $('#windspeed').text(Math.round(windspeed*3600/1000 *10)/10 + ' km/h');
    $('#weatherdesc').text(weatherdesc);
    $('#Temperaturereading').text(Math.round(temp * 10) / 10 +'°C');
    //var res = createChangeElement(result);
    if (tempmin>35){
        $('#tempbox').css("background-color", "#ff6961");  
        
    }else if(tempmin>30 & tempmin<35){
        $('#tempbox').css("background-color", "#FF6347");
    }
    else if(tempmin<30 & tempmin>15){
        $('#tempbox').css("background-color", "#66cc91");
    }
    else if(tempmin<15 & tempmin>5){
        $('#tempbox').css("background-color", "#B0D1FF");
    }
    else {
        $('#tempbox').css("background-color", "#F8F8FF");
    }
    
}
function fetchforecastData (forecast) {
    $('#log').show("slow");
    let html = '',
    cityName = forecast.city.name,
    country = forecast.city.country
    html += '<h3> Weather Forecast for ${cityName}, ${country}</h3>'
    forecast.list.forEach(function(forecastEntry){
        html += '<p>' + forecastEntry.dt_txt + ': ' + forecastEntry.main.temp + '</p>'
    })
    $('#log').html(html)
}

// function to get the result data after get
 
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
    return[weatherdesc, temp, tempmin, tempmax, windspeed, icontype, cloudcover]
}
