//David Whimple
//ASDI 1305
//Project 1
//Javascript


$('#home').on('pageinit', function(){
	//code needed for home page goes here
});

$('#addItem').on('pageinit', function(){

/*	$('#logFood').on("click", function(){
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
*/

	$('#logFood').on("click", function(){
		var key = $('#logFood').attr('data-role');
		var rev = $('#logFood').attr('name');
		if(key == "" || key == undefined){
			var idValue = Math.floor(Math.random()*10000000001);
			var id = 'log'+idValue;
		}else{
			var id = key;
		}
        var logs = {
        _id :  id,
        _rev : rev,
        date : ["Date:", $("#date").val()],
        weight : ["Today's Weight:", $("#weight").val()],
        select : ["Meal Type:", $("#select").val()],
        food1 : ["Food:", $("#food1").val()],
        foodCals1 : ["Calories:", $("#foodCals1").val()],
        serv1 : ["Servings:", $("#serv1").val()]
        }
        $.couch.db("caloriecounter").saveDoc(logs);
		alert("Log saved!");
		$('#logFood').removeAttr('data-role');
		$('#logFood').removeAttr('name');
		$('#logFood').attr('Log Entry');

		$('#displayList').listview('refresh');
	});

/*	$("#clear").on("click",function(){
		localStorage.clear();
	});
*/
});

$('#display').on('pageinit', function(){

	$('#displayList').empty();

	$.couch.db("caloriecounter").view("app/logs",{
			success  : function(data, status){
		   		$.each(data.rows, function (index, value){
			   		var log = value.value;
			   		var i = index
			   		var date =log.date[1];
					$('#displayList').append('<li id="list'+ i +'"><a href="#addItem" id="anchor'+ i +'" class="edit" data-role="'+value.id+'"><h3>' + date +'</h3>');
					for(var x in log){
						if(x !== 'date'){
							var subText = log[x][0]+ " " + log[x][1];
							$('<p>').appendTo('#anchor'+i).text(subText).css('text-align', 'left');
						}
					}
					$('<a href="#" id="delete'+i+'" class="deleteLog" data-role="'+value.id+'" data-icon="delete">Delete</a>').appendTo('#list'+ i);
					$('a.deleteLog').on('click', deleteLog);
					$('a.edit').on('click', editLog);
				});
				$('#displayList').listview('refresh');
		    },
			error  : function(error, parseerror){
			   		 console.log(error, parseerror);
			}

	});
});

var deleteLog = function(){
	var id = this.id;
	var itemId = $('#'+id+'').attr('data-role');
	$.couch.db('caloriecounter').openDoc(itemId,{
		success: function(data) {
			var revision = data._rev;
			$('#'+id+'').attr('name',revision);
			var rev = $('#'+id+'').attr('name');
			deleteItem();
		}
	});
	var deleteItem = function(){
		var rev = $('#'+id+'').attr('name');
		var question = confirm("Are you sure you want to delete this log?");
		if(question){
		console.log(itemId);
		console.log(rev);
		var doc = {_id: itemId, _rev: rev};
		console.log(doc)
		$.couch.db('caloriecounter').removeDoc(doc, {
		     success: function(data) {
		         console.log(data);
			 },
			error  : function(error, parseerror){
			   		 console.log(error, parseerror);
			}
		});
			alert("Log deleted.");
			window.location.reload();
		}else{
			alert("Log was NOT deleted.");
			return false;
		}
	}
};

function myEle(x){
	var myElement = document.getElementById(x);
	return myElement;
};


var editLog = function(){
	var id = this.id
	var itemId = $('#'+id+'').attr('data-role');
	$.couch.db('caloriecounter').openDoc(itemId,{
			success  : function(data, status){
				var rev = data._rev
				myEle("date").value      = data.date[1];
				myEle("weight").value    = data.weight[1];
				myEle("select").value    = data.select[1];
				myEle("food1").value     = data.food1[1];
				myEle("foodCals1").value = data.foodCals1[1];
				myEle("serv1").value     = data.serv1[1];

				$('#logFood').attr('data-role', itemId);
				$('#logFood').attr('name', rev);
				$('#logFood').attr('value', 'Edit Entry');
		}
	})


/*var editLog = function(){
		var val = localStorage.getItem(this.id);
		var data = JSON.parse(val);
		myEle("date").value              = data.date[1];
		myEle("weight").value            = data.weight[1];
		myEle("select").value            = data.select[1];
		myEle("food1").value             = data.food1[1];
		myEle("foodCals1").value         = data.foodCals1[1];
		myEle("serv1").value             = data.serv1[1];

		$('#logFood').attr('data-role', this.id);

		$('#date').text(data[0].value);
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


/*$('#jsonButton').on('click',function(){
	$('#displayList').empty();
	$.ajax({
			url : "_view/json",
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
								$('<a href="#" class="deleteLog">Delete</a>').appendTo('#displayList')
								deleteItem.on('click', deleteLog);
								edit.on('click', editLog);
							});
							$('#displayList').listview('refresh');
					  },
			error  : function(error, parseerror){
			   		 console.log(error, parseerror);
			}

	});
});*/

$('#jsonButton').on('click',function(){
	$('#displayList').empty();
	$.couch.db("caloriecounter").view("app/json",{
			success  : function(data, status){
		   		$.each(data.rows, function (index, value){
			   		var log = value.value;
			   		var i = index
			   		var date =log.date[1];
					$('#displayList').append('<li id="list'+ i +'"><a href="#addItem" id="anchor'+ i +'" class="edit" data-role="'+value.id+'"><h3>' + date +'</h3>');
					for(var x in log){
						if(x !== 'date'){
							var subText = log[x][0]+ " " + log[x][1];
							$('<p>').appendTo('#anchor'+i).text(subText).css('text-align', 'left');
						}
					}
					$('<a href="#" id="delete'+i+'" class="deleteLog" data-role="'+value.id+'" data-icon="delete">Delete</a>').appendTo('#list'+ i);
					$('a.deleteLog').on('click', deleteLog);
					$('a.edit').on('click', editLog);
				});
				$('#displayList').listview('refresh');
		    },
			error  : function(error, parseerror){
			   		 console.log(error, parseerror);
			}

	});
});



























