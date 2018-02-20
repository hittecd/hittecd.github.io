$("#cat_picker_form").submit(
    function(event) {
        event.preventDefault();
        var pickedCat = $('input[name=catPicker]:checked').val();

        $("#alert_msg").text("You selected " + pickedCat + " as your favorite cat. Good Choice!")
        $("#alert_container").show();
    }
);

$(".navbar-btn").hover(
    function () {
        $(this).addClass("hover");
    },
    function () {
        $(this).removeClass("hover")
    }
);

$("#confirmation_btn").click(
  function() {
      $("#alert_container").hide();
  }
);