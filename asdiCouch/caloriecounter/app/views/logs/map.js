function(doc) {
	if (doc._id.substr(0,3) === "log") {
		emit(doc._id, {
			"date" : doc.date,
			"weight" : doc.weight,
			"select" : doc.select,
			"food1" : doc.food1,
			"foodCals1" : doc.foodCals1,
			"serv1" : doc.serv1
		});
	}
};