var navBtnPhoneTabMap = {
    "nav_btn_dialer": "#tab_dialer",
    "nav_btn_contacts": "#tab_contacts",
    "nav_btn_add_contact": "#tab_add_contact",
    "nav_btn_gestures": "#tab_gestures",
    "nav_btn_about": "#tab_about"
};

var UNDEFINED = -1;
var MOUSE_UP = 0;
var MOUSE_DOWN = 1;
var SWIPE_UP = 2;
var SWIPE_DOWN = 3;
var SWIPE_LEFT = 4;
var SWIPE_RIGHT = 5;

var gestureStatus = UNDEFINED;
var down_x;
var down_y;
var current_x;
var current_y;

var isHighVis = true;

function hideTabs() {
    $(".phone-tab").hide();
}

function toggleVisibility() {
    if(isHighVis) {
        $(".high-vis").each(
            function() {
                $(this).removeClass("high-vis");
                $(this).addClass("low-vis");
            }
        );

        $("#toggle_vis_btn").text("Toggle Low Visibility");

        $("#about_body").text("Low Visibility Mode");

        isHighVis = false;
    }
    else {
        $(".low-vis").each(
            function() {
                $(this).removeClass("low-vis");
                $(this).addClass("high-vis");
            }
        );

        $("#toggle_vis_btn").text("Toggle High Visibility");

        $("#about_body").text("High Visibility Mode");

        isHighVis = true;
    }
}

function updateGestureStatus(status) {
    gestureStatus = status;

    var gestureStatusStr;
    switch(status) {
        case UNDEFINED:
            gestureStatusStr = "undefined";
            break;

        case MOUSE_UP:
            gestureStatusStr = "mouse up";
            break;

        case MOUSE_DOWN:
            gestureStatusStr = "mouse down";
            break;

        case SWIPE_UP:
            gestureStatusStr = "swipe up";
            break;

        case SWIPE_DOWN:
            gestureStatusStr = "swipe down";
            break;

        case SWIPE_LEFT:
            gestureStatusStr = "swipe left";
            break;

        case SWIPE_RIGHT:
            gestureStatusStr = "swipe right";
            break;
    }

    $("#gesture_display").text(gestureStatusStr);
}

function toDegrees(radians) {
    return radians * (180/Math.PI);
}

function isPos(num) {
    return (Math.sign(num) === 1 || Math.sign(num) === 0);
}

function calculateSwipe() {
    var adjacent = current_x - down_x;
    var opposite = current_y - down_y;

    if(Math.abs(adjacent) < 10 && Math.abs(opposite) < 10)
        return;

    var theta = toDegrees(Math.atan(Math.abs(opposite) / Math.abs(adjacent)));

    if(isPos(adjacent) && isPos(opposite)) {
        if(theta <= 45.0) {
            updateGestureStatus(SWIPE_RIGHT);
        }
        else {
            updateGestureStatus(SWIPE_DOWN);
        }
    }
    else if(isPos(adjacent) && !isPos(opposite)) {
        if(theta <= 45.0) {
            updateGestureStatus(SWIPE_RIGHT);
        }
        else {
            updateGestureStatus(SWIPE_UP);
        }
    }
    else if(!isPos(adjacent) && isPos(opposite)) {
        if(theta <= 45.0) {
            updateGestureStatus(SWIPE_LEFT);
        }
        else {
            updateGestureStatus(SWIPE_DOWN);
        }
    }
    else {
        if(theta <= 45.0) {
            updateGestureStatus(SWIPE_LEFT);
        }
        else {
            updateGestureStatus(SWIPE_UP);
        }
    }
}

$("#gesture_pad").hover(
    function() {
        updateGestureStatus(MOUSE_UP);
    },
    function() {
        updateGestureStatus(UNDEFINED);
    }
);

$("#gesture_pad").mouseup(
    function() {
        updateGestureStatus(MOUSE_UP);
    }
);

$("#gesture_pad").mousedown(
    function(event) {
        updateGestureStatus(MOUSE_DOWN);
        down_x = event.clientX;
        down_y = event.clientY;
    }
);

$("#gesture_pad").mousemove(
    function(event) {
        if(gestureStatus != MOUSE_UP) {
            current_x = event.clientX;
            current_y= event.clientY;

            calculateSwipe();
        }
    }
);

$(".keypad-btn").click(
    function () {
        if($(this).attr("id") == "dialer_clear_btn") {
            $("#dialer_num_display").text("");
        }
        else {
            var keyVal = $(this).text();
            var dialerVal = $("#dialer_num_display").text();
            $("#dialer_num_display").text(dialerVal + keyVal);
        }
    }
);

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

        if(targetTabId === "#tab_gestures")
            updateGestureStatus(UNDEFINED);

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
);

$(".keypad-btn").hover(
    function () {
        $(this).addClass("hover");
    },
    function () {
        $(this).removeClass("hover");
    }
);

$(".add-contact-btn").hover(
    function () {
        $(this).addClass("hover");
    },
    function () {
        $(this).removeClass("hover");
    }
);

$("#toggle_vis_btn").hover(
    function () {
        $(this).addClass("hover");
    },
    function () {
        $(this).removeClass("hover");
    }
);

function setup() {
    $("#nav_btn_dialer").click();
}