$(document).ready(function(){
	$('#tblMuestras').DataTable();
	notificar();
	recibir();
});

function notificar(){
	var notificaciones = $(".btnNotificar");

	for(var i = 0; i<notificaciones.length;i++){
		$(".btnNotificar").get(i).addEventListener('click', function(){
			var codigo = $(this).closest("tr").children(':nth-child(2)').text();
			$.ajax({
				type: 'POST',
				url: '/laboratorista/recepcion-muestras/notificar',
				data: 'codigo='+ codigo
			});
			window.location.replace("/laboratorista/recepcion-muestras/");
		});
	}
}

function recibir(){
	var recibidos = $(".btnRecibido");

	for(var i = 0; i<recibidos.length;i++){
		$(".btnRecibido").get(i).addEventListener('click', function(){
			var codigo = $(this).closest("tr").children(':nth-child(1)').text();
			$.ajax({
				type: 'POST',
				url: '/laboratorista/recepcion-muestras/recibir',
				data: 'codigo='+ codigo
			});
			window.location.replace("/laboratorista/recepcion-muestras/");
		});
	}
	$("#btnRecibido").on('click', function(){
		var recibidos = $("input:checked");
		var codigos = [];
		var i = 0;
		$("input:checked").each(function(){
			codigos[i] = $(this).closest("tr").children(':nth-child(2)').text();
			i++;
		});
		$.ajax({
			type: 'POST',
			url: '/laboratorista/recepcion-muestras/recibir',
			data: 'codigos='+ codigos
		});
	});
}
