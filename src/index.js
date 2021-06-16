import React from 'react';
import ReactDOM from 'react-dom';
import { render } from './ReactFiberWorkLoop';
import { IndeterminateComponent } from './ReactWorkTags'
import { useReducer} from './ReactFiberHooks'


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
    <button onClick={() => setNumber({type: 'add'}) }>Add</button>
  </div>)
}

ReactDOM.render(<Counter />, document.getElementById('root'))



// Fiber
// const workInProgress = {
//   tag: IndeterminateComponent, // Fiber的类型,
//   type: Counter,
//   alternate: null  // 上一个fiber
// }
// render(workInProgress);
