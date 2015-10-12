Meteor.publish("thePlayers", function(){
  var currentUser = this.userId;
  return PlayerList.find({createdBy: currentUser});
});
Meteor.methods({
  'insertPlayerData': function (playerName, playerScore) {
    var currentUser = Meteor.userId();
    PlayerList.insert({
        name: playerName,
        score: playerScore,
        createdBy: currentUser
    });
  },
  'removePlayerData': function (selectedPlayer) {
    var currentUserId = Meteor.userId();
    PlayerList.remove({_id: selectedPlayer, createdBy: currentUserId});
  },
  'modifyPlayerData': function (selectedPlayer, scoreValue) {
    var currentUserId = Meteor.userId();
    PlayerList.update({_id: selectedPlayer, createdBy: currentUserId},
                      {$inc: {score: scoreValue}});
  }
});
