function init() {

 

 

    let från = null;
    let index = null;
    let tur = "röd";
    let specialflytt = false;


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

    function changeBackground(Array, color) {
      Array.forEach(div => {
        div.style.backgroundColor = color;
        div.style.border = "none";
        div.style.width = "55px";
      });
    }

    for (var i = 0; i < alla.length; i++) {

      (function (i) {
        alla[i].addEventListener("click", function (event) {
          if (event.shiftKey) {
            specialflytt = true;
            pluppClicked(alla[i]);

          } else {
            pluppClicked(alla[i]);
          }
        });
      })(i);
    }

    function pluppClicked(piece) {


      if(specialflytt == true && från == piece){
        if(tur == "röd"){
          tur = "blå";
          console.log("1");

        }
        else if (tur == "blå"){
          tur = "röd";
          console.log("2");
        } 
        specialflytt = false;
        changeBackground(rödArray, "red");
        changeBackground(blåArray, "blue");
        från = null;
        console.log("3");
      }
      

      if (rödArray.includes(piece) && tur == "röd") {
        från = null;
        piece.style.border = "2px solid #FFFF00";
        piece.style.width = "51px";
        från = piece;
        console.log("4");
      }

      else if (blåArray.includes(piece) && tur == "blå") {
        från = null;
        piece.style.border = "2px solid #FFFF00";
        piece.style.width = "51px";
        från = piece;
        console.log("5");
      }

      else if (oanvändaArray.includes(piece) && från != null) {

        const frånCol = parseInt(från.getAttribute('col'));
        const frånrow = parseInt(från.getAttribute('row'));
        const tillCol = parseInt(piece.getAttribute('col'));
        const tillrow = parseInt(piece.getAttribute('row'));
        const hypotetiskCol = (frånCol + tillCol) / 2;
        const hypotetiskRow = (tillrow + frånrow) / 2;
        console.log("6");

        for (var i = 0; i < alla.length; i++) {
          if (alla[i].getAttribute('col') == hypotetiskCol && alla[i].getAttribute('row') == hypotetiskRow && !oanvändaArray.includes(alla[i])) {

            index = oanvändaArray.indexOf(piece);
            console.log("7");
            flytta(index);
            break;
          }
        }

        if (tillCol == frånCol + 1 || tillCol == frånCol - 1 || tillCol == frånCol + 2 || tillCol == frånCol - 2) {

          if (tillrow == frånrow + 1 || tillrow == frånrow - 1 || tillrow == frånrow) {

            if (specialflytt == false) {

              index = oanvändaArray.indexOf(piece);
              flytta(index);
              console.log("8");
            }
          }
        }
      }
    }


    function flytta(index) {

      if (tur == "röd") {
        let tal = rödArray.indexOf(från);
        let div1 = oanvändaArray.splice(index, 1)[0];
        let div2 = rödArray.splice(tal, 1)[0];
        rödArray.push(div1);
        oanvändaArray.push(div2);
       
        changeBackground(rödArray, "red");
        if (specialflytt == true) {
          från = div1;
          tur = "röd";
          från.style.backgroundColor = "pink";
        }
        else {
          tur = "blå";
          från = null;

        }
      }

      else if (tur == "blå") {
        let tal = blåArray.indexOf(från);
        let div1 = oanvändaArray.splice(index, 1)[0];
        let div2 = blåArray.splice(tal, 1)[0];
        blåArray.push(div1);
        oanvändaArray.push(div2);
        changeBackground(blåArray, "blue");
        if (specialflytt == true) {
          från = div1;
          tur = "blå";
          från.style.backgroundColor = "lightblue";
        }
        else {
          tur = "röd";
          från = null;

        }
      }
      changeBackground(oanvändaArray, "#B9B9B9");
     
      div1 = null;
      div2 = null;
    }
  }

window.onload = init;