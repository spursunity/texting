import React, {Component} from 'react';
import PropTypes from 'prop-types';
import WorkingSpace from "../../components/two-page-working-space/working-space";
import {connect} from "react-redux";
import {getIdsOwnProjects} from "../../store/actions/actions-own-projects";

class OwnProjects extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.getDatabase();
    }

    render() {
        return (
            <WorkingSpace
                withBlockForCreating={ true }/>
        );
    }
}

OwnProjects.propTypes = {
    userProjectsIds: PropTypes.array
};

function mapStateToProps(state) {
    const scope = state.ownProjects;
    return {
        userProjectsIds: scope.userProjectsIds
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getDatabase: () => {
            dispatch(getIdsOwnProjects());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnProjects);
