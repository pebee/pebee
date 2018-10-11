import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';

// Ant design
import {
    Table,
    Icon,
    Popconfirm
} from 'antd';

// Styles
import Styles from './styles.scss';


class UsersTable extends React.Component {

    getPopconfirm = (record) => {
        let title = record.isDeleted ? 'pebee.users.restoreUser' : 'pebee.users.deleteUser',
            ok = record.isDeleted ? 'pebee.global.restore' : 'pebee.global.delete',
            icon = record.isDeleted ? 'sync' : 'delete',
            method = record.isDeleted ? this.props.restoreUser : this.props.deleteUser;


        return (
            <Popconfirm
                title={this.props.intl.formatMessage({ id: title })}
                okText={this.props.intl.formatMessage({ id: ok })}
                cancelText={this.props.intl.formatMessage({ id: 'pebee.global.cancel' })}
                onConfirm={() => method(record.id)}>
                <Icon
                    style={{ color: 'black', cursor: 'pointer' }}
                    type={icon}
                    theme="outlined" />
            </Popconfirm>
        );
    }
    
    getColumns = () => {
        return [
            {
                title: <FormattedMessage id="pebee.users.username" />,
                key: 'username',
                render: record => {
                    let href = '/users/edit/' + record.id;

                    return (
                        <Link to={href}>{record.username}</Link>
                    );
                }
            },
            {
                title: 'E-mail',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: <FormattedMessage id="pebee.users.accountCategory" />,
                key: 'accountCategory',
                render: record => record.accountCategory.name
            },
            {
                key: 'delete',
                render: record => {
                    return this.getPopconfirm(record);
                }
            }
        ];
    }

    render() {
        return (
            <Table
                rowKey={(record) => record.id}
                dataSource={this.props.data}
                columns={this.getColumns()}
                pagination={this.props.pagination}
                rowClassName={(record, index) => record.isDeleted ? Styles.DeletedRow : ''}
                onChange={this.props.onChange}
                loading={this.props.loading} />
        );
    }

}

UsersTable.propTypes = {
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    pagination: PropTypes.object.isRequired
};


export default injectIntl(UsersTable);