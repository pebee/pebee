import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { FormattedMessage, injectIntl } from 'react-intl';

import { authorizeUser } from './../../utils/auth';

// User Form
import UserForm from './../../components/UserForm';

// Ant Design
import { Row, Col, Alert } from 'antd';

import withReducer from './../../utils/withReducer';
import withSaga from './../../utils/withSaga';

// Actions
import { fetchUser, saveUser, closeMessage, resetUser } from './actions';

// Selector
import editUserSelector from './selector';

// Saga
import saga from './saga';

// Reducer
import reducer from './recuder';

// Styles
import Styles from './styles.scss';


class EditUser extends React.Component {

    componentWillMount() {
        if (!authorizeUser(this.props.account, 'can-update-users')) {
            this.props.history.push('/');
        }

        if (this.props.match.params['id']) {
            this.props.fetchUser(this.props.match.params['id']);
        }
    }

    render() {
        let headerId = this.props.user.id ? 'pebee.editUser.editUser' : 'pebee.addUser.addUser';
        const { formatMessage } = this.props.intl;

        return (
            <Row className={Styles.EditUserRow}>
                <Col span={16}>
                    <h1>
                        <FormattedMessage id={headerId} />
                    </h1>
                    <UserForm
                        user={this.props.user}
                        submit={this.props.saveUser}
                        loading={this.props.loading} />
                    { !!this.props.message ? (
                        <Alert
                            message={this.props.messageType === 'error' ? this.props.message : formatMessage({ id: this.props.message })}
                            type={this.props.messageType}
                            closable
                            onClose={this.props.closeMessage}
                            showIcon />
                    ) : null }
                </Col>
            </Row>
        );
    }

    componentWillUnmount() {
        this.props.resetUser();
    }

}

EditUser.contextTypes = {
    router: PropTypes.object.isRequired
};

EditUser.propTypes = {
    user: PropTypes.object.isRequired,
    saveUser: PropTypes.func.isRequired,
    fetchUser: PropTypes.func.isRequired,
    resetUser: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    message: PropTypes.string,
    messageType: PropTypes.string.isRequired,
    closeMessage: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return editUserSelector(state);
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            fetchUser,
            saveUser,
            closeMessage,
            resetUser
        },
        dispatch
    );
};

const includeConnect = connect(mapStateToProps, mapDispatchToProps);
const includeReducer = withReducer('editUser', reducer);
const includeSaga = withSaga('editUser', saga);


export default compose(
    includeReducer,
    includeSaga,
    includeConnect
)(injectIntl(EditUser));