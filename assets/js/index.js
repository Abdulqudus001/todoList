// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
	apiKey: "AIzaSyB8IZneKgocwhhpJW1e8wHY-mAxBMREAmo",
	authDomain: "todolist-b1426.firebaseapp.com",
	databaseURL: "https://todolist-b1426.firebaseio.com",
	projectId: "todolist-b1426",
	storageBucket: "todolist-b1426.appspot.com",
	messagingSenderId: "138602765444"
};

firebase.initializeApp(config);
var db = firebase.firestore();

db.settings({
	timestampsInSnapshots: true
});

// Get todo items from firebase on first load
db.collection('items').get().then((snapshot) => {
	snapshot.forEach((document) => {
		$('ul').append(
			`<li><span class="delete"><i class="fa fa-trash"></i></span> ${document.data().item} <span class="edit"><i class="fa fa-pencil-square-o"></i></span></li>`
		);
	});
});


// Toggle class of clicked LI to gray and strike out
$('ul').on('click', 'li', function() {
	$(this).toggleClass('selected');
});

// SLowly remove the clicked LI by fading out
$('ul').on('click', '.delete', function(event){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation(); // Prevent event bubbling
});

// Sends the content to the input field 
$('ul').on('click', '.edit', function(event) {
	$('input[type="text"').val(`${$(this).parent().text()}`);  
	$(this).parent().remove();
	event.stopPropagation();
});

// Get value of input and add to list
$('input[type="text"').keypress(function(event){
	// keypress event 13 stands for enter
	if (event.which === 13) {
		// Get text from input field
		let newItem = $(this).val();
		$(this).val(""); // Empties the content of the input field
		$('ul').append(`<li><span class="delete"><i class="fa fa-trash"></i></span> ${newItem} <span class="edit"><i class="fa fa-pencil-square-o"></i></span></li>`);
		// Add data to firestore
		db.collection('items').add({
			item: newItem,
			date: new Date().toLocaleDateString(),
			time: new Date().toLocaleTimeString()
		})
		.then((docref) => {
			console.log('Data written successfully');
		})
		.catch((error) => {
			console.log(`Error writing data ${error}`);
		})
	}
});

// Hide input field
$('.fa-plus').click(function(){
	$('input[type="text"').fadeToggle();
});
