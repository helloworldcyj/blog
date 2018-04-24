function nospace (aItems) {
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++)
      if (aItems[i][j] == -1)
        return false;
  return true;
}

function removeByClass (className) {// 按类名删除节点
  let aClas = document.getElementsByClassName(className);
  while (aClas.length) {
    aClas[0].remove();
  }
}

function myappendChild (oPar, template) {
  oPar.innerHTML += template;
}

function getNumberBackgroundColor (number) {// 设置数字元素的背景颜色
  switch (number) {
    case 2:
      return "#f2b179";
      break;
    case 4:
      return "#f59563";
      break;
    case 8:
      return "#f67c5f";
      break;
    case 16:
      return "#f65e3b";
      break;
    case 32:
      return "#edcf72";
      break;
    case 64:
      return "#edcc61";
      break;
    case 128:
      return "#9c0";
      break;
    case 256:
      return "#33b5e5";
      break;
    case 512:
      return "#09c";
      break;
    case 1024:
      return "#a6c";
      break;
    case 2048:
      return "#93c";
      break;
  }
}

function getNumberColor (number) {// 设置数字元素的颜色
  if (number <= 4)
    return "#776e65";
  return "white";
}

function canMoveUp (aItem) {// 判断是否能上移
  for (let i = 1; i < 4; i++)
    for (let j = 0; j < 4; j++)
      if (aItem[i][j] != -1)
        if (aItem[i - 1][j] == -1 || aItem[i - 1][j] == aItem[i][j])
          return true;
  return false;
}

function canMoveRight (aItem) {// 判断是否能右移
  for (let i = 0; i < 4; i++)
    for (let j = 2; j >= 0; j--)
      if (aItem[i][j] != -1)
        if (aItem[i][j + 1] == -1 || aItem[i][j] == aItem[i][j + 1])
          return true;
  return false;
}

function canMoveDown (aItem) {// 判断是否能下移
  for (let i = 2; i >= 0; i--)
    for (let j = 0; j < 4; j++)
      if (aItem[i][j] != -1)
        if (aItem[i + 1][j] == -1 || aItem[i][j] == aItem[i + 1][j])
          return true;
  return false;
}

function canMoveLeft (aItem) {// 判断是否能左移
  for (let i = 0; i < 4; i++)
    for (let j = 1; j < 4; j++)
      if (aItem[i][j] != -1)
        if (aItem[i][j - 1] == -1 || aItem[i][j - 1] == aItem[i][j])
          return true;
  return false;
}

function canRowMove (row, col1, col2, aItem) {// 判断当前一行中是否可以移动
  for (let i = col1 + 1; i < col2; i++)
    if (aItem[row][i] != -1)
      return false;
  return true;
}

function canColMove (col, row1, row2, aItem) {// 判断当前一列中是否可以移动
  for (let i = row1 + 1; i < row2; i++)
    if (aItem[i][col] != -1)
      return false;
  return true;
}

