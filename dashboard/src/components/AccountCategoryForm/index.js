import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

// Ant Design
import {
    Form,
    Input,
    Button,
    Select
} from 'antd';



class AccountCategoryForm extends React.Component {

    handleSubmit = e => {
        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (err) return;

            console.log(values);

            this.props.submitForm(values);
        });
    }

    getPermissionsOptions = () => {
        let options = [];

        this.props.permissions.forEach(permission => {
            let messageId = `pebee.permissions.${permission.label}`;

            options.push(
                <Select.Option key={permission.id} value={permission.id}>
                    <FormattedMessage id={messageId} />
                </Select.Option>
            );
        });

        return options;
    }

    render() {
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

        const { getFieldDecorator } = this.props.form;
        const { formatMessage } = this.props.intl;

        return (
            <Form
                onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('id', {
                        initialValue: this.props.accountCategory ? this.props.accountCategory.id : null
                    })(
                        <Input type="hidden" />
                    )}
                </Form.Item>
                <Form.Item
                    label={formatMessage({ id: 'pebee.accountCategories.name' })}
                    {...formItemLayout}>
                    {getFieldDecorator('name', {
                        rules: [
                            { required: true, message: 'REQUIRED' }
                        ],
                        initialValue: this.props.accountCategory ? this.props.accountCategory.name : null
                    })(
                        <Input />
                    )}
                </Form.Item>
                <Form.Item
                    label={formatMessage({ id: 'pebee.global.permissions' })}
                    {...formItemLayout}>
                    {getFieldDecorator('permissions', {
                        rules: [
                            { required: true, message: 'REQUIRED', type: 'array' }
                        ],
                        initialValue: this.props.accountCategory.permissions ? this.props.accountCategory.permissions.map(permission => permission.id) : []
                    })(
                        <Select mode="multiple">
                            {this.getPermissionsOptions()}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        style={{ float: 'right' }}
                        htmlType="submit">{formatMessage({ id: 'pebee.global.save' })}</Button>
                </Form.Item>
            </Form>
        )
    }

}


export default Form.create()(injectIntl(AccountCategoryForm));