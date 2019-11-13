// this file has the functions to retrive the api's and connect to the html file

$(document).ready(function(){
   // $('#submitweather').click(function(){
       // var city=$("#city").val();
       city="moscow";
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city +"&APPID=",
            type:"GET",
            dataType:"json",
            success: function(data){
                console.log(data);
            }
        })
    //})
})

