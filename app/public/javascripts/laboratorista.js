$(document).ready(function(){
	$('#tblMuestras').DataTable();
	init();
});

function init(){
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
