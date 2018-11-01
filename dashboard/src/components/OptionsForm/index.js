import React from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';

// Ant Design
import {
    Form,
    Button,
    Input,
    Select
} from 'antd';


class OptionsForm extends React.Component {

    getOptionField = (option) => {
        if (option.availableValues && option.availableValues.length > 0) {
            let options = option.availableValues.map(value => {
                let labelLocalID = `pebee.options.${value}`;

                return (
                    <Select.Option key={value} value={value}>
                        <FormattedMessage id={labelLocalID} />
                    </Select.Option>
                )
            });

            return (
                <Select>
                    {options}
                </Select>
            );
        }

        return (
            <Input />
        );
    }

    render() { 
        const { formatMessage } = this.props.intl;
        const { getFieldDecorator } = this.props.form;
        
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

        let formItems = [];

        this.props.options.forEach(option => {
            let field = this.getOptionField(option);

            formItems.push(
                <Form.Item
                    key={option.key}
                    label={formatMessage({ id: `pebee.options.${option.key}` })}
                    {...formItemLayout}>
                    {getFieldDecorator(option.key, {
                        rules: [
                            { required: true, message: formatMessage({ id: 'pebee.options.required' }) }
                        ],
                        initialValue: option.value
                    })(field)}
                </Form.Item>
            );
        });

        return (
            <Form>
                {formItems}
                <Form.Item>
                    <Button
                        style={{ float: 'right' }}
                        type="primary"
                        htmlType="submit"><FormattedMessage id="pebee.global.save" /></Button>
                </Form.Item>
            </Form>
        );
    }

}


export default Form.create()(injectIntl(OptionsForm));