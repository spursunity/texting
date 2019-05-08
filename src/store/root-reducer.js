import { combineReducers } from 'redux';
import authorization from './reducers/reducer-authorization';
import creating from "./reducers/reducer-creating";
import projects from "./reducers/reducer-projects";
import editor from "./reducers/reducer-editor";
import request from "./reducers/reducer-request";

export default combineReducers({
    authorization,
    creating,
    projects,
    editor,
    request
})