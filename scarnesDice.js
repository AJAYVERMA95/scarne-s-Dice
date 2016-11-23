var diceVal = 0;
var path = 'images/';
var images = [];
for(i=1;i<=6;i++){
    images[i] = "dice"+i+".png";
};
var message = {
    "user" : "YOUR TURN",
    "comp" : "COMPUTER's TURN"
};

Player = function(id){
    this.id = id;
    this.turnScore = 0;
    this.totalScore = 0;
}
Player.prototype.updateScore = function () {
    var queryId = "#"+this.id+"Score";
    $(queryId + ' p').empty();
    $(queryId + ' p:eq(0)').append(this.totalScore);
    $(queryId + ' p:eq(1)').append(this.turnScore);
};
Player.prototype.hold = function(){
    this.totalScore += this.turnScore;
    this.turnScore = 0;
    this.updateScore();
}
var user = new Player("user");
var comp = new Player("comp");
var allPlayers = [user,comp];

var showRandomDiceImg = function(){
    var randomNum = Math.floor(Math.random()*6);    //0 to 5
    diceVal = randomNum + 1;  // 1 to 6
    $('#aImage').attr('src',path+images[diceVal]);
}

var turnSwitch = function(previousPlayerTurn){
    var nextPlayerTurn;
    if(previousPlayerTurn.id == 'user')nextPlayerTurn = comp;
    if(previousPlayerTurn.id == 'comp')nextPlayerTurn = user;
    return nextPlayerTurn;
};

var changeMessage = function(text){
    var messageID = $('#message');
    messageID.empty();
    messageID.html('<b>'+text+'</b>');
}

var roll = function(aPlayer){
    if(aPlayer.id == 'user'){
        showRandomDiceImg();
        // console.log("user "+diceVal);
        if(diceVal != 1){
            aPlayer.turnScore += diceVal;
            aPlayer.updateScore();
        }
        else if (diceVal == 1){
            aPlayer.turnScore = 0;
            changeMessage(message.comp);
            // compChance();
            aPlayer.updateScore();
            roll(turnSwitch(aPlayer));
        }
    }
    if(aPlayer.id == 'comp'){
        // compChance();
        $('#roll').attr('disabled',true);
        $('#hold').attr('disabled',true);
        timer = setInterval(function(){
            showRandomDiceImg();
            // console.log("comp "+ diceVal);
            if(diceVal == 1){
                aPlayer.turnScore = 0;
                aPlayer.updateScore();
                endCompChance();
            }
            else {
                aPlayer.turnScore += diceVal;
                aPlayer.updateScore();
                if(Math.floor(Math.random()*2))compHold(aPlayer); //random 0 or 1
            }
        },2000);
    }
}

var userHold = function (aPlayer) {
    aPlayer.hold();
    changeMessage(message.comp);
    roll(turnSwitch(aPlayer));
}
var compHold =function (aPlayer) {
    aPlayer.hold();
    // console.log("comp hold.");
    endCompChance();
}
var timer;
var endCompChance = function () {
    clearInterval(timer);
    changeMessage(message.user);
    $('#roll').removeAttr('disabled');
    $('#hold').removeAttr('disabled');
};


$('#roll').click(function(){
    roll(user);
});
$('#hold').click(function () {
    userHold(user);
});
$('#reset').click(function () {
    location.reload();
});
