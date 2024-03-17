
const boardRef = document.getElementById("tic-tac-toe")
const h2 = document.querySelector('h2')
const button = document.querySelector('button')

let currentMove = 'X'
let game;
let rightD = []
let gridSize = 3

function initializeRightD(){
    let row = 0, col = gridSize -1
    while (row < gridSize && col >= 0){
        rightD.push([row, col])
        row += 1
        col -= 1 
    }
}

function createBoard(gridSize){
    for (let i = 0; i < gridSize; i++){
        const row = document.createElement('div')
        row.classList.add('row')
        for (let j = 0; j < gridSize; j++){
           
            const cellRef = document.createElement('div')
            cellRef.classList.add('cell')
            cellRef.setAttribute('data-row', i)
            cellRef.setAttribute('data-col', j)
            row.appendChild(cellRef)
        }
        boardRef.appendChild(row)
    }
}

function addEventListener(){
    boardRef.addEventListener('click', handleCellClick)
}

function handleCellClick(event){
    const target = event.target
        if (target.classList.contains('cell')){
            const row = target.dataset.row
            const col = target.dataset.col

            if (game[row][col] === 0){
                // set current div with current move
                target.textContent = currentMove
                updateGame(row, col, currentMove)
                const {win,...rest} = getWinner(row, col)

                if (win){
                    displayWinner()
                    highlightWinningCell(row, col, rest)

                } else {
                    changePlayer()
                }
            }
        }
}

function changePlayer(){
    currentMove = currentMove === 'X' ? 'Y': 'X'
    h2.textContent = currentMove === 'Y' ? "Player 2's turn": "player 1's turn"
}

function updateGame(row, col, value){
    game[row][col] = value
    
}
function displayWinner(){
    const winner = currentMove === 'X' ? 1 : 2
    h2.textContent = `Player ${winner} won`
}
function getWinner(row, col){
    // check row
    let current = game[row][col]
    let rowWin = true
    let colWin = true
    for (let i = 0; i < gridSize; i++){
        if (game[row][i] !== current){
            rowWin = false
            
        }
        if (game[i][col] !== current){
            colWin = false
        }
    }
    
    let r = 0
    let c = gridSize - 1
    let c2 = 0
    let leftDiagonalWin = true
    let rightDiagonalWin = true
    while (r < gridSize && c >= 0 && c2 < gridSize){
        if (game[r][c] !== current){
            rightDiagonalWin = false
        }
        if (game[r][c2] !== current){
            leftDiagonalWin = false
        }
       
        r += 1
        c -= 1
        c2 += 1
    }
    const win =  rowWin || colWin || leftDiagonalWin || rightDiagonalWin
    
    return {win, rowWin, colWin, leftDiagonalWin, rightDiagonalWin}
}

function resetGame(){
    const cells = document.querySelectorAll('.cell')
    cells.forEach(cell => {
        cell.textContent = ""
        if (cell.classList.contains('winning')){
            cell.classList.remove('winning')
        }
    })
    h2.textContent = "Player 1's turn"
    game = Array.from(Array(3), () => Array(3).fill(0))
    currentMove = 'X'

}


function highlightWinningCell(row, col, winningCells){
    const {
        rowWin, 
        colWin, 
        leftDiagonalWin, 
        rightDiagonalWin
    } = winningCells
    const cells = document.querySelectorAll(".cell")
    cells.forEach(cell => {
        const rowValue = cell.dataset.row
        const colValue = cell.dataset.col
        if (rowWin){
            if (rowValue === row){
                cell.classList.add('winning')
            }
        }
        else if (colWin){
            if (colValue === col){
                cell.classList.add('winning')
            }
        }
        else if (leftDiagonalWin){
            if (rowValue === colValue){
                cell.classList.add('winning')
            }
        } else if (rightDiagonalWin){
            rightD.forEach(pair => {
                const [r, c] = pair
                
                if (rowValue == r && colValue == c){
                    cell.classList.add('winning')
                }
            })
        }
    })

}

function start(gridSize){
    game = Array.from(Array(gridSize), () => Array(gridSize).fill(0))
    createBoard(gridSize)
    addEventListener()
    button.addEventListener('click', ()=>{
        resetGame()
    })
}
start(3)

