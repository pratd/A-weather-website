$(document).ready(function(){city="moscow",$.ajax({url:"http://api.openweathermap.org/data/2.5/weather?q="+city+"",type:"GET",dataType:"json",success:function(t){console.log(t)}})});
