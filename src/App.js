import './App.css';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import TaskList from './TaskList';
import { thunk } from 'redux-thunk';
import logger from './logger';


function tasksReducer(state = {tasks: []}, action) {
  if(action.type === 'FETCH_TASKS_LOADING'){
    return {...state, loading: true};
  }

  if(action.type === 'FETCH_TASKS_SUCCESS'){
    return {...state, tasks: action.payload, loading: false};
  }

  if(action.type === 'CREATE_TASK'){
    return {tasks: state.tasks.concat(action.payload)}
  }
  return state;
}

const store = createStore(tasksReducer, applyMiddleware(thunk, logger));


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <TaskList/>
      </div>
    </Provider>
  );
}

export default (App);
