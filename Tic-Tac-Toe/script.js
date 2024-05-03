let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'))
let result =document.querySelector(".result h1");


let WinningIndicator= getComputedStyle(document.body).getPropertyValue('--winning-blocks')
const X_TEXT = "X";
const O_TEXT = "O";
currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);



const startGame = () =>{
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}

function boxClicked(e){
    const id = e.target.id;
    if(!spaces[id]){
        spaces[id]=currentPlayer;
        e.target.innerText = currentPlayer;

        if(playerHasWon() !==false){
            result.innerText = `${currentPlayer} has Won!`
            let winning_block = playerHasWon();
            winning_block.map(box => boxes[box].style.backgroundColor= WinningIndicator);
            boxes.forEach(box=> box.removeEventListener('click',boxClicked))
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT ;
   
    }
}

const WinningCombo= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
function playerHasWon(){
    for(const condition of WinningCombo){
        let[a,b,c]= condition
            if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])){
                return [a,b,c]
            }
        }
        return false
    }

restartBtn.addEventListener('click',restart)

function restart(){
    spaces.fill(null)
    boxes.forEach(box => {
        box.innerText = ''
        box.style.backgroundColor=''
        boxes.forEach(box=> box.addEventListener('click',boxClicked))
    })
    
    result.textContent = ''
    currentPlayer = X_TEXT;
}


startGame()
