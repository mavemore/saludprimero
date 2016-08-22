$(document).ready(function(){
	init();
});

function init(){
	$('#centromed').click(
	mostrarCentro());
}
function mostrarCentro(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			var json = JSON.parse(xhttp.responseText);
			json.forEach(function(centro){
				$("#centromed").text()){
					option.text() == centro.nombre
				}
			});
		}
	};
	xhttp.open("GET","/operarios/ingreso-muestras/centroslist", true);
	xhttp.send();
	//$("#info-med").show();
}