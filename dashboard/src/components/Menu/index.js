import React from 'react';
import { Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import {
    Menu, Icon
} from 'antd';



class SideMenu extends React.Component {

    handleClick = (menuItem) => {
        this.props.history.push(menuItem.key);
    }

    render() {
        const { formatMessage } = this.props.intl;

        let canViewUsers,
            canAddUsers,
            canViewAccountCategories;

        if (this.props.user.accountCategory && Array.isArray(this.props.user.accountCategory.permissions)) {
            this.props.user.accountCategory.permissions.forEach(permission => {
                if ( permission.label === 'can-view-users' ) canViewUsers = true;
                if ( permission.label === 'can-add-users' ) canAddUsers = true;
                if ( permission.label === 'can-view-account-categories' ) canViewAccountCategories = true;
            });
        }

        return (
            <Menu
                defaultSelectedKeys={['1']}
                mode="inline"
                theme="dark"
                style={{ height: '100%' }}
                onClick={this.handleClick}>
                <Menu.SubMenu
                    key="users"
                    title={<span><Icon type="user" /> {formatMessage({ id: 'pebee.home.users' })}</span>}>
                    { canViewUsers ? <Menu.Item key="/users">{formatMessage({ id: 'pebee.home.usersList' })}</Menu.Item> : null }
                    { canAddUsers ? <Menu.Item key="/users/add">{formatMessage({ id: 'pebee.home.addNewUser' })}</Menu.Item> : null }
                    { canViewAccountCategories ? <Menu.Item key="/account-categories">{formatMessage({ id: 'pebee.home.accountCategories' })}</Menu.Item> : null }
                </Menu.SubMenu>
            </Menu>
        );
    }

}

SideMenu.contextTypes = {
    router: PropTypes.object.isRequired
};


export default injectIntl(SideMenu);