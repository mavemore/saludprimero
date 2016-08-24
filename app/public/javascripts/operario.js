$(document).ready(function(){
	init();
});

function init(){
	mostrarCentro();

$("#muestras").change(cargarExamenes());
}
$("#muestras").change(cargarExamenes());

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
	var tabla= $("#tblExamen")
    tabla.empty();
    var inicial=$("<tr>");
    inicial.append($("<th>").text("Seleccion"));
    inicial.append($("<th>").text("Examenes a realizar"));
    tabla.append(inicial);
	if(opcion =="Sangre"){
		var $row1= $("<tr>");
		var $row2= $("<tr>");
		var $row3= $("<tr>");
		var checkbox= $("<input>");

        checkbox.attr("type","hidden");
		var checkbox2= $("<input>")

        checkbox2.attr("type","hidden");
		var checkbox3= $("<input>");
        checkbox3.attr("type","hidden");
		var th1=$("<td>");var th2=$("<td>");
		var th3=$("<td>");var th4=$("<td>");
		var th5=$("<td>");var th6=$("<td>");
        th1.append(checkbox);
        th3.append(checkbox2);
        th5.append(checkbox3);
		th2.text("Hemograma");
		th4.text("Bioquimica");
		th6.text("Serologia");
		$row1.append(th1);
		$row1.append(th2);
		$row2.append(th3);
		$row2.append(th4);
		$row3.append(th5);
		$row3.append(th6);
		tabla.append($row1);
		tabla.append($row2);
		tabla.append($row3);

	}
	else if(opcion =="Heces"){
		var $row= $("<tr>");
		var th=$("<td>");var th2=$("<td>");
		var checkbox= $("<input >")
		checkbox.attr("type","hidden");
        th.append(checkbox);
		th2.text("Coprocultivo");
		$row.append(th);
		$row.append(th2);
		tabla.append($row);

	}
	else if(opcion=="Orina"){
		var $row= $("<row>");
		var th=$("<td>");var th2=$("<td>");
		var checkbox= $("<input>");

        checkbox.attr("type","hidden");
        th.append(checkbox);
		th2.text("Uroanalisis");
		$row.append(th);
		$row.append(th2);
		tabla.append($row);
	}
}