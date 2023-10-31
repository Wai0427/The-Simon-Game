// $(document).on("click", function(){
//     alert("Hello!");
// });
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;


//Use jQuery to detect when a keyboard key has been press, whem that happems for the first time, call nextSequence(). 
$(document).on("keypress", function(){
    if (!started){
        $("#level-title").text("Let's Begin from Level " + level + " !");
        nextSequence();
        started = true;
    };
    

});



$(".btn").on("click", function (){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    // $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(userChosenColour);
 
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    
    }

);


function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){nextSequence();}, 1000);

        }

    } else{
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 500);

        $("#level-title").text("Game Over! Press Any Key to Restart!");

        startOver();
    }
};

function nextSequence(){
    userClickedPattern = [];

    level++;

    $("#level-title").text("You are now on Level " + level + "!");

    var randomNumber = Math.floor(Math.random()*4);
    
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);


};


function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};


function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed")
    
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 300);


};


function startOver (){
    level = 0;
    gamePattern = [];
    started = false;
}