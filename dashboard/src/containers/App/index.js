import React from 'react';
import { Route } from 'react-router';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


// Ant Design
import {
    Row,
    Col
} from 'antd';

import {
    Home,
    Extension,
    Users,
    EditUser,
    AccountCategoriesList
} from './../index';

import Authorized from './../../components/Auth';
import SideMenu from './../../components/Menu';

// Reducer
import appReducer from './reducer';

// withReducer
import withReducer from './../../utils/withReducer';

// Styles
import Styles from './styles.scss';




class App extends React.Component {

    render() {
        return (
            <Row className={Styles.mainRow}>
                <Col span={4} className={Styles.sideMenuCol}>
                    <SideMenu
                        history={this.context.router.history} />
                </Col>
                <Col span={18} offset={1}>
                    <Row className={Styles.ContentRow}>
                        <Route exact path="/" component={Home} />
                        <Route path="/extensions/:slug" component={Extension} />
                        <Route exact path="/users" component={Users} />
                        <Route exact path="/users/add" component={EditUser} />
                        <Route path="/users/edit/:id" component={EditUser} />
                        <Route exact path="/account-categories" component={AccountCategoriesList} />
                    </Row>
                </Col>
            </Row>
        );
    }

}

App.contextTypes = {
    router: PropTypes.object.isRequired
};


const mapStateToProps = state => {
    return {
        isLoggedIn: state.app.get('isLoggedIn'),
        loggedInUser: state.app.get('loggedInUser')
    };
};


const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {},
        dispatch
    );
};


const includeConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

const includeReducer = withReducer('app', appReducer);


export default compose(
    includeReducer,
    includeConnect
)(Authorized(App));