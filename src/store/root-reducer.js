import { combineReducers } from 'redux';
import authorization from './reducers/reducer-authorization';
import creating from "./reducers/reducer-creating";
import projects from "./reducers/reducer-own-projects";

export default combineReducers({
    authorization,
    creating,
    ownProjects: projects
})