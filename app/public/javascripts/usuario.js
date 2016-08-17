var tabs = $("#menu .nav li");
for(i=0;i<navTabs.length();i++){
	navTabs.get(i).click(function{
		$("li.active").removeClass("active");
		addClass("active");
	});
}