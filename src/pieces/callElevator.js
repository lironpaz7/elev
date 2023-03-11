import img from '../pieces/icons8-elevator.svg'

export default class CallButton {
  constructor(id) {
    this.id = id;
    this.isCalled = false;
    this.targetFloor = null;
    this.text = this.isCalled ? "Waiting..." : "Call";
    this.style = { background: `${this.isCalled ? "red" : "green"}` };
  }
}
