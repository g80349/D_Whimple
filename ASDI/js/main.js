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
		if($.isNumeric(localStorage.key(i)) == true){
			$('#displayList').append('<ul> <li> <ul id="list'+ i +'">');
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var infoObj = JSON.parse(value);
			for(var x in infoObj){
				if(infoObj[x].value !== "" && infoObj[x].value !== undefined){
				var subText = infoObj[x].name + " " + infoObj[x].value;
				$('<li>').appendTo('#list'+i).text(subText).css('text-align', 'left');
				}
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
		myEle("date").value              = data[0].value;
		myEle("weight").value            = data[1].value;
		myEle("select").value            = data[2].value;
		myEle("food1").value             = data[3].value;
		myEle("foodCals1").value         = data[4].value;
		myEle("serv1").value             = data[5].value;

		$('#logFood').attr('id', 'editFood');
		$('#editFood').attr('data-role', this.id);
		$('#editFood').on('click', function(){
			var key = $('#editFood').attr('data-role');
			console.log(key);
			var data = $('#form').serializeArray();
		    localStorage.setItem(key, JSON.stringify(data));
			alert("Edit Saved!");
			$('#editFood').attr('id', 'logFood');
		});

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

