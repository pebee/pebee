import React from 'react';
import { Route } from 'react-router';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


// Ant Design
import {
    Row,
    Col,
    Layout
} from 'antd';

import {
    Home,
    Extension,

    Users,
    SingleUser,

    AccountCategoriesList,
    SingleAccountCategory,

    Media,

    Options
} from './../index';

import Authorized from './../../components/Auth';
import SideMenu from './../../components/Menu';

// Reducer
import appReducer from './reducer';

// withReducer
import withReducer from './../../utils/withReducer';

// Styles
import Styles from './styles.scss';


const { Header, Content, Sider, Footer } = Layout;


class App extends React.Component {

    render() {
        return (
            <Layout className={Styles.MainLayout}>
                <Layout>
                    <Sider width={200}>
                        <div className='logo' />
                        <SideMenu
                            user={this.props.loggedInUser.toJS()}
                            history={this.context.router.history} />
                    </Sider>
                    <Layout style={{ padding: '24px 24px 24px' }}>
                        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                            <Route exact path="/" component={Home} />
                            <Route path="/extensions/:slug" component={Extension} />

                            <Route exact path="/users" component={Users} />
                            <Route exact path="/users/add" component={SingleUser} />
                            <Route path="/users/edit/:id" component={SingleUser} />

                            <Route exact path="/account-categories" component={AccountCategoriesList} />
                            <Route exact path="/account-categories/add" component={SingleAccountCategory} />
                            <Route exact path="/account-categories/edit/:id" component={SingleAccountCategory} />

                            <Route exact path="/media" component={Media} />

                            <Route exact path="/options" component={Options} />
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            PeBee® 2018 Created by Piotr Bienias
                        </Footer>
                    </Layout>
                </Layout>
            </Layout>
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