Meteor.subscribe("thePlayers");

Template.leaderboard.helpers({
  'player': function () {
    var currentUser = Meteor.userId();
    return PlayerList.find({}, {sort: {score: -1, name: 1}});
  },
  'selectedClass': function () {
    var playerId =  this._id;
    var selectedPlayer = Session.get('selectedPlayer');
    if (playerId === selectedPlayer) {
    return 'selected';
    }
  },
  'showSelectedPlayer': function () {
    var selectedPlayer = Session.get('selectedPlayer');
    return PlayerList.findOne(selectedPlayer);
  },
  'playerSelected': function () {
    if (Session.get('selectedPlayer') !== undefined) {
      return true;
    }
  }
});

Template.leaderboard.events({
  "click .player": function(){
    var playerId = this._id;
    Session.set("selectedPlayer", playerId);
  },
  'click .increment': function () {
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('modifyPlayerData', selectedPlayer, 5);
  },
  'click .decrement': function () {
    var selectedPlayer = Session.get('selectedPlayer');
    Meteor.call('modifyPlayerData', selectedPlayer, -5);
  },
  'click .remove': function () {
    var answer = confirm('Are you really want to remove?');
    if (answer) {
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('removePlayerData', selectedPlayer);
    }
  }
});

Template.addPlayerForm.events({
  "submit form": function(event){
    event.preventDefault();
    var playerName = event.target.playerName.value;
    var playerScore = Number(event.target.playerScore.value);
    event.target.playerName.value = '';
    event.target.playerScore.value = '';
    Meteor.call('insertPlayerData', playerName, playerScore);
  }
});
