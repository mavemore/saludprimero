$(document).ready(function(){
	init();
});

function init(){
	$("#contenido").hide();
	$('#centro').on('change', function() {
		$("#contenido").show();
	});
}
