function init() {

  //variabeldeklaration
  let gamerunning = true;
  let from = null;
  let index = null;
  let turn = "red";
  let specialmove = false;
  let redValue = null;
  let blueValue = null;

  //skapar ljud för flytt
  let sound = new Audio('sounds/move.mp3');
  let sound2 = new Audio('sounds/move2.mp3');

  //skapar visare för vilken tur det är
  let turnpiece = document.getElementById("turnpiece");
  turnpiece.style.backgroundColor = turn;

  //skapar arrayer för spelpjäserna, de oanvända platserna och alla div-element i spelet
  let redArray = createArray(1, 4);
  let blueArray = createArray(14, 17);
  let unusedArray = createArray(5, 13);
  let all = Array.from(document.getElementsByClassName('plupp'))


  //Lägegr to händelselyssnare på div-elementen i spelet
  all.forEach(element => {
    element.addEventListener("click", () => pluppClicked(element));
    element.addEventListener("mouseover", () => addShadow(element));
    element.addEventListener("mouseout", () => removeShadow(element));
  });

  //ändrar färg på pjäserna
  changeBackground(redArray, "red", "darkred");
  changeBackground(blueArray, "blue", "darkblue");

  //funktion för att ändra färger använder radial-gradient för att skapa skugga på pjäserna
  function changeBackground(array, color, color2) {
    array.forEach(div => {
      div.style.backgroundImage = `radial-gradient(circle, ${color}, ${color2})`;
      div.style.backgroundColor = color;
    });
  }
  //funktion för att skapa array av div-element med viss row-väde
  function createArray(startRow, endRow) {
    return Array.from(document.getElementsByClassName('plupp')).filter(div => {
      const rowValue = parseInt(div.getAttribute('row'));
      return rowValue >= startRow && rowValue <= endRow;
    });
  }
  //funktioner för att lägga to skuggning runt pjäserna när man hovrar över dem
  function addShadow(element) {
    if (element != from) {
      var color = getComputedStyle(element).backgroundColor;
      element.style.boxShadow = `0 0 15px ${color}`;
    }
  }

  function removeShadow(element) {
    if (element !== from) {
      element.style.boxShadow = "none";
    }
  }

  function pluppClicked(piece) {
    //stoppar funktionen ifall spelet har vunnits
    if (!gamerunning) {
      return;
    }
    //avsluta ens tur genom att klicka på pjäsen som har flyttats
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
    //väljer vilken pjäs man vill flytta
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
    //när man har valt en pjäs att flytta och klickar på en tom ruta
    else if (unusedArray.includes(piece) && from != null) {

      const fromCol = parseInt(from.getAttribute('col'));
      const fromrow = parseInt(from.getAttribute('row'));
      const toCol = parseInt(piece.getAttribute('col'));
      const torow = parseInt(piece.getAttribute('row'));
      const hypotetiskCol = (fromCol + toCol) / 2;
      const hypotetiskRow = (torow + fromrow) / 2;

      //ifall man hoppar över en pjäs, kollar om det finns en pjäs i rätt position för att kunna hoppa över
      all.forEach(element => {
        if (element.getAttribute('col') == hypotetiskCol && element.getAttribute('row') == hypotetiskRow && !unusedArray.includes(element)) {
          if (fromCol - toCol == -2 || fromCol - toCol == 2 || fromCol - toCol == 4 || fromCol - toCol == -4) {
            if (torow - fromrow == 2 || torow - fromrow == -2 || torow == fromrow) {
              index = unusedArray.indexOf(piece);
              specialmove = true;
              move(index);
            }
          }
        }
      });
      //ifall det är ett vanligt drag d.v.s bara hoppa ett steg
      if (toCol == fromCol + 1 || toCol == fromCol - 1 || toCol == fromCol + 2 || toCol == fromCol - 2) {
        if (torow == fromrow + 1 || torow == fromrow - 1 || torow == fromrow) {
          if (specialmove == false) {
            index = unusedArray.indexOf(piece);
            move(index);
          }
        }
      }
    }
  }
  //funktion för att slutligen flytta pjäs efter att man har valt sin pjäs och position att hoppa till 
  function move(index) {
    //plockar ut pjäsen ur arrayen av ett visst lag, sätter sedan tillbaks den i ny position
    if (turn == "red") {
      let tal = redArray.indexOf(from);
      let div1 = unusedArray.splice(index, 1)[0];
      let div2 = redArray.splice(tal, 1)[0];
      redArray.push(div1);
      unusedArray.push(div2);
      changeBackground(redArray, "red", "darkred");
      div2.style.boxShadow = "none";


      //ifall man har hoppat över en pjäs så fortsätter ens tur tills man avslutar den
      if (specialmove == true) {
        from = div1;
        from.style.backgroundImage = "none";
        from.style.backgroundColor = "pink";
        sound2.load();
        sound2.play();

      }
      //annars byts turen
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
    changeBackground(unusedArray, "#B9B9B9", "#B9B9B9");
    div1 = null;
    div2 = null;

    //räknar ut totala row-värdet
    redValue = redArray.reduce((total, div) => total + parseInt(div.getAttribute('row')), 0);
    blueValue = blueArray.reduce((total, div) => total + parseInt(div.getAttribute('row')), 0);
    //kollar o en spelare har vunnit
    if (redValue == 150) {
      document.getElementById("turn").innerHTML = "red wins";
      turnpiece.style.backgroundColor = "red";
      changeBackground(redArray, "red", "darkred");
      gamerunning = false;
    } else if (blueValue == 30) {

      document.getElementById("turn").innerHTML = "blue wins";
      turnpiece.style.backgroundColor = "blue";
      changeBackground(blueArray, "blue", "darkblue");
      gamerunning = false;
    }

  }
}

window.onload = init;