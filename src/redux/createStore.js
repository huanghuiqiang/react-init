

/**
 * 
 * createStore：这个API接受reducer方法作为参数，返回一个store，主要功能都在这个store上。
 * 
 * store.subscribe: 订阅state的变化，当state变化的时候执行回调，可以有多个subscribe，里面的回调会依次执行。
 * 
 * store.dispatch: 发出action的方法，每次dispatch action都会执行reducer生成新的state，然后执行subscribe注册的回调。
 * 
 * store.getState:一个简单的方法，返回当前的state。
 */


function createStore(reducer) {
  let state;
  let listeners = [];

  function subscribe(callback) {
    listeners.push(callback);
  }

  function dispatch(action) {
    // reducer的作用是在发布事件的时候改变state，所以我们的dispatch在执行回调前应该先执行reducer,用reducer的返回值重新给state赋值
    state = reducer(state, action);

    for(let i = 0; i < listeners.length; i++) {
      const listerner = listeners[i];
      listerner();
    }
  }

  function getState() {
    return state;
  }

  const store = {
    subscribe,
    dispatch,
    getState
  }

  return store;
}

export { createStore };