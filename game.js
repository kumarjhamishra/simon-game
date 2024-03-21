//alert("hey guys");

var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];


var firstKeyPress = false;
var level = 0;
$(document).keypress(function(){
    if(!firstKeyPress){
        $("h1").text("Level "+level);
        nextSequence();
        firstKeyPress = true;
    }

});

//step4
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");

        //check if the user have finished the sequence
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("Wrong");
        // var audio = new Audio("sounds/wrong.mp3");
        // audio.play();

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press any Key to restart");

        //calling the function startOver
        startOver();
    } 
}

function nextSequence(){

    //when the nextSequence is called again reset the userClickedPattern
    userClickedPattern = [];

    //var level = 0;
    level++;
    $("h1").text("Level "+level);
    
    var randomNumber = Math.floor(Math.random()*buttonColors.length);
    //return randomNumber;
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColor);
    
    //game 3
    //step3
       
}

//step5
function playSound(color){
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
}


function animatePress(currentButton){
    
    $("#"+currentButton).addClass("pressed");
    
    //remove the pressed class after 100 milliseconds
    setTimeout(function(){
        $("#"+currentButton).removeClass("pressed");
    }, 100);
}


function startOver(){
    level = 0;
    gamePattern = [];
    firstKeyPress = false;
}



