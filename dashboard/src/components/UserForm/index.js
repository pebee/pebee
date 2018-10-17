import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';


// Ant Design
import {
    Form,
    Button,
    Input,
    Icon,
    Select
} from 'antd';

// Styles
import Styles from './styles.scss';



class UserForm extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();
        
        this.props.form.validateFields((err, values) => {
            if (err) return;

            this.props.submit(values);
        });
    }

    getAccountCategoryOptions = () => {
        let options = [];

        this.props.accountCategories.forEach(accountCategory => {
            options.push(
                <Select.Option key={accountCategory.id} value={accountCategory.id}>{accountCategory.name}</Select.Option>
            );
        });

        return options;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { formatMessage } = this.props.intl;

        const formItemLayout = {
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            },
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            }
        };

        let ButtonStyle = this.props.loading ? Styles.Visible : Styles.NotVisible;

        return (
            <Form
                onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('id', {
                        initialValue: this.props.user ? this.props.user.id : null
                    })(
                        <Input type="hidden" />
                    )}
                </Form.Item>
                <Form.Item
                    label="Nazwa uzytkownika"
                    {...formItemLayout}>
                    {getFieldDecorator('username', {
                        rules: [
                            { required: true, message: formatMessage({ id: 'pebee.editUser.usernameIsRequired' }) }
                        ],
                        initialValue: this.props.user ? this.props.user.username : null
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label="Kategoria"
                    {...formItemLayout}>
                    {getFieldDecorator('accountCategory', {
                        rules: [
                            { required: true, message: 'REQUIRED' }
                        ],
                        initialValue: this.props.user.accountCategory ? this.props.user.accountCategory.id : null
                    })(
                        <Select>
                            {this.getAccountCategoryOptions()}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        className={Styles.SubmitButton}
                        type="primary"
                        htmlType="submit"><Icon className={ButtonStyle} type="loading" theme="outlined" /><FormattedMessage id="pebee.global.save" /></Button>
                </Form.Item>
            </Form>
        )
    }

}

UserForm.propTypes = {
    user: PropTypes.object.isRequired,
    submit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};


export default Form.create()(injectIntl(UserForm));