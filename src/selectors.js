import { createSelector } from 'reselect';

const getTasks = state => state.tasks;
const getSearchTerm = state => state.searchTerm;

export const getFilteredTasks = createSelector(
    [getTasks, getSearchTerm],
    (tasks, searchTerm) => {
    return tasks.filter(task => task.title.match(new RegExp(searchTerm,
    'i')));
    },
);