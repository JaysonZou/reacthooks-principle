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
  workInProgressHook = null
  return children
}

function mountReducer (reducer, initialArg) {
  // 构建hooks 单向链表
  let hook = mountWorkInProgressHook()
  hook.memoizedState = initialArg
  const queue = (hook.queue = {pending: null})
  const dispatch = dispatchAction.bind(null, currentlyRenderingFiber, queue)
  return [hook.memoizedState, dispatch]
}

function dispatchAction (currentlyRenderingFiber, queue, action) {
  const update = { action, next: null }
  const pending = queue.pending
  if (pending === null) {
    update.next = update
  } else {
    update.next = pending.next
    pending.next = update
  }
  queue.pending = update
}

export function useReducer (reducer, initialArg) {
  return ReactCurrentDispatcher.current.useReducer(reducer, initialArg)
}

function mountWorkInProgressHook() {
  let hook  ={ 
    memoizedState: null,
    queue: null, //更新操作 环型
    next: null
  }

  if (workInProgressHook === null) {
    // first hook
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook
  } else {
    workInProgressHook = workInProgressHook.next = hook
  }

  return workInProgressHook
}