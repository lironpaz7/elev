import React from 'react';

import '../index.css';
import ElevatorButton from './elevatorButton';
import Square from './square.js';


export default class Board extends React.Component {

  renderSquare(i, j, counter) {
    return (
      <Square
        key={counter}
        keyVal={i}
        i={i}
        j={j}
        style={this.props.squares[i][j] ? this.props.squares[i][j].style : null}
      />)
  }

  updateSingleElevator(squares, elevators, elevatorId, from, to) {
    squares[from][elevatorId] = null;
    squares[to][elevatorId] = elevators[elevatorId];
    elevators[elevatorId].currentFloor = to;
  }

  updateElevatorsPositions() {
    const squares = this.props.squares;
    const elevators = this.props.elevators;
    let changeCounter = 0;
    for (let i = 0; i < this.props.numElevators; i++) {
      if (elevators[i].isMoving) {
        elevators[i].style = {...elevators[i].style, "background-color": "red"};
        changeCounter += 1;
        if (elevators[i].currentFloor === elevators[i].targetFloor) {
          // play sound
          elevators[i].play();
          // the elevator has reached it's destination and we should update it's props
          // TODO: wait for 2 seconds
          elevators[i].style = {...elevators[i].style, "background-color": "green"};
          setTimeout(()=>{
            elevators[i].isMoving = false;
            elevators[i].style = {...elevators[i].style, "background-color": "transparent"};
          }, 2000)
        } else if (elevators[i].currentFloor > elevators[i].targetFloor) {
          // the elevator should move up -> ex. floors are 0 (top) and 9 (bottom)
          this.updateSingleElevator(squares, elevators, i, elevators[i].currentFloor, elevators[i].currentFloor - 1);
        } else {
          this.updateSingleElevator(squares, elevators, i, elevators[i].currentFloor, elevators[i].currentFloor + 1);
        }
      }
    }
    if (changeCounter > 0) {
      setTimeout(()=>{
        this.props.updateState(squares, elevators);
      }, 150)
      
    }
  }



  renderButton(i) {
    return (
      <ElevatorButton
        key={i}
        keyVal={i}
        elevators={this.props.elevators}
        style={null}
        onClick={() => this.props.onClick(i)}
      />)
  }

  render() {
    this.updateElevatorsPositions();
    // console.log(this.props.elevators);
    const board = [];
    let counter = 0;
    for (let i = 0; i < this.props.numFloors; i++) {
      const squareRows = [];
      // Add the tiles of the building
      for (let j = 0; j < this.props.numElevators; j++) {
        squareRows.push(this.renderSquare(i, j, counter));
        counter += 1;
      }
      // Add the floor button
      squareRows.push(this.renderButton(i));
      board.push(<div className="board-row" key={i}>{squareRows}</div>)
    }

    return (
      <div>
        {board}
      </div>
    );
  }
}