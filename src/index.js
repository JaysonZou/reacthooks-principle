import React from 'react';
import ReactDOM from 'react-dom';


const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return state+1;
    default:
      return state;  
  }
}
function Counter() {
  debugger
  const [number, setNumber] = React.useReducer(reducer, 0)
  return (<div>
    {number}
    <button onClick={() => setNumber({type: 'add'})}>Add</button>
  </div>)
}

ReactDOM.render(<Counter />, document.getElementById('root'))

// Fiber
const workInProgress = {
  tag: 2, // Fiber的类型
}