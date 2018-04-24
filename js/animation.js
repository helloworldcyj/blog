// animation

function showNumber (i, j, randNumber) {
  let oDom = document.getElementById('number-cell-' + i + "-" + j);
  oDom.style.backgroundColor = getNumberBackgroundColor(randNumber);
  oDom.style.color = getNumberColor(randNumber);
  oDom.style.width = itemWidth+'px';
  oDom.style.height = itemWidth+'px';
  oDom.style.lineHeight = itemWidth+'px';
  oDom.innerHTML = randNumber;
}

function move (fromx, fromy, tox, toy) {

  let oDom = document.getElementById('number-cell-' + fromx + "-" + fromy);
  oDom.style.top = aPosition[tox][toy].top+'px';
  oDom.style.left = aPosition[tox][toy].left+'px';
}
