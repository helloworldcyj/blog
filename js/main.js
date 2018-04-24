// controller
window.onload = function () {
  forMobile();
  newGame();
};

let aItem = new Array(), // 页面上的数字
  aPosition = new Array(),// 获取布局元素位置
  aChanged = new Array(), // 当前位置是否交换过
  aRandomWrapper = new Array(), // 存储当前没有真实游戏元素的坐标
  iScore = 0; // 游戏得分
let documentWidth = window.screen.availWidth,
  wrapperWidth = 0.92 * documentWidth,
  itemWidth = 0.18 * documentWidth,
  itemMargin = 0.04 * documentWidth;

let startX,startY,endX,endY;

function forMobile () {

  if (documentWidth > 500) {
    wrapperWidth = 500;
    itemMargin = 20;
    itemWidth = 100;
  }

  document.querySelector('.game-wrapper').style.width = wrapperWidth + 'px';
  document.querySelector('.game-wrapper').style.height = wrapperWidth + 'px';
  [...document.querySelectorAll('.item')].forEach(item => {
    item.style.width = itemWidth + 'px';
    item.style.height = itemWidth + 'px';
    item.style.marginLeft = itemMargin + 'px';
    item.style.marginTop = itemMargin + 'px';
  })
}

function newGame () {
  // 初始化
  init();
  randomOneNumber();// 生成一个随机数
  randomOneNumber();
}


function init () {
  // 初始化aItem 存取布局元素的位置
  iScore = 0;
  removeByClass('number-cell');
  let oPar = document.querySelector('.game-wrapper'), oTemp;
  let aTemp = document.querySelectorAll('.item');
  let iCount = 0;
  for (let i = 0; i < 4; i++) {
    aItem[i] = new Array();// 存储各个位置的数字
    aPosition[i] = new Array();// 将位置存储
    aChanged[i] = new Array();// 存储当前位置交换信息
    for (let j = 0; j < 4; j++) {
      aItem[i][j] = -1;
      aPosition[i][j] = {left: aTemp[iCount].offsetLeft, top: aTemp[iCount].offsetTop};
      aChanged[i][j] = false;
      aRandomWrapper[iCount] = {randX: i, randY: j};
      iCount++;
    }
  }
  //
  //*************
  //*************
  // 这里有一个问题 放在同一个循环里出错
  //*************
  //*************
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      myappendChild(oPar, `<div class="number-cell" id="number-cell-${i}-${j}"></div>`);
      oTemp = document.getElementById(`number-cell-${i}-${j}`);
      oTemp.style.left = aPosition[i][j].left + 'px';
      oTemp.style.top = aPosition[i][j].top + 'px';
      oTemp.style.width = 0;
      oTemp.style.height = 0;
    }
  }
  updateScore();
}

function randomOneNumber () {// 生成一个随机数
  if (nospace(aItem))
    return false;


  //随机一个位置在aRandomWrapper中获取
  let iIndex = Math.round(Math.random() * aRandomWrapper.length) % aRandomWrapper.length;
  let randX = aRandomWrapper[iIndex].randX;
  let randY = aRandomWrapper[iIndex].randY;
  aRandomWrapper.splice(iIndex, 1);

  //随机一个数字 2 || 4
  let randNumber = Math.random() < 0.5 ? 2 : 4;
  //在随机位置显示随机数字
  aItem[randX][randY] = randNumber;
  showNumber(randX, randY, randNumber);

  return true;
}

function updateView () {
  // 清空再新建

  aRandomWrapper.length = 0;// 更新视图时需更新随机坐标容器
  let oPar = document.querySelector('.game-wrapper');
  let oTemp, iCount = 0;
  removeByClass('number-cell'); // 按类名删除节点
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      myappendChild(oPar, `<div class="number-cell" id="number-cell-${i}-${j}"></div>`);
      oTemp = document.getElementById(`number-cell-${i}-${j}`);
      aChanged[i][j] = false;// 每次更新视图 可交换位置初始化
      if (aItem[i][j] == -1) {
        oTemp.style.left = aPosition[i][j].left + 'px';
        oTemp.style.top = aPosition[i][j].top + 'px';
        oTemp.style.width = 0;
        oTemp.style.height = 0;
        aRandomWrapper[iCount] = {randX: i, randY: j};
        iCount++;
      } else {
        oTemp.style.left = aPosition[i][j].left + 'px';
        oTemp.style.top = aPosition[i][j].top + 'px';
        oTemp.style.backgroundColor = getNumberBackgroundColor(aItem[i][j]);
        oTemp.style.color = getNumberColor(aItem[i][j]);
        oTemp.style.width = itemWidth + 'px';
        oTemp.style.height = itemWidth + 'px';
        oTemp.style.lineHeight = itemWidth + 'px';
        oTemp.innerHTML = aItem[i][j];
      }
    }
  }
}

document.onkeydown = function (event) {
  switch (event.keyCode) {
    case 37: //left
      if (moveLeft()) {
        setTimeout("randomOneNumber()", 210);
        setTimeout("isgameover()", 300);
      }
      break;
    case 38: //up
      if (moveUp()) {
        setTimeout("randomOneNumber()", 210);
        setTimeout("isgameover()", 300);
      }
      break;
    case 39: //right
      if (moveRight()) {
        setTimeout("randomOneNumber()", 210);
        setTimeout("isgameover()", 300);
      }
      break;
    case 40: //down
      if (moveDown()) {
        setTimeout("randomOneNumber()", 210);
        setTimeout("isgameover()", 300);
      }
      break;
    default: //default
      break;
  }
};
document.addEventListener('touchstart',function(event){
  startX = event.touches[0].pageX;
  startY = event.touches[0].pageY;
});

