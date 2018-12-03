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
	}
});

// Hide input field
$('.fa-plus').click(function(){
	$('input[type="text"').fadeToggle();
});