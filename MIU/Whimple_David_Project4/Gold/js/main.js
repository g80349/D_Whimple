
$('#home').on('pageinit', function(){
	//code needed for home page goes here
});

$('#addItem').on('pageinit', function(){

		var myForm = $('#form1');
		    myForm.validate({
			invalidHandler: function(form, validator) {
			},
			submitHandler: function() {
		var data = myForm.serializeArray();
			storeData(data);
		}

	});

	//any other code needed for addItem page goes here



function myEle(x){
	var myElement = document.getElementById(x);
	return myElement;
};


//The functions below can go inside or outside the pageinit function for the page in which it is needed.

function autoFillLogs(){
	for(var x in json){
		var uniqueId = Math.floor(Math.random()*1000000000);
		localStorage.setItem(uniqueId, JSON.stringify(json[x]));
	}
};

function getData(){
		document.getElementById("localDisplay").innerHTML = "";
		if(localStorage.length === 0){
		alert("You have not logged any food so default logs were added.");
		autoFillLogs();
		}
		var display = document.getElementById("localDisplay");
	for(i = 0; i < localStorage.length; i++){
		var createList = document.createElement("ul");
		display.appendChild(createList);
		var createLi = document.createElement("li");
		var linkList = document.createElement("li");
		createList.appendChild(createLi);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var infoObj = JSON.parse(value);
		var createSubList = document.createElement("ul");
		createLi.appendChild(createSubList);
		getImg(createSubList, infoObj[2].value);
		for(var x in infoObj){
			if(infoObj[x].value !== ""){
			var createSubLi = document.createElement("li");
			createSubLi.setAttribute("id", "list");
			createSubList.appendChild(createSubLi);
			var subText = infoObj[x].name + " " + infoObj[x].value;
			createSubLi.innerHTML = subText;
			createSubList.appendChild(linkList);

			}
		}
	createLinks(localStorage.key(i), linkList);

	}
};

function getImg(createSubList, foodName){
	var createImageLi = document.createElement("li");
		createSubList.appendChild(createImageLi);
	var newImage =document.createElement("img");
	var getSrc = newImage.setAttribute("src", "images/" + foodName + ".png");
		createImageLi.appendChild(newImage);
}


function storeData(data, key){
	var id = Math.floor(Math.random()*1000000000);
    localStorage.setItem(id, JSON.stringify(data));
	alert("Log saved!");
};

//Create Edit and Delete links.

function createLinks(key,linkList){
	var edit = document.createElement("a");
	edit.href = "#editItem";
	edit.key = key;
	var editName = "Edit Log";
	edit.addEventListener("click", editLog);
	edit.innerHTML = editName;
	linkList.appendChild(edit);

	var breakLinks = document.createElement("br");
	linkList.appendChild(breakLinks);

	var del = document.createElement("a");
	del.href = "#";
	del.key = key;
	var delName = "Delete Log";
	del.addEventListener("click", deleteLog);
	del.innerHTML = delName;
	linkList.appendChild(del);
};

//Get localStorage and populate Edit page.

function editLog(){
	var val = localStorage.getItem(this.key);
	var data = JSON.parse(val);
		myEle("editdate").value              = data[0].value;
		myEle("editweight").value            = data[1].value;
		myEle("editselect").value            = data[2].value;
	if(data[3].value != undefined){
		myEle("editfood1").value             = data[3].value;
		myEle("editfoodCals1").value         = data[4].value;
		myEle("editserv1").value             = data[5].value;
	}
	if(data[6].value != undefined){
		myEle("editfood2").value             = data[6].value;
		myEle("editfoodCals2").value         = data[7].value;
		myEle("editserv2").value             = data[8].value;
	}
	if(data[9].value != undefined){
		myEle("editfood3").value             = data[9].value;
		myEle("editfoodCals3").value         = data[10].value;
		myEle("editserv3").value             = data[11].value;
	}
	if(data[12].value != undefined){
		myEle("editfood4").value             = data[12].value;
		myEle("editfoodCals4").value         = data[13].value;
		myEle("editserv4").value             = data[14].value;
	}
/*	if(userFood.check1[1] == "Notes:"){
		myEle("check1").setAttribute("checked", "checked");
		myEle("notes").style.display = "inline";
		myEle("notes").value         = userFood.notes[1];
	}
*/
	edit.addEventListener("click", editFood);
	edit.key = this.key;
};

function editFood(){
	var myForm = $('#form2');
	var id = edit.key;
	var data = myForm.serializeArray();
    localStorage.setItem(id, JSON.stringify(data));
};


function deleteLog (){
	var question = confirm("Are you sure you want to delete this log?");
		if(question){
			localStorage.removeItem(this.key);
			alert("Log deleted.");
			window.location.reload();
		}else{
			alert("Log was NOT deleted.");
			return false;
		}
};

function clearLocal(){
var x = confirm("Are you sure you want to clear ALL of your food logs?");
	if(x == true){
		localStorage.clear();
		window.location.reload();
	}
};

$(document).ready(function(){
	$("#clear").click(clearLocal)
});

var displayData = document.getElementById("display");
displayData.addEventListener("click", getData);
});
