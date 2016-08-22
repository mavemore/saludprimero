$(document).ready(function(){
	init();
});

function init(){
	mostrarCentro();
	cargarExamenes();
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
	var opcion=$("#muestras option:selected").text();
	var tabla= $("#tblExamen");
	var $row= $("<row>");
	if(opcion =="Sangre"){
		var $row1= $("<row>");
		var $row2= $("<row>");
		var $row3= $("<row>");
		var checkbox= $("<input />");
		checkbox.type("checkbox");
		var checkbox2= $("<input />")
		checkbox2.type("checkbox");
		var checkbox3= $("<input />");
		checkbox3.type("checkbox");
		var th1=$("<td>");var th2=$("<td>");
		var th3=$("<td>");var th4=$("<td>");
		var th5=$("<td>");var th6=$("<td>");
		th2.text("Hemograma");
		th4.text("Bioquimica");
		th6.text("Serologia");
		row1.append(th1);
		row1.append(th2);
		row2.append(th3);
		row2.append(th4);
		row3.append(th5);
		row3.append(th6);
		tabla.append(row1);
		tabla.append(row2);
		tabla.append(row3);

	}
	else if(opcion =="Heces"){
		var $row= $("<row>");
		var th=$("<td>");var th2=$("<td>");
		var checkbox= $("<input />")
		checkbox.type("checkbox");
		th2.text("Coprocultivo");
		row.append(th1);
		row.append(th2);
		tabla.append(row);

	}
	else if(opcion=="Orina"){
		var $row= $("<row>");
		var th=$("<td>");var th2=$("<td>");
		var checkbox= $("<input />")
		checkbox.type("checkbox");
		th2.text("Uroanalisis");
		row.append(th1);
		row.append(th2);
		tabla.append(row);
	}
}