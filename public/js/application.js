$(document).ready(function() {

  function Player(name, key) {
    this.name = name;
    this.position = 2;
    this.move = function() {
      this.position++;
    };
    this.key = key.charCodeAt();
  }

  function Game(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;

    this.startTime = $.now();
    this.duration = 0;

    this.run = function() {
      that = this;
      $(document).keyup(function(e) {
        that.setKeys(e);
        that.isGameOver();
        that.renderCurrentBoard();
      });
    };

    this.setKeys = function (e) {
      if (e.keyCode == player1.key) {
        player1.move();
      }
      else if (e.keyCode == player2.key) {
        player2.move();
      }
    };

    this.findWinner = function() {
      if (player1.position == this.finalElement) {
        return player1.name;
      } else if (player2.position == this.finalElement) {
        return player2.name;
      }
    };

    this.isGameOver = function () {
      if (typeof this.findWinner() === 'undefined') {
        console.log("Still playing");
      } else {
        console.log(this.findWinner() + " won!!");
        this.calcDuration();
        console.log("The game duration was: " + this.duration);
        $(document).off("keyup");
        this.showWinner();
        this.saveGameResults();
      }
    };

    this.calcDuration = function () {
      this.duration = ($.now() - this.startTime)/1000;
    };

    this.saveGameResults = function () {
      url = window.location.href.replace('/play','');
      data = 'winner=' + this.findWinner() + '&duration=' + this.duration;
      console.log(url);
      console.log(data);
      $.ajax({
        url: url,
        method: 'post',
        data: data
      });
    };

  }

  Game.prototype.additionalElements = 15;
  Game.prototype.finalElement = 17;

  Game.prototype.setUpBoard = function () {
    var stripIdPrefixes = ["player1", "player2"];
    for (var i in stripIdPrefixes) {
      for (var j=0; j<this.additionalElements; j++) {
        $("#" + stripIdPrefixes[i] + "_strip").append("<td class='inactive'></td>");
      }
    }
  };

  Game.prototype.renderCurrentBoard = function () {
    $("#player1_strip td[class='active']").attr('class', 'inactive');
    $("#player2_strip td[class='active']").attr('class', 'inactive');
    $("#player1_strip td:nth-child(" + String(player1.position) + ")").attr('class', 'active');
    $("#player2_strip td:nth-child(" + String(player2.position) + ")").attr('class', 'active');
  };

  Game.prototype.showWinner = function () {
    message = this.findWinner() + " won with a time of " + this.duration + " seconds!";
    $(".winner_msg").fadeIn();
    $(".winner_msg").append('<p>'+message+'</p>');
  };

  var name1 = $('.name').first().text();
  var name2 = $('.name').last().text();
  var player1 = new Player(name1, "P");
  var player2 = new Player(name2, "Q");

  game = new Game(player1, player2);
  game.setUpBoard();
  game.run();

});

