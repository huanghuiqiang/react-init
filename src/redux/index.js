

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

/**
 * 
 * @param {Object} reducerMap 
 * @return {object} reducer
 */
function combineReducers(reducerMap) {
  const reducerKeys = Object.keys(reducerMap);

  const reducer = (state = {}, action) => {
    const newState = {};

    for(let i = 0; i < reducerKeys.length; i++) {
      // reducerMap里面每个键的值都是一个reducer，我们把它拿出来运行下就可以得到对应键新的state值
      // 然后将所有reducer返回的state按照参数里面的key组装好
      // 最后再返回组装好的newState就行
      
      const key = reducerKeys[i];
      const currentReducer = reducerMap[key];
      const prevState = state[key];
      newState[key] = currentReducer(prevState, action);
    }

    return newState;
  }

  return reducer;
}

export { createStore, combineReducers };