// this file has the functions to retrive the api's and connect to the html file

$(document).ready(function(){
   $('#submitweather').click(function(){
       var city=$("#city").val();
       if(city!=''){
            $.ajax({
                url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + 
                "&APPID=c11fb4df334457589dd537b8b1dd9cbd",
                type:"GET",
                dataType:"jsonp",
                success: function(result){
                    $('#details').show("slow");
                    
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
                    iconurl     = "http://openweathermap.org/img/w/"+icontype+".png";
                    console.log(result)
                    $("#my_image").attr("src",iconurl);
                    $('#mintemp').text(Math.round(tempmin * 10) / 10 +'°C');
                    $('#maxtemp').text(Math.round(tempmax * 10) / 10 +'°C');
                    $('#cloud').text(cloudcover+' %');
                    $('#windspeed').text(windspeed*3600/1000 + ' km/h');
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
            })
       }
       else{
           $("#generic-error span").html('Please put a valid city name!');
        }
    })
})

/*
function createChangeElement(data){
    weathertype = result.weather[0].main;
    countrytype = result.sys.country;
    weatherdesc = result.weather[0].description;
    temp        = result.main.temp;
    tempmin     = result.main.temp_min;
    tempmax     = result.main.temp_max;
    windspeed   = result.wind.speed;
    winddeg     = result.wind.deg;
}*/
