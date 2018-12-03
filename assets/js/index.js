// Toggle class of clicked LI to gray and strike out
$('ul').on('click', 'li', function() {
	$(this).toggleClass('selected');
});

// SLowly remove the clicked LI by fadin out
$('ul').on('click', 'span', function(event){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation(); // Prevent event bubbling
});

// Get value of input and add to list
$('input[type="text"').keypress(function(event){
	// keypress event 13 stands for enter
	if (event.which === 13) {
		// Get text from input field
		let newItem = $(this).val();
		$(this).val(""); // Empties the content of the input field
		$('ul').append(`<li><span><i class="fa fa-trash"></i></span> ${newItem}</li>`);
	}
});

// Hide input field
$('.fa-plus').click(function(){
	$('input[type="text"').fadeToggle();
});