function init() {

  gamerunning = true;


  let from = null;
  let index = null;
  let turn = "red";
  let specialmove = false;

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

  changeBackground(redArray, "red");
  changeBackground(blueArray, "blue");

  function changeBackground(array, color) {
    array.forEach(div => {
      div.style.backgroundColor = color;
      div.style.border = "none";
      div.style.width = "55px";
    });
  }

  all.forEach(function (element) {
  element.addEventListener("click", function () {
    pluppClicked(element);
  });

  
    element.addEventListener("mouseover", function () {
      var color = getComputedStyle(element).backgroundColor;
      console.log(color);

      if(color == "rgb(185, 185, 185)"){
        element.style.boxShadow = `0 0 15px black`;
      }
      else{
         element.style.boxShadow = `0 0 15px ${color}`;
      }
      new Audio('sounds/move.mp3').play();
     
    });
    
    element.addEventListener("mouseout", function () {
      element.style.boxShadow = "none"; 
      
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
      changeBackground(redArray, "red");
      changeBackground(blueArray, "blue");
      specialmove = false;
      from = null;
    }

    if (redArray.includes(piece) && turn == "red" && specialmove == false) {

      changeBackground(redArray, "red");
      changeBackground(blueArray, "blue");
      piece.style.border = "2px solid #FFFF00";
      piece.style.width = "51px";
      from = piece;
      specialmove = false;
    }

    else if (blueArray.includes(piece) && turn == "blue" && specialmove == false) {

      changeBackground(redArray, "red");
      changeBackground(blueArray, "blue");
      piece.style.border = "2px solid #FFFF00";
      piece.style.width = "51px";
      from = piece;
      specialmove = false;
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
              flytta(index);
              break;
            }
          }
        }
      }
      if (tillCol == fromCol + 1 || tillCol == fromCol - 1 || tillCol == fromCol + 2 || tillCol == fromCol - 2) {
        if (tillrow == fromrow + 1 || tillrow == fromrow - 1 || tillrow == fromrow) {
          if (specialmove == false) {
            index = unusedArray.indexOf(piece);
            flytta(index);
          }
        }
      }
    }

    function flytta(index) {

      if (turn == "red") {
        from.style.backgroundColor = "Green";
        let tal = redArray.indexOf(from);
        let div1 = unusedArray.splice(index, 1)[0];
        let div2 = redArray.splice(tal, 1)[0];
        redArray.push(div1);
        unusedArray.push(div2);
        changeBackground(redArray, "red");

        if (specialmove == true) {
          from = div1;
          turn = "red";
          from.style.backgroundColor = "pink";
          new Audio('sounds/move2.mp3').play();
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
        changeBackground(blueArray, "blue");

        if (specialmove == true) {
          from = div1;
          from.style.backgroundColor = "lightblue";
          new Audio('sounds/move2.mp3').play();
        }
        else {
          turn = "red";
          from = null;
        }
      }
      new Audio('sounds/move.mp3').play();
      changeBackground(unusedArray, "#B9B9B9");
      console.log(specialmove);
      div1 = null;
      div2 = null;
    }
  }
}

window.onload = init;