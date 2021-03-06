//David Whimple
//ASDI 1305
//Project 1
//Javascript


$('#home').on('pageinit', function(){
	//code needed for home page goes here
});

$('#addItem').on('pageinit', function(){

	$('#logFood').on("click", function(){
		var key = $('#logFood').attr('data-role');
		if($.isNumeric(key) == false){
			var id = Math.floor(Math.random()*10000000001);
		}else{
			var id = key;
		}
        var logs = {};
        logs.date = ["Date:", $("#date").val()];
        logs.weight = ["Today's Weight:", $("#weight").val()];
        logs.select = ["Meal Type:", $("#select").val()];
        logs.food1 = ["Food:", $("#food1").val()];
        logs.foodCals1 = ["Calories:", $("#foodCals1").val()];
        logs.serv1 = ["Servings:", $("#serv1").val()];
	    localStorage.setItem(id, JSON.stringify(logs));
		alert("Log saved!");
		$('#logFood').removeAttr('data-role');
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
			if($.isNumeric(localStorage.key(i)) == true){
				$('#displayList').append('<ul> <li> <ul id="list'+ i +'">');
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				var infoObj = JSON.parse(value);
				console.log(infoObj);
				for(var x in infoObj){
					//if(infoObj[x].value !== "" && infoObj[x].value !== undefined){
					var subText = infoObj[x][0]+ " " + infoObj[x][1];
					$('<li>').appendTo('#list'+i).text(subText).css('text-align', 'left');
					//}
				}
				var edit = $('<a href="#addItem">Edit</a><br>').appendTo('#displayList').attr('id', key);
				var deleteItem = $('<a href="#">Delete</a>').appendTo('#displayList').attr('id', key);

				deleteItem.on('click', deleteLog);
				edit.on('click', editLog);
			}
		}


});

var deleteLog = function(){
	var question = confirm("Are you sure you want to delete this log?");
	if(question){
		localStorage.removeItem(this.id);
		alert("Log deleted.");
		window.location.reload();
	}else{
		alert("Log was NOT deleted.");
		return false;
	}
};

function myEle(x){
	var myElement = document.getElementById(x);
	return myElement;
};

var editLog = function(){
		var val = localStorage.getItem(this.id);
		var data = JSON.parse(val);
		myEle("date").value              = data.date[1];
		myEle("weight").value            = data.weight[1];
		myEle("select").value            = data.select[1];
		myEle("food1").value             = data.food1[1];
		myEle("foodCals1").value         = data.foodCals1[1];
		myEle("serv1").value             = data.serv1[1];

		$('#logFood').attr('data-role', this.id);

/*		$('#date').text(data[0].value);
		$('#weight').text(data[1].value);
		$('#select').text(data[2].value);
		$('#food1').text(data[3].value);
		$('#foodCals1').text(data[4].value);
		$('#serv1').text(data[5].value);
		$('#logFood').val('Edit Entry');
		$('#form')[0].reset();
		console.log($('#date'));
		console.log($('#weight'));
		console.log($('#select'));
		console.log($('#food1'));
		console.log($('#foodCals1'));
		console.log($('#serv1'));
		console.log($('#logFood')); */
};


$('#jsonButton').on('click',function(){
	$.ajax({
			url : "xhr/data.json",
			type     : "GET",
			dataType : "json",
			success  : function(data, status){
					   		console.log(status, data);
					   		var items = [data.log1,data.log2,data.log3,data.log4,data.log5,data.log6,data.log7,data.log8,data.log9,data.log10,data.log11,data.log12,data.log13,data.log14,data.log15,data.log16,data.log17,data.log18,data.log19,data.log20]
					   		for(x = 0; x < items.length; x++){
							var uniqueId = Math.floor(Math.random()*1000000000);
							localStorage.setItem(uniqueId, JSON.stringify(items[x]));
							}
						},
			error  : function(error, parseerror){
			   		 console.log(error, parseerror);
			}

	});
});

$('#xmlButton').on('click',function(){
	$.ajax({
			url : "xhr/text.xml",
			type     : "GET",
			dataType : "xml",
			success  : function(data, status){
					   		console.log(status, data);
			for(i = 1; i <= $(data).find("date1").length; i++){
				var text = "log" + i;
				var logs = {}
					logs.date 		= ["Date:",$(data).find(text+">date2").text()];
					logs.weight 	= ["Today's Weight:", $(data).find(text+">weight2").text()];
					logs.select 	= ["Meal Type:", $(data).find(text+">select2").text()];
					logs.food1 		= ["Food:", $(data).find(text+">food2").text()];
					logs.foodCals1 	= ["Calories:", $(data).find(text+">foodCals2").text()];
					logs.serv1 		= ["Servings:", $(data).find(text+">serv2").text()];

					console.log(logs)
					var uniqueId = Math.floor(Math.random()*1000000000);
					localStorage.setItem(uniqueId, JSON.stringify(logs));
			}
					 },
			error    : function(error, parseerror){
			   		   console.log(error, parseerror);
			}

	});
});



























