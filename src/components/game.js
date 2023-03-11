import React, { useState } from 'react';

import '../index.css';
import Board from './board.js';
import King from '../pieces/elevator'
import initGrid, { initElevators } from '../helpers/board-initialiser.js';

export default class Game extends React.Component {
  constructor() {
    super();
    const numFloors = 10;
    const numElevators = 5;
    const squares = initGrid(numElevators, numFloors);
    this.state = {
      squares: squares,
      elevators: initElevators(squares, numElevators, numFloors),
      callButtons: null,
      numFloors: numFloors,
      numElevators: numElevators,
      callStack: [],
      counter: 0
    }
  }

  getClosestElevator(elevators) {
    // get first queue element -> first floor in the line
    let currentFloor = null;
    const callStack = this.state.callStack;
    if(this.state.callStack.length > 0){
      currentFloor = callStack[0];
    }else{
      return null;
    }
    let closestElevator = null;
    let closestDist = null;
    for (let i = 0; i < elevators.length; i++) {
      const floor = elevators[i].currentFloor;
      if (!elevators[i].isMoving && (closestDist === null || Math.abs(currentFloor - floor) < closestDist)) {
        closestElevator = elevators[i];
        closestDist = Math.abs(currentFloor - floor)
      }
    }
    if (closestElevator === null) {
      console.log('All elevators are taken...');
      return null;
    }
    closestElevator.targetFloor = currentFloor;
    closestElevator.isMoving = true;
    // removes the floor from the queue as it got an elevator.
    callStack.shift();
    this.setState({callStack: callStack});
    return closestElevator;
  }

  updateNumFloors = (mode) => {
    let currentNumFloors = this.state.numFloors;
    switch(mode){
      case '+':
        currentNumFloors += 1;
        break;
      case '-':
        if(currentNumFloors > 1){
          currentNumFloors -= 1;
        }
        break;
      default:
        break;
    }
    const squares = initGrid(this.state.numElevators, currentNumFloors);
    this.setState({
      squares: squares,
      elevators: initElevators(squares, this.state.numElevators, currentNumFloors),
      numFloors: currentNumFloors
    })
  }

  updateNumElevators = (mode) => {
    let currentNumElevators = this.state.numElevators;
    switch(mode){
      case '+':
        currentNumElevators += 1;
        break;
      case '-':
        if(currentNumElevators > 1){
          currentNumElevators -= 1;
        }
        break;
      default:
        break;
    }
    const squares = initGrid(currentNumElevators, this.state.numFloors);
    this.setState({
      squares: squares,
      elevators: initElevators(squares, currentNumElevators, this.state.numFloors),
      numElevators: currentNumElevators
    })
  }

  updateState = (squares, elevators) => {
    this.setState({ squares: squares, elevators: elevators });
  }

  handleClick(i) {
    const squares = [...this.state.squares];
    const elevators = [...this.state.elevators];
    const callStack = this.state.callStack;
    callStack.push(i);
    this.setState({callStack: callStack});
    const elevator = this.getClosestElevator(elevators, i);
    this.forceUpdate();
  }


  render() {

    return (
      <div>
        <div className="game">
          <h1>Elevator Exercise</h1>
          <div className="game-board">
            <Board
              numFloors={this.state.numFloors}
              numElevators={this.state.numElevators}
              updateState={this.updateState}
              elevators={this.state.elevators}
              squares={this.state.squares}
              changeOccured={this.state.counter}
              onClick={(i) => this.handleClick(i)}
            />
          </div>
        </div>
        <div>
          <h3>Choose number of floors:</h3>
          <button
            onClick={() => {this.updateNumFloors('-')}}
          >-</button>
          | {this.state.numFloors} |
          <button
            onClick={() => {this.updateNumFloors('+')}}
          >+</button>
        </div>
        <div>
          <h3>Choose number of elevators:</h3>
          <button
            onClick={() => {this.updateNumElevators('-')}}
          >-</button>
          | {this.state.numElevators} |
          <button
            onClick={() => {this.updateNumElevators('+')}}
          >+</button>
        </div>
      </div>


    );
  }
}

