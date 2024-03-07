import { useEffect } from 'react';
import { connect } from 'react-redux';
import {getFilteredTasks} from './selectors';

const mockTasks = [
    {
    id: 1,
    title: 'Learn Redux',
    description: 'The store, actions, and reducers, oh my!',
    status: 'In Progress',
    },
    {
    id: 2,
    title: 'Peace on Earth',
    description: 'No big deal.',
    status: 'In Progress',
    },
  ];

const getTasks = async () => new Promise(res => setTimeout(() => res(mockTasks), 1000));

const fetchTasks = () => {
  return async (dispatch) => {
    dispatch({type: 'FETCH_TASKS_LOADING'});
    const res = await getTasks();
    dispatch({type: 'FETCH_TASKS_SUCCESS', payload: res});
  }
}

const Task = props => {

    return (
    <div className="task">
    <div className="task­header">
    <div>{props.task.title}</div>
    </div>
    <hr />
    <div className="task­body">{props.task.description}</div>
    <div className="task­body">{props.task.status}</div>
  
    </div>
    );
    }
  
  
  const TaskList = props => {
    const {dispatch, loading, tasks} = props;          

    useEffect(() => {
        dispatch(fetchTasks());
    }, []);

    if(loading){
        return 'LOADING...'
    }

    return (
        <>
        <input
        onChange={(e) => dispatch({type: 'FILTER_TASKS', payload:{ searchTerm: e.target.value }})}
        type="text"
        placeholder="Search..."
        />
        <div className="task­list"><div className="task­list­title">
        </div>
        {tasks.map(task => (
        <Task key={task.id} task={task} />
        ))}
        </div>
        <button onClick={() => dispatch({type: 'CREATE_TASK', payload:{
            title: 'New',
            description: 'New desc',
            status: 'Active'
        }})}>Create</button>
        </>
    );
    }

const mapToStateProps = (state) =>{
    const tasks = getFilteredTasks(state);
    return {...state, tasks};
  }

    export default connect(mapToStateProps)(TaskList)