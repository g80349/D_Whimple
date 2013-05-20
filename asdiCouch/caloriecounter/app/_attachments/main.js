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


//		if(localStorage.length === 0){
//			alert("You have not logged any food so default logs were added.");
//		}
		for(i = 0; i < localStorage.length; i++){
			if($.isNumeric(localStorage.key(i)) == true){
				$('#displayList').append('<ul> <li> <ul id="list'+ i +'">');
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				var infoObj = JSON.parse(value);
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
			url : "_view/logs",
			type     : "GET",
			dataType : "json",
			success  : function(data, status){
					   		$.each(data.rows, function (index, value){
						   		var log = value.value;
						   		var i = index
						   		var date =log.date[1];
								$('#displayList').append('<li id="list'+ i +'"><h3>' + date +'</h3>');
								for(var x in log){
									if(x !== 'date'){
										var subText = log[x][0]+ " " + log[x][1];
										$('<p>').appendTo('#list'+i).text(subText).css('text-align', 'left');
									}
								}
								var edit = $('<a href="#addItem" class="edit">Edit</a>').appendTo('#displayList')
								var deleteItem = $('<a href="#" class="edit">Delete</a>').appendTo('#displayList')
								deleteItem.on('click', deleteLog);
								edit.on('click', editLog);
							});
							$('#displayList').listview('refresh');
					  },
			error  : function(error, parseerror){
			   		 console.log(error, parseerror);
			}

	});
});



























