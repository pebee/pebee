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
                    <Menu.Item key="/users">{formatMessage({ id: 'pebee.home.usersList' })}</Menu.Item>
                    <Menu.Item key="/users/add">{formatMessage({ id: 'pebee.home.addNewUser' })}</Menu.Item>
                    <Menu.Item key="/account-categories">{formatMessage({ id: 'pebee.home.accountCategories' })}</Menu.Item>
                </Menu.SubMenu>
            </Menu>
        );
    }

}

SideMenu.contextTypes = {
    router: PropTypes.object.isRequired
};


export default injectIntl(SideMenu);