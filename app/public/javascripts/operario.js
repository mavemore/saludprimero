$(document).ready(function(){
	init();
});

function init(){
	mostrarCentro();	
}

function mostrarCentro(){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState == 4 && xhttp.status == 200){
			var json = JSON.parse(xhttp.responseText);
			var select = $("#centromed");
			json.forEach(function(centro){
				select.append($('<option>').text(centro.nombre));		
			});
		}
	};
	xhttp.open("GET","/operario/muestras/editar/centroslist", true);
	xhttp.send();
}

function cargarExamenes(){
	
}