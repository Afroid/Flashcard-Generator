const inquirer = require("inquirer");

fs = require('fs');


//Constructor for the Cloze Cards
function ClozeCard(text, cloze){
	this.text = text;
	this.cloze = cloze;
}

//Constructor for the Basic Cards
function BasicCard(front, back){
	this.front = front;
	this.back = back;
}

//Partial function for Cloze Cards that will check to make sure
//the text on the front of the card includes what's on the back
//of the card, if so, then it replaces that part of the phrase on 
//the front of the card with "..."
ClozeCard.prototype.partial = function (){

	if (this.text.includes(this.cloze)) {
		return this.text.replace(this.cloze, "...");
	} else {
		console.log("The phrase on the back of the card wasn't included " +
			"in the phrase on the front of the card.");
	}
};


//Prompts the user in the CLI. 
inquirer.prompt({
	type: "list",//Provide a list of options
	name: "studyCardType",//The type of study card they choose from inquirer
	message: "Choose your type of study card below:",//Initial phrase prompted to the user
	choices: ["Basic Card", "Cloze Card"]//Returns their choice
}).then(function(data){//Our first promise.

//If the selection is BasicCard, then we prompt them to enter information for the 
//front and back of the card accordingly, else we prompt them and it asks them
//for a phrase and an answer/deletion since it'll be Cloze.
	if (data.studyCardType === "Basic Card") {
		return inquirer.prompt([
		{
			type: "input",
			name: "front",
			message: "Add your phrase to the front of the Basic Card:"
		},

		{
			type: "input",
			name: "back",
			message: "Add your answer to the back of the Basic Card:"
		}
		]);
	} else if(data.studyCardType === "Cloze Card") {
		return inquirer.prompt([
		{
			type: "input",
			name: "text",
			message: "Add your phrase to the front of the Cloze Card:"
		},

		{
			type: "input",
			name: "cloze",
			message: "Add your answer/deletion message to the back of the Cloze Card:"
		}
		]);
	}

}).then(function(data){

//If data.front is true, meaning it's being used, then we make 
//use of our constructor at the beginning to make an instance of
//the Basic Card type and then add the data for front and back, 
//else we make an instance of Cloze Card and add the data for 
//front, back, and the partial that gets replaced with "..."
	if (data.front) {
		var basicCardz = new BasicCard(data.front, data.back);
		addCards({data: basicCardz});
	}
	else {
		var clozeCardz = new ClozeCard(data.text, data.cloze);
		addCards({data: clozeCardz, partial: clozeCardz.partial()});
	}

})
.catch(function(err){
	console.log(err);//Logs an error if one is caught
});


//Method that's called based on our if/else condition in our final promise.
//It reads the data.json file we have, parses the data into a variable, then
//pushes the information we passed into the function onto the array we've 
//parsed, thus adding it to it. Then it takes that new/modified information and writes
//it to the data.json file.
var addCards = function (add){

	fs.readFile("./data.json", "utf8", function (error, data){
		if (error) {
			throw error;
		}

		var arr = JSON.parse(data);
		arr.studyCardData.push(add);

		fs.writeFile("./data.json", JSON.stringify(arr), "utf8", function(err){
			if (err) {
				throw err;
			}
			console.log("Process completed!!");
		});
	});
}