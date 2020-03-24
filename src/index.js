import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
      return (
        <button className="square" onClick={props.onClick}>
          {props.value}
        </button>
      );
    }
    
  
  
  class Board extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
        timer: false,
        time: 5
      };
      
    }

    handleClick(i){
      const squares = this.state.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'О';
      this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      
    });
    }

    handleReset = () =>{
      this.setState(state =>({
        squares: Array(9).fill(null),
        xIsNext: true,
        timer: null,
    
      
  
      }));

    }
    
    renderSquare(i) {
      return (
        <Square 
          value={this.state.squares[i]} 
          onClick={() => this.handleClick(i)} // не делать
          />
        );

    }
    
    startTimer() {
          
          let timer = setInterval(()=>{
            var timeLeft = this.state.time-1
      
            if (timeLeft === 0){
              clearInterval(timer)
            }
            this.setState({
              time: timeLeft
            })
          },1000)
          return this.setState({time: time})
        }


    render() {
      const winner = calculateWinner(this.state.squares);
      const {timer} = this.state
      let status;
      if (winner){
        this.startTimer()
        status = 'Выиграл ' + winner

        if (!timer) { this.setState({ timer: true })}
      } else {
      status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
          <div>
          
          
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div>
          <TimerDisplay />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
 class TimerDisplay extends React.Component {
   render() {
      if(this.state.time === 0 || this.state.time === null){
          return <div></div>
      }
          return <h1>Game started: {this.state.time}</h1>
      
   }
 }

  
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function calculateWinner(squares) {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }