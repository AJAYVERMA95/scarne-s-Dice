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
var message = {
    "user" : "YOUR TURN",
    "comp" : "COMPUTER's TURN"
};
var changeMessage = function(text){
    var messageID = $('#message');
    messageID.empty();
    messageID.html(text);
}

var userRoll = function(){
    randImgNo = Math.floor(Math.random()*5);
    diceVal = randImgNo + 1;
    $('#aImage').attr('src',path+images[randImgNo]);
    console.log(diceVal);
    if(diceVal != 1)userTurnScore += diceVal;
    else if (diceVal == 1){
        userTurnScore = 0;
        changeMessage(message.comp);
        compChance();
    }
}
var userHold = function () {
    userTotalScore += userTurnScore;
    userTurnScore = 0;
    updateScore();
    changeMessage(message.comp);
    compChance();
}
var timer;
var endCompChance = function () {
    clearInterval(timer);
    changeMessage(message.user);
    $('#roll').removeAttr('disabled');
    $('#hold').removeAttr('disabled');
};

var compChance = function(){
    $('#roll').attr('disabled',true);
    $('#hold').attr('disabled',true);
    timer = setInterval(function(){
        randImgNo = Math.floor(Math.random()*5);
        diceVal = randImgNo + 1;
        $('#aImage').attr('src',path+images[randImgNo]);
        if(diceVal == 1){
            updateScore();
            endCompChance();
        }
        else {compTotalScore += diceVal;}
    },2000);
};

var updateScore = function () {
    $('#userScore p').empty();
    $('#userScore p').append(userTotalScore);
    $('#compScore p').empty();
    $('#compScore p').append(compTotalScore);
};

$('#roll').click(userRoll);
$('#hold').click(userHold);
$('#reset').click(function () {
    location.reload();
});
