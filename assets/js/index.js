// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var demoConfig = {
  apiKey: '### FIREBASE API KEY ###',
  authDomain: '### FIREBASE AUTH DOMAIN ###',
  projectId: '### CLOUD FIRESTORE PROJECT ID ###'
};

firebase.initializeApp(config);
var db = firebase.firestore();

db.settings({
	timestampsInSnapshots: true
});

var index = 1;

// Get todo items from firebase on first load
db.collection('items').get().then((snapshot) => {
	snapshot.forEach((document) => {
		$('ul').append(
			`<li><span class="delete"><i class="fa fa-trash"></i></span> ${document.data().item} <span class="edit"><i class="fa fa-pencil-square-o"></i></span></li>`
		);
		index ++; // Increment index to determing number of documents in the collection
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

// Sends the content to the input field to enable todo item editing
var indexOfItemToEdit = 1;
$('ul').on('click', '.edit', function(event) {
	// console.log($(this).parent().size());
	indexOfItemToEdit = $(this).parent().index() + 1;
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
		// Check if indexOfItemToEdit variable exists in the database
		db.collection('items').doc(indexOfItemToEdit.toString()).get()
		.then((doc) => {
			console.log(doc);
			if (doc.exists === false) {
				// Add data to firestore if it doesn't exist
				db.collection('items').doc(index.toString()).set({
					item: newItem,
					date: new Date().toLocaleDateString(),
					time: new Date().toLocaleTimeString()
				})
				.then((docref) => {
					console.log('Data written successfully');
				})
				.catch((error) => {
					console.log(`Error writing data ${error}`);
				});
			} else {
				db.collection('items').doc(indexOfItemToEdit.toString()).update({
					item: newItem,
					date: new Date().toLocaleDateString(),
					time: new Date().toLocaleTimeString()
				}).then(() => {
					console.log('Updated successfully');
				});
			};
		}).catch((error) => {
			console.log(error);
		});
	}
});

// Hide input field
$('.fa-plus').click(function(){
	$('input[type="text"').fadeToggle();
});
