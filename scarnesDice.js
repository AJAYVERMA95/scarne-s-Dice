var path = 'images/';
var images = [];
for(i=1;i<=6;i++){
    images.push("dice"+i+".png")
};
var userTotalScore = 0;
var userTurnScore = 0;
var compTotalScore = 0;
var compTurnScore = 0;
var diceVal = 0;

var userRoll = function(){
    randImgNo = Math.floor(Math.random()*5);
    diceVal = randImgNo + 1;
    $('#aImage').attr('src',path+images[randImgNo]);
    console.log(diceVal);
    if(diceVal != 1)userTurnScore += diceVal;
    else if (diceVal == 1){
        userTurnScore = 0;
        compChance();
    }
}
var userHold = function () {
    userTotalScore += userTurnScore;
    userTurnScore = 0;
    updateScore();
    compChance();
}
var timer;
var endCompChance = function () {
    clearInterval(timer);
};

var compChance = function(){
    console.log("in comp chance");

    timer = setInterval(function(){
        randImgNo = Math.floor(Math.random()*5);
        diceVal = randImgNo + 1;
        console.log("setInterval");
        $('#aImage').attr('src',path+images[randImgNo]);
        console.log("diceVal "+diceVal);
        if(diceVal == 1){
            console.log("if diceVal");
            updateScore();
            endCompChance();
        }
        else {compTotalScore += diceVal;}
    },3000);
};

var updateScore = function () {
    $('#userScore').empty();
    $('#userScore').append(userTotalScore);
    $('#compScore').empty();
    $('#compScore').append(compTotalScore);
};

$('#roll').click(userRoll);
$('#hold').click(userHold);
