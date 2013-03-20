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
		var myDisplay = $("#displayPage");
		
		var clear = document.getElementById("clear");					
		clear.addEventListener("click", clearLocal);  

	
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
			autoFillLogs();
		}
		for(i = 0; i < localStorage.length; i++){
			var createDiv = document.createElement("div");
			div.localDisplay.appendChild(createDiv);
			createDiv.setAttribute("uniqueId", "id");
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

var storeData = function(data){
//	if(!key){
		var uniqueId = Math.floor(Math.random()*1000000000);
//		}else{
//			uniqueId = key;
//		};
		var userFood           = {};
			userFood.date      = ["Date:", document.getElementById("date").value];
			userFood.weight    = ["Today's Weight:", document.getElementById("weight").value]; 
			userFood.select    = ["Meal:", document.getElementById("select").value];
			if(document.getElementById("food1").value != ""){
			userFood.food1	   = ["Food:", document.getElementById("food1").value];
			userFood.foodCals1 = ["Calories:", document.getElementById("foodCals1").value];
			userFood.range1    = ["Serving(s):", document.getElementById("range1").value];
			}
			if(document.getElementById("food2").value != ""){
			userFood.food2	   = ["Food:", document.getElementById("food2").value];
			userFood.foodCals2 = ["Calories:", document.getElementById("foodCals2").value];
			userFood.range2    = ["Serving(s):", document.getElementById("range2").value];
			}
			if(document.getElementById("food3").value != ""){
			userFood.food3	   = ["Food:", document.getElementById("food3").value];
			userFood.foodCals3 = ["Calories:", document.getElementById("foodCals3").value];
			userFood.range3    = ["Serving(s):", document.getElementById("range3").value];
			}
			if(document.getElementById("food4").value != ""){
			userFood.food4	   = ["Food:", document.getElementById("food4").value];
			userFood.foodCals4 = ["Calories:", document.getElementById("foodCals4").value];
			userFood.range4    = ["Serving(s):", document.getElementById("range4").value];
			}
//			userFood.totalCal  = ["Total Calories:", getCals()];
//			userFood.check1    = ["", checkValue];
//			if(checkValue === "Notes:"){
//			userFood.notes     = ["", myEle("notes").value];
//			}
		localStorage.setItem(uniqueId, JSON.stringify(userFood));
		alert("Log saved!");
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){
	var x = confirm("Are you sure you want to clear ALL of your food logs?");
	if(x == true){
		localStorage.clear();
	}
};


