function init() {

  let från = null;
  let index = null;
  let tur = "red";
  let specialflytt = false;

  let redArray = Array.from(document.getElementsByClassName('plupp')).filter(div => {
    const rowValue = parseInt(div.getAttribute('row'));
    return rowValue >= 1 && rowValue <= 4;
  });

  let blueArray = Array.from(document.getElementsByClassName('plupp')).filter(div => {
    const rowValue = parseInt(div.getAttribute('row'));
    return rowValue >= 14 && rowValue <= 17;
  });

  let oanvändaArray = Array.from(document.getElementsByClassName('plupp')).filter(div => {
    const rowValue = parseInt(div.getAttribute('row'));
    return rowValue >= 5 && rowValue <= 13;
  });

  let alla = Array.from(document.getElementsByClassName('plupp'))

  changeBackground(redArray, "red");
  changeBackground(blueArray, "blue");

  function changeBackground(array, color) {
    array.forEach(div => {
      div.style.backgroundColor = color;
      div.style.border = "none";
      div.style.width = "55px";
    });
  }

  for (var i = 0; i < alla.length; i++) {
    alla[i].innerHTML = parseInt(alla[i].getAttribute('col'));

    (function (i) {
      alla[i].addEventListener("click", function (event) {
        pluppClicked(alla[i]);
      });
    })(i);
  }

  function pluppClicked(piece) {


    if (specialflytt == true && från == piece) {
      if (tur == "red") {
        tur = "blue";
      }
      else if (tur == "blue") {
        tur = "red";
      }
      changeBackground(redArray, "red");
      changeBackground(blueArray, "blue");
      specialflytt = false;
      från = null;
    }

    if (redArray.includes(piece) && tur == "red" && specialflytt == false) {

      changeBackground(redArray, "red");
      changeBackground(blueArray, "blue");
      från = null;
      piece.style.border = "2px solid #FFFF00";
      piece.style.width = "51px";
      från = piece;
      specialflytt = false;
    }

    else if (blueArray.includes(piece) && tur == "blue" && specialflytt == false) {
      changeBackground(redArray, "red");
      changeBackground(blueArray, "blue");

      piece.style.border = "2px solid #FFFF00";
      piece.style.width = "51px";
      från = piece;
      specialflytt = false;
    }

    else if (oanvändaArray.includes(piece) && från != null) {

      const frånCol = parseInt(från.getAttribute('col'));
      const frånrow = parseInt(från.getAttribute('row'));
      const tillCol = parseInt(piece.getAttribute('col'));
      const tillrow = parseInt(piece.getAttribute('row'));
      const hypotetiskCol = (frånCol + tillCol) / 2;
      const hypotetiskRow = (tillrow + frånrow) / 2;


      for (var i = 0; i < alla.length; i++) {
        if (alla[i].getAttribute('col') == hypotetiskCol && alla[i].getAttribute('row') == hypotetiskRow && !oanvändaArray.includes(alla[i])) {
          if (frånCol - tillCol == -2 || frånCol - tillCol == 2 || frånCol - tillCol == 4 || frånCol - tillCol == -4) {


            if (tillrow - frånrow == 2 || tillrow - frånrow == -2 || tillrow == frånrow) {
              index = oanvändaArray.indexOf(piece);
              specialflytt = true;
              flytta(index);
              break;
            }
          }
        }
      }
      if (tillCol == frånCol + 1 || tillCol == frånCol - 1 || tillCol == frånCol + 2 || tillCol == frånCol - 2) {
        if (tillrow == frånrow + 1 || tillrow == frånrow - 1 || tillrow == frånrow) {
          if (specialflytt == false) {
            index = oanvändaArray.indexOf(piece);
            flytta(index);
          }
        }
      }
    }

    function flytta(index) {

      if (tur == "red") {
        från.style.backgroundColor = "Green";
        let tal = redArray.indexOf(från);
        let div1 = oanvändaArray.splice(index, 1)[0];
        let div2 = redArray.splice(tal, 1)[0];
        redArray.push(div1);
        oanvändaArray.push(div2);

        changeBackground(redArray, "red");

        if (specialflytt == true) {
          från = div1;
          tur = "red";
          från.style.backgroundColor = "pink";
          new Audio('sounds/move2.mp3').play();
        }
        else {
          tur = "blue";
          från = null;
        }
      }

      else if (tur == "blue") {
        let tal = blueArray.indexOf(från);
        let div1 = oanvändaArray.splice(index, 1)[0];
        let div2 = blueArray.splice(tal, 1)[0];
        blueArray.push(div1);
        oanvändaArray.push(div2);
        changeBackground(blueArray, "blue");

        if (specialflytt == true) {
          från = div1;
          från.style.backgroundColor = "lightblue";
          new Audio('sounds/move2.mp3').play();
        }
        else {
          tur = "red";
          från = null;
        }
      }
      new Audio('sounds/move.mp3').play();
      changeBackground(oanvändaArray, "#B9B9B9");
      console.log(specialflytt);

      div1 = null;
      div2 = null;
    }
  }
}
window.onload = init;