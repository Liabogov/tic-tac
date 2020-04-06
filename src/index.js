import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

const Square = ({ onClick, value }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
);

class Board extends React.Component {
  state = {
    squares: Array(9).fill(null),
    xIsNext: true,
    isGameOver: false,
    isDraw: false,
    timeLeft: 20,
  }
  

  handleClick = (i) => {
    const { xIsNext } = this.state;
    const squares = this.state.squares.slice();

    if (calculateWinner(squares) || squares[i]) { return; }

    squares[i] = xIsNext ? 'X' : 'О';

    if (areAllBoxesClicked(squares)) {
      this.setState({ isGameOver: true, squares, isDraw: true });
      this.startTimer();

      return;
    }

    if (calculateWinner(squares)) {
      this.setState({ isGameOver: true, squares });
      this.startTimer();

      return;
    }

    this.setState({ squares, xIsNext: !xIsNext });
  }

  renderSquare = (i) => (
    <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />
  );
  
  startTimer = () => {
    this.interval = setInterval(() => {
      if (this.state.timeLeft > 0) {
        this.setState({ timeLeft: this.state.timeLeft - 1 });
      } else {
        this.handleReset();
        clearInterval(this.interval);
      }
    }, 1000);
  };

  handleReset = () => {
    clearInterval(this.interval)
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
      isGameOver: false,
      isDraw: false,
      timeLeft: 20,
    });
  }

  render = () => {
    const { isGameOver } = this.state;
    const winner = calculateWinner(this.state.squares);
    const isDraw = areAllBoxesClicked(this.state.squares);

    let status;
    if (isDraw) {
      status = 'Draw';
    } else if (winner) {
      status = 'Выиграл ' + winner;
    } else {
      status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div>
        <div> {isGameOver && <h2>Game started in: {this.state.timeLeft}</h2>}</div>
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
        <div className="status">{status}</div>
        <div>
          {isGameOver && <button className = "button" onClick = {this.handleReset}>Reset Game</button>}
        </div>
        
      </div>
    );
  }
}

const Game = () => (
  <div className="game">
    <div className="game-board">
      <Board />
    </div>
    <div className="game-info">
      <div>{/* status */}</div>
      <ol>{/* TODO */}</ol>
    </div>
  </div>
);

const calculateWinner = (squares) => {
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

  let winner = null;
  lines.forEach((_, index) => {
    const [a, b, c] = lines[index];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      winner = squares[a];
    }
  });

  return winner;
};

const areAllBoxesClicked = (squares) => {
  let count = 0;

  squares.forEach(item => item && count++);

  return count === 9;
};

ReactDOM.render(<Game />, document.getElementById('root'));