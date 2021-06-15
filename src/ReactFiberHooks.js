let ReactCurrentDispatcher = {
  current: null
}

const HookDispatcherOnMount = {
  useReducer: mountReducer
}

let workInProgressHook = null

let currentlyRenderingFiber = null

// 不同阶段useReducer有不同实现
export function renderWithHooks(current, workInProgress, Component) {
  currentlyRenderingFiber = workInProgress
  ReactCurrentDispatcher.current = HookDispatcherOnMount
  let children = Component();
  currentlyRenderingFiber = null
  return children
}

function mountReducer (reducer, initialArg) {
  // 构建hooks 单向链表
  let hook = mountWorkInProgressHook()
  hook.memoizedState = initialArg
  const queue = (hook.queue = {pending: null})
}

export function useReducer (reducer, initialArg) {
  return ReactCurrentDispatcher.current.useReducer(reducer, initialArg)
}

function mountWorkInProgressHook() {
  let hook  ={ 
    memoizedState: null,
    queue: null,
    next: null
  }

  if (workInProgressHook === null) {
    // first hook
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook
  } else {
    workInProgressHook = workInProgressHook.next = hook
  }
}