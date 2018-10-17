import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';


// Ant Design
import {
    Table,
    Popconfirm,
    Icon
} from 'antd';

// Styles
import Styles from './styles.scss';


class AccountCategoriesTable extends React.Component {

    columns = [
        {
            title: <FormattedMessage id="pebee.accountCategories.name" />,
            key: 'name',
            render: record => {
                let link = `/account-categories/edit/${record.id}`;

                return (
                    <Link to={link}>{record.name}</Link>
                );
            }
        },
        {
            title: <FormattedMessage id="pebee.accountCategories.usersCount" />,
            dataIndex: 'usersCount',
            key: 'usersCount'
        },
        {
            key: 'manage',
            render: record => {
                return this.renderPopconfirm(record);
            }
        }
    ];

    renderPopconfirm = record => {
        let title = record.isDeleted ? 'pebee.accountCategories.restoreAccountCategory' : 'pebee.accountCategories.deleteAccountCategory',
            ok = record.isDeleted ? 'pebee.global.restore' : 'pebee.global.delete',
            icon = record.isDeleted ? 'sync' : 'delete',
            method = record.isDeleted ? this.props.restoreAccountCategory : this.props.deleteAccountCategory


        return !record.isProtected ? (
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
        ) : null;
    }

    render() {
        return (
            <Table
                columns={this.columns}
                loading={this.props.loading}
                dataSource={this.props.data}
                rowClassName={(record) => record.isDeleted ? Styles.DeletedRow : ''}
                rowKey={record => record.id} />
        )
    }

}


AccountCategoriesTable.propTypes = {
    data: PropTypes.array
};


export default injectIntl(AccountCategoriesTable);