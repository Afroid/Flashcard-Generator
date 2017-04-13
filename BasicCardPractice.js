// function BasicCard(front, back){
// 	this.front = front;
// 	this.back = back;
// 	this.msg = "Message";
// }


// var child = new BasicCard("Testing front","Testing Back");

// console.log(child.msg);


// function ClozeCard(text, cloze){
// 	this.text = text;
// 	this.cloze = cloze;
// 	// this.partial = function(){
// 	// 	console.log("Welcome to America");
// 	// }//this returns false. 
// }


// ClozeCard.prototype.partial = function (){
// 	return "welcome to americajdkfd";
// }//this returns true

// var cloze = new ClozeCard("The first president of the United States", "George Washington");

// Test.prototype = Object.create(ClozeCard.prototype);
// function Test(){
// 	ClozeCard.call(this, "Welcome", "Moving Forward");
// }

// var anotherChild = new Test();

// console.log("This is: ", cloze.partial === anotherChild.partial);

	var father = true;//if you change this to false then you'll get "Because you didn't wash the dishes"

	var fatherMade = new Promise(function(resolve, reject){
		if(father){
			var phone = {
				phone: "iPhone 7 Plus",
				car: "BMW"
			};
			resolve(phone);
		}else{
			var reason = "Because you didn't wash the dishes.";
			reject(reason);
		}
	});


	var showOff = function(phone){
		return new Promise(function(resolve, reject){
			var message = "My dad bought me " + phone.phone + " and " + phone.car;
			resolve(message);
		});
	}
	//consume the promise

	var askFather = function(){
		fatherMade
		.then(showOff)//chaining. Means if fatherMade is true, then you can use showOff.
		.then(function(data){
			console.log(data);
		})
		.catch(function(err){
			console.log(err);
		});

		//if promise fulfills it goes to then()
		//if promise fails it goes to catch();
	}

	askFather();