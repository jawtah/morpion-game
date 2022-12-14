import React, {useState, useCallback} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square (props){
    return(
      <button  
        className='square'
        onClick={props.onClick}
      >
        {props.value}
      </button>
    )
}
  function Board (props) {
    const  renderSquare = (i) => {
        return (
          <Square
            value={props.squares[i]}
            onClick={() => props.onClick(i)}
          />
        );
      }
   
     

  
      return (
        <div>
      
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
      );
    
  }
  function calculateWinner (squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i=0; i<lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a]=== squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }

    }
    return null;
  }
  
  const Game = () => {
    
    const [history,setHistory]= useState([{squares:Array(9).fill(null)}]);
    const [xIsNext,setXIsNext]= useState('true');
    const [stepNumber,setStepNumber]= useState(0);

    // function handleRestartGame() {
    //   setXIsNext(true);
    //   setHistory(Array(9).fill(null));
      
    // }
  
    
    const handleClick = useCallback((i) =>{
        const historique = history.slice(0,stepNumber +1);
        const current = historique[historique.length - 1];
        const squares = current.squares.slice();
       
        if (calculateWinner(squares) || squares[i]){
          console.log(squares)
            return;
        }
        squares[i]= xIsNext ? 'X':'O';
       
        setHistory(history.concat([{squares:squares}]));
        setStepNumber(history.length);
        setXIsNext(!xIsNext);
        
        },
          [history,setStepNumber,setXIsNext,setHistory,xIsNext,stepNumber]
    )

    const jumpTo = (step) => {
        
            setStepNumber(step) ;
            setXIsNext(step % 2 === 0);
     };

     const current = history[stepNumber];
     const winner = calculateWinner(current.squares);
     console.log(current.squares)
     
    
    
    const moves = history.map((step,move) => {
        const desc= move ?
        'revenir au tour numero'+ move :
        'revenir au d??but de la partie';
        return(
            <li key={move}>
                <button onClick={() => jumpTo(move)}> {desc}
                </button>
            </li>
        );
    });

  
    let status = null;
    
    if (winner){
      status = winner +'a gagn??'}    
    else if (stepNumber === 9){ status ='match null'}
    else {
       status = 'Prochain joueur:' + (xIsNext ? 'X':'O')
    }
       
         

      return (
        <div className="game">
          <div className="game-board">
            <Board 
            squares={current.squares}
            onClick={(i) => handleClick(i)}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
          <div className="game-info">
            <button
              onClick={() => {

              document.location.reload(true);
            }} >
            ReStart
            </button>

          </div>
          
        </div>
      );
    
  
      }
  // ========================================
  
   const root = ReactDOM.createRoot(document.getElementById("root"));
   root.render(<Game />);

   
 
