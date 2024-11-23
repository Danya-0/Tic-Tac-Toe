let currentPlayer = "X";
let cells = document.querySelectorAll(".cells");
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let isWinner = false;
let winner = "";
let scoreX = 0;
let scoreO = 0; 

const winConditions = [
    [0, 1, 2], // первый ряд
    [3, 4, 5], // второй ряд
    [6, 7, 8], // третий ряд
    [0, 3, 6], // первая колонка
    [1, 4, 7], // вторая колонка
    [2, 5, 8], // третья колонка
    [0, 4, 8], // диагональ слева направо
    [2, 4, 6]  // диагональ справа налево
]

function switchPlayer(cellIndex)
{
    if(gameBoard[cellIndex] || !gameActive)
    {
        return;
    }

    gameBoard[cellIndex] = currentPlayer

    if(currentPlayer == "X")
    {
        currentPlayer = "O"
    }
    else
    {
        currentPlayer = "X"
    }
    updateInerface();
    checkWinner();
}

function updateInerface()
{
    for(let i = 0; i < cells.length; i++)
    {
        cells[i].innerText = gameBoard[i]
    }
}

function checkWinner() 
{
    let message = document.getElementById("message")

    for(let i = 0; i < winConditions.length; i++)
    {
        let [a, b, c] = winConditions[i]

        if(gameBoard[a] == gameBoard[b] && gameBoard[a] == gameBoard[c] && gameBoard[a] != "")
        {
            winner = gameBoard[a]
            gameActive = false
            message.innerText = "Победил игрок " + winner
            changeScore(winner)
            endGame()
        }
    }

    gameActive = false

    for(let i = 0; i < gameBoard.length; i++)
    {
        if(gameBoard[i] == "")
        {
            gameActive = true
            break
        }
    }

    if(!gameActive && winner == "")
    {
        message.innerText = "У вас ничья!"
        endGame()
    }
}

function endGame()
{
    for(let i = 0; i < cells.length; i++)
    {
        let cell = cells[i]
        cell.getAttribute("disabled")
        cell.disabled = true
    }
}

function restart()
{
    for(let i = 0; i < cells.length; i++)
    {
        let cell = cells[i]
        cell.disabled = false
    }

    if(winner == "")
    {
        currentPlayer = "X"
    }
    else
    {
        currentPlayer = winner
    }

    gameBoard = ["", "", "", "", "", "", "", "", ""]
    message.innerText = ""
    winner = ""
    gameActive = true
    updateInerface()
}

function changeScore(winner)
{
    if(winner == "X")
    {
        scoreX++
    }
    else
    {
        scoreO++
    }

    updateScoreInterface()
}

function updateScoreInterface()
{
    let string = document.getElementById("score")

    string.innerText = scoreX + " : " + scoreO 
}