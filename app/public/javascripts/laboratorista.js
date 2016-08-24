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
		});
	}
}

function recibir(){
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
