import React from 'react';

import '../index.css';

export default function ElevatorButton(props) {

  const isPressed = () =>{
    // const elevator = props.elevators[props.keyVal];
    // console.log(elevator);
    return false;
  }

  return (
    <button className={"tileBtn"}
      onClick={props.onClick}
      style={props.style}
      key={props.keyVal}
    >
      {isPressed() ? "Waiting..." : "Call"}
    </button>
  );

}