document.addEventListener('touchend',function(event){
  endX = event.changedTouches[0].pageX;
  endY = event.changedTouches[0].pageY;

  var deltaX = endX - startX;
  var deltaY = endY - startY;

  if( Math.abs( deltaX ) < 0.3*documentWidth && Math.abs( deltaY ) < 0.3*documentWidth )
    return;

  if( Math.abs( deltaX ) >= Math.abs( deltaY ) ){

    if( deltaX > 0 ){
      //move right
      if( moveRight() ){
        setTimeout("randomOneNumber()",210);
        setTimeout("isgameover()",300);
      }
    }
    else{
      //move left
      if( moveLeft() ){
        setTimeout("randomOneNumber()",210);
        setTimeout("isgameover()",300);
      }
    }
  }
  else{
    if( deltaY > 0 ){
      //move down
      if( moveDown() ){
        setTimeout("randomOneNumber()",210);
        setTimeout("isgameover()",300);
      }
    }
    else{
      //move up
      if( moveUp() ){
        setTimeout("randomOneNumber()",210);
        setTimeout("isgameover()",300);
      }
    }
  }
});

function moveUp () {
  if (!canMoveUp(aItem))
    return false;
  // moveUp
  for (let i = 1; i < 4; i++)
    for (let j = 0; j < 4; j++) {
      if (aItem[i][j] != -1) {
        for (let k = 0; k < i; k++) {
          if (aItem[k][j] == -1 && canColMove(j, k, i, aItem)) {// 空位可移
            // move
            move(i, j, k, j);
            aItem[k][j] = aItem[i][j];
            aItem[i][j] = -1;
          } else if (aItem[k][j] == aItem[i][j] && canColMove(j, k, i, aItem) && !aChanged[k][j]) {
            // 相同可移
            move(i, j, k, j);
            //add
            aItem[k][j] += aItem[i][j];
            aItem[i][j] = -1;
            //add score
            iScore += aItem[k][j];
            aChanged[k][j] = true;
          }
        }
      }
    }
  setTimeout("updateView()", 200);// 动画需要200ms才做完
  return true;// 通知移动完成 需要随机生成数字
}

function moveRight () {
  if (!canMoveRight(aItem))
    return false;
  // moveRight
  for (let i = 0; i < 4; i++)
    for (let j = 2; j >= 0; j--) {
      if (aItem[i][j] != -1) {
        for (let k = 3; k > j; k--) {
          if (aItem[i][k] == -1 && canRowMove(i, j, k, aItem)) {// 空位可移
            // move
            move(i, j, i, k);
            aItem[i][k] = aItem[i][j];
            aItem[i][j] = -1;
          } else if (aItem[i][k] == aItem[i][j] && canRowMove(i, j, k, aItem) && !aChanged[i][k]) {
            // 相同可移
            move(i, j, i, k);
            //add
            aItem[i][k] += aItem[i][j];
            aItem[i][j] = -1;
            //add score
            iScore += aItem[i][k];
            aChanged[i][k] = true;
          }
        }
      }
    }
  setTimeout("updateView()", 200);
  return true;
}

function moveDown () {
  if (!canMoveDown(aItem))
    return false;
  // moveDown
  for (let i = 2; i >= 0; i--)
    for (let j = 0; j < 4; j++) {
      if (aItem[i][j] != -1) {
        for (let k = 3; k > i; k--) {
          if (aItem[k][j] == -1 && canColMove(j, i, k, aItem)) {// 空位可移
            // move
            move(i, j, k, j);
            aItem[k][j] = aItem[i][j];
            aItem[i][j] = -1;
          } else if (aItem[k][j] == aItem[i][j] && canColMove(j, i, k, aItem) && !aChanged[k][j]) {
            // 相同可移
            move(i, j, k, j);
            //add
            aItem[k][j] += aItem[i][j];
            aItem[i][j] = -1;
            //add score
            iScore += aItem[k][j];
            aChanged[k][j] = true;
          }
        }
      }
    }
  setTimeout("updateView()", 200);
  return true;// 通知移动完成 需要随机生成数字
}

function moveLeft () {

  if (!canMoveLeft(aItem))
    return false;

  //moveLeft
  for (let i = 0; i < 4; i++)
    for (let j = 1; j < 4; j++) {
      if (aItem[i][j] != -1) {
        for (let k = 0; k < j; k++) {
          if (aItem[i][k] == -1 && canRowMove(i, k, j, aItem)) {// 空位可移
            //move
            move(i, j, i, k);
            aItem[i][k] = aItem[i][j];
            aItem[i][j] = -1;
          } else if (aItem[i][k] == aItem[i][j] && canRowMove(i, k, j, aItem) && !aChanged[i][k]) {
            // 相同可移
            //move
            move(i, j, i, k);
            //add
            aItem[i][k] += aItem[i][j];
            aItem[i][j] = -1;
            //add score
            iScore += aItem[i][k];
            aChanged[i][k] = true;
          }
        }
      }
    }
  setTimeout("updateView()", 200);
  return true;
}

function isgameover () {
  // 不可移动
  if (canMoveUp(aItem) || canMoveRight(aItem) || canMoveDown(aItem) || canMoveLeft(aItem)) {
    updateScore();
  } else {
    alert("GAME OVER!");
  }
}

function updateScore () {
  document.querySelector('.score').innerHTML = iScore;
}