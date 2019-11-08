// this file has the functions to retrive the api's and connect to the html file

$(document).ready(function(){
   // $('#submitweather').click(function(){
       // var city=$("#city").val();
       city="moscow";
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city +"&APPID=c11fb4df334457589dd537b8b1dd9cbd",
            type:"GET",
            dataType:"json",
            success: function(data){
                console.log(data);
            }
        })
    //})
})

