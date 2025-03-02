const text = document.getElementById('win-side-text')
const message = document.getElementById('outer-message')
const button = document.getElementById('reset-game-button')

const cells = Array.from(document.getElementsByClassName('cells'))

const gridEl = document.createElement("div");
gridEl.className = "grid";
document.body.appendChild(gridEl);

let DRAW_INDEX = true
let PLAYING_SIDE = false

for (let i = 0; i < 3; i++) {
    const lineEl = document.createElement("div");
    lineEl.className = "line";
    gridEl.appendChild(lineEl);
    for (let j = 0; j < 3; j++) {
        const cellEl = document.createElement("button");
        cellEl.className = "cell";
        lineEl.appendChild(cellEl)
    }
}

function resetCells()
{
    for (let i = 0; i < 9; i++)
    {
        cells[i].style.backgroundImage = ''
        cells[i].style.pointerEvents = 'all'
    }
}

resetCells()

function callMessage(currentTag)
{
    if (currentTag == colorFirst)
    {
        text.innerHTML = 'Крестики победили!'
    }
    else if (currentTag == colorSecond)
    {
        text.innerHTML = 'Нолики победили!'
    }
    else if (currentTag == 'draw')
    {
        text.innerHTML = 'Ничья!'
    }

    message.style.opacity = '1'
    message.style.pointerEvents = 'all'
}

button.addEventListener('click', ()=>
{
    resetCells()
    message.style.opacity = '0'
    message.style.pointerEvents = 'none'
})

for (let k = 0; k < 9; k++) 
{
    cells[k].addEventListener('click', ()=> 
    {
        DRAW_INDEX = true

        if (PLAYING_SIDE == false) 
        {
            cells[k].style.backgroundImage = colorFirst       
            cells[k].style.pointerEvents = 'none' 
        }
        else 
        {
            cells[k].style.backgroundImage = colorSecond
            cells[k].style.pointerEvents = 'none' 
        }

        PLAYING_SIDE = !PLAYING_SIDE

        let winPositions = [0, 1, 2, 3, 4, 5, 6, 7, 8,
                            0, 3, 6, 1, 4, 7, 2, 5, 8,
                            0, 4, 8, 2, 4, 6]

        for (let i = 0; i < 22; i+=3)
        {   
            if (cells[winPositions[i]].style.backgroundImage == '' ||
                cells[winPositions[i+1]].style.backgroundImage == '' ||
                cells[winPositions[i+2]].style.backgroundImage == '')
            {
                DRAW_INDEX = false
            } 
            else if (cells[winPositions[i]].style.backgroundImage == cells[winPositions[i+1]].style.backgroundImage &&
                     cells[winPositions[i]].style.backgroundImage == cells[winPositions[i+2]].style.backgroundImage && 
                     cells[winPositions[i]].style.backgroundImage != '')
            {
                callMessage(cells[winPositions[i]].style.backgroundImage)
                DRAW_INDEX = false
                break
            }       
        }

        if (DRAW_INDEX == true)
        {
            callMessage("draw")
        }
    }) 
}

createBoard()