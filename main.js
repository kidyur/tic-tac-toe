const gridEl = document.createElement("div");
gridEl.className = "grid";
document.body.appendChild(gridEl);

const pl1 = "red";
const pl2 = "blue";
const empty = "white";
const grid = [];
let side = 0;

function main() {
    for (let i = 0; i < 3; i++) {
        const lineEl = document.createElement("div");
        lineEl.className = "line";
        gridEl.appendChild(lineEl);
        grid.push([]);
        for (let j = 0; j < 3; j++) {
            const cellEl = document.createElement("button");
            cellEl.className = "cell";
            lineEl.appendChild(cellEl);
            grid[i].push(cellEl);
        }
    }
}

function reset() {
    for (line of grid) {
        for (cell of line) {
            cell.style.backgroundColor = empty;
            cell.style.pointerEvents = "all";
        }
    }
    update();
    side = 0;
}

function update() {
    side = Math.abs(side-1);

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (grid[row][col].style.backgroundColor != empty) continue;

            grid[row][col].onclick = () => {
                let color = (side ? pl2 : pl1);
                grid[row][col].style.backgroundColor = color;
                grid[row][col].style.pointerEvents = "none";
                const cnt = [0, 0, 0, 0];
                for (let idx = 0; idx < 3; idx++) {
                    cnt[0] += grid[row][idx].style.backgroundColor == color;
                    cnt[1] += grid[idx][col].style.backgroundColor == color;
                    cnt[2] += grid[idx][idx].style.backgroundColor == color;
                    cnt[3] += grid[idx][2-idx].style.backgroundColor == color;
                }
                if (Math.max(...cnt) == 3) callWin(side);
                else update() 
            }
        }
    }
}  

function callWin(player) {
    if (!player) {
        alert("player one wins");
    }
    else {
        alert("player two wins");
    }
    reset();
}

main();
reset();
