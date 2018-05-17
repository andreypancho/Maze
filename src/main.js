var size = 10;
var array = [];

//start координаты
var startX = 0;
var startY = 0;
//finish координаты
var finishX = 9;
var finishY = 9;

for (var i = 0; i < size; i++) {
    var temp = [];
    for (var j = 0; j < size; j++) {
        temp[j] = 0;
    }
    array.push(temp);
}

console.log(array);

//инициализация лабиринта, поиск преград и пустых клеточек
for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
        if (i == startY && j == startX) {
            //стартовая координата
            continue;
        } else if (i == finishY && j == finishX) {
            //финишная координата
            array[i][j] = -5;
            continue;
        } else {
            if (Math.random() > 0.3) {
                //пустые клетки (потенциальные ходы)
                array[i][j] = -1;
            } else {
                array[i][j] = -333;
            }
        }
    }
}

console.log(array);

//сам волновой алгоритм, пускаем волну от старта и до финиша
var iteration = 0;
var iter = iteration;
var flag = true;
var resultStep = 0;

for (var step = 0; step < 200; step++) {
    if (flag) {
        for (var y = 0; y < size; y++) {
            for (var x = 0; x < size; x++) {
                let left = x - 1;
                let right = x + 1;
                let top = y - 1;
                let bottom = y + 1;
                if (array[y][x] == iter && array[y][right] == -1) {
                    let temp = iteration + 1;
                    array[y][x + 1] = temp;
                }
                if (array[y][x] == iter && array[y][left] == -1) {
                    let temp = iteration + 1;
                    array[y][x - 1] = temp;
                }

                if (y !== size - 1) {
                    if (array[y][x] == iter && array[bottom][x] == -1) {
                        let temp = iteration + 1;
                        array[y + 1][x] = temp;
                    }
                }
                if (y !== 0) {
                    if (array[y][x] == iter && array[top][x] == -1) {
                        let temp = iteration + 1;
                        array[y - 1][x] = temp;
                    }
                }

                if (y !== size - 1) {
                    if (
                        (array[y][x] == iter && array[y + 1][x] == -5) ||
                        (array[y][x] == iter && array[y][x + 1] == -5)
                    ) {
                        // flag = false;
                        resultStep = step;
                    }
                }
            }
        }
        // debugger;
        iteration++;
        iter = iteration;
    }
}

console.log(array);

//поиск самого короткого пути (идем от финиша на старт)

var x = finishX;
var y = finishY;
var iter = -5;
if (
    array[y - 1][x] !== -333 &&
    array[y - 1][x] !== -1 &&
    array[y][x - 1] !== -333 &&
    array[y][x - 1] !== -1
) {
    var iteration = +Math.min(array[y - 1][x], array[y][x - 1]);
}

console.log(iteration);

for (var step = 0; step < 200; step++) {
    let flag = true;
    if (
        flag &&
        array[y][x] == iter &&
        array[y][x - 1] == iteration &&
        array[y][x - 1] !== -1
    ) {
        array[y][x] = "X";
        array[y][x - 1] = "X";
        iter = "X";
        x -= 1;
        // iteration--;
        // flag = false;
    }
    if (
        flag &&
        array[y][x] == iter &&
        array[y][x + 1] == iteration &&
        array[y][x + 1] !== -1
    ) {
        array[y][x] = "X";
        array[y][x + 1] = "X";
        iter = "X";
        x += 1;
        // iteration--;
        // flag = false;
    }

    if (
        flag &&
        y !== size - 1 &&
        array[y][x] == iter &&
        array[y + 1][x] == iteration &&
        array[y + 1][x] !== -1
    ) {
        array[y][x] = "X";
        array[y + 1][x] = "X";
        iter = "X";
        y += 1;
        // iteration--;
        // flag = false;
    }

    if (
        flag &&
        y !== 0 &&
        array[y][x] == iter &&
        array[y - 1][x] == iteration &&
        array[y - 1][x] !== -1
    ) {
        array[y][x] = "X";
        array[y - 1][x] = "X";
        iter = "X";
        y -= 1;
        // iteration--;
        // flag = false;
    }
    iteration--;
}

console.table(array);

