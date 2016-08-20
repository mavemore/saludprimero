$(document).ready(function(){
	init();
});

function init(){
	$("#info-med").hide();
	$(".dropdown-menu li a").each(function(){
		$( this ).click(function(){
			$(".dropdown-menu li a[class='active']").removeClass("active");
			$(this).addClass("active");
			mostrarCentro();
			$("#dropdownCentros").text($(this).text());
		});
	});
}

function mostrarCentro(){
	$("#info-med").show();
}
