import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Authorization from "../pages/authorization/authorization";
import Editor from "../pages/editor/editor";
import RequestParticipation from "../pages/request-participation/request";
import Creating from "../pages/creating/creating";
import Invitation from "../pages/invitation/invitation";
import OtherProjects from "../pages/other-projects/other-projects";
import OwnProjects from "../pages/own-projects/own-projects";

const Root = ({ store }) => (
    <Provider store={ store }>
        <Router>
            <Switch>
                <Route exact path="/" component={ Authorization } />
                <Route path="/editor" component={ Editor } />
                <Route path="/request" component={ RequestParticipation } />
                <Route path="/create" component={ Creating } />
                <Route path="/own-projects" component={ OwnProjects } />
                <Route path="/other-projects" component={ OtherProjects } />
                <Route path="/invitation" component={ Invitation } />
            </Switch>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root