/// рисуем результат
var table = "<table>";
for (let y = 0; y < size; y++) {
    table += "<tr>";
    for (let x = 0; x < size; x++) {
        if (y == startY && x == startX) {
            table += `<td style="background: #A9EBC3"></td>`;
            continue;
        }
        if (y == finishY && x == finishX) {
            table += `<td style="background: red"></td>`;
            continue;
        }
        if (array[y][x] == "X") {
            table += `<td style="background: yellow"></td>`;
        } else if (array[y][x] == -333) {
            table += `<td style="background: black"></td>`;
        } else {
            table += `<td style="background: white"></td>`;
        }
    }
    table += "</tr>";
}
table += "</table>";
document.querySelector(".wrapper-maze").innerHTML = table;

//////////////////////для генерации лабиринта
// !(function(hate, width, maze, walls, currentPosition) {
//     hate = hate % 2 == 0 ? hate + 1 : hate; // в статье было объяснено, почему числа должны быть нечетными
//     width = width % 2 == 0 ? width + 1 : width; // добавил еще 2 строчки, чтобы люди не страдали и вводили любые числа
//     document
//         .getElementById("maze")
//         .setAttribute(
//             "style",
//             "height:" + hate * 10 + "px; width:" + width * 10 + "px"
//         );
//     for (var y = 0; y < hate; y++) {
//         maze[y] = [];
//         for (var x = 0; x < width; maze[y][x++] = "wall") {
//             var el = document
//                 .getElementById("maze")
//                 .appendChild(document.createElement("div"));
//             el.className = "block wall";
//             el.setAttribute("id", y + "-" + x);
//         }
//     }

//     function amaze(y, x, addBlockWalls) {
//         maze[y][x] = "maze";
//         document.getElementById(y + "-" + x).className = "block";
//         if (addBlockWalls && valid(y + 1, x) && maze[y + 1][x] == "wall")
//             walls.push([y + 1, x, [y, x]]);
//         if (addBlockWalls && valid(y - 1, x) && maze[y - 1][x] == "wall")
//             walls.push([y - 1, x, [y, x]]);
//         if (addBlockWalls && valid(y, x + 1) && maze[y][x + 1] == "wall")
//             walls.push([y, x + 1, [y, x]]);
//         if (addBlockWalls && valid(y, x - 1) && maze[y][x - 1] == "wall")
//             walls.push([y, x - 1, [y, x]]);
//     }

//     function valid(a, b) {
//         return a < hate && a >= 0 && b < width && b >= 0 ? true : false;
//     }

//     amaze(currentPosition[0], currentPosition[1], true);
//     while (walls.length != 0) {
//         var randomWall = walls[Math.floor(Math.random() * walls.length)],
//             host = randomWall[2],
//             opposite = [
//                 host[0] + (randomWall[0] - host[0]) * 2,
//                 host[1] + (randomWall[1] - host[1]) * 2
//             ];
//         if (valid(opposite[0], opposite[1])) {
//             if (maze[opposite[0]][opposite[1]] == "maze")
//                 walls.splice(walls.indexOf(randomWall), 1);
//             else
//                 amaze(randomWall[0], randomWall[1], false),
//                 amaze(opposite[0], opposite[1], true);
//         } else walls.splice(walls.indexOf(randomWall), 1);
//     }
//     document.getElementById("0-0").className = "block me";
//     document.getElementById(
//             parseInt(hate) - 1 + "-" + (parseInt(width) - 1)
//         ).className =
//         "block finish";
//     document.body.onkeydown = function(e) {
//         var newPosition = [
//             currentPosition[0] + (e.keyCode - 39) % 2,
//             currentPosition[1] + (e.keyCode - 38) % 2
//         ];
//         if (
//             valid(newPosition[0], newPosition[1]) &&
//             maze[newPosition[0]][newPosition[1]] != "wall"
//         ) {
//             document.getElementById(
//                     currentPosition[0] + "-" + currentPosition[1]
//                 ).className =
//                 "block";
//             currentPosition = newPosition;
//             document.getElementById(
//                     currentPosition[0] + "-" + currentPosition[1]
//                 ).className =
//                 "block me";
//             if (currentPosition[0] == hate - 1 && currentPosition[1] == width - 1)
//                 document
//                 .getElementById("complete")
//                 .setAttribute("style", "display:block");
//         }
//     };
// })(
//     parseInt(prompt("Введите высоту лабиринта:")),
//     parseInt(prompt("Введите ширину лабиринта:")), [], [], [0, 0]
// );