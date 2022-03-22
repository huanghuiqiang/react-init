import { createStore } from './redux/createStore';

const initState = {
  milk: 0
};

function reducer(state = initState, action) {
  switch (action.type) {
    case 'PUT_MILK':
    return {...state, milk: state.milk + action.count};
    case 'TAKE_MILK':
    return {...state, milk: state.milk - action.count};
    default:
    return state;
  }
}

let store = createStore(reducer);

// subscribe其实就是订阅store的变化，一旦store发生了变化，传入的回调函数就会被调用
// 如果是结合页面更新，更新的操作就是在这里执行
store.subscribe(() => console.log(store.getState()));

// 将action发出去要用dispatch
store.dispatch({ type: 'PUT_MILK', count: 1});    // milk: 1
store.dispatch({ type: 'PUT_MILK', count: 2 });    // milk: 2
store.dispatch({ type: 'TAKE_MILK', count: 1 });   // milk: 1