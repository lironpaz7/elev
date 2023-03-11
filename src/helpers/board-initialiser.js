import CallElevator from '../pieces/callElevator.js';
import Elevator from '../pieces/elevator.js';

export default function initGrid(numElevators, numFloors) {
  const grid = Array(numFloors).fill(null).map(row => {
    return new Array(numElevators + 1).fill(null)
  });

  return grid;
}

export function initElevators(grid, numElevators, numFloors) {
  // initialize elevators at the bottom floor
  const elevators = Array(numElevators);
  for (let j = 0; j< numElevators; j++){
    const elevator = new Elevator(j, numFloors-1);
    grid[numFloors-1][j] = elevator;
    elevators[j] = elevator;
  }
  return elevators;
}

