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
	
function getCals(){
	var totalCals = (range1.value * foodCals1.value)+(range2.value * foodCals2.value)+(range3.value * foodCals3.value)+(range4.value * foodCals4.value);
	return totalCals;
};

function getImg(createSubList, foodName){
	var createImageLi = document.createElement("li");
	createSubList.appendChild(createImageLi);
	var newImage =document.createElement("img");
	var getSrc = newImage.setAttribute("src", "images/" + foodName + ".png");
	createImageLi.appendChild(newImage);
}

});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

function autoFillLogs(){

	for(var x in json){
		var uniqueId = Math.floor(Math.random()*1000000000);
		localStorage.setItem(uniqueId, JSON.stringify(json[x]));
	}
};

function getFood(){
	control("on");
	if(localStorage.length === 0){
		alert("You have not logged any food so default logs were added.");
		autoFillLogs();
	}
	for(i = 0; i < localStorage.length; i++){
		var createDiv = document.createElement("div");
		createDiv.setAttribute("uniqueId", "information");
		var createList = document.createElement("ul");
		createDiv.appendChild(createList);
		document.body.appendChild(createDiv);
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

function storeFood(key){
	if(!key){
		var uniqueId = Math.floor(Math.random()*1000000000);
		}else{
			uniqueId = key;
		};
	isChecked();
	var userFood           = {};
		userFood.date      = ["Date:", myEle("date").value];
		userFood.weight    = ["Today's Weight:", myEle("weight").value]; 
		userFood.select    = ["Meal:", myEle("select").value];
		if(myEle("food1").value != ""){
		userFood.food1	   = ["Food:", myEle("food1").value];
		userFood.foodCals1 = ["Calories:", myEle("foodCals1").value];
		userFood.range1    = ["Serving(s):", myEle("range1").value];
		}
		if(myEle("food2").value != ""){
		userFood.food2	   = ["Food:", myEle("food2").value];
		userFood.foodCals2 = ["Calories:", myEle("foodCals2").value];
		userFood.range2    = ["Serving(s):", myEle("range2").value];
		}
		if(myEle("food3").value != ""){
		userFood.food3	   = ["Food:", myEle("food3").value];
		userFood.foodCals3 = ["Calories:", myEle("foodCals3").value];
		userFood.range3    = ["Serving(s):", myEle("range3").value];
		}
		if(myEle("food4").value != ""){
		userFood.food4	   = ["Food:", myEle("food4").value];
		userFood.foodCals4 = ["Calories:", myEle("foodCals4").value];
		userFood.range4    = ["Serving(s):", myEle("range4").value];
		}
		userFood.totalCal  = ["Total Calories:", getCals()];
		userFood.check1    = ["", checkValue];
		if(checkValue === "Notes:"){
		userFood.notes     = ["", myEle("notes").value];
		}
		localStorage.setItem(uniqueId, JSON.stringify(userFood));
		alert("Log saved!");
};

function deleteLog(key){
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
					
function clearInfo(){
	var x = confirm("Are you sure you want to clear ALL of your food logs?");
	if(x == true){
		localStorage.clear();
	}
	
};


