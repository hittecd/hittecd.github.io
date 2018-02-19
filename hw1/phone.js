function hideTabs() {
    $(".phone-tab").hide();
}

var navBtnPhoneTabMap = {
    "nav_btn_dialer": "#tab_dialer",
    "nav_btn_contacts": "#tab_contacts",
    "nav_btn_add_contact": "#tab_add_contact"
};

$("#add_contact_form").submit(
    function(event) {
        event.preventDefault();

    }
);

$(".nav-bar-btn").click(
    function() {
        // hide elements
        hideTabs();

        // show target tab
        var callerBtnId = $(this).prop("id");
        var targetTabId = navBtnPhoneTabMap[callerBtnId];
        $(targetTabId).show();

        // update nav bar icon
        $(".nav-bar-btn").each(
            function() {
                $(this).removeClass("selected");
                $(this).removeClass("hover");
            }
        );

        $(this).addClass("selected");
    }
);

$(".nav-bar-btn").hover(
    function () {
        if(!$(this).hasClass("selected")) {
            $(this).addClass("hover");
        }
    },
    function () {
        if(!$(this).hasClass("selected")) {
            $(this).removeClass("hover")
        }
    }
)

$("#dialer_call_btn").hover(
    function () {
        $(this).css("background-color", "lightgreen");
        $(this).css("color", "black");
    },
    function () {
        $(this).css("background-color", "limegreen");
        $(this).css("color", "white");
    }
)

$("#dialer_clear_btn").hover(
    function () {
        $(this).css("background-color", "lightcoral");
        $(this).css("color", "black");
    },
    function () {
        $(this).css("background-color", "red");
        $(this).css("color", "white");
    }
)

$(".keypad-btn").hover(
    function () {
        var backgroundColor;
        var callerId = $(this).attr('id');

        if(callerId === "dialer_call_btn")
            backgroundColor = "lightgreen";
        else if(callerId === "dialer_clear_btn")
            backgroundColor = "lightcoral";
        else
            backgroundColor = "lightgray";

        $(this).css("background-color", backgroundColor);
        $(this).css("color", "black");
    },
    function () {
        var backgroundColor;
        var callerId = $(this).attr('id');

        if(callerId === "dialer_call_btn")
            backgroundColor = "limegreen";
        else if(callerId === "dialer_clear_btn")
            backgroundColor = "red";
        else
            backgroundColor = "gray";

        $(this).css("background-color", backgroundColor)
        $(this).css("color", "white");
    }
)

$(".add-contact-btn").hover(
    function () {
        $(this).css("background-color", "lightgray");
        $(this).css("color", "black");
    },
    function () {
        $(this).css("background-color", "gray")
        $(this).css("color", "white");
    }
)

function setup() {
    $("#nav_btn_dialer").click();
}