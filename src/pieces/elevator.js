import img from '../pieces/icons8-elevator.svg';
import arrivedPlay from './elevator_arrived.wav';

export default class Elevator {
  constructor(id, currentFloor) {
    this.id = id;
    this.currentFloor = currentFloor;
    this.isMoving = false;
    this.audio = new Audio(arrivedPlay);
    this.targetFloor = null;
    this.style = { backgroundImage: `url(${img})`, backgroundSize: "100px 60px"};
  }

  play(){
    this.audio.play();
  }
}
