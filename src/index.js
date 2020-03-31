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
        isGameOver: false,
        timeLeft: null
      };
      
    }



    handleClick(i){
      //const {isGameOver} = this.state;
      const squares = this.state.squares.slice();
      //if (!isGameOver) { this.setState({ isGameOver: true }) }
      if (calculateWinner(squares) || squares[i]) {
        return
      }
      squares[i] = this.state.xIsNext ? 'X' : 'О';
      this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
      timeLeft: 5
      
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
    
    // startTimer() {
    //       
    //       let timer = setInterval(()=>{
    //         var timeLeft = this.state.time-1
      
    //         if (timeLeft === 0){
    //           clearInterval(timer)
    //         }
    //         this.setState({
    //           time: timeLeft
    //         })
    //       },1000)
    //       return this.setState({time: timer})
    //     }


    componentDidMount(){
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
    // componentWillMount(){
    //   clearInterval(this.timerID);
    // }

    tick() {
      var newTime = this.state.timeLeft - 1
      if (newTime === 0){
                  clearInterval(this.timerID)
          // this.setState({
          //   isGameOver: false
          // });
          this.setState({
            squares: Array(9).fill(null),
            xIsNext: true,
            isGameOver: false,
          });        
        }
      this.setState({
        timeLeft: newTime
      });
    }


    render() {
      const {isGameOver} = this.state;
      const winner = calculateWinner(this.state.squares);
      //const {timer} = this.state
      let status;
      if (winner){
        status = 'Выиграл ' + winner
        if (!isGameOver) { this.setState({ isGameOver: true }) }
      
        
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
          
          { isGameOver && <h1>Game started in: {this.state.timeLeft} </h1>}
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
          {/* <div>
          <TimerDisplay />
          </div> */}
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
//  class TimerDisplay extends React.Component {
//    render() {
//       if(this.props.timeLeft === 0 || this.props.timeLeft === null){
//           return <div></div>
//       }
//           return <h1>Game starts in: {this.props.timeLeft}</h1>
      
//    }
//  }

  
  
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