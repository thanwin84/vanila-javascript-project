const boardRef = document.getElementById('board')
const currentStatus = document.querySelector('#currentStatus')

let currentPlayer = 'X'
let gameBoard;
let gridSize = 3

function createBoard(){
    for (let r = 0; r < gridSize; r++){
        const row = document.createElement('div')
        row.classList.add('row')
        for (let c = 0; c < gridSize; c++){
            const cell = document.createElement('div')
            cell.classList.add('cell')
            cell.setAttribute('data-row', r)
            cell.setAttribute('data-col', c)
            row.appendChild(cell)
        }
        boardRef.appendChild(row)
    }
}

function addEventListener(){
    boardRef.addEventListener('click', function(event){
        if(event.target.classList.contains('cell')){
            const target = event.target
            target.innerHTML = currentPlayer
            const row = Number(target.dataset.row)
            const col = Number(target.dataset.col)
            gameBoard[row][col] = currentPlayer
            const {hasWon, winningCell} = checkWinner(row, col)
            if (hasWon){
                currentStatus.textContent = `${currentPlayer} has won`
                markWinningCells(winningCell, row, col)
            }
            else {
                changePlayer()
            }
        }
    })
}

function changePlayer(){
    currentPlayer = currentPlayer === 'X' ? 'Y': 'X'
    currentStatus.textContent = `${currentPlayer}'s Move`
    
}

function fillBoard(){
    gameBoard = Array.from(Array(gridSize), ()=> Array(gridSize).fill('0'))
}

function checkWinner(row, col){
    let rowWin = true
    let colWin = true
    let leftDiagonalWin = true
    let righDiagonalWin = true
    // check row
    for (let i = 0; i < gridSize; i++){
        if (gameBoard[row][i] !== currentPlayer){
            rowWin = false
        }
    }
    // check col
    for (let i = 0; i < gridSize; i++){
        if (gameBoard[i][col] !== currentPlayer){
            colWin = false
        }
    }
    // check left diagonal
    // check right diagonal
    let r = 0, lc = 0
    let  rc = gridSize - 1
    
    while (r < gridSize && lc < gridSize && rc >= 0){
        
        if (gameBoard[r][lc] !== currentPlayer){
            leftDiagonalWin = false
        }
        if (gameBoard[r][rc] !== currentPlayer){
            righDiagonalWin = false
        }
        r++
        lc++
        rc--

    }
    const hasWon = rowWin || colWin || leftDiagonalWin || righDiagonalWin
    return {hasWon, winningCell: rowWin ? 'rowWin': colWin ? "colWin": leftDiagonalWin ? "leftDiagonalWin": righDiagonalWin ? 'righDiagonalWin': "not won"}

}

function markWinningCells(winningCell, row, col){
    const cells = document.querySelectorAll('.cell')
    cells.forEach(cell =>{
        const rowValue = Number(cell.dataset.row)
        const colValue= Number(cell.dataset.col)
        if (winningCell === 'rowWin'){
            if (rowValue === row){
                cell.classList.add('winning')
            }
        }
        if (winningCell === 'colWin'){
            if (colValue === col){
                cell.classList.add('winning')
            }
        }
        if (winningCell === 'leftDiagonalWin'){
            if (rowValue === colValue){
                cell.classList.add('winning')
            }
        }
        if (winningCell === 'righDiagonalWin'){
            if (rowValue + colValue === gridSize - 1){
                cell.classList.add('winning')
            }
        }
    })
}

function start(){
    createBoard()
    fillBoard()
    currentStatus.textContent = `${currentPlayer}'s Move`
    addEventListener()
}

start()