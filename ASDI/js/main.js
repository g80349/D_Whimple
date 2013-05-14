//David Whimple
//ASDI 1305
//Project 1
//Javascript


$('#home').on('pageinit', function(){
	//code needed for home page goes here
});

$('#addItem').on('pageinit', function(){

	$('#logFood').on("click", function(){
		var data = $('#form').serializeArray();
		var id = Math.floor(Math.random()*1000000000);
	    localStorage.setItem(id, JSON.stringify(data));
		alert("Log saved!");
	});


	$("#clear").on("click",function(){
		localStorage.clear();
	});

});
$('#display').on('pageinit', function(){
	if(localStorage.length === 0){
		alert("You have not logged any food so default logs were added.");
	}
	for(i = 0; i < localStorage.length; i++){
		$('#displayList').append('<ul> <li> <ul>');
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var infoObj = JSON.parse(value);
		for(var x in infoObj){
			if(infoObj[x].value !== "" && infoObj[x].value !== undefined){
			var subText = infoObj[x].name + " " + infoObj[x].value;
			$('<li>').appendTo('#displayList ul li ul').text(subText);
			console.log(subText);
			}
		}
		}
});

