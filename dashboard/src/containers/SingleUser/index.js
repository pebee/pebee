import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import { authorizeUser } from './../../utils/auth';

// User Form
import UserForm from './../../components/UserForm';

// Ant Design
import { Col, Alert } from 'antd';

import withReducer from './../../utils/withReducer';
import withSaga from './../../utils/withSaga';

// Actions
import { fetchUser, saveUser, closeMessage, resetUser, fetchAccountCategories } from './actions';

// Selector
import selector from './selector';

// Saga
import saga from './saga';

// Reducer
import reducer from './recuder';

// Styles
import Styles from './styles.scss';


class SingleUser extends React.Component {

    componentWillMount() {
        this.props.fetchAccountCategories();

        if (!authorizeUser(this.props.account, 'can-update-users')) {
            this.props.history.push('/');
        }

        if (this.props.match.params['id']) {
            this.props.fetchUser(this.props.match.params['id']);
        }
    }

    render() {
        let headerId = this.props.user.id ? 'pebee.singleUser.singleUser' : 'pebee.addUser.addUser';
        const { formatMessage } = this.props.intl;

        return (
            <div>
                <Col span={16}>
                    <h1>
                        <FormattedMessage id={headerId} />
                    </h1>
                    <UserForm
                        user={this.props.user}
                        submit={this.props.saveUser}
                        loading={this.props.loading}
                        accountCategories={this.props.accountCategories} />
                    { !!this.props.message ? (
                        <Alert
                            message={this.props.messageType === 'error' ? this.props.message : formatMessage({ id: this.props.message })}
                            type={this.props.messageType}
                            closable
                            onClose={this.props.closeMessage}
                            showIcon />
                    ) : null }
                </Col>
            </div>
        );
    }

    componentWillUnmount() {
        this.props.resetUser();
    }

}

SingleUser.contextTypes = {
    router: PropTypes.object.isRequired
};

SingleUser.propTypes = {
    user: PropTypes.object.isRequired,
    accountCategories: PropTypes.array.isRequired,
    saveUser: PropTypes.func.isRequired,
    fetchUser: PropTypes.func.isRequired,
    resetUser: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    message: PropTypes.string,
    messageType: PropTypes.string.isRequired,
    closeMessage: PropTypes.func.isRequired,
    fetchAccountCategories: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return selector(state);
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchUser,
            saveUser,
            closeMessage,
            resetUser,
            fetchAccountCategories
        },
        dispatch
    );
};

const includeConnect = connect(mapStateToProps, mapDispatchToProps);
const includeReducer = withReducer('singleUser', reducer);
const includeSaga = withSaga('singleUser', saga);


export default compose(
    includeReducer,
    includeSaga,
    includeConnect
)(injectIntl(SingleUser));