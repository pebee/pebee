import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';

// Ant Design
import {
    Row,
    Col
} from 'antd';

// LoginForm
import LoginForm from './../../components/LoginForm';

// Selector
import loginSelector from './selector';

// Actions
import { login, closeLoginFailureMessage } from './actions';

// Saga
import loginSaga from './saga';

import withReducer from './../../utils/withReducer';
import withSaga from './../../utils/withSaga';

// Styles
import Styles from './styles.scss';
import loginReducer from './reducer';


class Login extends React.Component {

    render() {
        return (
            <Row
                className={Styles.LoginRow}
                type="flex"
                justify="center"
                align="middle">
                <Col span={6}>
                    <LoginForm
                        login={this.props.login}
                        loginFailure={this.props.loginFailure}
                        closeLoginFailureMessage={this.props.closeLoginFailureMessage} />
                </Col>
            </Row>
        );
    }

}


Login.propTypes = {
    login: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    closeLoginFailureMessage: PropTypes.func.isRequired
};


const mapStateToProps = loginSelector();


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            login,
            closeLoginFailureMessage
        },
        dispatch
    );
};

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps
);

const includeReducer = withReducer('login', loginReducer);
const includeSaga = withSaga('login', loginSaga);


export default compose(includeSaga, includeReducer, withConnect)(Login);