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
<<<<<<< HEAD
			storeData(data);
		}
	});

		var clear = document.getElementById("clear");
		clear.addEventListener("click", clearLocal);
		var displayData = document.getElementById("displayPage");
		displayData.addEventListener("click", getData);


=======
			storeFood(data);
		}
	});

		function myEle(x){
		var myElement = document.getElementById(x);
		return myElement;
	};


	var storeFood = function(key){
//	if(!key){
		var uniqueId = Math.floor(Math.random()*1000000000);
//		}else{
//			uniqueId = key;
//		};
		var userFood           = {};
			userFood.date      = ["Date:", myEle("date").value];
			userFood.weight    = ["Today's Weight:", myEle("weight").value];
			userFood.select    = ["Meal:", myEle("select").value];
			if(myEle("food1").value != ""){
			userFood.food1	   = ["Food:", myEle("food1").value];
			userFood.foodCals1 = ["Calories:", myEle("foodCals1").value];
			userFood.range1    = ["Serving(s):", myEle("serv1").value];
			}
			if(myEle("food2").value != ""){
			userFood.food2	   = ["Food:", myEle("food2").value];
			userFood.foodCals2 = ["Calories:", myEle("foodCals2").value];
			userFood.range2    = ["Serving(s):", myEle("serv2").value];
			}
			if(myEle("food3").value != ""){
			userFood.food3	   = ["Food:", myEle("food3").value];
			userFood.foodCals3 = ["Calories:", myEle("foodCals3").value];
			userFood.range3    = ["Serving(s):", myEle("serv3").value];
			}
			if(myEle("food4").value != ""){
			userFood.food4	   = ["Food:", myEle("food4").value];
			userFood.foodCals4 = ["Calories:", myEle("foodCals4").value];
			userFood.range4    = ["Serving(s):", myEle("serv4").value];
			}
//			userFood.totalCal  = ["Total Calories:", getCals()];
//			userFood.check1    = ["", checkValue];
//			if(checkValue === "Notes:"){
//			userFood.notes     = ["", myEle("notes").value];
//			}
		localStorage.setItem(uniqueId, JSON.stringify(userFood));
		alert("Log saved!");
};


		var clear = document.getElementById("clear");
		clear.addEventListener("click", clearLocal);
		var displayData = document.getElementById("display");
		displayData.addEventListener("click", getData);



>>>>>>> Working-Copy
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function(){
	for(var x in json){
		var uniqueId = Math.floor(Math.random()*1000000000);
		localStorage.setItem(uniqueId, JSON.stringify(json[x]));
	}
};

var getData = function(){
<<<<<<< HEAD
	if(localStorage.length === 0){
		alert("You have not logged any food so default logs were added.");
		autofillData();
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
//		getImg(createSubList, infoObj.select[1]);
		console.log(infoObj.name);
		for(var x in infoObj){
			var createSubLi = document.createElement("li");
			createSubList.appendChild(createSubLi);
			var subText = infoObj[x]+ " " + infoObj[x];
			createSubLi.innerHTML = subText;
			createSubList.appendChild(linkList);
		}
//		createLinks(localStorage.key(i), linkList);
	}
};


var storeData = function(data){
//	if(!key){
		console.log(data)
		var uniqueId = Math.floor(Math.random()*1000000000);
//		}else{
//			uniqueId = key;
//		};
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
=======
		if(localStorage.length === 0){
			alert("You have not logged any food so default logs were added.");
			autofillData();
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
			getImg(createSubList, infoObj.select[1]);
			for(var x in infoObj){
				var createSubLi = document.createElement("li");
				createSubList.appendChild(createSubLi);
				var subText = infoObj[x][0]+ " " + infoObj[x][1];
				createSubLi.innerHTML = subText;
				createSubList.appendChild(linkList);
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
>>>>>>> Working-Copy
};

var clearLocal = function(){
	var x = confirm("Are you sure you want to clear ALL of your food logs?");
	if(x == true){
		localStorage.clear();
<<<<<<< HEAD
=======
		window.location.reload();
>>>>>>> Working-Copy
	}
};


<<<<<<< HEAD
=======

>>>>>>> Working-Copy
