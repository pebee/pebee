import React from 'react';
import PropTypes from 'prop-types';


// LoginPage
import { LoginPage } from './../../containers';


export default function Authorized(WrappedComponent) {

    class AuthorizedComponent extends React.Component {

        render() {
            return this.props.isLoggedIn ? (
                <WrappedComponent {...this.props} />
            ) : <LoginPage />
        }

    }

    AuthorizedComponent.contextTypes = {
        store: PropTypes.object
    };

    return AuthorizedComponent;

};