import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Authorization from "../pages/authorization/authorization";
import Editor from "../pages/editor/editor";
import RequestParticipation from "../pages/request-participation/request";
import Creating from "../pages/creating/creating";
import Invitation from "../pages/invitation/invitation";
import OtherProjects from "../pages/other-projects/other-projects";
import OwnProjects from "../pages/own-projects/own-projects";
import Loading from "../pages/loading/loading";
import PageNotFound from "../pages/not-found/not-found";

const Root = ({ store }) => (
    <Provider store={ store }>
        <Router>
            <Switch>
                <Route exact path="/" component={ Loading } />
                <Route exact path="/auth" component={ Authorization } />
                <Route exact path="/editor/:id" component={ Editor } />
                <Route exact path="/request/:id" component={ RequestParticipation } />
                <Route exact path="/create" component={ Creating } />
                <Route exact path="/own-projects" component={ OwnProjects } />
                <Route exact path="/other-projects" component={ OtherProjects } />
                <Route exact path="/invitations/:id" component={ Invitation } />
                <Route component={ PageNotFound }/>
            </Switch>
        </Router>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired
};

export default Root