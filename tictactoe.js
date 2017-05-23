var Status = function(element) {
  var display = element;
  function setText(message) {
    display.innerHTML = message;
  }
  return { sendMessage : setText };
};

function isValid(squares) {
 return squares.innerHTML.length === 0;
}

function setSymbol(square, symbol) {
  square.innerHTML = symbol;
}

function checkDraw(squares) {
  for (var i = 0, len = squares.length; i < len; i++) {
    if (squares[i].innerHTML.length === 0) {
     return false;
    }
  }
  return true;
}

function checkWinner(squares, players, round) {
  if ((squares[0].innerHTML == players[round] && squares[1].innerHTML == players[round] && squares[2].innerHTML == players[round]) ||
      (squares[3].innerHTML == players[round] && squares[4].innerHTML == players[round] && squares[5].innerHTML == players[round]) ||
      (squares[6].innerHTML == players[round] && squares[7].innerHTML == players[round] && squares[8].innerHTML == players[round]) ||
      (squares[0].innerHTML == players[round] && squares[3].innerHTML == players[round] && squares[6].innerHTML == players[round]) ||
      (squares[1].innerHTML == players[round] && squares[4].innerHTML == players[round] && squares[7].innerHTML == players[round]) ||
      (squares[2].innerHTML == players[round] && squares[5].innerHTML == players[round] && squares[8].innerHTML == players[round]) ||
      (squares[0].innerHTML == players[round] && squares[4].innerHTML == players[round] && squares[8].innerHTML == players[round]) ||
      (squares[2].innerHTML == players[round] && squares[4].innerHTML == players[round] && squares[6].innerHTML == players[round])) {
    return true;
  }
}

function countdown(score_player1,score_player2) {
  var seconds = 60;
  function tick() {
    var counter = document.getElementById("counter");
    seconds--;
    counter.innerHTML = "0:" + (seconds < 10 ? "0" : "") + String(seconds);
    if( seconds > 0 ) {
      setTimeout(tick, 1000);
    }
    else {
      alert("Player 1 :" + score_player1 + "  Player 2 :" + score_player2 +"");
      return;
    }
  }
  tick();
}

function resetGrid(squares) {
  squares[0].innerHTML = "";
  squares[1].innerHTML = "";
  squares[2].innerHTML = "";
  squares[3].innerHTML = "";
  squares[4].innerHTML = "";
  squares[5].innerHTML = "";
  squares[6].innerHTML = "";
  squares[7].innerHTML = "";
  squares[8].innerHTML = "";
  return squares;
}

function main() {
  var squares = document.querySelectorAll('.square');
  var players = ['X', 'O'];
  var round = 0;
  var score_player1 = 0;
  var score_player2 = 0;
  var isOver = false;
  var status = new Status(document.querySelector('.status'));

  countdown(score_player1,score_player2);

  status.sendMessage("<p><span class=\"red\">Player 1</span></p><p>Player 2</p>");
  for (var i = 0, len = squares.length; i < len; i++) {
    squares[i].addEventListener("click", function() {

      if (isValid(this)) {
        setSymbol(this, players[round]);
        isOver = checkWinner(squares, players, round);

        if(isOver) {
          if (round % 2 === 0) {
            alert("PLAYER 1 WINS");
            score_player1++;
          }
          if (round % 2 !== 0) {
            alert("PLAYER 2 WINS");
            score_player2++;
          }
          squares = resetGrid(squares);
        }
        if (checkDraw(squares)) {
          squares = resetGrid(squares);
        }
        if (round % 2 !== 0) {
          status.sendMessage("<p><span class=\"red\">Player 1</span> : " + score_player1 + "</p><p>Player 2 : " + score_player2 + "</p>");
        }
        if (round % 2 === 0) {
          status.sendMessage("<p>Player 1 : " + score_player1 + "</p><p><span class=\"red\">Player 2</span> : " + score_player2 + "</p>");
        }

        round++;
        round = round % 2;
      }
    });
  }
}

main ();
