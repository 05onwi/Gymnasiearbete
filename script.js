function init() {
  document.getElementById("start").onclick = startGame;

  function startGame() {

    let vald = null;
    let index = null;

    let rödArray = Array.from(document.getElementsByClassName('plupp')).filter(div => {
      const rowValue = parseInt(div.getAttribute('row'));
      return rowValue >= 1 && rowValue <= 4;
    });


    let blåArray = Array.from(document.getElementsByClassName('plupp')).filter(div => {
      const rowValue = parseInt(div.getAttribute('row'));
      return rowValue >= 14 && rowValue <= 17;
    });

    let oanvändaArray = Array.from(document.getElementsByClassName('plupp')).filter(div => {
      const rowValue = parseInt(div.getAttribute('row'));
      return rowValue >= 5 && rowValue <= 13;
    });

    let alla = Array.from(document.getElementsByClassName('plupp'))

    changeBackground(rödArray, "red");
    changeBackground(blåArray, "blue");
    changeBackground(oanvändaArray, "lightgray");

    function changeBackground(Array, color) {
      Array.forEach(div => {
        div.style.backgroundColor = color;
        div.style.border = "none";
        div.style.width = "55px";
      });
    }

    for (var i = 0; i < alla.length; i++) {
      alla[i].innerHTML = alla[i].getAttribute('col');
      (function (i) {
        alla[i].addEventListener("click", function () {
          pluppClicked(alla[i]);
        });
      })(i);
    }

    function pluppClicked(piece) {
      changeBackground(blåArray, "blue");
      changeBackground(rödArray, "red");




      if (rödArray.includes(piece)) {
        piece.style.border = "2px solid #FFFF00";
        piece.style.width = "51px";
        vald = piece;
      }
      else if (blåArray.includes(piece)) {
        piece.style.border = "2px solid #FFFF00";
        piece.style.width = "51px";
        vald = piece;
      }
      else if (oanvändaArray.includes(piece) && vald != null) {

        const valdCol = parseInt(vald.getAttribute('col'));
        const valdrow = parseInt(vald.getAttribute('row'));
        const pieceCol = parseInt(piece.getAttribute('col'));
        const piecerow = parseInt(piece.getAttribute('row'));

        if (pieceCol == valdCol + 1 || pieceCol == valdCol - 1 || pieceCol == valdCol + 2 || pieceCol == valdCol - 2) {

          if (piecerow == valdrow + 1 || piecerow == valdrow - 1 || piecerow == valdrow) {
            index = oanvändaArray.indexOf(piece);
            flytta(index);
          }
        }
      }
    }


    function flytta(index) {

      let tal = rödArray.indexOf(vald);
      let div1 = oanvändaArray.splice(index, 1)[0];
      let div2 = rödArray.splice(tal, 1)[0];
      rödArray.push(div1);
      oanvändaArray.push(div2);
      changeBackground(rödArray, "red");
      changeBackground(oanvändaArray, "lightgray");
      vald = null;
      div1 = null;
      div2 = null;

    }
  }


}
window.onload = init;