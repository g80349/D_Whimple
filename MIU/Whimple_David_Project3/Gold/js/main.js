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

		var clear = document.getElementById("clear");
		clear.addEventListener("click", clearLocal);
		var displayData = document.getElementById("displayPage");
		displayData.addEventListener("click", getData);


});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function(){
	for(var x in json){
		var uniqueId = Math.floor(Math.random()*1000000000);
		localStorage.setItem(uniqueId, JSON.stringify(json[x]));
	}
};

var getData = function(){
		if(localStorage.length === 0){
			alert("You have not logged any food so default logs were added.");
			autofillData();
		}
			var createDiv = document.createElement("div");
			createDiv.setAttribute("id", "uniqueId");
			var display = document.getElementById("localDisplay");
		for(i = 0; i < localStorage.length; i++){
			display.appendChild(createDiv);
			var createList = document.createElement("ul");
			createDiv.appendChild(createList);
			var createLi = document.createElement("li");
			var linkList = document.createElement("li");
			createList.appendChild(createLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var infoObj = JSON.parse(value);
			var createSubList = document.createElement("ul");
			createLi.appendChild(createSubList);
//			getImg(createSubList, infoObj.select[1]);
			for(var x in infoObj){
				var createSubLi = document.createElement("li");
				createSubList.appendChild(createSubLi);

				var subText = infoObj[x][0]+ " " + infoObj[x][1];
				createSubLi.innerHTML = subText;
				createSubList.appendChild(linkList);
			}
//		createLinks(localStorage.key(i), linkList);
		}
};


var storeData = function(data){
	if(!key){
		var uniqueId = Math.floor(Math.random()*1000000000);
		}else{
			uniqueId = key;
		};
		localStorage.setItem(uniqueId, JSON.stringify(data));
		alert("Log saved!");
};

var	deleteItem = function (){
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

var clearLocal = function(){
	var x = confirm("Are you sure you want to clear ALL of your food logs?");
	if(x == true){
		localStorage.clear();
	}
};


