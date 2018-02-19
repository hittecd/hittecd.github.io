$("#cat_picker_form").submit(
    function(event) {
        event.preventDefault();
        var pickedCat = $('input[name=catPicker]:checked').val();

        alert("You selected " + pickedCat + " as your favorite cat. Good Choice!");
    }
);
