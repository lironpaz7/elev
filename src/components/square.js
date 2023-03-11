import React from 'react';

import '../index.css';

export default function Square(props) {

  return (
    <button className={"tile"}
      i={props.i}
      j={props.j}
      style={props.style}
      key={props.keyVal}
    >
    </button>
  );

}
