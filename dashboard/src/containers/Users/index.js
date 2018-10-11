import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

import { FormattedMessage } from 'react-intl';

import withReducer from './../../utils/withReducer';
import withSaga from './../../utils/withSaga';

// Ant Design
import {
    Row,
    Button
} from 'antd';


// Actions
import { fetchUsers, updatePagination, resetPagination, deleteUser, restoreUser } from './actions';

// Selector
import usersSelector from './selector';

// Reducer
import usersReducer from './reducer';

// Saga
import usersSaga from './saga';

import UsersTable from './../../components/UsersTable';
import { authorizeUser } from './../../utils/auth';

import Styles from './styles.scss';



class Users extends React.Component {

    componentWillMount() {
        if (! authorizeUser(this.props.account, 'can-view-users') ) {
            this.props.history.push('/');
        }

        this.props.fetchUsers({
            limit: this.props.pagination.pageSize,
            page: 1
        });
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.props.pagination };

        pager.current = pagination.current;
        this.props.updatePagination(pager);
        this.props.fetchUsers({
            limit: pagination.pageSize,
            page: pagination.current
        });
    }

    goToAddNew = () => {
        this.props.history.push('/users/add');
    }

    deleteUser = userId => {
        this.props.deleteUser({
            pagination: this.props.pagination,
            id: userId
        });
    }

    restoreUser = userId => {
        this.props.restoreUser({
            pagination: this.props.pagination,
            id: userId
        });
    }

    render() {

        return (
            <Row
                className={Styles.UsersRow}>
                <Row
                    className={Styles.HeaderRow}>
                    <h1
                        style={{ marginBottom: 0 }}>
                        <FormattedMessage id="pebee.home.users" />
                    </h1>
                    { authorizeUser(this.props.account, 'can-add-users') ?
                        <Button
                            type="primary"
                            style={{ marginLeft: '30px' }}
                            onClick={this.goToAddNew}>
                            <FormattedMessage id="pebee.home.addNewUser" />
                        </Button>
                    : null }
                </Row>
                <UsersTable
                    data={this.props.users}
                    pagination={this.props.pagination}
                    loading={this.props.loading}
                    onChange={this.handleTableChange}
                    deleteUser={this.deleteUser}
                    restoreUser={this.restoreUser} />
            </Row>
        )
    }

    componentWillUnmount() {
        this.props.resetPagination();
    }

}

Users.contextTypes = {
    router: PropTypes.object.isRequired
};

Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    account: PropTypes.object.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    fetchError: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    pagination: PropTypes.object.isRequired,
    deleteUser: PropTypes.func.isRequired,
    restoreUser: PropTypes.func.isRequired
};


const mapStateToProps = state => {
    return usersSelector(state);
}


const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchUsers,
            updatePagination,
            resetPagination,
            deleteUser,
            restoreUser
        },
        dispatch
    );
};

const includeReducer = withReducer('users', usersReducer);
const includeSaga = withSaga('users', usersSaga);
const includeConnect = connect(mapStateToProps, mapDispatchToProps);


export default compose(
    includeReducer,
    includeSaga,
    includeConnect
)(Users);