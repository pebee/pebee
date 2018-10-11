import React from 'react';

import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

// Ant Design
import {
    Form,
    Input,
    Icon,
    Button,
    Alert
} from 'antd';

// Styles
import Styles from './styles.scss';


class LoginForm extends React.Component {

    login = (e) => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (err) return;
            
            this.props.login(values);
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { formatMessage } = this.props.intl;


        return (
            <div>
                <Form
                    onSubmit={this.login}>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [
                                { required: true, message: formatMessage({ id: 'pebee.login.provideUsername' }) }
                            ]
                        })(
                            <Input prefix={<Icon type="user" />} placeholder={formatMessage({ id: 'pebee.login.username' })} />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: formatMessage({ id: 'pebee.login.providePassword' }) }
                            ]
                        })(
                            <Input type="password" prefix={<Icon type="lock" />} placeholder={formatMessage({ id: 'pebee.login.password' })} />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button
                            className={Styles.LoginButton}
                            type="primary"
                            htmlType="submit">{formatMessage({ id: 'pebee.login.loginButton' })}</Button>
                    </Form.Item>
                </Form>
                {
                    this.props.loginFailure ? (
                        <Alert
                            message={formatMessage({ id: 'pebee.login.wrongUsernameOrPassword' })}
                            type="error"
                            closable
                            onClose={this.props.closeLoginFailureMessage}
                            showIcon />
                    ) : null
                }
            </div>
        );
    }

}


LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    loginFailure: PropTypes.bool.isRequired,
    closeLoginFailureMessage: PropTypes.func.isRequired
};


export default injectIntl(Form.create()(LoginForm));