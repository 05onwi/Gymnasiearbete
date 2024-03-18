function init() {
  let gamerunning = true;




  let from = null;
  let index = null;
  let turn = "red";
  let specialmove = false;

  let sound = new Audio('sounds/move.mp3');
  let sound2 = new Audio('sounds/move2.mp3');

  let turnpiece = document.getElementById("turnpiece");
  turnpiece.style.backgroundColor = turn;

  let redArray = Array.from(document.getElementsByClassName('plupp')).filter(div => {
    const rowValue = parseInt(div.getAttribute('row'));
    return rowValue >= 1 && rowValue <= 4;
  });

  let blueArray = Array.from(document.getElementsByClassName('plupp')).filter(div => {
    const rowValue = parseInt(div.getAttribute('row'));
    return rowValue >= 14 && rowValue <= 17;
  });

  let unusedArray = Array.from(document.getElementsByClassName('plupp')).filter(div => {
    const rowValue = parseInt(div.getAttribute('row'));
    return rowValue >= 5 && rowValue <= 13;
  });

  let all = Array.from(document.getElementsByClassName('plupp'))

  let redValue = redArray.reduce((total, div) => total + parseInt(div.getAttribute('row')), 0);
  let blueValue = blueArray.reduce((total, div) => total + parseInt(div.getAttribute('row')), 0);

  changeBackground(redArray, "red", "darkred");
  changeBackground(blueArray, "blue", "darkblue");
  changeBackground(unusedArray, "#B9B9B9", "#616060");

  function changeBackground(array, color, color2) {
    array.forEach(div => {
      div.style.backgroundImage = `radial-gradient(circle, ${color}, ${color2})`;
      div.style.backgroundColor = color;
    });
  }

  all.forEach(function (element) {
    element.addEventListener("click", function () {
      pluppClicked(element);
    });

    element.addEventListener("mouseover", function () {
      if (element != from) {
        var color = getComputedStyle(element).backgroundColor;
        element.style.boxShadow = `0 0 15px ${color}`;
      }
    });

    element.addEventListener("mouseout", function () {
      if (element !== from) {
        element.style.boxShadow = "none";
      }

    });
  });

  function pluppClicked(piece) {

    if (specialmove == true && from == piece) {
      if (turn == "red") {
        turn = "blue";
      }
      else if (turn == "blue") {
        turn = "red";
      }
      turnpiece.style.backgroundColor = turn;
      changeBackground(redArray, "red", "darkred");
      changeBackground(blueArray, "blue", "darkblue");
      specialmove = false;
      from = null;
    }

    if (redArray.includes(piece) && turn == "red" && specialmove == false) {
      if (from !== null) {
        from.style.boxShadow = "none";
      }
      changeBackground(redArray, "red", "darkred");
      changeBackground(blueArray, "blue", "darkblue");
      piece.style.boxShadow = "0 0 15px #FFFF00";
      from = piece;
    }

    else if (blueArray.includes(piece) && turn == "blue" && specialmove == false) {
      if (from !== null) {
        from.style.boxShadow = "none";
      }
      changeBackground(redArray, "red", "darkred");
      changeBackground(blueArray, "blue", "darkblue");
      piece.style.boxShadow = "0 0 15px #FFFF00";
      from = piece;
    }

    else if (unusedArray.includes(piece) && from != null) {

      const fromCol = parseInt(from.getAttribute('col'));
      const fromrow = parseInt(from.getAttribute('row'));
      const tillCol = parseInt(piece.getAttribute('col'));
      const tillrow = parseInt(piece.getAttribute('row'));
      const hypotetiskCol = (fromCol + tillCol) / 2;
      const hypotetiskRow = (tillrow + fromrow) / 2;

      for (var i = 0; i < all.length; i++) {
        if (all[i].getAttribute('col') == hypotetiskCol && all[i].getAttribute('row') == hypotetiskRow && !unusedArray.includes(all[i])) {
          if (fromCol - tillCol == -2 || fromCol - tillCol == 2 || fromCol - tillCol == 4 || fromCol - tillCol == -4) {
            if (tillrow - fromrow == 2 || tillrow - fromrow == -2 || tillrow == fromrow) {
              index = unusedArray.indexOf(piece);
              specialmove = true;
              move(index);
              break;
            }
          }
        }
      }
      if (tillCol == fromCol + 1 || tillCol == fromCol - 1 || tillCol == fromCol + 2 || tillCol == fromCol - 2) {
        if (tillrow == fromrow + 1 || tillrow == fromrow - 1 || tillrow == fromrow) {
          if (specialmove == false) {
            index = unusedArray.indexOf(piece);
            move(index);
          }
        }
      }
    }

    function move(index) {

      if (turn == "red") {
        let tal = redArray.indexOf(from);
        let div1 = unusedArray.splice(index, 1)[0];
        let div2 = redArray.splice(tal, 1)[0];
        redArray.push(div1);
        unusedArray.push(div2);
        changeBackground(redArray, "red", "darkred");
        div2.style.boxShadow = "none";

        if (specialmove == true) {
          from = div1;
          turn = "red";
          from.style.backgroundImage = "none";
          from.style.backgroundColor = "pink";
          sound2.load();
          sound2.play();
        }
        else {
          turn = "blue";
          from = null;
        }
      }

      else if (turn == "blue") {
        let tal = blueArray.indexOf(from);
        let div1 = unusedArray.splice(index, 1)[0];
        let div2 = blueArray.splice(tal, 1)[0];
        blueArray.push(div1);
        unusedArray.push(div2);
        changeBackground(blueArray, "blue", "darkblue");
        div2.style.boxShadow = "none";

        if (specialmove == true) {
          from = div1;
          from.style.backgroundImage = "none";
          from.style.backgroundColor = "lightblue";
          sound2.load();
          sound2.play();
        }
        else {
          turn = "red";
          from = null;
        }
      }
      turnpiece.style.backgroundColor = turn;

      sound.load();
      sound.play();
      changeBackground(unusedArray, "#B9B9B9", "#616060");
      div1 = null;
      div2 = null;
      redValue = redArray.reduce((total, div) => total + parseInt(div.getAttribute('row')), 0);
      blueValue = blueArray.reduce((total, div) => total + parseInt(div.getAttribute('row')), 0);

    }
    console.log(redValue, blueValue);
    if (redValue == 150 || blueValue == 30) {

      gamerunning = false;
    }
  }


}

window.onload = init;