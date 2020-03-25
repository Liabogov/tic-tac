import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';




class TimerWrapper extends React.Component {
    constructor(props) {
      super(props)
      this.startTimer = this.startTimer.bind(this)
      this.state = {
        timeLeft: null,
        timer: null
      }
    }
    startTimer(timeLeft) {
      clearInterval(this.state.timer)
      let timer = setInterval(()=>{
        var timeLeft = this.state.timeLeft -1
        if (timeLeft === 0){
          clearInterval(timer)
        }
        this.setState({
          timeLeft: timeLeft
        })
      },1000)
      return this.setState({timeLeft: timeLeft, timer: timer})
    }
    
    render () {
      return (
        <div>
        <h1>Timer</h1>
          <div>
            <Button time = '5' startTimer = {this.startTimer}/>
          </div>
          <TimerDisplay timeLeft = {this.state.timeLeft} />
        </div>
      )
    }
  
  }
  
  class Button extends React.Component {
    handleClick(){
      return this.props.startTimer(this.props.time)
    }
    render(){
      return <button onClick={this.handleClick.bind(this)}>{this.props.time} second</button>
    }
  }
  
   class TimerDisplay extends React.Component {
      render() {
    
        if(this.props.timeLeft === 0 || this.props.timeLeft === null){
          return <div></div>     
         }
        return <h1> Timer now: {this.props.timeLeft}</h1>
      }
    }
  

// function Square(props) {
//       return (
//         <button className="square" onClick={props.onClick}>
//           {props.value}
//         </button>
//       );
//     }
    
  
  
  // class Board extends React.Component {
  //   constructor(props){
  //     super(props);
  //     this.state = {
  //       squares: Array(9).fill(null),
  //       xIsNext: true,
  //       timer: null,
  //       timeLeft: 5
  //     };
      
  //   }

    // startTimer() {
    //   let timer = setInterval(()=>{
    //             var timeLeft = this.state.timeLeft-1
    //             if (timeLeft === 0){
    //               clearInterval(timer)
    //             }
    //             this.setState({
    //               timeLeft: timeLeft
    //             })
    //           },1000)
    //           return this.setState({timeLeft: timeLeft ,time: timer})
    //         }
    

    // handleClick(i){
    //   const squares = this.state.squares.slice();
    //   if (calculateWinner(squares) || squares[i]) {
    //     this.startTimer
    //     return
    //   }
    //   squares[i] = this.state.xIsNext ? 'X' : 'О';
    //   this.setState({
    //   squares: squares,
    //   xIsNext: !this.state.xIsNext,
      
    // });
    // }

    // handleReset = () =>{
    //   this.setState(state =>({
    //     squares: Array(9).fill(null),
    //     xIsNext: true,
    //     timer: null,
    
      
  
    //   }));

    // }
    
    // renderSquare(i) {
    //   return (
    //     <Square 
    //       value={this.state.squares[i]} 
    //       onClick={() => this.handleClick(i)} // не делать
    //       />
    //     );

    // }
    
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


   // render() {
      // const winner = calculateWinner(this.state.squares);
      // //const {timer} = this.state
      // let status;
      // if (winner){
      //   this.startTimer()
      //   status = 'Выиграл ' + winner

        
      // } else {
      // status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');
      // }
     // return (
        // <div>
        //   <div className="status">{status}</div>
        //   <div className="board-row">
        //     {this.renderSquare(0)}
        //     {this.renderSquare(1)}
        //     {this.renderSquare(2)}
        //   </div>
        //   <div className="board-row">
        //     {this.renderSquare(3)}
        //     {this.renderSquare(4)}
        //     {this.renderSquare(5)}
        //   </div>
        //   <div className="board-row">
        //     {this.renderSquare(6)}
        //     {this.renderSquare(7)}
        //     {this.renderSquare(8)}
        //   </div>
        //    <div>
          
        //   <h1>Game start: {this.state.timer}</h1>
        //   </div> 
        // </div>
  //       <div>
  //           <h1>Time to: {this.state.time} </h1>
  //          <div> <button onClick = {this.startTimer}>timerGo</button></div>
  //       </div>
  //     );
  //   }
  // }
  
  // class Game extends React.Component {
  //   render() {
  //     return (
  //       <div className="game">
  //         <div className="game-board">
  //           <Board />
  //         </div>
  //         {/* <div>
  //         <TimerDisplay />
  //         </div> */}
  //         <div className="game-info">
  //           <div>{/* status */}</div>
  //           <ol>{/* TODO */}</ol>
  //         </div>
  //       </div>
  //     );
  //   }
  // }
//  class TimerDisplay extends React.Component {
//    render() {
//       if(this.props.time === 0 || this.props.time === null){
//           return <div></div>
//       }
//           return <h1>Game starts in: {this.props.time}</h1>
      
//    }
//  }

  
  
  // ========================================
 
  
    ReactDOM.render(
        <TimerWrapper />,
        document.getElementById('root')
      );
  // ReactDOM.render(
  //   <Game />,
  //   document.getElementById('root')
  // );

  // function calculateWinner(squares) {
  //   const lines = [
  //     [0, 1, 2],
  //     [3, 4, 5],
  //     [6, 7, 8],
  //     [0, 3, 6],
  //     [1, 4, 7],
  //     [2, 5, 8],
  //     [0, 4, 8],
  //     [2, 4, 6],
  //   ];
  //   for (let i = 0; i < lines.length; i++) {
  //     const [a, b, c] = lines[i];
  //     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
  //       return squares[a];
  //     }
  //   }
  //   return null;
  // }