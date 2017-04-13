var inquirer = require("inquirer");

fs = require('fs');

function ClozeCard(text, cloze){
	this.text = text;
	this.cloze = cloze;
}

function BasicCard(front, back){
	this.front = front;
	this.back = back;
}

ClozeCard.prototype.partial = function (){

	if(this.text.includes(this.cloze)){
		console.log("Yes");
		return this.text.replace(this.cloze, "...");
	}else{
		console.log("No");
	}
	// this.text.replace(this.cloze, "...");
};

var questions = [

{
	type: "list",
	name: "Cards",
	message: "Choose your Card?",
	choices: ["Basic Card", "ClozeCard"]
}, 

{
	type: "input",
	name: "front",
	message: "Enter message for the front: "
},

{
	type: "input",
	name: "back",
	message: "Enter answer for the back: "
}

];

var cloze = new ClozeCard("George Washington was the first president of the United States", "George Washington");

var john = new ClozeCard("John is awesome", "John");

// console.log(cloze.partial());

// console.log(john.partial());


// inquirer.prompt(questions)
// .then(function(data){
// 	console.log(data);
// })
// .catch(function(err){
// 	console.log(err);
// });


inquirer.prompt({
	type: "list",
	name: "cards",
	message: "Choose your card?",
	choices: ["BasicCard", "Clozure"]
}).then(function(data){
	if(data.cards === "BasicCard"){
		return inquirer.prompt([
		{
			type: "input",
			name: "front",
			message: "Add your message to the front of the Basic Card"
		},{
			type: "input",
			name: "back",
			message: "Add your message to the back of the Basic Card"
		}
		]);
	}

	else{
		return inquirer.prompt([
		{
			type: "input",
			name: "text",
			message: "Add your message to the front of the Cloze Card"
		},

		{
			type: "input",
			name: "cloze",
			message: "Add your answer/deletion message to the back of the Cloze Card"
		}
		]);
	}

}).then(function(data){
	//if statements should go here.

	if(data.front){
		var basicCardz = new BasicCard(data.front, data.back);
		addCards({data: basicCardz});
	}else{
		var clozeCardz = new ClozeCard(data.text, data.cloze);
		addCards({data: clozeCards, partial: firstPresident.partial()});
	}

	// var obj = {

	// };
	console.log({data: firstPresident, partial: firstPresident.partial()});
})
.catch(function(err){
	console.log(err);	
});


var addCards = function (add){

	fs.readFile("./data.json", "utf8", function (error, data){
		if(error) {
			throw error;
		}

		var arr = JSON.parse(data);
		console.log(arr);
		console.log(data);
		console.log("Data World");

		arr.cards.push(add);
		console.log(arr);

		fs.writeFile("./data.json", JSON.stringify(arr), "utf8", function(err){
			if(err) {
				throw err;
			}
			console.log("Process completed!!");
		});
	});
}


// var result = fs.readFileSync("./data.json", "utf8");
// console.log(result);
// console.log("Goodbye World");