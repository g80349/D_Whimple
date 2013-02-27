//David Whimple
//VFW 1302
//Project 3
//Javascript

//Loads the DOM before page becomes functional

window.addEventListener("DOMContentLoaded", function(){		
	function myEle(x){
		var myElement = document.getElementById(x);
		return myElement;
	};
	
	//Switch case for Display data link.
		
	function control(x){
		switch(x){
			case "on":
			myEle("form1").style.display = "none";
			myEle("displayData").style.display = "none";
			myEle("addNewFood").style.display = "inline";
				break;
			case "off":
			myEle("form1").style.display = "block";
			myEle("displayData").style.display = "block";
			myEle("addNewFood").style.display = "none";
				break;
			default:
		};		
		return false;
	
	};
	
	//Create new form for local storage items.
	
	function getFood(){
		control("on");
		if(localStorage.length === 0){
			alert("You have not logged any food.");
			window.location.reload();
		}
		for(i = 0; i < localStorage.length; i++){
			var createDiv = document.createElement("div");
			createDiv.setAttribute("uniqueId", "information");
			var createList = document.createElement("ul");
			createDiv.appendChild(createList);
			document.body.appendChild(createDiv);			var createLi = document.createElement("li");
			var linkList = document.createElement("li");
			createList.appendChild(createLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var infoObj = JSON.parse(value);
			var createSubList = document.createElement("ul");
			createLi.appendChild(createSubList);
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

		
	//Create Edit and Delete links.
	
	function createLinks(key,linkList){
		var edit = document.createElement("a");
		edit.href = "#";
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
	
	//Get localStorage and populate previous fields.
	
	function editLog(){
		var val = localStorage.getItem(this.key);
		var userFood = JSON.parse(val);
		control("off");
			myEle("date").value              = userFood.date[1];
			myEle("weight").value            = userFood.weight[1];
			myEle("select").value            = userFood.select[1];
		if(userFood.food1 != undefined){
			myEle("food1").value             = userFood.food1[1];
			myEle("foodCals1").value         = userFood.foodCals1[1];
			myEle("range1").value            = userFood.range1[1];
			myEle("range1Value").innerHTML   = (userFood.range1[1] + " serving(s)");
		}
		if(userFood.food2 != undefined){
			myEle("food2").value             = userFood.food2[1];
			myEle("foodCals2").value         = userFood.foodCals2[1];
			myEle("range2").value            = userFood.range2[1];
			myEle("range2Value").innerHTML   = (userFood.range2[1] + " serving(s)");
		}
		if(userFood.food3 != undefined){
			myEle("food3").value             = userFood.food3[1];
			myEle("foodCals3").value         = userFood.foodCals3[1];
			myEle("range3").value            = userFood.range3[1];
			myEle("range3Value").innerHTML   = (userFood.range3[1] + " serving(s)");
		}
		if(userFood.food4 != undefined){
			myEle("food4").value             = userFood.food4[1];
			myEle("foodCals4").value         = userFood.foodCals4[1];
			myEle("range4").value            = userFood.range4[1];
			myEle("range4Value").innerHTML   = (userFood.range4[1] + " serving(s)");
		}
		if(userFood.check1[1] == "Notes:"){
			myEle("check1").setAttribute("checked", "checked");
			myEle("notes").style.display = "inline";
			myEle("notes").value         = userFood.notes[1];
		}
		submitFood.removeEventListener("click", storeFood);
		myEle("food").value = "Edit Log";
		var editFood = myEle("food");
		editFood.addEventListener("click", verify);
		editFood.key = this.key;
	};


	//Checks to see if specific inputs are empty.
	
	function verify(eventData){
		var getDate = myEle("date");
		var getWeight = myEle("weight");
		var getFood1 = myEle("food1");
		var getFoodCals1 = myEle("foodCals1");
		var messages = [];
		
		myEle("error").innerHTML = "";
		getDate.style.border = "1px solid black";
		getWeight.style.border = "1px solid black";
		getFood1.style.border = "1px solid black";
		getFoodCals1.style.border = "1px solid black";
		
		if(getDate.value === "" || getDate.value === "mm/dd/yyyy"){
			var dateError = "Please enter a date.";
			getDate.style.border = "1px solid #dfff39";
			messages.push(dateError);
		}
		if(getWeight.value === ""){
			var weightError = "Please enter your weight.";
			getWeight.style.border = "1px solid #dfff39";
			messages.push(weightError);
		}
		if(getFood1.value === ""){
			var food1Error = "Please enter a food.";
			getFood1.style.border = "1px solid #dfff39";
			messages.push(food1Error);
		}
		if(getFoodCals1.value === ""){
			var foodCals1Error = "Please enter calories.";
			getFoodCals1.style.border = "1px solid #dfff39";
			messages.push(foodCals1Error);
		}
		if(messages.length > 0){
			for(var i = 0; i < messages.length; i++){
				var text = document.createElement("li");
				text.innerHTML = messages[i];
				myEle("error").appendChild(text);
			}
		eventData.preventDefault();
		return false;
		}else{
			storeFood(this.key);
		}
	};
	
	//Delete specific log in local storage.
	
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
	
	//Clear all of local storage.
		
	function clearInfo(){
		var x = confirm("Are you sure you want to clear ALL of your food logs?");
		if(x == true){
			localStorage.clear();
		}
		
	};
	
	//Add up all calories and serving sizes for the total calories
	
	function getCals(){
    	var totalCals = (range1.value * foodCals1.value)+(range2.value * foodCals2.value)+(range3.value * foodCals3.value)+(range4.value * foodCals4.value);
    	return totalCals;
	};
	
	//Looks to see if notes checkbox is checked and assigns a value.
	
	function isChecked(){
		if(myEle("check1").checked){
			checkValue = "Notes:";
		}else{
			checkValue = "";
		}
	};
	
	//When checked textarea appears. When unchecked textarea disappears.
	
	function addNotes(){
		if(myEle("check1").checked){
			myEle("notes").style.display = "inline";
		}else{
			myEle("notes").style.display = "none";
		}
	};
	
	//Stores all information as strings in local storage  and gives a and ID unless it already has one.
	
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
			userFood.select    = ["Meal Type:", myEle("select").value];
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

	//Sets the range label to the value of the range slider
	
	function getServings(){
		myEle("range1Value").innerHTML = (range1.value + " serving(s)");
		myEle("range2Value").innerHTML = (range2.value + " serving(s)");
		myEle("range3Value").innerHTML = (range3.value + " serving(s)");
		myEle("range4Value").innerHTML = (range4.value + " serving(s)");
	};
	
	//Event listeners for button, links, and sliders
	
	var submitFood = myEle("food");
	submitFood.addEventListener("click", verify);
	var clear = myEle("clear");					
	clear.addEventListener("click", clearInfo);  
	var displayData = myEle("displayData");
	displayData.addEventListener("click", getFood);
	var range1 = myEle("range1");
	range1.addEventListener("change",getServings);
	var range2 = myEle("range2");
	range2.addEventListener("change",getServings);
	var range3 = myEle("range3");
	range3.addEventListener("change",getServings);
	var range4 = myEle("range4");
	range4.addEventListener("change",getServings);
	var check1 = myEle("check1");
	check1.addEventListener("click", addNotes);
	
	
});