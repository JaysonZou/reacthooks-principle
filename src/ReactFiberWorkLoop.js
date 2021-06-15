import { renderWithHooks } from "./ReactFiberHooks";
import { FunctionComponent, IndeterminateComponent } from "./ReactWorkTags";

let workInProgress = null


function mountIndeterminateComponent(current, workInProgress, Component) {
  let children = renderWithHooks(
    current,
    workInProgress,
    Component
  )
  console.log(children);
  workInProgress.tag = FunctionComponent
  reconcileChildren(current, workInProgress, children)
  return workInProgress.child;
}

function beginWork (current, workInProgress) {
  switch (workInProgress.tag) {
    case IndeterminateComponent:
      return mountIndeterminateComponent(
        current,
        workInProgress,
        workInProgress.type  // Counter
      );
    default:
      break;  
  }
}


function performUnitOfWork(unitOfWork) {
  var current = unitOfWork.alternate;
  return beginWork(current, unitOfWork)
}

function workLoop() {
  while (workInProgress !== null) {
    workInProgress = performUnitOfWork(workInProgress)
  }
}

export function render(fiber) {
  workInProgress = fiber
  workLoop()
}

function reconcileChildren(current, workInProgress, children) {
  
}