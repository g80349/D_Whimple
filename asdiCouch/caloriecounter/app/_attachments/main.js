//David Whimple
//ASDI 1305
//Project 1
//Javascript


$('#home').on('pageinit', function(){
	//code needed for home page goes here
});

$(document).on('pageinit', '#addItem', function(){

	$('#logFood').on("click", function(){
        $('#form').validate({ submitHandler: function() {
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
			$('#form').each(function(){
			    this.reset();
			});
        }});
	});
});

$('#display').on('pageinit', function(){
	$('#display').on('pagebeforeshow', function(){
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
					$('#displayList').listview('refresh');
				});
					$('a.deleteLog').on('click', deleteLog);
					$('a.edit').on('click', editLog);
		    },
			error  : function(error, parseerror){
			   		 console.log(error, parseerror);
			}

		});
	});
	$('#display').on('pageshow', function(){
		$(this).page();
	});
});

var deleteLog = function(){
	var id = this.id;
	var itemId = $('#'+id+'').attr('data-role');
	$.couch.db('caloriecounter').openDoc(itemId,{
		success: function(data) {
			var rev = data._rev;
			var doc = {
					_id: itemId,
					_rev: rev
			}
			$.couch.db('caloriecounter').removeDoc(doc);
			var question = confirm("Are you sure you want to delete this log?");
			if(question){
				alert("Log deleted.");
			}else{
				alert("Log was NOT deleted.");
				return false;
			}
		}
	});
window.location.href ="#home"
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
};

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



























