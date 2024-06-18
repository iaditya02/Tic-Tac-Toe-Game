const boxes=document.querySelectorAll(".box");
const gameInfo=document.querySelector(".game-info");
const newGamebtn=document.querySelector(".btn");
const wrap=document.querySelector(".wrapper");
const tic=document.querySelector(".tic-tac");
const playerX=document.getElementById("playerX");
const  playerO=document.getElementById("playerO")

let currentPlayer;
let gameGrid;

const winningPositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];


function initGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    enterNames.classList.add("active");
    wrap.classList.remove("active");
    tic.classList.add("active");
    // to update in ui
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all";
        //apply all css propeety again
        box.classList=`box  box${index+1}`;

    })
    newGamebtn.classList.remove("active");
    if(currentPlayer==="X"){
        gameInfo.innerText=`It's ${currentPlayer} ${playerX.value}'s turn`;

    }
    else{
        gameInfo.innerText=`It's ${currentPlayer} ${playerO.value}'s turn`;
    }
}
// initGame();


function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
        gameInfo.innerText=`It's ${currentPlayer} ${playerO.value}'s turn`;
    }
    else{
        currentPlayer="X";
        gameInfo.innerText=`It's ${currentPlayer} ${playerX.value}'s turn`;
    }
    // gameInfo.innerText=`It's ${currentPlayer}'s turn`;
}

function checkWinner(){
    let answer="";

    winningPositions.forEach((position)=>{
        if((gameGrid[position[0]]!==""||gameGrid[position[1]]!==""||gameGrid[position[2]]!=="")
        &&(gameGrid[position[0]]===gameGrid[position[1]])&&(gameGrid[position[1]]===gameGrid[position[2]])){
            if(gameGrid[position[0]]==="X"){
                answer="X";
            }
            else{
                answer="O";
            }
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    if(answer!==""&&answer==="X"){
        gameInfo.innerText= `Congratulations! Player ${answer} - ${playerX.value}  Wins!`
        newGamebtn.classList.add("active");
        return;
    }
    if(answer!==""&&answer==="O"){
        gameInfo.innerText= `Congratulations! Player ${answer} - ${playerO.value}  Wins!`
        newGamebtn.classList.add("active");
        return;
    }

    let fillCount=0;

    gameGrid.forEach((index)=>{
        if(index!==""){
            fillCount++;
        }
    });

    if(fillCount===9){
        gameInfo.innerText= "It's a Draw!";
        newGamebtn.classList.add("active");
    }
}


function handleClick(index){
    if(gameGrid[index]===""){
        gameGrid[index]=currentPlayer;
        boxes[index].innerText=currentPlayer;
        boxes[index].style.pointerEvents="none";

        swapTurn();

        checkWinner();

    }
}

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        handleClick(index);
    });
});

function playAgain(){
    wrap.classList.add("active");
    tic.classList.remove("active");
    enterNames.classList.remove("active");
}

newGamebtn.addEventListener("click",()=>{
    playAgain();
});

const enterNames=document.querySelector(".enterNames");
const start=document.querySelector(".startGame");
start.addEventListener("click", ()=>{
    initGame()
});

