//David Whimple
//VFW 1302
//Project 2
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
		}		return false;
	}; 
	
	//Create new form for local storage items. If there isn't anything in local storage refresh window.
	
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
			document.body.appendChild(createDiv);
			var createLi = document.createElement("li");
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
				}	
		}
	};
	
	//Clear all of local storage.
		
	function clearInfo(){
		var x = confirm("Are you sure you want to clear ALL of your food logs?")
		if(x == true){
			localStorage.clear();
		}
		
	};
	
	//Add up all calories and serving sizes for the total calories
	
	function getCals(){
    	var totalCals = (range1.value * foodCals1.value)+(range2.value * foodCals2.value)+(range3.value * foodCals3.value)+(range4.value * foodCals4.value);
    	return totalCals;
	};
	//When checked textarea appears. When unchecked textarea disappears.
	
	function addNotes(){
		if(myEle("check1").checked){
			myEle("notes").style.display = "inline";
		}else{
			myEle("notes").style.display = "none";
		}
	};
	
	//Stores all information as strings in local storage
	
	function storeFood(){
		var uniqueId = Math.floor(Math.random()*1000000000);
		var userFood           = {};
			userFood.date      = ["Date:", myEle("date").value];
			userFood.weight    = ["Today's Weight:", myEle("weight").value]; 
			userFood.select    = ["Meal Type:", myEle("select").value];
			if(myEle("food1").value != ""){
			userFood.food1	   = ["Food:", myEle("food1").value];
			userFood.foodCals1 = ["Calories:", myEle("foodCals1").value];
			userFood.range1    = ["Serving(s):", myEle("range1").value]
			}
			if(myEle("food2").value != ""){
			userFood.food2	   = ["Food:", myEle("food2").value];
			userFood.foodCals2 = ["Calories:", myEle("foodCals2").value];
			userFood.range2    = ["Serving(s):", myEle("range2").value]
			}
			if(myEle("food3").value != ""){
			userFood.food3	   = ["Food:", myEle("food3").value];
			userFood.foodCals3 = ["Calories:", myEle("foodCals3").value];
			userFood.range3    = ["Serving(s):", myEle("range3").value]
			}
			if(myEle("food4").value != ""){
			userFood.food4	   = ["Food:", myEle("food4").value];
			userFood.foodCals4 = ["Calories:", myEle("foodCals4").value];
			userFood.range4    = ["Serving(s):", myEle("range4").value]
			}
			userFood.totalCal = ["Total Calories:", getCals()]
			if(myEle("check1").checked){
			userFood.notes     = ["Notes:", myEle("notes").value];
			}
			localStorage.setItem(uniqueId, JSON.stringify(userFood));
			alert("Food Log saved!");
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
	submitFood.addEventListener("click", storeFood);
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